"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
    <div className="scroll-circle-wrap">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle
          cx="14"
          cy="14"
          r="12"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.5"
        />
        <circle
          cx="14"
          cy="14"
          r="12"
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="75.4"
          strokeDashoffset="75.4"
          className="scroll-circle-progress"
        />
      </svg>
    </div>
  );
}

export default function HeroSection() {
  const clock = useLiveClock();

  return (
    <section className="hero-section">
      {/* Top bar */}
      <div className="hero-topbar">
        <span className="hero-local">
          LOCAL / <span className="hero-clock">{clock || "00:00:00"}</span>
        </span>

        <Link href="#contact" className="hero-center-icon" aria-label="Contact">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 7l-10 7L2 7" />
          </svg>
        </Link>

        <div className="hero-nav-links">
          <Link href="/resume.pdf" target="_blank" className="hero-nav-link">
            RESUME
          </Link>
          <Link href="https://github.com/meraj" target="_blank" className="hero-nav-link">
            GITHUB
          </Link>
        </div>
      </div>

      {/* Center content */}
      <div className="hero-center">
        <div className="hero-availability">
          <span className="hero-green-dot" />
          AVAILABLE FOR FREELANCE
        </div>

        <h1 className="hero-name">
          MERAJ
          <br />
          HOSSAIN
        </h1>

        <div className="hero-scroll-indicator">
          <ScrollCircle />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="hero-bottombar">
        <span className="hero-location">BASED IN DHAKA, BD</span>
        <span className="hero-role">
          FULL-STACK DEVELOPER <span className="hero-role-plus">+</span> DIGITAL DESIGNER
        </span>
      </div>
    </section>
  );
}
