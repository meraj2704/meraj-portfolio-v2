import { ResourceManager } from "../_components/ResourceManager";

export const dynamic = "force-dynamic";

export default function ExpertiseAdmin() {
  return (
    <ResourceManager
      title="Expertise"
      endpoint="/api/expertise"
      orderable
      listColumns={["title", "span", "order"]}
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "desc", label: "Description", type: "richtext" },
        {
          name: "span",
          label: "Card width",
          type: "select",
          options: [
            { label: "Standard (1/3 width)", value: 2 },
            { label: "Wide (1/2 width)", value: 3 },
          ],
        },
      ]}
    />
  );
}
