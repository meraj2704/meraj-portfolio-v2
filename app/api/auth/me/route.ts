import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { getSession } from "@/lib/session";
import { jsonOk } from "@/lib/api";

export const runtime = "nodejs";

export async function GET() {
  const session = await getSession();
  if (!session?.userId) return jsonOk(null);
  await connectDB();
  const user = await User.findById(session.userId).select("email name role").lean();
  return jsonOk(user);
}
