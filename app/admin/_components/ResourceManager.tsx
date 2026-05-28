"use client";

import { useEffect, useState } from "react";
import { ImageField, type UploadedImage } from "./ImageField";
import { MultiImageField } from "./MultiImageField";

type FieldType = "text" | "textarea" | "number" | "boolean" | "image" | "gallery" | "tags";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  folder?: string;
};

type Item = Record<string, unknown> & { _id?: string };

const btn =
  "bg-neutral-950 text-white border-0 px-3.5 py-2 rounded-md cursor-pointer hover:bg-neutral-800 transition-colors disabled:opacity-60";
const btnSecondary =
  "bg-neutral-200 text-neutral-900 border-0 px-3.5 py-2 rounded-md cursor-pointer hover:bg-neutral-300 transition-colors";
const btnSm = "bg-transparent border-0 cursor-pointer p-0 text-[13px]";
const th = "text-left px-3 py-2.5 text-xs font-semibold text-neutral-600";
const td = "px-3 py-2.5 text-sm";
const input =
  "w-full px-2.5 py-2 border border-neutral-300 rounded-md outline-none focus:border-neutral-900";

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
      else if (f.type === "gallery") init[f.name] = [];
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
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <button onClick={() => setEditing(newItem())} className={btn}>+ New</button>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <table className="w-full border-collapse bg-white border border-neutral-200">
          <thead>
            <tr className="bg-neutral-100">
              {listColumns.map((c) => (
                <th key={c} className={th}>{c}</th>
              ))}
              <th className={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={String(item._id)} className="border-t border-neutral-200">
                {listColumns.map((c) => (
                  <td key={c} className={td}>{renderCell(item[c])}</td>
                ))}
                <td className={td}>
                  <button onClick={() => setEditing({ ...item })} className={btnSm}>Edit</button>
                  <span className="mx-1" />
                  <button onClick={() => remove(String(item._id))} className={`${btnSm} text-red-600`}>Delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={listColumns.length + 1} className={`${td} text-neutral-500`}>
                  No items yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center z-50">
          <div className="bg-white p-6 rounded-[10px] w-[600px] max-w-[92vw] max-h-[85vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-3">
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
            {error && <p className="text-red-600 text-[13px]">{error}</p>}
            <div className="flex gap-2 mt-3">
              <button onClick={save} disabled={saving} className={btn}>
                {saving ? "Saving…" : "Save"}
              </button>
              <button onClick={() => setEditing(null)} className={btnSecondary}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
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
  if (field.type === "gallery") {
    return (
      <MultiImageField
        label={field.label}
        value={(value as UploadedImage[]) ?? []}
        onChange={onChange}
        folder={field.folder}
      />
    );
  }
  if (field.type === "textarea") {
    return (
      <Wrap label={field.label}>
        <textarea
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className={input}
        />
      </Wrap>
    );
  }
  if (field.type === "boolean") {
    return (
      <Wrap label={field.label}>
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
        />
      </Wrap>
    );
  }
  if (field.type === "number") {
    return (
      <Wrap label={field.label}>
        <input
          type="number"
          value={(value as number) ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
          className={input}
        />
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
          onChange={(e) =>
            onChange(e.target.value.split(",").map((s) => s.trim()).filter(Boolean))
          }
          className={input}
        />
      </Wrap>
    );
  }
  return (
    <Wrap label={field.label}>
      <input
        type="text"
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
        required={field.required}
        className={input}
      />
    </Wrap>
  );
}

function Wrap({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block mb-2.5">
      <span className="block text-xs text-neutral-600 mb-1">{label}</span>
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
