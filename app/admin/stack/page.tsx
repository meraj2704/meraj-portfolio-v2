import { ResourceManager } from "../_components/ResourceManager";

export const dynamic = "force-dynamic";

export default function StackAdmin() {
  return (
    <ResourceManager
      title="Stack"
      endpoint="/api/stack"
      listColumns={["title", "role", "percent", "order"]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "role", label: "Role", type: "text", required: true },
        { name: "percent", label: "Proficiency (e.g. 95%)", type: "text" },
        { name: "desc", label: "Description", type: "textarea" },
        { name: "icon", label: "Icon", type: "image", folder: "portfolio/stack" },
        { name: "order", label: "Order", type: "number" },
      ]}
    />
  );
}
