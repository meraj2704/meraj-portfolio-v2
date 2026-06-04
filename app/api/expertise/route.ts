import { Expertise } from "@/models/Expertise";
import { expertiseSchema } from "@/lib/validation";
import { makeCollectionHandlers } from "@/lib/crud";

export const runtime = "nodejs";

const { GET, POST } = makeCollectionHandlers(Expertise, expertiseSchema as never);
export { GET, POST };
