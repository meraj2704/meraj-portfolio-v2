"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ mouseX: 0, mouseY: 0, destX: 0, destY: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      positionRef.current.mouseX = clientX;
      positionRef.current.mouseY = clientY;

      setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
    };

    document.addEventListener("mousemove", onMouseMove);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    const handleMouseLeave = () => setIsVisible(false);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", () => setIsVisible(true));

    let animationFrameId: number;
    const followMouse = () => {
      animationFrameId = requestAnimationFrame(followMouse);

      const { mouseX, mouseY, destX, destY } = positionRef.current;

      // Lerp for smooth trailing effect
      positionRef.current.destX += (mouseX - destX) * 0.15;
      positionRef.current.destY += (mouseY - destY) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${positionRef.current.destX}px, ${positionRef.current.destY}px, 0)`;
      }
    };
    followMouse();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }

  return (
    <>
      {/* Small dot (instant tracking) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -ml-1 -mt-1 transition-opacity duration-200 ${
          isVisible && !isHovering ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />

      {/* Large trailing ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full mix-blend-difference transition-all duration-300 ease-out flex items-center justify-center ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isHovering
            ? "w-16 h-16 bg-white -ml-8 -mt-8 border-none scale-100"
            : "w-10 h-10 bg-transparent border border-white -ml-5 -mt-5 scale-100"
        }`}
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      />
    </>
  );
}
