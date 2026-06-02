"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function PhotoReveal() {
  const ref = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = ref.current;
    const img = imgRef.current;
    if (!section || !img) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = Math.min(
        Math.max((windowH - rect.top) / (windowH + rect.height), 0),
        1,
      );
      const yShift = (progress - 0.5) * 50;
      img.style.transform = `translate3d(0, ${yShift}%, 0)`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full h-screen min-h-[400px] overflow-hidden bg-black"
    >
      <div
        ref={imgRef}
        className="absolute -top-[15%] left-0 w-full h-[130%] will-change-transform"
      >
        <Image
          src="/photo-reveal.png"
          alt="Meraj Hossain"
          fill
          className="object-cover object-[center_top]"
          priority
        />
      </div>
      <div className="absolute top-0 left-0 right-0 h-[30%] bg-[linear-gradient(180deg,#000_0%,transparent_100%)] z-[2] pointer-events-none" />
    </section>
  );
}
