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
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 12, color: "#555", marginBottom: 4 }}>{label}</div>
      {value?.url && (
        <div style={{ marginBottom: 8 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value.url} alt="" style={{ maxWidth: 200, maxHeight: 140, borderRadius: 6, border: "1px solid #ddd" }} />
          <div>
            <button type="button" onClick={() => onChange(null)} style={{ fontSize: 12, color: "#c00", background: "none", border: 0, cursor: "pointer", padding: 0, marginTop: 4 }}>
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
      />
      {busy && <span style={{ marginLeft: 8, fontSize: 12, color: "#555" }}>Uploading…</span>}
      {error && <div style={{ color: "#c00", fontSize: 12, marginTop: 4 }}>{error}</div>}
    </div>
  );
}
