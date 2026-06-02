"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { ImageField, type UploadedImage } from "./ImageField";
import { MultiImageField } from "./MultiImageField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataTable, type Column } from "@/components/table/DataTable";
import { InputField } from "@/components/inputs/InputField";
import { TextAreaField } from "@/components/inputs/TextAreaField";
import { ToggleField } from "@/components/inputs/ToggleField";
import { SelectField } from "@/components/inputs/SelectField";

type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "image"
  | "gallery"
  | "tags"
  | "select";

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  folder?: string;
  options?: { label: string; value: string | number }[];
};

type Item = Record<string, unknown> & { _id?: string };
type Row = Item & { id: string };

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
      if (!res.ok)
        throw new Error(
          body.error || JSON.stringify(body.details) || "Save failed",
        );
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

  const rows: Row[] = items.map((it) => ({ ...it, id: String(it._id) }));

  const columns: Column<Row>[] = [
    ...listColumns.map((c) => ({
      header: c,
      accessor: (item: Row) => renderCell(item[c]),
    })),
    {
      header: "Actions",
      className: "text-right",
      accessor: (item: Row) => (
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => setEditing({ ...item })}
          >
            <Pencil className="size-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={() => remove(item.id)}
          >
            <Trash2 className="size-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      ),
    },
  ];

  const singular = title.endsWith("s") ? title.slice(0, -1) : title;

  return (
    <div className="text-primary-text">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-text">{title}</h1>
        <Button onClick={() => setEditing(newItem())}>
          <Plus className="size-4" />
          New {singular}
        </Button>
      </div>

      <DataTable data={rows} columns={columns} isLoading={loading} />

      <Dialog
        open={!!editing}
        onOpenChange={(open) => {
          if (!open) {
            setEditing(null);
            setError(null);
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          {editing && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {editing._id ? `Edit ${singular}` : `New ${singular}`}
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-2">
                {fields.map((f) => (
                  <FieldInput
                    key={f.name}
                    field={f}
                    value={editing[f.name]}
                    onChange={(v) => setEditing({ ...editing, [f.name]: v })}
                  />
                ))}
              </div>

              {error && (
                <p className="text-sm font-medium text-red-500">{error}</p>
              )}

              <DialogFooter>
                <Button
                  variant="secondary"
                  onClick={() => setEditing(null)}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button onClick={save} disabled={saving}>
                  {saving ? "Saving…" : "Save"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
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
      <TextAreaField
        label={field.label}
        required={field.required}
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  if (field.type === "boolean") {
    return (
      <ToggleField
        label={field.label}
        required={field.required}
        checked={!!value}
        onChange={(e) => onChange(e.target.checked)}
      />
    );
  }
  if (field.type === "select") {
    return (
      <SelectField
        label={field.label}
        required={field.required}
        options={field.options ?? []}
        value={(value as string) ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  if (field.type === "number") {
    return (
      <InputField
        label={field.label}
        required={field.required}
        type="number"
        value={(value as number) ?? 0}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    );
  }
  if (field.type === "tags") {
    const arr = Array.isArray(value) ? (value as string[]) : [];
    return (
      <InputField
        label={`${field.label} (comma separated)`}
        value={arr.join(", ")}
        onChange={(e) =>
          onChange(
            e.target.value
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          )
        }
      />
    );
  }
  return (
    <InputField
      label={field.label}
      required={field.required}
      type="text"
      value={(value as string) ?? ""}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function renderCell(v: unknown): React.ReactNode {
  if (v == null) return "";
  if (typeof v === "boolean") {
    return (
      <span
        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
          v ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
        }`}
      >
        {v ? "Yes" : "No"}
      </span>
    );
  }
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    if (typeof o.url === "string") {
      // eslint-disable-next-line @next/next/no-img-element
      return (
        <img
          src={o.url as string}
          alt=""
          className="h-9 w-9 rounded-md border border-gray-100 object-cover"
        />
      );
    }
    if (Array.isArray(v)) return `${v.length} items`;
    return JSON.stringify(v).slice(0, 60);
  }
  return String(v);
}
