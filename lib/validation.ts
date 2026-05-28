import { z } from "zod";

const imageSchema = z.object({
  url: z.string().url(),
  publicId: z.string().min(1),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "lowercase, digits, dashes only"),
  summary: z.string().default(""),
  description: z.string().default(""),
  client: z.string().default(""),
  year: z.string().default(""),
  category: z.string().default(""),
  cover: imageSchema,
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
  desc: z.string().default(""),
  logo: imageSchema.partial().optional(),
  order: z.number().default(0),
});

export const awardSchema = z.object({
  award: z.string().min(1),
  project: z.string().min(1),
  date: z.string().min(1),
  desc: z.string().default(""),
  image: imageSchema.partial().optional(),
  order: z.number().default(0),
});

export const stackSchema = z.object({
  title: z.string().min(1),
  role: z.string().min(1),
  percent: z.string().default(""),
  desc: z.string().default(""),
  icon: imageSchema,
  order: z.number().default(0),
});

export const clientSchema = z.object({
  name: z.string().min(1),
  logo: imageSchema,
  rotate: z.number().default(0),
  y: z.number().default(0),
  order: z.number().default(0),
});

export const aboutSchema = z.object({
  name: z.string().default(""),
  headline: z.string().default(""),
  lead: z.string().default(""),
  description: z.string().default(""),
  location: z.string().default(""),
  email: z.string().default(""),
  phone: z.string().default(""),
  avatar: imageSchema.partial().optional(),
  resume: imageSchema.partial().optional(),
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
