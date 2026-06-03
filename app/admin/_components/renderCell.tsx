import type React from "react";

export function renderCell(v: unknown): React.ReactNode {
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
