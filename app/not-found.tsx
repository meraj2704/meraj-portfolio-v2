import Link from "next/link";

const digits = ["4", "0", "4"];

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-6 text-center">
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-green-500/20 to-emerald-700/5 blur-3xl animate-[nf-orb_8s_ease-in-out_infinite]" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-emerald-600/15 to-green-400/5 blur-3xl animate-[nf-orb_10s_ease-in-out_infinite_reverse]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Error badge */}
        <div className="opacity-0 animate-[nf-rise_0.8s_ease-out_forwards]">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white/75 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_12px_rgba(74,222,128,0.6)]" />
            </span>
            Error 404 — Page Not Found
          </span>
        </div>

        {/* Animated 404 with orbiting accent */}
        <div
          className="relative mt-10 flex items-center justify-center"
          style={{ perspective: "1000px" }}
        >
          {/* Rotating orbit ring */}
          <div
            aria-hidden
            className="pointer-events-none absolute h-[320px] w-[320px] sm:h-[440px] sm:w-[440px] animate-[nf-spin_24s_linear_infinite]"
          >
            <div className="absolute inset-0 rounded-full border border-green-400/15" />
            <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-green-400 shadow-[0_0_20px_6px_rgba(74,222,128,0.6)]" />
          </div>

          {/* The 404 digits (floating group, staggered entrance) */}
          <h1 className="relative flex select-none items-center gap-1 text-[7.5rem] font-bold leading-none tracking-tighter animate-[nf-float_6s_ease-in-out_infinite] sm:text-[12rem] md:text-[14rem]">
            {digits.map((digit, i) => (
              <span
                key={i}
                className="bg-gradient-to-b from-white via-green-200 to-emerald-600 bg-clip-text text-transparent opacity-0 drop-shadow-[0_0_40px_rgba(74,222,128,0.25)] animate-[nf-digit_0.9s_cubic-bezier(0.22,1,0.36,1)_forwards]"
                style={{ animationDelay: `${0.2 + i * 0.15}s` }}
              >
                {digit}
              </span>
            ))}
          </h1>
        </div>

        {/* Heading */}
        <h2
          className="mt-6 text-2xl font-bold tracking-tighter opacity-0 animate-[nf-rise_0.8s_ease-out_forwards] sm:text-3xl md:text-4xl"
          style={{ animationDelay: "0.7s" }}
        >
          Lost in the void
        </h2>

        {/* Description */}
        <p
          className="mt-4 max-w-md text-base text-white/60 opacity-0 animate-[nf-rise_0.8s_ease-out_forwards] sm:text-lg"
          style={{ animationDelay: "0.85s" }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has drifted off
          into space. Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div
          className="mt-10 flex flex-col gap-4 opacity-0 animate-[nf-rise_0.8s_ease-out_forwards] sm:flex-row"
          style={{ animationDelay: "1s" }}
        >
          <Link
            href="/"
            className="rounded-full bg-green-500 px-8 py-4 text-sm font-semibold text-black transition-transform duration-300 hover:scale-105"
          >
            Back to Home
          </Link>
          <Link
            href="/projects"
            className="rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-white/90 transition-colors duration-300 hover:bg-white/5"
          >
            View My Work
          </Link>
        </div>
      </div>
    </section>
  );
}
