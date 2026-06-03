"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill-new/dist/quill.snow.css";

// Quill touches `document` on import, so it must only load on the client.
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[180px] rounded-xl border border-gray-200 bg-gray-50" />
  ),
});

const TOOLBAR = [
  [{ header: [2, 3, 4, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["blockquote", "code-block"],
  ["link"],
  ["clean"],
];

// Quill emits `<p><br></p>` for an empty editor — treat that as truly empty so
// `required` checks and `summary || description` fallbacks behave correctly.
function isEmptyHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/ |&nbsp;/g, "").trim() === "";
}

export function RichTextField({
  label,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (html: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  const modules = useMemo(() => ({ toolbar: TOOLBAR }), []);

  return (
    <div className="rich-text-field flex w-full flex-col gap-1.5">
      <label className="flex items-center gap-1 text-sm font-semibold text-primary-text">
        {label}
        {required && <span className="font-bold text-red-500">*</span>}
      </label>
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={(html: string) => onChange(isEmptyHtml(html) ? "" : html)}
        modules={modules}
        placeholder={placeholder}
      />
    </div>
  );
}
