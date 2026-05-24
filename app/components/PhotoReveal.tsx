"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function PhotoReveal() {
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
      <div className=" ">
        <div className="photo-reveal-img-wrap">
          <Image
            src="/photo-reveal.png"
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
