import "dotenv/config";
import mongoose from "mongoose";
import { Project } from "../models/Project";

// One-time cleanup: pasted rich-text arrived with non-breaking spaces between
// every word, so summaries/descriptions render as one unwrappable line. Swap
// them for normal spaces. Safe to re-run (idempotent).
const fix = (html?: string) =>
  (html ?? "").replace(/&nbsp;|\u00a0/g, " ");

async function main() {
  await mongoose.connect(process.env.MONGODB_URI!);
  const docs = await Project.find().select("title summary description");
  let changed = 0;
  for (const d of docs) {
    const summary = fix(d.summary);
    const description = fix(d.description);
    if (summary !== d.summary || description !== d.description) {
      d.summary = summary;
      d.description = description;
      await d.save();
      changed++;
      console.log("fixed:", d.title);
    }
  }
  console.log(`\nDone. ${changed}/${docs.length} project(s) updated.`);
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
