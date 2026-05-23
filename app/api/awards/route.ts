import { Award } from "@/models/Award";
import { awardSchema } from "@/lib/validation";
import { makeCollectionHandlers } from "@/lib/crud";

export const runtime = "nodejs";

const { GET, POST } = makeCollectionHandlers(Award, awardSchema as never);
export { GET, POST };
