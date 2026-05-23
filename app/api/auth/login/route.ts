import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { loginSchema } from "@/lib/validation";
import { createSession } from "@/lib/session";
import { handleError, jsonError, jsonOk, parseJson } from "@/lib/api";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const parsed = await parseJson(req, loginSchema);
    if (!parsed.ok) return parsed.response;
    await connectDB();
    const user = await User.findOne({ email: parsed.data.email.toLowerCase() });
    if (!user) return jsonError("Invalid credentials", 401);
    const ok = await bcrypt.compare(parsed.data.password, user.passwordHash);
    if (!ok) return jsonError("Invalid credentials", 401);
    await createSession(String(user._id));
    return jsonOk({ id: user._id, email: user.email, name: user.name });
  } catch (err) {
    return handleError(err);
  }
}
