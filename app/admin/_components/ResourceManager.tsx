"use client";

import { useEffect, useState } from "react";
import { ArrowUpDown, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DataTable, type Column } from "@/components/table/DataTable";
import { FieldInput } from "./FieldInput";
import { ReorderDialog } from "./ReorderDialog";
import { renderCell } from "./renderCell";
import type { Field, Item, Row } from "./resource-types";

export type { Field, FieldType } from "./resource-types";

export function ResourceManager({
  title,
  endpoint,
  fields,
  listColumns,
  orderable: orderableProp,
}: {
  title: string;
  endpoint: string;
  fields: Field[];
  listColumns: string[];
  /** Enables the drag-and-drop Reorder modal and auto-assigns `order` on create.
   *  Defaults to true when an "order" field is present in the form. */
  orderable?: boolean;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [editing, setEditing] = useState<Item | null>(null);
  const [reordering, setReordering] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const orderable = orderableProp ?? fields.some((f) => f.name === "order");
  const imageField = fields.find((f) => f.type === "image");
  const labelKey = listColumns[0] ?? "title";

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
      // New orderable items go to the end of the list automatically (order is
      // managed only via the Reorder modal, so there's no order input).
      if (isNew && orderable && payload.order == null) {
        const maxOrder = items.reduce(
          (max, it) => Math.max(max, Number(it.order ?? 0)),
          -1,
        );
        payload.order = maxOrder + 1;
      }
      const res = await fetch(url, {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      if (!res.ok) {
        const fieldErrors = body?.details?.fieldErrors as
          | Record<string, string[]>
          | undefined;
        const detail = fieldErrors
          ? Object.entries(fieldErrors)
              .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
              .join(" · ")
          : "";
        throw new Error(detail || body.error || "Save failed");
      }
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
    // Optimistic: drop the row immediately so the UI updates instantly even
    // while the server finishes its (slow) Cloudinary asset cleanup.
    const prev = items;
    setItems((cur) => cur.filter((it) => String(it._id) !== id));
    setError(null);
    try {
      const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Delete failed");
      }
    } catch (err) {
      setItems(prev); // rollback
      setError(err instanceof Error ? err.message : "Delete failed");
    }
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
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-primary-text">{title}</h1>
        <div className="flex items-center gap-2">
          {orderable && (
            <Button
              variant="secondary"
              onClick={() => setReordering(true)}
              disabled={loading || items.length < 2}
            >
              <ArrowUpDown className="size-4" />
              Reorder
            </Button>
          )}
          <Button onClick={() => setEditing(newItem())}>
            <Plus className="size-4" />
            New {singular}
          </Button>
        </div>
      </div>

      {error && !editing && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

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

      {orderable && reordering && (
        <ReorderDialog
          onClose={() => setReordering(false)}
          title={title}
          rows={rows}
          endpoint={endpoint}
          getLabel={(item) => {
            const v = item[labelKey];
            return v == null ? String(item._id) : String(v);
          }}
          getThumb={(item) => {
            if (!imageField) return null;
            const img = item[imageField.name] as { url?: string } | null;
            return img?.url ?? null;
          }}
          onSaved={load}
        />
      )}
    </div>
  );
}
