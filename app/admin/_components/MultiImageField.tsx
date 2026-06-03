"use client";

import { useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CloudUpload,
  LoaderCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { UploadedImage } from "./ImageField";

const MAX_BYTES = 10 * 1024 * 1024;

export function MultiImageField({
  label,
  value,
  onChange,
  folder = "portfolio",
  required,
}: {
  label: string;
  value?: UploadedImage[] | null;
  onChange: (imgs: UploadedImage[]) => void;
  folder?: string;
  required?: boolean;
}) {
  const images: UploadedImage[] = Array.isArray(value) ? value : [];
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList) {
    const list = Array.from(files);
    if (list.some((f) => f.size > MAX_BYTES)) {
      setError("Each file must be under 10MB");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const uploaded: UploadedImage[] = [];
      for (const file of list) {
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

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) void handleFiles(e.dataTransfer.files);
  }

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label className="flex items-center gap-1 text-sm font-semibold text-primary-text">
        {label}
        {required && <span className="font-bold text-red-500">*</span>}
        {images.length > 0 && (
          <span className="ml-1 text-xs font-normal text-secondary-text">
            ({images.length})
          </span>
        )}
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) void handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

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
          "flex w-full items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-5 text-center transition-colors",
          dragOver
            ? "border-primary bg-primary/5"
            : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100/60",
          busy && "pointer-events-none opacity-70",
        )}
      >
        <div className="flex size-9 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200">
          {busy ? (
            <LoaderCircle className="size-4 animate-spin text-primary" />
          ) : (
            <CloudUpload className="size-4 text-secondary-text" />
          )}
        </div>
        <div className="text-left">
          <p className="text-sm">
            <span className="font-semibold text-primary">Click to upload</span>
            <span className="text-secondary-text"> or drag &amp; drop images</span>
          </p>
          <p className="text-xs text-secondary-text/70">
            Add multiple · PNG, JPG, WEBP · up to 10MB each
          </p>
        </div>
      </button>

      {images.length > 0 && (
        <ul className="mt-1 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {images.map((img, i) => (
            <li
              key={img.publicId || i}
              className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={`${label} ${i + 1}`}
                className="h-full w-full object-cover"
              />

              <span className="absolute left-1.5 top-1.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                {i + 1}
              </span>

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-linear-to-t from-black/70 to-transparent p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex gap-1">
                  <IconButton
                    label="Move left"
                    disabled={i === 0}
                    onClick={() => move(i, -1)}
                  >
                    <ChevronLeft className="size-3.5" />
                  </IconButton>
                  <IconButton
                    label="Move right"
                    disabled={i === images.length - 1}
                    onClick={() => move(i, 1)}
                  >
                    <ChevronRight className="size-3.5" />
                  </IconButton>
                </div>
                <IconButton label="Remove" danger onClick={() => remove(i)}>
                  <X className="size-3.5" />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}

function IconButton({
  children,
  label,
  onClick,
  disabled,
  danger,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex size-6 items-center justify-center rounded-md bg-white/90 text-gray-700 shadow-sm transition-colors hover:bg-white disabled:opacity-40",
        danger && "text-red-500 hover:text-red-600",
      )}
    >
      {children}
    </button>
  );
}
