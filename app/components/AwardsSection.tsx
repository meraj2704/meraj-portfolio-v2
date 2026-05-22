"use client";

import React from "react";

const awardsData = [
  {
    award: "CSS DESIGN AWARD",
    project: "MAKINTO PORTFOLIO",
    date: "2024",
    desc: "This portfolio won a award for its unique classic makintosh style theme it is one of the digital portfolio.",
  },
  {
    award: "AWWWARDS",
    project: "ARNO RED THEMED PORTFOLIO",
    date: "2023",
    desc: "Arno is a personal portfolio built by WEBFLOW and it is very futuristic horizontal scrolling portfolio have its different character.",
  },
  {
    award: "WEBFLOW",
    project: "AUDEMARS PIGUET",
    date: "2023",
    desc: "I built a site for one of the world class watch brand it is featured in WEBFLOW awards and won a minimal style award.",
  },
];

export default function AwardsSection() {
  return (
    <section className="split-section" id="awards">
      <div className="split-container">
        <div className="split-title-wrap">
          <h2 className="split-title">AWARDS</h2>
        </div>
        <div className="split-list">
          {awardsData.map((item, index) => (
            <div key={index} className="split-item">
              <h3 className="split-item-title">{item.award}</h3>
              <div className="split-item-meta">
                <span className="split-item-role">{item.project}</span>
                <span className="split-item-date">{item.date}</span>
              </div>
              <p className="split-item-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
