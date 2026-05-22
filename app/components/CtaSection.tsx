"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const onScroll = () => {
      // 1. Title fade and downward parallax
      if (sectionRef.current && titleRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowH = window.innerHeight;

        if (rect.top <= 0) {
          const progress = Math.min(Math.max(-rect.top / windowH, 0), 1);
          titleRef.current.style.opacity = Math.max(1 - progress * 1.5, 0).toString();
          titleRef.current.style.transform = `translate3d(0, ${progress * 200}px, 0)`;
        } else {
          titleRef.current.style.opacity = "1";
          titleRef.current.style.transform = `translate3d(0, 0, 0)`;
        }
      }

      // 2. Image container internal parallax
      if (imgWrapRef.current && imgRef.current) {
        const rect = imgWrapRef.current.getBoundingClientRect();
        const windowH = window.innerHeight;

        if (rect.top < windowH && rect.bottom > 0) {
          const progress = Math.min(
            Math.max((windowH - rect.top) / (windowH + rect.height), 0),
            1
          );
          const yShift = (progress - 0.5) * 20; // -10% to +10%
          imgRef.current.style.transform = `translate3d(0, ${yShift}%, 0)`;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="cta-section" id="contact" ref={sectionRef}>
      <div className="cta-sticky">
        <h2 className="cta-title" ref={titleRef}>
          LET&apos;S WORK<br />
          TOGETHER
        </h2>
      </div>

      <div className="cta-content">
        <div className="cta-image-wrapper" ref={imgWrapRef}>
          <Image
            src="/meraj-profile.jpg"
            alt="Meraj Hossain"
            fill
            className="cta-image"
            sizes="(max-width: 768px) 100vw, 400px"
            ref={imgRef}
          />
        </div>

        <p className="cta-footer-text">
          BASED IN DHAKA, I AM A FULL-STACK DEVELOPER AND DIGITAL DESIGNER. MY
          PASSION FOR MINIMALIST AESTHETICS, ELEGANT TYPOGRAPHY, AND INTUITIVE
          DESIGN IS EVIDENT IN MY WORK.
        </p>

        <div className="cta-direct-contact">
          <a href="mailto:hello@meraj.dev" className="cta-direct-link">HELLO@MERAJ.DEV</a>
          <span className="cta-direct-divider">•</span>
          <a href="tel:+8801700000000" className="cta-direct-link">+880 1700 000 000</a>
        </div>

        {/* Contact Form */}
        <div className="contact-form-container">
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <input
                type="text"
                placeholder="YOUR NAME"
                className="form-input"
                required
              />
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="form-input"
                required
              />
            </div>
            <textarea
              placeholder="TELL ME ABOUT YOUR PROJECT..."
              className="form-textarea"
              rows={4}
              required
            />
            <button type="submit" className="cta-btn form-submit">
              SEND INQUIRY
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
