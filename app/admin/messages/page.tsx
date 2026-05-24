"use client";

import { useEffect, useState } from "react";

type Msg = {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export const dynamic = "force-dynamic";

export default function MessagesAdmin() {
  const [items, setItems] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/contact", { cache: "no-store" });
    const body = await res.json();
    setItems(body.data ?? []);
    setLoading(false);
  }
  useEffect(() => {
    void load();
  }, []);

  async function toggleRead(m: Msg) {
    await fetch(`/api/contact/${m._id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ read: !m.read }),
    });
    await load();
  }
  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/contact/${id}`, { method: "DELETE" });
    await load();
  }

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      {items.length === 0 && <p className="text-neutral-500">No messages yet.</p>}
      <div className="flex flex-col gap-3">
        {items.map((m) => (
          <div
            key={m._id}
            className={`border border-neutral-200 p-3.5 rounded-lg ${
              m.read ? "bg-white" : "bg-amber-50"
            }`}
          >
            <div className="flex justify-between items-baseline">
              <strong>{m.name}</strong>
              <span className="text-xs text-neutral-600">
                {new Date(m.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="text-[13px] text-neutral-700">{m.email}</div>
            <p className="whitespace-pre-wrap mt-2">{m.message}</p>
            <div className="mt-2.5 flex gap-3">
              <button
                onClick={() => toggleRead(m)}
                className="bg-transparent border-0 text-blue-600 cursor-pointer p-0 text-[13px] hover:underline"
              >
                Mark as {m.read ? "unread" : "read"}
              </button>
              <button
                onClick={() => remove(m._id)}
                className="bg-transparent border-0 text-red-600 cursor-pointer p-0 text-[13px] hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
