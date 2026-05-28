"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function AboutMeSection() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current || !nameRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      if (rect.top <= 0) {
        const progress = Math.min(Math.max(-rect.top / windowH, 0), 1);
        nameRef.current.style.opacity = Math.max(
          1 - progress * 1.5,
          0,
        ).toString();
        nameRef.current.style.transform = `translate3d(0, ${progress * 200}px, 0)`;
      } else {
        nameRef.current.style.opacity = "1";
        nameRef.current.style.transform = `translate3d(0, 0, 0)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] pb-30"
      id="about"
    >
      {/* Sticky background text */}
      <div className="sticky top-0 h-screen flex items-center justify-center z-[1] overflow-hidden pointer-events-none">
        <h2
          ref={nameRef}
          className="text-[clamp(3rem,12vw,12rem)] font-black leading-[0.85] tracking-[-0.04em] text-white text-center uppercase whitespace-nowrap will-change-[opacity,transform]"
        >
          ABOUT MERAJ
        </h2>
      </div>

      {/* Content that scrolls over the sticky name */}
      <div className="relative z-10 flex flex-col items-center   pt-5">
        <div className="relative w-[90%] max-w-[480px] aspect-[3/4] overflow-hidden rounded-4xl mb-10">
          <Image
            src="/meraj-profile.jpg"
            alt="Meraj Hossain"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
        <div className="max-w-[600px] text-center px-6">
          <p className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-[1.2] mb-6 text-white tracking-[-0.02em]">
            My creative spirit comes alive in the digital realm.
          </p>
          <p className="text-base leading-[1.8] text-white/60">
            With nimble fingers flying across the keyboard, I craft clear
            experiences out of nothing but ones and zeroes. Full-stack developer
            and digital designer with a passion for creating premium web
            experiences. I specialize in React, Next.js, and modern web
            technologies.
          </p>
          <a
            href="/resume.pdf"
            download="Meraj-Hossain-Resume.pdf"
            className="group inline-flex items-center gap-3 mt-10 px-6 py-3.5 rounded-full bg-white text-black text-[12px] tracking-[0.18em] uppercase font-semibold no-underline transition-all duration-300 hover:bg-[#4ade80] hover:text-black hover:shadow-[0_0_30px_rgba(74,222,128,0.35)]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
