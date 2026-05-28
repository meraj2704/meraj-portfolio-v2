import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSession } from "./session";

export const verifySession = cache(async () => {
  const session = await getSession();
  if (!session?.userId) redirect("/login");
  return session;
});

export async function requireAdmin(): Promise<Response | null> {
  const session = await getSession();
  if (!session?.userId) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  if (session.role !== "admin") return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
  return null;
}
