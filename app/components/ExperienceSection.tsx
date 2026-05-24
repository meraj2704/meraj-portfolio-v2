"use client";

import React from "react";
import {
  splitContainer,
  splitItem,
  splitItemDate,
  splitItemDesc,
  splitItemMeta,
  splitItemRole,
  splitItemTitle,
  splitList,
  splitSection,
  splitTitle,
  splitTitleWrap,
} from "./_shared/splitClasses";

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
    <section className={splitSection} id="experience">
      <div className={splitContainer}>
        <div className={splitTitleWrap}>
          <h2 className={splitTitle}>EXPERIENCE</h2>
        </div>
        <div className={splitList}>
          {experienceData.map((item, index) => (
            <div key={index} className={splitItem}>
              <h3 className={splitItemTitle}>{item.company}</h3>
              <div className={splitItemMeta}>
                <span className={splitItemRole}>{item.role}</span>
                <span className={splitItemDate}>{item.date}</span>
              </div>
              <p className={splitItemDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
