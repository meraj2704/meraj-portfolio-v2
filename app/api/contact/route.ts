import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { Contact } from "@/models/Contact";
import { contactSchema } from "@/lib/validation";
import { requireAdmin } from "@/lib/dal";
import { handleError, jsonOk, parseJson } from "@/lib/api";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const parsed = await parseJson(req, contactSchema);
    if (!parsed.ok) return parsed.response;
    await connectDB();
    const doc = await Contact.create({
      ...parsed.data,
      ip: req.headers.get("x-forwarded-for") ?? undefined,
      userAgent: req.headers.get("user-agent") ?? undefined,
    });
    return jsonOk({ id: doc._id }, 201);
  } catch (err) {
    return handleError(err);
  }
}

export async function GET() {
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;
    await connectDB();
    const docs = await Contact.find().sort({ createdAt: -1 }).lean();
    return jsonOk(docs);
  } catch (err) {
    return handleError(err);
  }
}
