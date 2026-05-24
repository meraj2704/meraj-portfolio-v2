"use client";

import React from "react";
import {
  splitContainer,
  splitSection,
  splitTitle,
  splitTitleWrap,
  splitItemDesc,
} from "./_shared/splitClasses";

const stackData = [
  {
    title: "WEBFLOW",
    role: "WEB DESIGN PLATFORM",
    percent: "95%",
    desc: "The internet is your canvas. WEBFLOW is where design and publish stunning sites based in Amsterdam.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M16 4H8C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4Z" fill="#146EF5"/>
        <path d="M15 12H9L12 9L15 12Z" fill="white"/>
        <path d="M15 15H9L12 12L15 15Z" fill="white"/>
      </svg>
    ),
  },
  {
    title: "FIGMA",
    role: "DESIGN TOOL",
    percent: "98%",
    desc: "Figma is a collaborative web application for design with additional offline features for macOS and Windows.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 16C10.6569 16 12 14.6569 12 13V10C12 8.34315 10.6569 7 9 7C7.34315 7 6 8.34315 6 10C6 11.6569 7.34315 13 9 13C10.6569 13 12 14.6569 12 16C12 17.6569 10.6569 19 9 19C7.34315 19 6 17.6569 6 16Z" fill="#F24E1E"/>
        <path d="M15 13C16.6569 13 18 11.6569 18 10C18 8.34315 16.6569 7 15 7C13.3431 7 12 8.34315 12 10C12 11.6569 13.3431 13 15 13Z" fill="#1ABCFE"/>
        <path d="M12 13H9V10H12V13Z" fill="#A259FF"/>
        <path d="M15 13C13.3431 13 12 14.6569 12 16C12 17.6569 13.3431 19 15 19C16.6569 19 18 17.6569 18 16C18 14.6569 16.6569 13 15 13Z" fill="#0ACF83"/>
      </svg>
    ),
  },
  {
    title: "JAVASCRIPT",
    role: "FRONT END DEVELOPMENT",
    percent: "92%",
    desc: "JavaScript, often abbreviated as JS, is a programming language and technology alongside HTML and CSS.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 4H20V20H4V4Z" fill="#F7DF1E"/>
        <path d="M11 16.7C11 18.2 10.3 19 8.7 19C7.4 19 6.7 18.2 6.5 17.3L8 16.7C8.1 17.3 8.3 17.6 8.7 17.6C9.1 17.6 9.4 17.4 9.4 16.7V11H11V16.7ZM17.4 18.8C16.1 18.8 15.2 18 14.9 16.9L16.4 16.3C16.5 16.9 16.9 17.4 17.4 17.4C18 17.4 18.3 17.1 18.3 16.7C18.3 16.2 17.8 15.9 16.8 15.5C15.2 14.9 14.6 14.1 14.6 12.9C14.6 11.6 15.6 10.7 17.3 10.7C18.7 10.7 19.5 11.5 19.7 12.5L18.2 13C18 12.5 17.8 12.1 17.3 12.1C16.7 12.1 16.4 12.4 16.4 12.8C16.4 13.4 16.9 13.6 17.9 14.1C19.5 14.8 20.1 15.6 20.1 16.8C20 18.2 19 18.8 17.4 18.8Z" fill="black"/>
      </svg>
    ),
  },
];

export default function StackSection() {
  return (
    <section className={splitSection} id="stack">
      <div className={splitContainer}>
        <div className={splitTitleWrap}>
          <h2 className={splitTitle}>FAVOURITE<br />STACK</h2>
        </div>
        <div className="flex flex-col gap-6">
          {stackData.map((item, index) => (
            <div
              key={index}
              className="bg-[#0a0a0a] border border-white/5 rounded-xl p-5 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 transition-colors duration-300 hover:border-white/10"
            >
              <div className="w-12 h-12 rounded-xl bg-[#111] flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white uppercase">{item.title}</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[11px] font-bold tracking-wider text-white uppercase mt-2">
                    {item.role}
                  </span>
                  <span className="text-[13px] font-bold text-white">{item.percent}</span>
                </div>
                <p className={splitItemDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
