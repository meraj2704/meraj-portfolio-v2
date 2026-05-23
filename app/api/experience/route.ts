import { Experience } from "@/models/Experience";
import { experienceSchema } from "@/lib/validation";
import { makeCollectionHandlers } from "@/lib/crud";

export const runtime = "nodejs";

const { GET, POST } = makeCollectionHandlers(Experience, experienceSchema as never);
export { GET, POST };
