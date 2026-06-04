import type { NextRequest } from "next/server";
import { Expertise } from "@/models/Expertise";
import { expertiseSchema } from "@/lib/validation";
import { makeItemHandlers } from "@/lib/crud";

export const runtime = "nodejs";

const handlers = makeItemHandlers(Expertise, expertiseSchema as never);

type Ctx = { params: Promise<{ id: string }> };
export async function GET(req: NextRequest, ctx: Ctx) { return handlers.GET(req, await ctx.params); }
export async function PATCH(req: NextRequest, ctx: Ctx) { return handlers.PATCH(req, await ctx.params); }
export async function DELETE(req: NextRequest, ctx: Ctx) { return handlers.DELETE(req, await ctx.params); }
