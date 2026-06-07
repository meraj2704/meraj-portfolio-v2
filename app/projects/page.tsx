import Image from "next/image";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Project, type ProjectDoc } from "@/models/Project";
import Footer from "@/components/Footer";
import { getSiteProfile } from "@/lib/about";
import { stripHtml } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Projects — Meraj Hossain",
  description: "Selected work and case studies.",
};

type ProjectImage = { url: string; publicId: string; width?: number; height?: number };

async function getProjects() {
  await connectDB();
  return Project.find().sort({ order: 1, createdAt: -1 }).lean<ProjectDoc[]>();
}

export default async function ProjectsIndex() {
  const [projects, profile] = await Promise.all([getProjects(), getSiteProfile()]);

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white">
      <header className="px-5 md:px-10 pt-14 md:pt-20 pb-10 md:pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 md:mb-12 text-[12px] tracking-[0.14em] uppercase text-white/60 no-underline hover:text-white transition-colors"
        >
          ← Back to home
        </Link>
        <p className="text-[11px] tracking-[0.16em] uppercase text-white/40 mb-4">
          Selected work
        </p>
        <h1 className="text-[clamp(3rem,9vw,8rem)] font-black leading-[0.9] tracking-[-0.04em] uppercase">
          Projects
        </h1>
        <p className="mt-6 max-w-[560px] text-[15px] leading-[1.7] text-white/55">
          A collection of case studies — from branded experiences and
          interactive sites to internal tools. Click into any project for
          context, process, and outcomes.
        </p>
      </header>

      {projects.length === 0 ? (
        <div className="px-5 md:px-10 pb-32 text-white/40 text-sm">
          No projects published yet.
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
          {projects.map((p) => {
            const cover = p.cover as ProjectImage | null;
            return (
              <Link
                key={String(p._id)}
                href={`/projects/${p.slug}`}
                className="relative bg-[#111] overflow-hidden cursor-pointer group no-underline text-inherit block"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#111]">
                  {cover?.url && (
                    <Image
                      src={cover.url}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex items-center justify-between px-5 py-4 bg-[#0a0a0a]">
                  <div className="min-w-0">
                    <h3 className="text-[13px] font-semibold tracking-[0.08em] uppercase text-white truncate">
                      {p.title}
                    </h3>
                    <p className="text-xs text-white/40 mt-0.5 truncate">
                      {p.category || stripHtml(p.summary).slice(0, 80) || ""}
                    </p>
                  </div>
                  {p.year && (
                    <span className="text-[11px] tracking-[0.06em] text-white/50 border border-white/15 rounded px-3.5 py-1 shrink-0 ml-3">
                      {p.year}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </section>
      )}

      <Footer profile={profile} />
    </main>
  );
}
