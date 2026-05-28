"use client";

import React, { useEffect, useRef } from "react";

type Client = {
  name: string;
  rotate: number;
  y: number;
  content: React.ReactNode;
};

const clients: Client[] = [
  {
    name: "ACTIVISION",
    rotate: 4,
    y: 18,
    content: (
      <span
        className="font-black tracking-tighter text-2xl"
        style={{ transform: "scaleY(0.8)", display: "inline-block" }}
      >
        ACTIVISION
      </span>
    ),
  },
  {
    name: "Apple Pay",
    rotate: -3,
    y: -10,
    content: (
      <span className="font-semibold tracking-tight text-2xl flex items-center gap-1">
        <span className="text-3xl"></span> Pay
      </span>
    ),
  },
  {
    name: "AIRBUS",
    rotate: 2,
    y: 14,
    content: <span className="font-bold tracking-widest text-2xl">AIRBUS</span>,
  },
  {
    name: "HBO",
    rotate: -4,
    y: -16,
    content: <span className="font-black tracking-tighter text-4xl">HBO</span>,
  },
  {
    name: "AMD",
    rotate: 3,
    y: 12,
    content: <span className="font-black tracking-widest text-3xl">AMD</span>,
  },
  {
    name: "XBOX",
    rotate: -2,
    y: -12,
    content: (
      <svg width="56" height="56" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="48" fill="white" />
        <path
          d="M 15 25 Q 50 50 85 25 M 15 75 Q 50 50 85 75"
          stroke="black"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M 25 15 Q 50 50 25 85 M 75 15 Q 50 50 75 85"
          stroke="black"
          strokeWidth="12"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "BOSE",
    rotate: 5,
    y: 20,
    content: (
      <span
        className="font-black italic tracking-widest text-2xl"
        style={{ transform: "scaleX(1.2)", display: "inline-block" }}
      >
        BOSE
      </span>
    ),
  },
];

const SPRING_STIFFNESS = 0.11;
const SPRING_DAMPING = 0.78;
const REST_EPSILON = 0.02;

function Card({ client }: { client: Client }) {
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
      {client.content}
    </div>
  );
}

export default function ClientsArch() {
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
