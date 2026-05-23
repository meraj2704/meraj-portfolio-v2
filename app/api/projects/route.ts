import { Project } from "@/models/Project";
import { projectSchema } from "@/lib/validation";
import { makeCollectionHandlers } from "@/lib/crud";

export const runtime = "nodejs";

const { GET, POST } = makeCollectionHandlers(Project, projectSchema as never);
export { GET, POST };
