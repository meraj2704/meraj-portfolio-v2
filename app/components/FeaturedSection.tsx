"use client";

import Image from "next/image";

const featuredProjects = [
  {
    name: "Synergy Analytics",
    category: "Web Development",
    year: "2025",
    image: "/project-dashboard.png",
  },
  {
    name: "Aurum Commerce",
    category: "E-Commerce",
    year: "2024",
    image: "/project-ecommerce.png",
  },
];

export default function FeaturedSection() {
  return (
    <section className="pt-15 md:pt-25 bg-[#0a0a0a]">
      <div className="w-full mx-auto px-5 md:px-8 pb-10 md:pb-15 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-10">
        <h2 className="text-[clamp(3rem,8vw,6.5rem)] font-black leading-[0.9] tracking-[-0.04em] text-white shrink-0">
          FEATURED
          <br />
          WORK
        </h2>
        <p className="text-[15px] leading-[1.7] text-white/50 max-w-[420px] text-left md:text-right">
          My creative spirit comes alive in the digital realm. With nimble
          fingers flying across the keyboard, I craft clear experiences out
          of nothing but ones and zeroes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
        {featuredProjects.map((project) => (
          <div
            key={project.name}
            className="relative bg-[#111] overflow-hidden cursor-pointer group"
          >
            <div className="relative w-full aspect-[16/10] overflow-hidden">
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between px-5 py-4 bg-[#0a0a0a]">
              <div>
                <h3 className="text-[13px] font-semibold tracking-[0.08em] uppercase text-white">
                  {project.name}
                </h3>
                <p className="text-xs text-white/40 mt-0.5">{project.category}</p>
              </div>
              <span className="text-[11px] tracking-[0.06em] text-white/50 border border-white/15 rounded px-3.5 py-1">
                {project.year}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
