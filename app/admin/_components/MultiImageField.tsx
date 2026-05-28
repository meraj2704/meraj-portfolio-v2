"use client";

import { useState } from "react";
import type { UploadedImage } from "./ImageField";

export function MultiImageField({
  label,
  value,
  onChange,
  folder = "portfolio",
}: {
  label: string;
  value?: UploadedImage[] | null;
  onChange: (imgs: UploadedImage[]) => void;
  folder?: string;
}) {
  const images: UploadedImage[] = Array.isArray(value) ? value : [];
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList) {
    setBusy(true);
    setError(null);
    try {
      const uploaded: UploadedImage[] = [];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("folder", folder);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const body = await res.json();
        if (!res.ok) throw new Error(body.error || "Upload failed");
        uploaded.push(body.data);
      }
      onChange([...images, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  function remove(idx: number) {
    onChange(images.filter((_, i) => i !== idx));
  }

  function move(idx: number, dir: -1 | 1) {
    const next = [...images];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  }

  return (
    <div className="mb-3">
      <div className="text-xs text-neutral-600 mb-1">{label}</div>
      {images.length > 0 && (
        <ul className="grid grid-cols-3 gap-2 mb-2">
          {images.map((img, i) => (
            <li
              key={img.publicId || i}
              className="relative border border-neutral-300 rounded-md overflow-hidden bg-neutral-50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt="" className="w-full h-24 object-cover block" />
              <div className="flex justify-between items-center px-1.5 py-1 text-[11px] bg-white border-t border-neutral-200">
                <span className="text-neutral-500">{i + 1}</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    className="px-1 disabled:opacity-30"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === images.length - 1}
                    className="px-1 disabled:opacity-30"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="px-1 text-red-600"
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <input
        type="file"
        accept="image/*"
        multiple
        disabled={busy}
        onChange={(e) => {
          const fs = e.target.files;
          if (fs && fs.length > 0) void handleFiles(fs);
          e.target.value = "";
        }}
        className="text-sm"
      />
      {busy && <span className="ml-2 text-xs text-neutral-600">Uploading…</span>}
      {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
    </div>
  );
}
