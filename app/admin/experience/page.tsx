import { ResourceManager } from "../_components/ResourceManager";

export const dynamic = "force-dynamic";

export default function ExperienceAdmin() {
  return (
    <ResourceManager
      title="Experience"
      endpoint="/api/experience"
      orderable
      listColumns={["company", "role", "date", "order"]}
      fields={[
        { name: "company", label: "Company", type: "text", required: true },
        { name: "role", label: "Role", type: "text", required: true },
        { name: "date", label: "Date range", type: "text", required: true },
        { name: "desc", label: "Description", type: "richtext" },
        { name: "logo", label: "Logo", type: "image", folder: "portfolio/experience" },
      ]}
    />
  );
}
