import { connectDB } from "@/lib/db";
import { Client, type ClientDoc } from "@/models/Client";
import ClientsArchView, { type ClientItem } from "./ClientsArchView";

export default async function ClientsArch() {
  await connectDB();
  const docs = await Client.find()
    .sort({ order: 1, createdAt: -1 })
    .lean<ClientDoc[]>();

  const clients: ClientItem[] = docs
    .map((c) => ({
      name: c.name,
      logoUrl: c.logo?.url ?? "",
      rotate: c.rotate ?? 0,
      y: c.y ?? 0,
    }))
    .filter((c) => c.logoUrl);

  if (clients.length === 0) return null;

  return <ClientsArchView clients={clients} />;
}
