import { verifySession } from "@/lib/dal";

export default async function AdminHome() {
  await verifySession();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Welcome</h1>
      <p className="text-neutral-600">Pick a section from the left to manage portfolio content.</p>
    </div>
  );
}
