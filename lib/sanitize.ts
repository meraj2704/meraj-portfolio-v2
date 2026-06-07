import "server-only";
import sanitizeHtml from "sanitize-html";

// Allowlist mirrors the RichTextField toolbar (see components/inputs/RichTextField.tsx):
// headers, inline marks, lists, blockquote, code-block, and links. Anything the
// editor cannot produce — <script>, inline event handlers, <style>, <iframe>,
// javascript: URLs — is dropped here, on save. Because every write funnels through
// this (via the `richText` schema in lib/validation.ts), stored rich text is safe
// to render with `dangerouslySetInnerHTML` on both server and client.
const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "h2", "h3", "h4", "p", "br", "span",
    "strong", "b", "em", "i", "u", "s", "strike",
    "ol", "ul", "li", "blockquote", "pre", "code", "a",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
  },
  // Quill tags code blocks (`ql-syntax`) and nested list indentation (`ql-indent-*`)
  // with ql-* classes; keep those, discard any other class.
  allowedClasses: {
    "*": ["ql-*"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  // Harden every link against reverse-tabnabbing, regardless of target.
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
  },
};

/** Strip rich-text HTML down to the editor's allowed formatting. Server-only. */
export function sanitizeRichHtml(html: string): string {
  return sanitizeHtml(html, OPTIONS);
}
