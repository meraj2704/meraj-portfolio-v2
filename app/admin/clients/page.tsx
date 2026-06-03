import { ResourceManager } from "../_components/ResourceManager";

export const dynamic = "force-dynamic";

export default function ClientsAdmin() {
  return (
    <ResourceManager
      title="Clients"
      endpoint="/api/clients"
      orderable
      listColumns={["name", "rotate", "y", "order"]}
      fields={[
        { name: "name", label: "Name", type: "text", required: true },
        { name: "logo", label: "Logo", type: "image", folder: "portfolio/clients" },
        { name: "rotate", label: "Rotate (deg)", type: "number" },
        { name: "y", label: "Y offset (px)", type: "number" },
      ]}
    />
  );
}
