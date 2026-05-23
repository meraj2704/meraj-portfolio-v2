import type { NextRequest } from "next/server";
import { Experience, type ExperienceDoc } from "@/models/Experience";
import { experienceSchema } from "@/lib/validation";
import { makeItemHandlers } from "@/lib/crud";
import { destroyAsset } from "@/lib/cloudinary";

export const runtime = "nodejs";

const handlers = makeItemHandlers(Experience, experienceSchema as never, {
  onDelete: async (doc) => {
    const d = doc as ExperienceDoc;
    if (d.logo?.publicId) await destroyAsset(d.logo.publicId);
  },
});

type Ctx = { params: Promise<{ id: string }> };
export async function GET(req: NextRequest, ctx: Ctx) { return handlers.GET(req, await ctx.params); }
export async function PATCH(req: NextRequest, ctx: Ctx) { return handlers.PATCH(req, await ctx.params); }
export async function DELETE(req: NextRequest, ctx: Ctx) { return handlers.DELETE(req, await ctx.params); }
