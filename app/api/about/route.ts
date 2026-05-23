import { connectDB } from "@/lib/db";
import { About } from "@/models/About";
import { aboutSchema } from "@/lib/validation";
import { requireAdmin } from "@/lib/dal";
import { handleError, jsonOk, parseJson } from "@/lib/api";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();
    const doc = (await About.findOne({ singleton: "about" }).lean()) ?? null;
    return jsonOk(doc);
  } catch (err) {
    return handleError(err);
  }
}

export async function PUT(req: Request) {
  try {
    const unauthorized = await requireAdmin();
    if (unauthorized) return unauthorized;
    const parsed = await parseJson(req, aboutSchema);
    if (!parsed.ok) return parsed.response;
    await connectDB();
    const doc = await About.findOneAndUpdate(
      { singleton: "about" },
      { ...parsed.data, singleton: "about" },
      { new: true, upsert: true, runValidators: true }
    ).lean();
    return jsonOk(doc);
  } catch (err) {
    return handleError(err);
  }
}
