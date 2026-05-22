"use client";

import React from "react";

const clients = [
  {
    name: "ACTIVISION",
    rotate: 6,
    y: 30,
    content: (
      <span
        className="font-black tracking-tighter text-xl"
        style={{ transform: "scaleY(0.8)", display: "inline-block" }}
      >
        ACTIVISION
      </span>
    ),
  },
  {
    name: "Apple Pay",
    rotate: 4,
    y: 15,
    content: (
      <span className="font-semibold tracking-tight text-2xl flex items-center gap-1">
        <span className="text-3xl"></span> Pay
      </span>
    ),
  },
  {
    name: "AIRBUS",
    rotate: 2,
    y: 5,
    content: (
      <span className="font-bold tracking-widest text-xl">AIRBUS</span>
    ),
  },
  {
    name: "HBO",
    rotate: 0,
    y: 0,
    content: (
      <span className="font-black tracking-tighter text-4xl">HBO</span>
    ),
  },
  {
    name: "AMD",
    rotate: -2,
    y: 5,
    content: (
      <span className="font-black tracking-widest text-3xl">AMD</span>
    ),
  },
  {
    name: "XBOX",
    rotate: -4,
    y: 15,
    content: (
      <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
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
    rotate: -6,
    y: 30,
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

export default function ClientsArch() {
  return (
    <section className="clients-arch-section">
      <div className="clients-arch-container">
        {clients.map((client) => (
          <div
            key={client.name}
            className="client-card"
            style={{
              transform: `rotate(${client.rotate}deg) translateY(${client.y}px)`,
            }}
          >
            {client.content}
          </div>
        ))}
      </div>
    </section>
  );
}
