"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Login failed");
      }
      const next = search.get("next") || "/admin";
      router.replace(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid place-items-center min-h-screen font-sans bg-neutral-950">
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded-xl w-[360px] shadow-[0_10px_30px_rgba(0,0,0,0.3)] text-neutral-900"
      >
        <h1 className="text-xl font-bold mb-4">Admin login</h1>
        <label className="block mb-3">
          <span className="block text-xs text-neutral-600 mb-1">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2.5 border border-neutral-300 rounded-md outline-none focus:border-neutral-900"
          />
        </label>
        <label className="block mb-4">
          <span className="block text-xs text-neutral-600 mb-1">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2.5 border border-neutral-300 rounded-md outline-none focus:border-neutral-900"
          />
        </label>
        {error && <p className="text-red-600 text-[13px] mb-3">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-neutral-950 text-white py-3 rounded-md border-0 cursor-pointer disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
