import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(req: Request) {
  await deleteSession();
  return NextResponse.redirect(new URL("/login", req.url), { status: 303 });
}
