"use client";

import { useEffect, useState } from "react";
import { ImageField, type UploadedImage } from "./ImageField";

type FieldType = "text" | "textarea" | "number" | "boolean" | "image" | "tags";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  folder?: string;
};

type Item = Record<string, unknown> & { _id?: string };

export function ResourceManager({
  title,
  endpoint,
  fields,
  listColumns,
}: {
  title: string;
  endpoint: string;
  fields: Field[];
  listColumns: string[];
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [editing, setEditing] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(endpoint, { cache: "no-store" });
      const body = await res.json();
      setItems(body.data ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, [endpoint]);

  function newItem(): Item {
    const init: Item = {};
    for (const f of fields) {
      if (f.type === "boolean") init[f.name] = false;
      else if (f.type === "number") init[f.name] = 0;
      else if (f.type === "tags") init[f.name] = [];
      else if (f.type === "image") init[f.name] = null;
      else init[f.name] = "";
    }
    return init;
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    setError(null);
    try {
      const isNew = !editing._id;
      const url = isNew ? endpoint : `${endpoint}/${editing._id}`;
      const method = isNew ? "POST" : "PATCH";
      const payload: Item = { ...editing };
      delete payload._id;
      const res = await fetch(url, {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || JSON.stringify(body.details) || "Save failed");
      setEditing(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this item?")) return;
    const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    if (res.ok) await load();
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>{title}</h1>
        <button onClick={() => setEditing(newItem())} style={btn()}>+ New</button>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", border: "1px solid #eee" }}>
          <thead>
            <tr style={{ background: "#f3f3f3" }}>
              {listColumns.map((c) => (
                <th key={c} style={th()}>{c}</th>
              ))}
              <th style={th()}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={String(item._id)} style={{ borderTop: "1px solid #eee" }}>
                {listColumns.map((c) => (
                  <td key={c} style={td()}>{renderCell(item[c])}</td>
                ))}
                <td style={td()}>
                  <button onClick={() => setEditing({ ...item })} style={btnSm()}>Edit</button>{" "}
                  <button onClick={() => remove(String(item._id))} style={{ ...btnSm(), color: "#c00" }}>Delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={listColumns.length + 1} style={{ ...td(), color: "#888" }}>No items yet.</td></tr>
            )}
          </tbody>
        </table>
      )}

      {editing && (
        <div style={modalOverlay()}>
          <div style={modal()}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
              {editing._id ? "Edit" : "New"} {title.slice(0, -1)}
            </h2>
            {fields.map((f) => (
              <FieldInput
                key={f.name}
                field={f}
                value={editing[f.name]}
                onChange={(v) => setEditing({ ...editing, [f.name]: v })}
              />
            ))}
            {error && <p style={{ color: "#c00", fontSize: 13 }}>{error}</p>}
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button onClick={save} disabled={saving} style={btn()}>
                {saving ? "Saving…" : "Save"}
              </button>
              <button onClick={() => setEditing(null)} style={{ ...btn(), background: "#eee", color: "#111" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldInput({ field, value, onChange }: { field: Field; value: unknown; onChange: (v: unknown) => void }) {
  const common = { width: "100%", padding: "8px 10px", border: "1px solid #ddd", borderRadius: 6 } as const;
  if (field.type === "image") {
    return (
      <ImageField
        label={field.label}
        value={(value as UploadedImage) ?? null}
        onChange={onChange}
        folder={field.folder}
      />
    );
  }
  if (field.type === "textarea") {
    return (
      <Wrap label={field.label}>
        <textarea value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} rows={4} style={common} />
      </Wrap>
    );
  }
  if (field.type === "boolean") {
    return (
      <Wrap label={field.label}>
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
      </Wrap>
    );
  }
  if (field.type === "number") {
    return (
      <Wrap label={field.label}>
        <input type="number" value={(value as number) ?? 0} onChange={(e) => onChange(Number(e.target.value))} style={common} />
      </Wrap>
    );
  }
  if (field.type === "tags") {
    const arr = Array.isArray(value) ? (value as string[]) : [];
    return (
      <Wrap label={`${field.label} (comma separated)`}>
        <input
          type="text"
          value={arr.join(", ")}
          onChange={(e) => onChange(e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
          style={common}
        />
      </Wrap>
    );
  }
  return (
    <Wrap label={field.label}>
      <input type="text" value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} required={field.required} style={common} />
    </Wrap>
  );
}

function Wrap({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "block", marginBottom: 10 }}>
      <span style={{ display: "block", fontSize: 12, color: "#555", marginBottom: 4 }}>{label}</span>
      {children}
    </label>
  );
}

function renderCell(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    if (typeof o.url === "string") return "🖼";
    if (Array.isArray(v)) return v.length + " items";
    return JSON.stringify(v).slice(0, 60);
  }
  return String(v);
}

function btn(): React.CSSProperties { return { background: "#0a0a0a", color: "#fff", border: 0, padding: "8px 14px", borderRadius: 6, cursor: "pointer" }; }
function btnSm(): React.CSSProperties { return { background: "none", border: 0, cursor: "pointer", padding: 0, fontSize: 13 }; }
function th(): React.CSSProperties { return { textAlign: "left", padding: "10px 12px", fontSize: 12, fontWeight: 600, color: "#555" }; }
function td(): React.CSSProperties { return { padding: "10px 12px", fontSize: 14 }; }
function modalOverlay(): React.CSSProperties { return { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "grid", placeItems: "center", zIndex: 50 }; }
function modal(): React.CSSProperties { return { background: "#fff", padding: 24, borderRadius: 10, width: 520, maxHeight: "85vh", overflowY: "auto" }; }
