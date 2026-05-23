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
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "system-ui, sans-serif", color: "#111" }}>
      <aside style={{ width: 220, background: "#0a0a0a", color: "#fff", padding: "24px 16px" }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 24 }}>Admin</div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              style={{ color: "#ddd", textDecoration: "none", padding: "8px 10px", borderRadius: 6 }}
            >
              {s.label}
            </Link>
          ))}
        </nav>
        <form action="/api/auth/logout" method="post" style={{ marginTop: 24 }}>
          <button
            formAction="/api/auth/logout"
            type="submit"
            style={{ background: "#222", color: "#fff", border: "1px solid #333", padding: "8px 12px", borderRadius: 6, cursor: "pointer", width: "100%" }}
          >
            Log out
          </button>
        </form>
      </aside>
      <main style={{ flex: 1, padding: 32, background: "#fafafa" }}>{children}</main>
    </div>
  );
}
