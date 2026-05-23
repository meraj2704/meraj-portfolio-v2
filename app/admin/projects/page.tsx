import { ResourceManager } from "../_components/ResourceManager";

export const dynamic = "force-dynamic";

export default function ProjectsAdmin() {
  return (
    <ResourceManager
      title="Projects"
      endpoint="/api/projects"
      listColumns={["title", "slug", "featured", "order"]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "slug", label: "Slug (lowercase-dashes)", type: "text", required: true },
        { name: "summary", label: "Summary", type: "textarea" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "cover", label: "Cover image", type: "image", folder: "portfolio/projects" },
        { name: "tech", label: "Tech stack", type: "tags" },
        { name: "liveUrl", label: "Live URL", type: "text" },
        { name: "sourceUrl", label: "Source URL", type: "text" },
        { name: "featured", label: "Featured", type: "boolean" },
        { name: "order", label: "Order", type: "number" },
      ]}
    />
  );
}
