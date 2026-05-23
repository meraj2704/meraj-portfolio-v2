/**
 * Bootstrap an admin user. Run with:
 *   npx tsx scripts/create-admin.ts
 * Requires MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD in env.
 */
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/User";

async function main() {
  const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("Set MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD");
    process.exit(1);
  }
  await mongoose.connect(MONGODB_URI);
  const email = ADMIN_EMAIL.toLowerCase();
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const existing = await User.findOne({ email });
  if (existing) {
    existing.passwordHash = passwordHash;
    await existing.save();
    console.log(`Updated password for ${email}`);
  } else {
    await User.create({ email, passwordHash, role: "admin", name: "Admin" });
    console.log(`Created admin ${email}`);
  }
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
