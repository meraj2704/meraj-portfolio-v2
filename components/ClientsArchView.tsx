"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

export type ClientItem = {
  name: string;
  logoUrl: string;
  rotate: number;
  y: number;
};

const SPRING_STIFFNESS = 0.11;
const SPRING_DAMPING = 0.78;
const REST_EPSILON = 0.02;

function Card({ client }: { client: ClientItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const baseTransform = `rotate(${client.rotate}deg) translateY(${client.y}px)`;

  const state = useRef({
    targetRot: 0,
    targetX: 0,
    targetY: 0,
    rot: 0,
    x: 0,
    y: 0,
    vRot: 0,
    vX: 0,
    vY: 0,
    raf: 0,
  });

  const tick = () => {
    const el = ref.current;
    const s = state.current;
    if (!el) {
      s.raf = 0;
      return;
    }

    const dRot = s.targetRot - s.rot;
    const dX = s.targetX - s.x;
    const dY = s.targetY - s.y;
    s.vRot = s.vRot * SPRING_DAMPING + dRot * SPRING_STIFFNESS;
    s.vX = s.vX * SPRING_DAMPING + dX * SPRING_STIFFNESS;
    s.vY = s.vY * SPRING_DAMPING + dY * SPRING_STIFFNESS;
    s.rot += s.vRot;
    s.x += s.vX;
    s.y += s.vY;

    el.style.transform = `rotate(${client.rotate + s.rot}deg) translate3d(${s.x}px, ${client.y + s.y}px, 0)`;

    const settled =
      Math.abs(s.vRot) < REST_EPSILON && Math.abs(dRot) < REST_EPSILON &&
      Math.abs(s.vX) < REST_EPSILON && Math.abs(dX) < REST_EPSILON &&
      Math.abs(s.vY) < REST_EPSILON && Math.abs(dY) < REST_EPSILON;

    if (settled) {
      s.rot = s.targetRot;
      s.x = s.targetX;
      s.y = s.targetY;
      s.vRot = s.vX = s.vY = 0;
      el.style.transform = `rotate(${client.rotate + s.rot}deg) translate3d(${s.x}px, ${client.y + s.y}px, 0)`;
      s.raf = 0;
      return;
    }
    s.raf = requestAnimationFrame(tick);
  };

  const ensureLoop = () => {
    const s = state.current;
    if (!s.raf) s.raf = requestAnimationFrame(tick);
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const yRatio = (e.clientY - rect.top) / rect.height;
    const swing = (xRatio - 0.5) * 2 * 14;
    const lift = (yRatio - 0.5) * 2 * -6;
    const s = state.current;
    s.targetRot = swing;
    s.targetX = swing * 0.6;
    s.targetY = lift;
    ensureLoop();
  };

  const handleLeave = () => {
    const s = state.current;
    s.targetRot = 0;
    s.targetX = 0;
    s.targetY = 0;
    ensureLoop();
  };

  useEffect(() => {
    const s = state.current;
    return () => {
      if (s.raf) cancelAnimationFrame(s.raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="shrink-0 w-72 h-72 mx-4 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-white/90 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] hover:bg-[#111] hover:border-white/20"
      style={{
        transform: baseTransform,
        transition: "background-color 0.3s, border-color 0.3s",
        willChange: "transform",
      }}
    >
      <div className="relative h-24 w-48">
        <Image
          src={client.logoUrl}
          alt={client.name}
          fill
          sizes="192px"
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default function ClientsArchView({ clients }: { clients: ClientItem[] }) {
  return (
    <section className="py-24 md:py-32 bg-black overflow-hidden ">
      <div className="mx-auto max-w-7xl px-6 mb-10 md:mb-14 flex items-end justify-between">
        <h2 className="text-white/90 text-2xl md:text-3xl font-semibold tracking-tight">
          Trusted by teams at
        </h2>
        <span className="hidden md:inline text-[11px] tracking-[0.18em] uppercase text-white/40">
          Selected clients
        </span>
      </div>

      <div
        className="group relative w-full py-10"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div
          className="flex w-max will-change-transform animate-[marquee-x_40s_linear_infinite] group-hover:[animation-play-state:paused]"
          aria-hidden={false}
        >
          {[...clients, ...clients].map((client, i) => (
            <Card key={`${client.name}-${i}`} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
}
