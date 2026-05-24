"use client";

import { useState } from "react";

export type UploadedImage = {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
};

export function ImageField({
  label,
  value,
  onChange,
  folder = "portfolio",
}: {
  label: string;
  value?: UploadedImage | null;
  onChange: (img: UploadedImage | null) => void;
  folder?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setBusy(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Upload failed");
      onChange(body.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mb-3">
      <div className="text-xs text-neutral-600 mb-1">{label}</div>
      {value?.url && (
        <div className="mb-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value.url}
            alt=""
            className="max-w-50 max-h-35 rounded-md border border-neutral-300"
          />
          <div>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-xs text-red-600 bg-transparent border-0 cursor-pointer p-0 mt-1"
            >
              Remove
            </button>
          </div>
        </div>
      )}
      <input
        type="file"
        accept="image/*,application/pdf"
        disabled={busy}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
          e.target.value = "";
        }}
        className="text-sm"
      />
      {busy && <span className="ml-2 text-xs text-neutral-600">Uploading…</span>}
      {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
    </div>
  );
}
