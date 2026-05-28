import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white grid place-items-center px-5">
      <div className="text-center max-w-[480px]">
        <p className="text-[11px] tracking-[0.16em] uppercase text-white/40 mb-4">
          404
        </p>
        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[0.95] tracking-[-0.03em] uppercase">
          Project not found
        </h1>
        <p className="mt-5 text-[15px] leading-[1.7] text-white/55">
          The project you&apos;re looking for doesn&apos;t exist or has been
          unpublished.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/projects"
            className="text-[12px] tracking-[0.14em] uppercase text-white no-underline border-b border-white/40 pb-0.5 hover:border-white"
          >
            ← Browse projects
          </Link>
          <Link
            href="/"
            className="text-[12px] tracking-[0.14em] uppercase text-white/60 no-underline hover:text-white"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
