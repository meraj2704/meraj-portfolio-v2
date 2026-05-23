import { ResourceManager } from "../_components/ResourceManager";

export const dynamic = "force-dynamic";

export default function AwardsAdmin() {
  return (
    <ResourceManager
      title="Awards"
      endpoint="/api/awards"
      listColumns={["award", "project", "date", "order"]}
      fields={[
        { name: "award", label: "Award name", type: "text", required: true },
        { name: "project", label: "Project", type: "text", required: true },
        { name: "date", label: "Date", type: "text", required: true },
        { name: "desc", label: "Description", type: "textarea" },
        { name: "image", label: "Image", type: "image", folder: "portfolio/awards" },
        { name: "order", label: "Order", type: "number" },
      ]}
    />
  );
}
