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
    <section className="expertise-section" id="expertise">
      <div className="expertise-container">
        <h2 className="expertise-title">
          MY<br />
          EXPERTISE
        </h2>

        <div className="expertise-grid">
          {expertise.map((item) => (
            <div
              key={item.num}
              className={`expertise-card span-${item.span}`}
            >
              <div className="expertise-card-top">
                <span className="expertise-num">({item.num})</span>
                <button className="expertise-plus-btn" aria-label="Learn more">
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
              <h3 className="expertise-card-title">{item.title}</h3>
              <p className="expertise-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
