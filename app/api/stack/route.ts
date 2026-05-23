import { Stack } from "@/models/Stack";
import { stackSchema } from "@/lib/validation";
import { makeCollectionHandlers } from "@/lib/crud";

export const runtime = "nodejs";

const { GET, POST } = makeCollectionHandlers(Stack, stackSchema as never);
export { GET, POST };
