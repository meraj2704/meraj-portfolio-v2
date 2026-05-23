import type { NextRequest } from "next/server";
import { Stack, type StackDoc } from "@/models/Stack";
import { stackSchema } from "@/lib/validation";
import { makeItemHandlers } from "@/lib/crud";
import { destroyAsset } from "@/lib/cloudinary";

export const runtime = "nodejs";

const handlers = makeItemHandlers(Stack, stackSchema as never, {
  onDelete: async (doc) => {
    const d = doc as StackDoc;
    if (d.icon?.publicId) await destroyAsset(d.icon.publicId);
  },
});

type Ctx = { params: Promise<{ id: string }> };
export async function GET(req: NextRequest, ctx: Ctx) { return handlers.GET(req, await ctx.params); }
export async function PATCH(req: NextRequest, ctx: Ctx) { return handlers.PATCH(req, await ctx.params); }
export async function DELETE(req: NextRequest, ctx: Ctx) { return handlers.DELETE(req, await ctx.params); }
