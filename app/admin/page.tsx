import Link from "next/link";
import { verifySession } from "@/lib/dal";
import { connectDB } from "@/lib/db";
import { Project, type ProjectDoc } from "@/models/Project";
import { Experience } from "@/models/Experience";
import { Award } from "@/models/Award";
import { Stack } from "@/models/Stack";
import { Client } from "@/models/Client";
import { Contact, type ContactDoc } from "@/models/Contact";

export const dynamic = "force-dynamic";

type StatCard = {
  label: string;
  value: number;
  href: string;
  hint?: string;
};

export default async function AdminHome() {
  await verifySession();
  await connectDB();

  const [
    projectsCount,
    featuredCount,
    experienceCount,
    awardsCount,
    stackCount,
    clientsCount,
    messagesCount,
    unreadCount,
    recentMessages,
    recentProjects,
  ] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ featured: true }),
    Experience.countDocuments(),
    Award.countDocuments(),
    Stack.countDocuments(),
    Client.countDocuments(),
    Contact.countDocuments(),
    Contact.countDocuments({ read: false }),
    Contact.find().sort({ createdAt: -1 }).limit(5).lean<ContactDoc[]>(),
    Project.find().sort({ updatedAt: -1 }).limit(5).lean<ProjectDoc[]>(),
  ]);

  const stats: StatCard[] = [
    {
      label: "Projects",
      value: projectsCount,
      href: "/admin/projects",
      hint: featuredCount > 0 ? `${featuredCount} featured` : undefined,
    },
    { label: "Experience", value: experienceCount, href: "/admin/experience" },
    { label: "Awards", value: awardsCount, href: "/admin/awards" },
    { label: "Stack items", value: stackCount, href: "/admin/stack" },
    { label: "Clients", value: clientsCount, href: "/admin/clients" },
    {
      label: "Messages",
      value: messagesCount,
      href: "/admin/messages",
      hint: unreadCount > 0 ? `${unreadCount} unread` : undefined,
    },
  ];

  return (
    <div className="w-full">
      <header className="mb-8 flex items-end justify-between flex-wrap gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-neutral-500 mb-1">
            Dashboard
          </p>
          <h1 className="text-3xl font-bold text-neutral-900">Welcome back</h1>
          <p className="text-sm text-neutral-500 mt-1">
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/projects"
            className="text-xs uppercase tracking-[0.1em] bg-neutral-900 text-white px-4 py-2.5 rounded-md no-underline hover:bg-neutral-700 transition-colors"
          >
            + New project
          </Link>
          <Link
            href="/"
            target="_blank"
            className="text-xs uppercase tracking-[0.1em] border border-neutral-300 text-neutral-700 px-4 py-2.5 rounded-md no-underline hover:bg-neutral-100 transition-colors"
          >
            View site ↗
          </Link>
        </div>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group bg-white border border-neutral-200 rounded-lg p-5 no-underline hover:border-neutral-400 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-[11px] uppercase tracking-[0.12em] text-neutral-500">
                {s.label}
              </span>
              <span className="text-neutral-400 group-hover:text-neutral-700 transition-colors">
                →
              </span>
            </div>
            <div className="text-3xl font-bold text-neutral-900 leading-none">
              {s.value}
            </div>
            {s.hint && (
              <div className="text-[11px] mt-2 text-neutral-500">{s.hint}</div>
            )}
          </Link>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white border border-neutral-200 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-neutral-900">
              Recent messages
            </h2>
            <Link
              href="/admin/messages"
              className="text-xs text-neutral-500 no-underline hover:text-neutral-900"
            >
              View all →
            </Link>
          </div>
          {recentMessages.length === 0 ? (
            <p className="text-sm text-neutral-500 py-6 text-center">
              No messages yet.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {recentMessages.map((m) => {
                const id = String(m._id);
                const createdAt = (m as ContactDoc & { createdAt?: Date }).createdAt;
                return (
                  <li
                    key={id}
                    className="flex items-start gap-3 py-2 border-b border-neutral-100 last:border-b-0"
                  >
                    <span
                      className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${
                        m.read ? "bg-neutral-300" : "bg-blue-500"
                      }`}
                      aria-label={m.read ? "Read" : "Unread"}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-neutral-900 truncate">
                          {m.name}
                        </span>
                        <span className="text-[11px] text-neutral-400 shrink-0">
                          {createdAt ? formatRelative(createdAt) : ""}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 truncate">{m.email}</p>
                      <p className="text-sm text-neutral-700 mt-1 line-clamp-2">
                        {m.message}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="bg-white border border-neutral-200 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.1em] text-neutral-900">
              Recent projects
            </h2>
            <Link
              href="/admin/projects"
              className="text-xs text-neutral-500 no-underline hover:text-neutral-900"
            >
              View all →
            </Link>
          </div>
          {recentProjects.length === 0 ? (
            <p className="text-sm text-neutral-500 py-6 text-center">
              No projects yet. <Link href="/admin/projects" className="underline">Create one</Link>.
            </p>
          ) : (
            <ul className="flex flex-col">
              {recentProjects.map((p) => {
                const updatedAt = (p as ProjectDoc & { updatedAt?: Date }).updatedAt;
                return (
                  <li
                    key={String(p._id)}
                    className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-b-0 gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/projects/${p.slug}`}
                          target="_blank"
                          className="text-sm font-medium text-neutral-900 no-underline hover:underline truncate"
                        >
                          {p.title}
                        </Link>
                        {p.featured && (
                          <span className="text-[10px] uppercase tracking-[0.1em] bg-neutral-900 text-white px-1.5 py-0.5 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        /{p.slug}
                      </p>
                    </div>
                    <span className="text-[11px] text-neutral-400 shrink-0">
                      {updatedAt ? formatRelative(updatedAt) : ""}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

function formatRelative(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  const diff = Date.now() - d.getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;
  return d.toLocaleDateString();
}
