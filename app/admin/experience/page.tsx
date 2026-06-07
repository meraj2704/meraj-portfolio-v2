import { ResourceManager } from "../_components/ResourceManager";

export const dynamic = "force-dynamic";

export default function ExperienceAdmin() {
  return (
    <ResourceManager
      title="Experience"
      endpoint="/api/experience"
      orderable
      listColumns={["company", "role", "workMode", "date", "order"]}
      fields={[
        { name: "company", label: "Company", type: "text", required: true },
        { name: "role", label: "Role", type: "text", required: true },
        { name: "date", label: "Date range", type: "text", required: true },
        {
          name: "workMode",
          label: "Work mode",
          type: "select",
          options: [
            { label: "Onsite", value: "Onsite" },
            { label: "Remote", value: "Remote" },
            { label: "Hybrid", value: "Hybrid" },
          ],
        },
        { name: "desc", label: "Description", type: "richtext" },
        { name: "logo", label: "Logo", type: "image", folder: "portfolio/experience" },
      ]}
    />
  );
}
