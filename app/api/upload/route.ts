import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/dal";
import { uploadBuffer } from "@/lib/cloudinary";
import { handleError, jsonError, jsonOk } from "@/lib/api";

export const runtime = "nodejs";

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml", "application/pdf"]);

export async function POST(req: NextRequest) {
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;

    const form = await req.formData();
    const file = form.get("file");
    const folder = (form.get("folder") as string) || "portfolio";

    if (!(file instanceof File)) return jsonError("Missing file", 400);
    if (file.size > MAX_BYTES) return jsonError("File too large (max 10MB)", 413);
    if (!ALLOWED.has(file.type)) return jsonError(`Unsupported type: ${file.type}`, 415);

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadBuffer(buffer, folder);
    return jsonOk(result, 201);
  } catch (err) {
    return handleError(err);
  }
}
