"use client";

import { useEffect, useState } from "react";
import { Mail, MailOpen, Reply, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Msg = {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

type Filter = "all" | "unread";

export const dynamic = "force-dynamic";

export default function MessagesAdmin() {
  const [items, setItems] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", { cache: "no-store" });
      const body = await res.json();
      setItems(body.data ?? []);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void load();
  }, []);

  async function toggleRead(m: Msg) {
    const next = !m.read;
    // Optimistic: flip immediately, roll back if the request fails.
    setItems((cur) =>
      cur.map((it) => (it._id === m._id ? { ...it, read: next } : it)),
    );
    setError(null);
    try {
      const res = await fetch(`/api/contact/${m._id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ read: next }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setItems((cur) =>
        cur.map((it) => (it._id === m._id ? { ...it, read: m.read } : it)),
      );
      setError("Failed to update message.");
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    const prev = items;
    setItems((cur) => cur.filter((it) => it._id !== id));
    setError(null);
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
    } catch {
      setItems(prev);
      setError("Failed to delete message.");
    }
  }

  const unreadCount = items.filter((m) => !m.read).length;
  const visible = filter === "unread" ? items.filter((m) => !m.read) : items;

  return (
    <div className="text-primary-text">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Messages</h1>
          {unreadCount > 0 && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
              {unreadCount} unread
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 rounded-xl bg-gray-100 p-1">
          {(["all", "unread"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors",
                filter === f
                  ? "bg-white text-primary-text shadow-sm"
                  : "text-secondary-text hover:text-primary-text",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-secondary-text">Loading…</p>
      ) : visible.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-10 text-center text-sm text-secondary-text">
          {filter === "unread" ? "No unread messages." : "No messages yet."}
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {visible.map((m) => (
            <div
              key={m._id}
              className={cn(
                "rounded-xl border p-4 transition-colors",
                m.read
                  ? "border-gray-200 bg-white"
                  : "border-primary/20 bg-primary/5",
              )}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <div className="flex items-center gap-2">
                  {!m.read && (
                    <span
                      className="size-2 shrink-0 rounded-full bg-primary"
                      aria-label="Unread"
                    />
                  )}
                  <strong className="text-primary-text">{m.name}</strong>
                  <a
                    href={`mailto:${m.email}`}
                    className="text-[13px] text-secondary-text hover:text-primary hover:underline"
                  >
                    {m.email}
                  </a>
                </div>
                <span className="text-xs text-secondary-text">
                  {new Date(m.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-primary-text/90">
                {m.message}
              </p>

              <div className="mt-3 flex items-center gap-1">
                <Button asChild variant="ghost" size="sm">
                  <a href={`mailto:${m.email}?subject=Re: your message`}>
                    <Reply className="size-4" />
                    Reply
                  </a>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => toggleRead(m)}>
                  {m.read ? (
                    <Mail className="size-4" />
                  ) : (
                    <MailOpen className="size-4" />
                  )}
                  Mark as {m.read ? "unread" : "read"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={() => remove(m._id)}
                >
                  <Trash2 className="size-4" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
