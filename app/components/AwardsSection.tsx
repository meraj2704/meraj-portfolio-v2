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
    <section className={splitSection} id="awards">
      <div className={splitContainer}>
        <div className={splitTitleWrap}>
          <h2 className={splitTitle}>AWARDS</h2>
        </div>
        <div className={splitList}>
          {awardsData.map((item, index) => (
            <div key={index} className={splitItem}>
              <h3 className={splitItemTitle}>{item.award}</h3>
              <div className={splitItemMeta}>
                <span className={splitItemRole}>{item.project}</span>
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
