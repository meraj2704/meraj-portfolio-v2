"use client";

import Image from "next/image";

const featuredProjects = [
  {
    name: "Synergy Analytics",
    category: "Web Development",
    year: "2025",
    image: "/project-dashboard.png",
  },
  {
    name: "Aurum Commerce",
    category: "E-Commerce",
    year: "2024",
    image: "/project-ecommerce.png",
  },
];

export default function FeaturedSection() {
  return (
    <section className="featured-section">
      <div className="featured-header">
        <h2 className="featured-title">
          FEATURED
          <br />
          WORK
        </h2>
        <p className="featured-desc">
          My creative spirit comes alive in the digital realm. With nimble
          fingers flying across the keyboard, I craft clear experiences out
          of nothing but ones and zeroes.
        </p>
      </div>

      <div className="featured-grid">
        {featuredProjects.map((project) => (
          <div key={project.name} className="featured-card">
            <div className="featured-card-img">
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="featured-card-image"
              />
            </div>
            <div className="featured-card-info">
              <div className="featured-card-meta">
                <h3 className="featured-card-name">{project.name}</h3>
                <p className="featured-card-cat">{project.category}</p>
              </div>
              <span className="featured-card-year">{project.year}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
