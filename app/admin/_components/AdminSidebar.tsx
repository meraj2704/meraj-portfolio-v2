"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/expertise", label: "Expertise" },
  { href: "/admin/awards", label: "Awards" },
  { href: "/admin/stack", label: "Stack" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/messages", label: "Messages" },
];

export function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Lock background scroll while the mobile drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-neutral-950 px-4 py-3 text-white md:hidden">
        <span className="text-lg font-bold">Admin</span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="-mr-2 rounded-md p-2 hover:bg-neutral-800"
        >
          <Menu className="size-6" />
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Sidebar (static on desktop, off-canvas drawer on mobile) */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[260px] max-w-[80vw] flex-col overflow-y-auto bg-neutral-950 px-4 py-6 text-white transition-transform duration-300 ease-out",
          "md:sticky md:top-0 md:z-auto md:h-screen md:w-[220px] md:max-w-none md:shrink-0 md:translate-x-0 md:transition-none",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="text-lg font-bold">Admin</div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="rounded-md p-1 hover:bg-neutral-800 md:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1.5">
          {sections.map((s) => {
            const active =
              s.href === "/admin"
                ? pathname === "/admin"
                : pathname === s.href || pathname.startsWith(`${s.href}/`);
            return (
              <Link
                key={s.href}
                href={s.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-2.5 py-2 no-underline transition-colors",
                  active
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-300 hover:bg-neutral-800 hover:text-white",
                )}
              >
                {s.label}
              </Link>
            );
          })}
        </nav>

        <form action="/api/auth/logout" method="post" className="mt-6">
          <button
            type="submit"
            className="w-full cursor-pointer rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-white transition-colors hover:bg-neutral-700"
          >
            Log out
          </button>
        </form>
      </aside>
    </>
  );
}
