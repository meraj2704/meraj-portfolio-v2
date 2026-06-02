"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hideComplete, setHideComplete] = useState(false);

  useEffect(() => {
    // 1. Trigger the reveal animation after a short cinematic delay
    const revealTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    // 2. Completely remove the component from the DOM after animation finishes
    const cleanupTimer = setTimeout(() => {
      setHideComplete(true);
    }, 3000); // 1.5s delay + 1.5s animation duration

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(cleanupTimer);
    };
  }, []);

  if (hideComplete) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col ${
        isLoaded ? "pointer-events-none" : ""
      }`}
    >
      {/* Top Curtain */}
      <div
        className={`flex-1 bg-[#050505] transition-transform duration-[1.2s] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isLoaded ? "-translate-y-full" : "translate-y-0"
        }`}
      />
      {/* Bottom Curtain */}
      <div
        className={`flex-1 bg-[#050505] transition-transform duration-[1.2s] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isLoaded ? "translate-y-full" : "translate-y-0"
        }`}
      />

      {/* Centered Loading Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className={`text-white text-xs md:text-sm tracking-[0.4em] font-semibold uppercase transition-all duration-[0.8s] ease-in-out ${
            isLoaded
              ? "opacity-0 scale-90 tracking-[1em]"
              : "opacity-100 scale-100"
          }`}
        >
          MERAJ HOSSAIN
        </span>
      </div>
    </div>
  );
}
