import type { ReactNode } from "react";
import { AdminSidebar } from "./_components/AdminSidebar";

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div
      data-lenis-prevent
      className="admin-shell w-full font-sans text-neutral-900 md:flex md:h-screen md:overflow-hidden"
    >
      <AdminSidebar />
      <main className="min-w-0 flex-1 bg-neutral-50 p-4 md:h-screen md:overflow-y-auto md:p-8">
        {children}
      </main>
    </div>
  );
}
