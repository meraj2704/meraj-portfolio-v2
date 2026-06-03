import type { NextRequest } from "next/server";
import { Project, type ProjectDoc } from "@/models/Project";
import { projectSchema } from "@/lib/validation";
import { makeItemHandlers } from "@/lib/crud";
import { destroyAsset } from "@/lib/cloudinary";

export const runtime = "nodejs";

const handlers = makeItemHandlers(Project, projectSchema as never, {
  onDelete: async (doc) => {
    const p = doc as ProjectDoc;
    // Clean up every Cloudinary asset in parallel so the request returns fast.
    const publicIds = [
      p.cover?.publicId,
      ...(p.gallery ?? []).map((img) => img.publicId),
    ].filter((id): id is string => Boolean(id));
    await Promise.all(publicIds.map((id) => destroyAsset(id)));
  },
});

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  return handlers.GET(req, await ctx.params);
}
export async function PATCH(req: NextRequest, ctx: Ctx) {
  return handlers.PATCH(req, await ctx.params);
}
export async function DELETE(req: NextRequest, ctx: Ctx) {
  return handlers.DELETE(req, await ctx.params);
}
