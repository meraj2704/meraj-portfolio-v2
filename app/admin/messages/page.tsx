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
  useEffect(() => { void load(); }, []);

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
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Messages</h1>
      {items.length === 0 && <p style={{ color: "#888" }}>No messages yet.</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((m) => (
          <div key={m._id} style={{ background: m.read ? "#fff" : "#fff8e1", border: "1px solid #eee", padding: 14, borderRadius: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <strong>{m.name}</strong>
              <span style={{ fontSize: 12, color: "#666" }}>{new Date(m.createdAt).toLocaleString()}</span>
            </div>
            <div style={{ fontSize: 13, color: "#444" }}>{m.email}</div>
            <p style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>{m.message}</p>
            <div style={{ marginTop: 10, display: "flex", gap: 12 }}>
              <button onClick={() => toggleRead(m)} style={{ background: "none", border: 0, color: "#0a64ff", cursor: "pointer", padding: 0, fontSize: 13 }}>
                Mark as {m.read ? "unread" : "read"}
              </button>
              <button onClick={() => remove(m._id)} style={{ background: "none", border: 0, color: "#c00", cursor: "pointer", padding: 0, fontSize: 13 }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
