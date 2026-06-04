import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/db";
import { Project, type ProjectDoc } from "@/models/Project";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://merajhossain.online";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    await connectDB();
    const projects = await Project.find()
      .select("slug updatedAt")
      .lean<Pick<ProjectDoc, "slug" | "updatedAt">[]>();
    projectRoutes = projects.map((p) => ({
      url: `${siteUrl}/projects/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch {
    // If the DB is unreachable at build/request time, still return static routes.
  }

  return [...staticRoutes, ...projectRoutes];
}
