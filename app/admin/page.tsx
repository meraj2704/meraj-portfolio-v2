import { verifySession } from "@/lib/dal";

export default async function AdminHome() {
  await verifySession();
  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Welcome</h1>
      <p style={{ color: "#555" }}>Pick a section from the left to manage portfolio content.</p>
    </div>
  );
}
