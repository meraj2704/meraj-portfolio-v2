import type { SiteProfile } from "@/lib/about";

const DEFAULT_SOCIALS = [
  { label: "GitHub", url: "https://github.com/meraj" },
  { label: "LinkedIn", url: "https://linkedin.com/in/meraj" },
  { label: "Twitter", url: "https://twitter.com/meraj" },
];

export default function Footer({ profile }: { profile: SiteProfile }) {
  const name = profile.name || "Meraj Hossain";
  const email = profile.email || "hello@meraj.dev";
  const phone = profile.phone || "+880 1700 000 000";
  const location = profile.location || "Dhaka, BD";
  const resumeUrl = profile.resumeUrl || "/resume.pdf";
  const socials = profile.socials.length > 0 ? profile.socials : DEFAULT_SOCIALS;

  return (
    <footer className="bg-black border-t border-white/[0.06] flex flex-col px-5 md:px-10 pt-10 pb-6 md:pt-20 md:pb-10">
      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 md:gap-15 mb-10 md:mb-20">
        <div className="flex flex-col gap-4">
          <h4 className="text-[11px] text-white/30 tracking-[0.1em] uppercase mb-2">CONTACT</h4>
          <a
            href={`mailto:${email}`}
            className="text-sm text-white no-underline tracking-[0.02em] transition-opacity duration-300 hover:opacity-60"
          >
            {email}
          </a>
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="text-sm text-white no-underline tracking-[0.02em] transition-opacity duration-300 hover:opacity-60"
          >
            {phone}
          </a>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-[11px] text-white/30 tracking-[0.1em] uppercase mb-2">SOCIALS</h4>
          {socials.map((s, i) => (
            <a
              key={`${s.label}-${i}`}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white no-underline tracking-[0.02em] transition-opacity duration-300 hover:opacity-60"
            >
              {s.label || s.url}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-[11px] text-white/30 tracking-[0.1em] uppercase mb-2">RESOURCES</h4>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-white no-underline tracking-[0.02em] transition-opacity duration-300 hover:opacity-60"
          >
            Download Resume
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/[0.06] gap-5">
        <span className="text-[11px] text-white/30 tracking-[0.08em] uppercase">
          &copy; {new Date().getFullYear()} {name}. ALL RIGHTS RESERVED.
        </span>
        <span className="text-[11px] text-white/30 tracking-[0.08em] uppercase">
          BASED IN {location}
        </span>
      </div>
    </footer>
  );
}
