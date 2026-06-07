import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalize rich-text HTML for display via `dangerouslySetInnerHTML`. Pasted
 * content often uses a non-breaking space between every word, which stops the
 * browser from wrapping so the text renders as one long, overflowing line.
 * Swap them for normal spaces while preserving the markup. Runs on every render,
 * so content wraps correctly no matter what is stored in the database.
 */
export function normalizeRichHtml(html?: string | null): string {
  if (!html) return "";
  return html.replace(/&nbsp;|\u00a0/g, " ");
}

/**
 * First visible character of a name/title, uppercased — used as a fallback
 * "logo" when an item has no uploaded image. Returns "?" for empty/blank input.
 */
export function initial(text?: string | null): string {
  return text?.trim().charAt(0).toUpperCase() || "?";
}

/**
 * Strip HTML tags from rich-text content and collapse whitespace, for places
 * that need plain text (SEO `<meta>` descriptions, truncated card blurbs).
 */
export function stripHtml(html?: string | null): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}
