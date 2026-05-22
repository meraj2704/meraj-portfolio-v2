"use client";

import React from "react";

const experienceData = [
  {
    company: "CLAVMEN STUDIO",
    role: "SENIOR UX DESIGNER",
    date: "2022 - PRESENT",
    desc: "Clavmen inspires creativity and makes learning piano fun. The sleek, lightweight body fits easily into gig bags for portability.",
  },
  {
    company: "LOSIFY",
    role: "LEAD PRODUCT DESIGNER",
    date: "2013 - 2022",
    desc: "Fitness and well-being with personalized coaching and innovative wellness solutions.",
  },
  {
    company: "GAMADIAS",
    role: "JUNIOR UX DESIGNER",
    date: "2012 - 2013",
    desc: "Gaming Experiences with Innovative Technology and Unparalleled Performance.",
  },
];

export default function ExperienceSection() {
  return (
    <section className="split-section" id="experience">
      <div className="split-container">
        <div className="split-title-wrap">
          <h2 className="split-title">EXPERIENCE</h2>
        </div>
        <div className="split-list">
          {experienceData.map((item, index) => (
            <div key={index} className="split-item">
              <h3 className="split-item-title">{item.company}</h3>
              <div className="split-item-meta">
                <span className="split-item-role">{item.role}</span>
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
