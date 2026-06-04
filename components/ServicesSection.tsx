import Link from "next/link";

const services = [
  {
    title: "Custom Web Application Development",
    desc: "Full-stack web apps built with Next.js, Nest.js, React and Node.js — fast, scalable, and tailored to your business.",
  },
  {
    title: "SaaS Platform Development",
    desc: "End-to-end SaaS products: authentication, billing, dashboards and multi-tenant architecture on a modern TypeScript stack.",
  },
  {
    title: "E-commerce Website Development",
    desc: "High-converting, SEO-friendly online stores with Next.js — optimized for speed, payments and a smooth checkout experience.",
  },
  {
    title: "REST API & Database Integration",
    desc: "Robust REST APIs with secure database design and integration using PostgreSQL, Prisma and MongoDB.",
  },
  {
    title: "Next.js Performance Optimization",
    desc: "Speed audits and Core Web Vitals tuning to make your existing site load faster and rank higher on Google.",
  },
  {
    title: "MERN Stack Development",
    desc: "MongoDB, Express, React and Node.js applications — from MVPs to production-ready, maintainable codebases.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-30 bg-black" id="services">
      <div className="w-full mx-auto px-5 md:px-8">
        <p className="text-[11px] tracking-[0.25em] uppercase text-[#4ade80] font-medium mb-6">
          Hire Me
        </p>
        <h2 className="text-[clamp(3.5rem,8vw,6.5rem)] font-black leading-[0.9] tracking-[-0.04em] text-white mb-8">
          WEB DEVELOPMENT<br />SERVICES
        </h2>
        <p className="max-w-[640px] text-[15px] md:text-base leading-[1.7] text-white/55 mb-15">
          I&apos;m Meraj Hossain, a freelance full-stack web developer based in
          Uttara, Dhaka, Bangladesh — available to hire for remote and on-site
          projects worldwide. From custom web applications to SaaS platforms and
          e-commerce sites, I build fast, scalable products with Next.js and
          Nest.js.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-[#0a0a0a] border border-white/[0.03] rounded-xl p-5 md:p-8 flex flex-col transition-[background,border-color] duration-300 hover:bg-[#111] hover:border-white/[0.08]"
            >
              <span className="text-[11px] font-bold tracking-[0.1em] text-white mb-6">
                ({String(index + 1).padStart(2, "0")})
              </span>
              <h3 className="text-xl font-extrabold tracking-[-0.01em] text-white mb-4 uppercase">
                {service.title}
              </h3>
              <p className="text-sm leading-[1.6] text-white/50">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <p className="text-base md:text-lg text-white/70 max-w-[480px]">
            Looking to hire a full-stack web developer in Dhaka, Bangladesh — or
            anywhere remote? Let&apos;s build something great together.
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2 text-[12px] tracking-[0.14em] uppercase text-black font-semibold bg-[#4ade80] rounded-full px-7 py-3.5 leading-none no-underline transition-all duration-300 hover:bg-white shrink-0"
          >
            Hire Me
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 13L13 1M13 1H4M13 1V10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
