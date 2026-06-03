"use client";

import { useRef, useState } from "react";
import { CloudUpload, FileText, LoaderCircle, Replace, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type UploadedImage = {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
};

const MAX_BYTES = 10 * 1024 * 1024; // mirror the API limit
const isPdf = (url: string) => /\.pdf(\?|$)/i.test(url);

export function ImageField({
  label,
  value,
  onChange,
  folder = "portfolio",
  required,
  accept = "image/*,application/pdf",
}: {
  label: string;
  value?: UploadedImage | null;
  onChange: (img: UploadedImage | null) => void;
  folder?: string;
  required?: boolean;
  accept?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    if (file.size > MAX_BYTES) {
      setError("File too large (max 10MB)");
      return;
    }
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

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) void handleFile(file);
  }

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label className="flex items-center gap-1 text-sm font-semibold text-primary-text">
        {label}
        {required && <span className="font-bold text-red-500">*</span>}
      </label>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
          e.target.value = "";
        }}
      />

      {value?.url ? (
        <div
          className={cn(
            "group relative overflow-hidden rounded-xl border bg-gray-50 transition-colors",
            dragOver ? "border-primary" : "border-gray-200",
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
        >
          {isPdf(value.url) ? (
            <div className="flex items-center gap-3 p-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
                <FileText className="size-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-primary-text">
                  PDF document
                </p>
                <a
                  href={value.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  View file
                </a>
              </div>
            </div>
          ) : (
            <div className="flex h-48 items-center justify-center bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value.url}
                alt={label}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          )}

          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-3 py-2">
            <span className="text-xs text-secondary-text">
              {value.width && value.height
                ? `${value.width} × ${value.height}`
                : isPdf(value.url)
                  ? "PDF"
                  : "Image"}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={busy}
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-secondary-text transition-colors hover:bg-gray-100 hover:text-primary-text disabled:opacity-50"
              >
                <Replace className="size-3.5" />
                Replace
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => onChange(null)}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
              >
                <Trash2 className="size-3.5" />
                Remove
              </button>
            </div>
          </div>

          {busy && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
              <LoaderCircle className="size-6 animate-spin text-primary" />
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors",
            dragOver
              ? "border-primary bg-primary/5"
              : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100/60",
            busy && "pointer-events-none opacity-70",
          )}
        >
          <div className="flex size-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200">
            {busy ? (
              <LoaderCircle className="size-5 animate-spin text-primary" />
            ) : (
              <CloudUpload className="size-5 text-secondary-text" />
            )}
          </div>
          <div className="text-sm">
            <span className="font-semibold text-primary">Click to upload</span>
            <span className="text-secondary-text"> or drag and drop</span>
          </div>
          <p className="text-xs text-secondary-text/70">
            PNG, JPG, WEBP{accept.includes("pdf") ? " or PDF" : ""} · up to 10MB
          </p>
        </button>
      )}

      {error && (
        <p className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
