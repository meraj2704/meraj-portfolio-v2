import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Project, type ProjectDoc } from "@/models/Project";
import Footer from "@/app/components/Footer";

export const dynamic = "force-dynamic";

type ProjectImage = { url: string; publicId: string; width?: number; height?: number };

async function getProject(slug: string) {
  await connectDB();
  const doc = await Project.findOne({ slug: slug.toLowerCase() }).lean<ProjectDoc | null>();
  return doc;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Meraj Hossain`,
    description: project.summary || project.description?.slice(0, 160) || undefined,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const meta: Array<{ label: string; value: string; href?: string }> = [];
  if (project.client) meta.push({ label: "Client", value: project.client });
  if (project.year) meta.push({ label: "Year", value: project.year });
  if (project.category) meta.push({ label: "Category", value: project.category });
  if (project.liveUrl) meta.push({ label: "Live Project", value: "Visit Site", href: project.liveUrl });
  if (project.sourceUrl) meta.push({ label: "Source", value: "View Code", href: project.sourceUrl });

  const gallery = (project.gallery ?? []) as ProjectImage[];
  const cover = project.cover as ProjectImage;

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white">
      <div className="px-5 md:px-10 pt-28 md:pt-36 pb-12 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-start">
          <div>
            <h1 className="text-[clamp(2.75rem,7vw,6rem)] font-black leading-[0.95] tracking-[-0.04em] uppercase">
              {project.title}
            </h1>
            {(project.summary || project.description) && (
              <p className="mt-6 md:mt-8 text-[15px] md:text-[16px] leading-[1.7] text-white/55 max-w-[520px]">
                {project.summary || project.description}
              </p>
            )}
          </div>

          <dl className="md:mt-4">
            {meta.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between py-5 md:py-6 ${
                  i === 0 ? "" : "border-t border-white/[0.08]"
                }`}
              >
                <dt className="text-[12px] md:text-[13px] tracking-[0.14em] uppercase text-white/40">
                  {row.label}
                </dt>
                <dd className="text-[12px] md:text-[13px] tracking-[0.14em] uppercase font-medium">
                  {row.href ? (
                    <a
                      href={row.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white no-underline border-b border-white/30 pb-0.5 hover:border-white transition-colors"
                    >
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
            {meta.length > 0 && <div className="border-t border-white/[0.08]" />}
          </dl>
        </div>
      </div>

      <div className="px-5 md:px-10 pb-16 md:pb-24">
        <div className="relative w-full aspect-[16/9] bg-[#111] overflow-hidden rounded-sm">
          <Image
            src={cover.url}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-cover"
          />
        </div>
      </div>

      {project.description && project.summary && (
        <section className="px-5 md:px-10 pb-20 md:pb-32">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 max-w-[1400px]">
            <h2 className="text-[11px] tracking-[0.16em] uppercase text-white/40">
              About the project
            </h2>
            <div className="text-[16px] md:text-[18px] leading-[1.7] text-white/75 whitespace-pre-line">
              {project.description}
            </div>
          </div>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="px-5 md:px-10 pb-20 md:pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
            {gallery.map((img, i) => (
              <div
                key={img.publicId || i}
                className={`relative bg-[#111] overflow-hidden rounded-sm ${
                  i % 3 === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={img.url}
                  alt={`${project.title} — ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {project.tech && project.tech.length > 0 && (
        <section className="px-5 md:px-10 pb-20 md:pb-32">
          <h3 className="text-[11px] tracking-[0.16em] uppercase text-white/40 mb-6">
            Tech stack
          </h3>
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li
                key={t}
                className="text-[12px] tracking-[0.08em] uppercase border border-white/15 rounded-full px-4 py-2 text-white/80"
              >
                {t}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="px-5 md:px-10 pb-16 md:pb-20 flex justify-between items-center border-t border-white/[0.06] pt-10">
        <Link
          href="/"
          className="text-[12px] tracking-[0.14em] uppercase text-white/60 no-underline hover:text-white transition-colors"
        >
          ← Back to work
        </Link>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[12px] tracking-[0.14em] uppercase text-white no-underline border-b border-white/40 pb-0.5 hover:border-white"
          >
            Visit live site →
          </a>
        )}
      </div>

      <Footer />
    </main>
  );
}
