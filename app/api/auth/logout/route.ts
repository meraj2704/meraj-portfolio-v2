import { deleteSession } from "@/lib/session";
import { jsonOk } from "@/lib/api";

export const runtime = "nodejs";

export async function POST() {
  await deleteSession();
  return jsonOk({ ok: true });
}
