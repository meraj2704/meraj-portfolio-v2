import { z } from "zod";
import { sanitizeRichHtml } from "./sanitize";

const imageSchema = z.object({
  url: z.string().url(),
  publicId: z.string().min(1),
  width: z.number().optional(),
  height: z.number().optional(),
});

// Every admin image field is presented as optional (no form marks one required), and
// the image picker sends `null` when nothing is uploaded. Plain `.optional()` accepts
// only `undefined`, so a `null` here fails validation (422) and the whole record
// silently refuses to save. Accept a complete image, or null/undefined for "no image",
// so a missing logo/icon/cover never blocks a save.
const optionalImage = imageSchema.nullish();

// Every rich-text field passes through here on save. Two jobs:
//   1. Sanitize to the editor's allowed tags, so stored HTML is safe to render
//      with `dangerouslySetInnerHTML` even if it was posted outside the editor.
//   2. Collapse non-breaking spaces to normal ones. Pasted text (from Word, PDFs,
//      web pages, chat) often uses `&nbsp;` between every word; the browser never
//      wraps on those, so the paragraph renders as one long, overflowing line.
const richText = z
  .string()
  .transform((s) => sanitizeRichHtml(s).replace(/&nbsp;|\u00a0/g, " "))
  .default("");

export const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "lowercase, digits, dashes only"),
  summary: richText,
  description: richText,
  client: z.string().default(""),
  year: z.string().default(""),
  category: z.string().default(""),
  cover: optionalImage,
  gallery: z.array(imageSchema).default([]),
  tech: z.array(z.string()).default([]),
  liveUrl: z.string().url().or(z.literal("")).default(""),
  sourceUrl: z.string().url().or(z.literal("")).default(""),
  featured: z.boolean().default(false),
  order: z.number().default(0),
});

export const experienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  date: z.string().min(1),
  workMode: z.string().default(""),
  desc: richText,
  logo: optionalImage,
  order: z.number().default(0),
});

export const expertiseSchema = z.object({
  title: z.string().min(1),
  desc: richText,
  // <select> submits a string, so coerce; only standard (2) or wide (3) allowed.
  span: z
    .preprocess((v) => (v === "" || v == null ? 2 : v), z.coerce.number())
    .refine((n) => n === 2 || n === 3, "width must be 2 or 3")
    .default(2),
  order: z.number().default(0),
});

export const awardSchema = z.object({
  award: z.string().min(1),
  project: z.string().min(1),
  date: z.string().min(1),
  desc: richText,
  image: optionalImage,
  order: z.number().default(0),
});

export const stackSchema = z.object({
  title: z.string().min(1),
  role: z.string().min(1),
  percent: z.string().default(""),
  desc: richText,
  icon: optionalImage,
  order: z.number().default(0),
});

export const clientSchema = z.object({
  name: z.string().min(1),
  logo: optionalImage,
  rotate: z.number().default(0),
  y: z.number().default(0),
  order: z.number().default(0),
});

export const aboutSchema = z.object({
  name: z.string().default(""),
  headline: z.string().default(""),
  lead: z.string().default(""),
  description: richText,
  location: z.string().default(""),
  email: z.string().default(""),
  phone: z.string().default(""),
  avatar: optionalImage,
  resume: optionalImage,
  socials: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
});

export const contactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  message: z.string().min(1).max(5000),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
