"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { SiteProfile } from "@/lib/about";

function useLiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function ScrollCircle() {
  return (
    <div className="animate-[float-circle_3s_ease-in-out_infinite]">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="12" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
        <circle
          cx="14"
          cy="14"
          r="12"
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="75.4"
          strokeDashoffset="75.4"
          className="origin-center -rotate-90 animate-[draw-circle_3s_ease-in-out_infinite]"
        />
      </svg>
    </div>
  );
}

export default function HeroSection({ profile }: { profile: SiteProfile }) {
  const clock = useLiveClock();

  const name = profile.name || "Meraj Hossain";
  const [firstName, ...restName] = name.trim().split(/\s+/);
  const headline = profile.headline || "FULL-STACK DEVELOPER + DIGITAL DESIGNER";
  const location = profile.location || "Dhaka, BD";
  const resumeUrl = profile.resumeUrl || "/resume.pdf";
  const github = profile.socials.find(
    (s) => /github/i.test(s.label) || /github\.com/i.test(s.url)
  );
  const githubUrl = github?.url || "https://github.com/meraj";

  return (
    <section className="relative w-full h-screen min-h-[600px] bg-black flex flex-col justify-between overflow-hidden">
      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 py-4 md:px-8 md:py-6">
        <span className="text-[11px] tracking-[0.12em] uppercase text-white/70">
          LOCAL /{" "}
          <span className="text-white tabular-nums font-medium">
            {clock || "00:00:00"}
          </span>
        </span>

        <Link
          href="#contact"
          className="text-white/60 hover:text-white transition-colors"
          aria-label="Contact"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 7l-10 7L2 7" />
          </svg>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href={resumeUrl}
            target="_blank"
            className="inline-flex items-center justify-center text-[11px] tracking-[0.14em] uppercase text-white font-medium border border-solid border-white/40 rounded-full px-5.5 py-2.5 leading-none no-underline transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
          >
            RESUME
          </Link>
          <Link
            href={githubUrl}
            target="_blank"
            className="inline-flex items-center justify-center text-[11px] tracking-[0.14em] uppercase text-white font-medium border border-solid border-white/40 rounded-full px-5.5 py-2.5 leading-none no-underline transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
          >
            GITHUB
          </Link>
        </div>
      </div>

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 px-6">
        <div className="flex items-center gap-2.5 text-[11px] tracking-[0.25em] uppercase text-white/85 font-medium mb-7">
          <span className="w-2 h-2 rounded-full bg-[#4ade80] shadow-[0_0_12px_rgba(74,222,128,0.6)] animate-[pulse-dot_2s_ease-in-out_infinite]" />
          AVAILABLE FOR FREELANCE
        </div>

        <h1 className="text-[clamp(2.5rem,14vw,5rem)] md:text-[clamp(3rem,10vw,9rem)] font-extrabold leading-[0.92] tracking-[-0.03em] text-center uppercase text-white">
          {firstName}
          {restName.length > 0 && (
            <>
              <br />
              {restName.join(" ")}
            </>
          )}
        </h1>

        <div className="mt-12">
          <ScrollCircle />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0 px-5 py-4 md:px-8 md:py-6">
        <span className="text-[11px] tracking-[0.16em] uppercase text-white/70">
          BASED IN {location}
        </span>
        <span className="text-[11px] tracking-[0.14em] uppercase text-white/70 font-medium">
          {headline}
        </span>
      </div>
    </section>
  );
}
