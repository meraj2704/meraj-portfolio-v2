import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { Contact } from "@/models/Contact";
import { requireAdmin } from "@/lib/dal";
import { handleError, jsonError, jsonOk } from "@/lib/api";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;
    const { id } = await ctx.params;
    const body = (await req.json().catch(() => ({}))) as { read?: boolean };
    await connectDB();
    const doc = await Contact.findByIdAndUpdate(id, { read: !!body.read }, { new: true }).lean();
    if (!doc) return jsonError("Not found", 404);
    return jsonOk(doc);
  } catch (err) {
    return handleError(err);
  }
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;
    const { id } = await ctx.params;
    await connectDB();
    const doc = await Contact.findByIdAndDelete(id).lean();
    if (!doc) return jsonError("Not found", 404);
    return jsonOk({ id });
  } catch (err) {
    return handleError(err);
  }
}
