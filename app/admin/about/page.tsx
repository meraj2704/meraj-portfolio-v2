"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { ImageField, type UploadedImage } from "../_components/ImageField";
import { InputField } from "@/components/inputs/InputField";
import { TextAreaField } from "@/components/inputs/TextAreaField";
import { RichTextField } from "@/components/inputs/RichTextField";
import { Button } from "@/components/ui/button";

type Social = { label: string; url: string };

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
  socials?: Social[];
};

export const dynamic = "force-dynamic";

export default function AboutAdmin() {
  const [data, setData] = useState<About>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/about", { cache: "no-store" });
        const body = await res.json();
        if (body.data) setData(body.data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function set<K extends keyof About>(key: K, value: About[K]) {
    setData((d) => ({ ...d, [key]: value }));
    setSaved(false);
  }

  const socials = data.socials ?? [];
  function setSocial(i: number, patch: Partial<Social>) {
    set(
      "socials",
      socials.map((s, idx) => (idx === i ? { ...s, ...patch } : s)),
    );
  }
  function addSocial() {
    set("socials", [...socials, { label: "", url: "" }]);
  }
  function removeSocial(i: number) {
    set(
      "socials",
      socials.filter((_, idx) => idx !== i),
    );
  }

  async function save() {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      // Drop incomplete rows — the schema requires a valid URL for each social.
      const payload: About = {
        ...data,
        socials: socials.filter((s) => s.url.trim() !== ""),
      };
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json();
      if (!res.ok) {
        const fieldErrors = body?.details?.fieldErrors as
          | Record<string, string[]>
          | undefined;
        const detail = fieldErrors
          ? Object.entries(fieldErrors)
              .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
              .join(" · ")
          : "";
        throw new Error(detail || body.error || "Save failed");
      }
      if (body.data) setData(body.data);
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-secondary-text">Loading…</p>;

  return (
    <div className="text-primary-text">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">About</h1>
        <Button onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </Button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
          {error}
        </div>
      )}
      {saved && !error && (
        <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700">
          Saved.
        </div>
      )}

      <div className="grid max-w-2xl gap-4">
        <InputField
          label="Name"
          value={data.name ?? ""}
          onChange={(e) => set("name", e.target.value)}
        />
        <InputField
          label="Headline"
          value={data.headline ?? ""}
          onChange={(e) => set("headline", e.target.value)}
        />
        <TextAreaField
          label="Lead"
          value={data.lead ?? ""}
          onChange={(e) => set("lead", e.target.value)}
        />
        <RichTextField
          label="Description"
          value={data.description ?? ""}
          onChange={(v) => set("description", v)}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <InputField
            label="Location"
            value={data.location ?? ""}
            onChange={(e) => set("location", e.target.value)}
          />
          <InputField
            label="Email"
            type="email"
            value={data.email ?? ""}
            onChange={(e) => set("email", e.target.value)}
          />
        </div>
        <InputField
          label="Phone"
          type="tel"
          value={data.phone ?? ""}
          onChange={(e) => set("phone", e.target.value)}
        />

        <ImageField
          label="Avatar"
          value={data.avatar ?? null}
          onChange={(v) => set("avatar", v)}
          folder="portfolio/about"
          accept="image/*"
        />
        <ImageField
          label="Resume (PDF)"
          value={data.resume ?? null}
          onChange={(v) => set("resume", v)}
          folder="portfolio/about"
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-primary-text">
            Social links
          </label>
          {socials.length === 0 ? (
            <p className="text-sm text-secondary-text">No social links yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {socials.map((s, i) => (
                <div key={i} className="flex items-end gap-2">
                  <div className="w-40 shrink-0">
                    <InputField
                      label={i === 0 ? "Label" : ""}
                      placeholder="GitHub"
                      value={s.label}
                      onChange={(e) => setSocial(i, { label: e.target.value })}
                    />
                  </div>
                  <div className="flex-1">
                    <InputField
                      label={i === 0 ? "URL" : ""}
                      placeholder="https://github.com/username"
                      value={s.url}
                      onChange={(e) => setSocial(i, { url: e.target.value })}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-10 shrink-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => removeSocial(i)}
                  >
                    <Trash2 className="size-4" />
                    <span className="sr-only">Remove social link</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div>
            <Button
              variant="secondary"
              size="sm"
              onClick={addSocial}
              className="mt-1"
            >
              <Plus className="size-4" />
              Add social link
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </Button>
      </div>
    </div>
  );
}
