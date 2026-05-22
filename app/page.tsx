"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AboutMeSection from "./components/AboutMeSection";
import ClientsArch from "./components/ClientsArch";
import ExpertiseSection from "./components/ExpertiseSection";
import ExperienceSection from "./components/ExperienceSection";
import StackSection from "./components/StackSection";
import AwardsSection from "./components/AwardsSection";
import CtaSection from "./components/CtaSection";

/* ─── Live clock ─── */
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

/* ─── Scroll circle ─── */
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

/* ─── Photo reveal with smooth scroll parallax ─── */
function PhotoReveal() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const img = section.querySelector<HTMLElement>(".photo-reveal-img-wrap");
    if (!img) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      if (rect.top < windowH && rect.bottom > 0) {
        // 0 = just entering viewport, 1 = fully past
        const progress = Math.min(
          Math.max((windowH - rect.top) / (windowH + rect.height), 0),
          1
        );
        // Translate image vertically relative to its container for true parallax
        const yShift = (progress - 0.5) * 20; // -10% to +10%
        img.style.transform = `translate3d(0, ${yShift}%, 0)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className="photo-reveal-section">
      <div className="photo-reveal-inner">
        <div className="photo-reveal-img-wrap">
          <Image
            src="/meraj-profile.jpg"
            alt="Meraj Hossain"
            fill
            className="photo-reveal-img"
            priority
          />
        </div>
        <div className="photo-reveal-gradient" />
      </div>
    </section>
  );
}

export default function Home() {
  const clock = useLiveClock();

  return (
    <>
      {/* ── HERO ── */}
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

      {/* ── PHOTO REVEAL — smooth scroll parallax ── */}
      <PhotoReveal />

      {/* ── FEATURED WORK ── */}
      <section className="featured-section">
        <div className="featured-header">
          <h2 className="featured-title">
            FEATURED
            <br />
            WORK
          </h2>
          <p className="featured-desc">
            My creative spirit comes alive in the digital realm. With nimble
            fingers flying across the keyboard, I craft clear experiences out
            of nothing but ones and zeroes.
          </p>
        </div>

        <div className="featured-grid">
          {[
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
          ].map((project) => (
            <div key={project.name} className="featured-card">
              <div className="featured-card-img">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="featured-card-image"
                />
              </div>
              <div className="featured-card-info">
                <div className="featured-card-meta">
                  <h3 className="featured-card-name">{project.name}</h3>
                  <p className="featured-card-cat">{project.category}</p>
                </div>
                <span className="featured-card-year">{project.year}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ME ── */}
      <AboutMeSection />

      {/* ── CLIENTS ARCH ── */}
      <ClientsArch />

      {/* ── MY EXPERTISE ── */}
      <ExpertiseSection />

      {/* ── EXPERIENCE ── */}
      <ExperienceSection />

      {/* ── FAVOURITE STACK ── */}
      <StackSection />

      {/* ── AWARDS ── */}
      <AwardsSection />

      {/* ── CTA ── */}
      <CtaSection />

      {/* ── FAT FOOTER ── */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-col">
            <h4 className="footer-heading">CONTACT</h4>
            <a href="mailto:hello@meraj.dev" className="footer-link">hello@meraj.dev</a>
            <a href="tel:+8801700000000" className="footer-link">+880 1700 000 000</a>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">SOCIALS</h4>
            <a href="https://github.com/meraj" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
            <a href="https://linkedin.com/in/meraj" target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
            <a href="https://twitter.com/meraj" target="_blank" rel="noreferrer" className="footer-link">Twitter</a>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">RESOURCES</h4>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="footer-link">Download Resume</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">
            &copy; {new Date().getFullYear()} MERAJ HOSSAIN. ALL RIGHTS RESERVED.
          </span>
          <span className="footer-local">BASED IN DHAKA, BD</span>
        </div>
      </footer>
    </>
  );
}
