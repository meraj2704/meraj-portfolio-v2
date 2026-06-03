import Link from "next/link";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

const sections = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/awards", label: "Awards" },
  { href: "/admin/stack", label: "Stack" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/messages", label: "Messages" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-lenis-prevent
      className="admin-shell flex w-full h-screen overflow-hidden font-sans text-neutral-900"
    >
      <aside className="sticky top-0 w-[220px] h-screen shrink-0 overflow-y-auto bg-neutral-950 text-white px-4 py-6">
        <div className="font-bold text-lg mb-6">Admin</div>
        <nav className="flex flex-col gap-1.5">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="text-neutral-300 no-underline px-2.5 py-2 rounded-md hover:bg-neutral-800 hover:text-white transition-colors"
            >
              {s.label}
            </Link>
          ))}
        </nav>
        <form action="/api/auth/logout" method="post" className="mt-6">
          <button
            type="submit"
            className="w-full bg-neutral-800 text-white border border-neutral-700 px-3 py-2 rounded-md cursor-pointer hover:bg-neutral-700 transition-colors"
          >
            Log out
          </button>
        </form>
      </aside>
      <main className="flex-1 h-screen overflow-y-auto p-8 bg-neutral-50">{children}</main>
    </div>
  );
}
