"use client";

import { useEffect, useState } from "react";
import { ImageField, type UploadedImage } from "../_components/ImageField";

type About = {
  name?: string;
  headline?: string;
  lead?: string;
  description?: string;
  location?: string;
  email?: string;
  phone?: string;
  avatar?: UploadedImage | null;
  resume?: UploadedImage | null;
};

export const dynamic = "force-dynamic";

export default function AboutAdmin() {
  const [data, setData] = useState<About>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/about", { cache: "no-store" });
      const body = await res.json();
      if (body.data) setData(body.data);
      setLoading(false);
    })();
  }, []);

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Save failed");
      setMessage("Saved.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  const input = { width: "100%", padding: "8px 10px", border: "1px solid #ddd", borderRadius: 6 } as const;
  const wrap = { display: "block", marginBottom: 10 } as const;

  if (loading) return <p>Loading…</p>;

  return (
    <div style={{ maxWidth: 640 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>About</h1>
      {(["name", "headline", "location", "email", "phone"] as const).map((k) => (
        <label key={k} style={wrap}>
          <span style={{ fontSize: 12, color: "#555" }}>{k}</span>
          <input style={input} value={data[k] ?? ""} onChange={(e) => setData({ ...data, [k]: e.target.value })} />
        </label>
      ))}
      {(["lead", "description"] as const).map((k) => (
        <label key={k} style={wrap}>
          <span style={{ fontSize: 12, color: "#555" }}>{k}</span>
          <textarea style={input} rows={4} value={data[k] ?? ""} onChange={(e) => setData({ ...data, [k]: e.target.value })} />
        </label>
      ))}
      <ImageField label="Avatar" value={data.avatar ?? null} onChange={(v) => setData({ ...data, avatar: v })} folder="portfolio/about" />
      <ImageField label="Resume (PDF)" value={data.resume ?? null} onChange={(v) => setData({ ...data, resume: v })} folder="portfolio/about" />
      <button onClick={save} disabled={saving} style={{ background: "#0a0a0a", color: "#fff", border: 0, padding: "10px 16px", borderRadius: 6, cursor: "pointer" }}>
        {saving ? "Saving…" : "Save"}
      </button>
      {message && <p style={{ marginTop: 8, fontSize: 13 }}>{message}</p>}
    </div>
  );
}
