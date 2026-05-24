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

const input =
  "w-full px-2.5 py-2 border border-neutral-300 rounded-md outline-none focus:border-neutral-900";

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

  if (loading) return <p>Loading…</p>;

  return (
    <div className="max-w-160">
      <h1 className="text-2xl font-bold mb-4">About</h1>
      {(["name", "headline", "location", "email", "phone"] as const).map((k) => (
        <label key={k} className="block mb-2.5">
          <span className="block text-xs text-neutral-600 mb-1">{k}</span>
          <input
            className={input}
            value={data[k] ?? ""}
            onChange={(e) => setData({ ...data, [k]: e.target.value })}
          />
        </label>
      ))}
      {(["lead", "description"] as const).map((k) => (
        <label key={k} className="block mb-2.5">
          <span className="block text-xs text-neutral-600 mb-1">{k}</span>
          <textarea
            className={input}
            rows={4}
            value={data[k] ?? ""}
            onChange={(e) => setData({ ...data, [k]: e.target.value })}
          />
        </label>
      ))}
      <ImageField
        label="Avatar"
        value={data.avatar ?? null}
        onChange={(v) => setData({ ...data, avatar: v })}
        folder="portfolio/about"
      />
      <ImageField
        label="Resume (PDF)"
        value={data.resume ?? null}
        onChange={(v) => setData({ ...data, resume: v })}
        folder="portfolio/about"
      />
      <button
        onClick={save}
        disabled={saving}
        className="bg-neutral-950 text-white border-0 px-4 py-2.5 rounded-md cursor-pointer hover:bg-neutral-800 transition-colors disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save"}
      </button>
      {message && <p className="mt-2 text-[13px]">{message}</p>}
    </div>
  );
}
