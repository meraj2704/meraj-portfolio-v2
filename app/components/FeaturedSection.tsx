import { connectDB } from "@/lib/db";
import { Project, type ProjectDoc } from "@/models/Project";
import FeaturedSectionView, { type FeaturedProject } from "./FeaturedSectionView";

export default async function FeaturedSection() {
  await connectDB();
  const docs = await Project.find({ featured: true })
    .sort({ order: 1, createdAt: -1 })
    .limit(6)
    .lean<ProjectDoc[]>();

  const projects: FeaturedProject[] = docs.map((p) => ({
    name: p.title,
    slug: p.slug,
    category: p.category || "",
    year: p.year || "",
    image: (p.cover as { url: string }).url,
  }));

  if (projects.length === 0) return null;

  return <FeaturedSectionView projects={projects} />;
}
