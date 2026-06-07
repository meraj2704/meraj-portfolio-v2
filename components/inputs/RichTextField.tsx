"use client";

import dynamic from "next/dynamic";
import { useId, useMemo, useRef } from "react";
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

// Restrict the editor to the formats the toolbar exposes, so pasted content is
// stripped to the same set the server allowlist keeps (see lib/sanitize.ts).
// Otherwise a paste can introduce colors/fonts/images that look fine while
// editing but vanish on save.
const FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "blockquote",
  "code-block",
  "link",
];

// Quill emits `<p><br></p>` for an empty editor — treat that as truly empty so
// `required` checks and `summary || description` fallbacks behave correctly.
// Embeds carry no text but are real content, so never count them as empty.
function isEmptyHtml(html: string) {
  if (/<(img|video|iframe|hr|figure)\b/i.test(html)) return false;
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;|\s/g, "") === "";
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
  const labelId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  // Quill's editable region is a contenteditable div, not a labelable control,
  // so `htmlFor` can't reach it. Focus it on label click for parity instead.
  const focusEditor = () =>
    containerRef.current?.querySelector<HTMLElement>(".ql-editor")?.focus();

  return (
    <div
      ref={containerRef}
      role="group"
      aria-labelledby={labelId}
      className="rich-text-field flex w-full flex-col gap-1.5"
    >
      <label
        id={labelId}
        onClick={focusEditor}
        className="flex items-center gap-1 text-sm font-semibold text-primary-text"
      >
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="font-bold text-red-500">
              *
            </span>
            <span className="sr-only">(required)</span>
          </>
        )}
      </label>
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={(html: string) => onChange(isEmptyHtml(html) ? "" : html)}
        modules={modules}
        formats={FORMATS}
        placeholder={placeholder}
      />
    </div>
  );
}
