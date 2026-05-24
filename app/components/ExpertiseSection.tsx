"use client";

import React from "react";

const expertise = [
  {
    num: "1",
    title: "APP DESIGN",
    desc: "Craft intuitive navigation that makes features accessible. Choose layouts and graphics that fit your app's personality.",
    span: 2,
  },
  {
    num: "2",
    title: "WEB DESIGN",
    desc: "Polish animations and microinteractions that add delight. Every detail matters when sculpting an web.",
    span: 2,
  },
  {
    num: "3",
    title: "FRAMER",
    desc: "The process involves building virtual 3D models and materials, setting lighting, and then rendering the final images.",
    span: 2,
  },
  {
    num: "4",
    title: "PHOTOGRAPHY PRO",
    desc: "With the click of a shutter, an image is imprinted that tells a story or makes a statement. an image is imprinted that tells a story or makes a statement.",
    span: 3,
  },
  {
    num: "5",
    title: "MOTION GRAPHICS",
    desc: "The interplay between graphic elements, typography and movement opens up a world of creative possibilities. typography and movement.",
    span: 3,
  },
];

export default function ExpertiseSection() {
  return (
    <section className="py-30 bg-black" id="expertise">
      <div className="w-full mx-auto px-5 md:px-8">
        <h2 className="text-[clamp(3.5rem,8vw,6.5rem)] font-black leading-[0.9] tracking-[-0.04em] text-white mb-15">
          MY<br />EXPERTISE
        </h2>

        <div className="grid grid-cols-6 gap-4">
          {expertise.map((item) => (
            <div
              key={item.num}
              className={`group bg-[#0a0a0a] border border-white/[0.03] rounded-xl p-5 md:p-8 flex flex-col transition-[background,border-color] duration-300 hover:bg-[#111] hover:border-white/[0.08] ${
                item.span === 2
                  ? "col-span-6 md:col-span-2"
                  : "col-span-6 md:col-span-3"
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-[11px] font-bold tracking-[0.1em] text-white">
                  ({item.num})
                </span>
                <button
                  className="w-8 h-8 rounded-full bg-[#111] border border-white/5 text-white/60 flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:bg-[#222] group-hover:text-white"
                  aria-label="Learn more"
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1V13M1 7H13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              <h3 className="text-xl font-extrabold tracking-[-0.01em] text-white mb-4 uppercase">
                {item.title}
              </h3>
              <p className="text-sm leading-[1.6] text-white/50 max-w-[90%]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
