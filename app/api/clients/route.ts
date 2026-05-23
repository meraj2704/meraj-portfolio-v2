import { Client } from "@/models/Client";
import { clientSchema } from "@/lib/validation";
import { makeCollectionHandlers } from "@/lib/crud";

export const runtime = "nodejs";

const { GET, POST } = makeCollectionHandlers(Client, clientSchema as never);
export { GET, POST };
