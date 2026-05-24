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
          const yShift = (progress - 0.5) * 20;
          imgRef.current.style.transform = `translate3d(0, ${yShift}%, 0)`;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="relative w-full bg-[#0a0a0a] pb-20 md:pb-30"
      id="contact"
      ref={sectionRef}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center z-[1] overflow-hidden pointer-events-none">
        <h2
          ref={titleRef}
          className="text-[clamp(4rem,12vw,9rem)] font-black leading-[0.85] tracking-[-0.05em] text-white text-center uppercase will-change-[opacity,transform]"
        >
          LET&apos;S WORK<br />TOGETHER
        </h2>
      </div>

      <div className="relative z-10 flex flex-col items-center bg-[#0a0a0a] shadow-[0_-40px_60px_40px_#0a0a0a] px-5 pt-5 pb-30">
        <div
          ref={imgWrapRef}
          className="relative w-full max-w-[340px] aspect-[4/5] rounded-b-[999px] overflow-hidden mb-15"
        >
          <Image
            src="/meraj-profile.jpg"
            alt="Meraj Hossain"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            ref={imgRef}
            className="object-cover object-[center_top] !h-[130%] !-top-[15%] will-change-transform"
          />
        </div>

        <p className="text-[11px] font-extrabold tracking-[0.05em] leading-[1.6] text-white max-w-[500px] uppercase">
          BASED IN DHAKA, I AM A FULL-STACK DEVELOPER AND DIGITAL DESIGNER. MY
          PASSION FOR MINIMALIST AESTHETICS, ELEGANT TYPOGRAPHY, AND INTUITIVE
          DESIGN IS EVIDENT IN MY WORK.
        </p>

        <div className="mt-6 flex items-center gap-4 flex-wrap justify-center">
          <a
            href="mailto:hello@meraj.dev"
            className="text-sm font-bold text-white no-underline tracking-[0.05em] transition-opacity duration-300 hover:opacity-60"
          >
            HELLO@MERAJ.DEV
          </a>
          <span className="text-white/30 text-lg">•</span>
          <a
            href="tel:+8801700000000"
            className="text-sm font-bold text-white no-underline tracking-[0.05em] transition-opacity duration-300 hover:opacity-60"
          >
            +880 1700 000 000
          </a>
        </div>

        {/* Contact Form */}
        <div className="w-full max-w-[600px] mt-20 text-left">
          <form
            className="flex flex-col gap-10"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col md:flex-row gap-10">
              <input
                type="text"
                placeholder="YOUR NAME"
                required
                className="w-full bg-transparent border-0 border-b border-white/20 text-white text-[13px] font-semibold tracking-[0.05em] py-4 outline-none rounded-none placeholder:text-white/30 placeholder:uppercase focus:border-b-white transition-colors duration-300"
              />
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                required
                className="w-full bg-transparent border-0 border-b border-white/20 text-white text-[13px] font-semibold tracking-[0.05em] py-4 outline-none rounded-none placeholder:text-white/30 placeholder:uppercase focus:border-b-white transition-colors duration-300"
              />
            </div>
            <textarea
              placeholder="TELL ME ABOUT YOUR PROJECT..."
              rows={4}
              required
              className="w-full bg-transparent border-0 border-b border-white/20 text-white text-[13px] font-semibold tracking-[0.05em] py-4 outline-none rounded-none placeholder:text-white/30 placeholder:uppercase focus:border-b-white transition-colors duration-300 resize-y min-h-[100px]"
            />
            <button
              type="submit"
              className="self-center mt-5 inline-flex items-center justify-center bg-white text-black text-[13px] font-extrabold tracking-[0.05em] px-8 py-4 rounded-[40px] uppercase cursor-pointer border-0 transition-[transform,background] duration-300 hover:scale-105 hover:bg-[#f0f0f0]"
            >
              SEND INQUIRY
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
