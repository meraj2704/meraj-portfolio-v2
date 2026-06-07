import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const ImageSchema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    width: Number,
    height: Number,
  },
  { _id: false }
);

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    summary: { type: String, default: "" },
    description: { type: String, default: "" },
    client: { type: String, default: "" },
    year: { type: String, default: "" },
    category: { type: String, default: "" },
    cover: { type: ImageSchema },
    gallery: { type: [ImageSchema], default: [] },
    tech: { type: [String], default: [] },
    liveUrl: { type: String, default: "" },
    sourceUrl: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type ProjectDoc = InferSchemaType<typeof ProjectSchema> & { _id: unknown };
export const Project: Model<ProjectDoc> =
  (models.Project as Model<ProjectDoc>) || model<ProjectDoc>("Project", ProjectSchema);
