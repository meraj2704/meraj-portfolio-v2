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
        // Calculate how far we've scrolled past the top of the section
        const progress = Math.min(Math.max(-rect.top / windowH, 0), 1);
        nameRef.current.style.opacity = Math.max(1 - progress * 1.5, 0).toString();
        // Parallax push the title down while the image scrolls up over it
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
    <section ref={sectionRef} className="about-me-section" id="about">
      {/* Sticky background text */}
      <div className="about-me-sticky">
        <h2 ref={nameRef} className="about-me-name">ABOUT MERAJ</h2>
      </div>


      {/* Content that scrolls over the sticky name */}
      <div className="about-me-content">
        <div className="about-me-img-wrap">
          <Image
            src="/meraj-profile.jpg"
            alt="Meraj Hossain"
            fill
            className="about-me-img"
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
        <div className="about-me-text-wrap">
          <p className="about-me-lead">
            My creative spirit comes alive in the digital realm.
          </p>
          <p className="about-me-desc">
            With nimble fingers flying across the keyboard, I craft clear experiences out of nothing but ones and zeroes. Full-stack developer and digital designer with a passion for creating premium web experiences. I specialize in React, Next.js, and modern web technologies.
          </p>
        </div>
      </div>
    </section>
  );
}
