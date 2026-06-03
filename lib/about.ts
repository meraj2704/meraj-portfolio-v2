import "server-only";
import { connectDB } from "./db";
import { About, type AboutDoc } from "@/models/About";

/** Plain, serializable shape safe to pass from server components into client
 *  components (no ObjectId/Date). Empty strings mean "not set" — each consumer
 *  applies its own presentation fallback. */
export type SiteProfile = {
  name: string;
  headline: string;
  lead: string;
  description: string;
  location: string;
  email: string;
  phone: string;
  avatarUrl: string;
  resumeUrl: string;
  socials: { label: string; url: string }[];
};

export async function getSiteProfile(): Promise<SiteProfile> {
  await connectDB();
  const a = await About.findOne({ singleton: "about" }).lean<AboutDoc | null>();
  return {
    name: a?.name ?? "",
    headline: a?.headline ?? "",
    lead: a?.lead ?? "",
    description: a?.description ?? "",
    location: a?.location ?? "",
    email: a?.email ?? "",
    phone: a?.phone ?? "",
    avatarUrl: a?.avatar?.url ?? "",
    resumeUrl: a?.resume?.url ?? "",
    socials: (a?.socials ?? []).map((s) => ({
      label: s?.label ?? "",
      url: s?.url ?? "",
    })),
  };
}
