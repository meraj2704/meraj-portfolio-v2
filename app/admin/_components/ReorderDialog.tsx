"use client";

import { useRef, useState } from "react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Row } from "./resource-types";

export function ReorderDialog({
  onClose,
  title,
  rows,
  endpoint,
  getLabel,
  getThumb,
  onSaved,
}: {
  onClose: () => void;
  title: string;
  rows: Row[];
  endpoint: string;
  getLabel: (item: Row) => string;
  getThumb: (item: Row) => string | null;
  onSaved: () => Promise<void> | void;
}) {
  // Mounted fresh on each open, so the working list seeds straight from `rows`.
  const [list, setList] = useState<Row[]>(rows);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dragIndex = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  function onDragEnter(i: number) {
    const from = dragIndex.current;
    if (from === null || from === i) return;
    setList((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(i, 0, moved);
      return next;
    });
    dragIndex.current = i;
    setActiveIndex(i);
  }

  async function save() {
    setSaving(true);
    setError(null);
    try {
      for (let idx = 0; idx < list.length; idx++) {
        const item = list[idx];
        if (Number(item.order) === idx) continue; // unchanged
        const payload: Record<string, unknown> = { ...item, order: idx };
        delete payload._id;
        delete payload.id;
        const res = await fetch(`${endpoint}/${item._id}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || "Failed to save order");
        }
      }
      await onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save order");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog
      open
      onOpenChange={(o) => {
        if (!o && !saving) onClose();
      }}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Reorder {title}</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-secondary-text">
          Drag the rows to set the display order, then save.
        </p>

        <ul className="flex flex-col gap-1.5">
          {list.map((item, i) => (
            <li
              key={item.id}
              draggable
              onDragStart={() => {
                dragIndex.current = i;
                setActiveIndex(i);
              }}
              onDragEnter={() => onDragEnter(i)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnd={() => {
                dragIndex.current = null;
                setActiveIndex(null);
              }}
              className={cn(
                "flex cursor-grab items-center gap-3 rounded-xl border bg-white px-3 py-2.5 transition-shadow active:cursor-grabbing",
                activeIndex === i
                  ? "border-primary opacity-90 shadow-md"
                  : "border-gray-200 hover:border-gray-300",
              )}
            >
              <GripVertical className="size-4 shrink-0 text-secondary-text" />
              <span className="w-5 shrink-0 text-xs font-medium text-secondary-text">
                {i + 1}
              </span>
              {getThumb(item) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={getThumb(item) as string}
                  alt=""
                  className="size-9 shrink-0 rounded-md border border-gray-100 object-cover"
                />
              )}
              <span className="truncate text-sm font-medium text-primary-text">
                {getLabel(item)}
              </span>
            </li>
          ))}
        </ul>

        {error && <p className="text-sm font-medium text-red-500">{error}</p>}

        <DialogFooter>
          <Button variant="secondary" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={save} disabled={saving}>
            {saving ? "Saving…" : "Save order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
