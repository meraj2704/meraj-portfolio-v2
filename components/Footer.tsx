export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.06] flex flex-col px-5 md:px-10 pt-10 pb-6 md:pt-20 md:pb-10">
      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 md:gap-15 mb-10 md:mb-20">
        <div className="flex flex-col gap-4">
          <h4 className="text-[11px] text-white/30 tracking-[0.1em] uppercase mb-2">CONTACT</h4>
          <a
            href="mailto:hello@meraj.dev"
            className="text-sm text-white no-underline tracking-[0.02em] transition-opacity duration-300 hover:opacity-60"
          >
            hello@meraj.dev
          </a>
          <a
            href="tel:+8801700000000"
            className="text-sm text-white no-underline tracking-[0.02em] transition-opacity duration-300 hover:opacity-60"
          >
            +880 1700 000 000
          </a>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-[11px] text-white/30 tracking-[0.1em] uppercase mb-2">SOCIALS</h4>
          <a
            href="https://github.com/meraj"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-white no-underline tracking-[0.02em] transition-opacity duration-300 hover:opacity-60"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/meraj"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-white no-underline tracking-[0.02em] transition-opacity duration-300 hover:opacity-60"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/meraj"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-white no-underline tracking-[0.02em] transition-opacity duration-300 hover:opacity-60"
          >
            Twitter
          </a>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-[11px] text-white/30 tracking-[0.1em] uppercase mb-2">RESOURCES</h4>
          <a
            href="/resume.pdf"
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
          &copy; {new Date().getFullYear()} MERAJ HOSSAIN. ALL RIGHTS RESERVED.
        </span>
        <span className="text-[11px] text-white/30 tracking-[0.08em] uppercase">
          BASED IN DHAKA, BD
        </span>
      </div>
    </footer>
  );
}
