import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const token = req.cookies.get("session")?.value;
  const session = await decrypt(token);
  if (!session?.userId) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
