import type { NextRequest } from "next/server";
import { Award, type AwardDoc } from "@/models/Award";
import { awardSchema } from "@/lib/validation";
import { makeItemHandlers } from "@/lib/crud";
import { destroyAsset } from "@/lib/cloudinary";

export const runtime = "nodejs";

const handlers = makeItemHandlers(Award, awardSchema as never, {
  onDelete: async (doc) => {
    const d = doc as AwardDoc;
    if (d.image?.publicId) await destroyAsset(d.image.publicId);
  },
});

type Ctx = { params: Promise<{ id: string }> };
export async function GET(req: NextRequest, ctx: Ctx) { return handlers.GET(req, await ctx.params); }
export async function PATCH(req: NextRequest, ctx: Ctx) { return handlers.PATCH(req, await ctx.params); }
export async function DELETE(req: NextRequest, ctx: Ctx) { return handlers.DELETE(req, await ctx.params); }
