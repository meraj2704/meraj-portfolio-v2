import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const ExperienceSchema = new Schema(
  {
    company: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    desc: { type: String, default: "" },
    logo: {
      url: String,
      publicId: String,
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type ExperienceDoc = InferSchemaType<typeof ExperienceSchema> & { _id: unknown };
export const Experience: Model<ExperienceDoc> =
  (models.Experience as Model<ExperienceDoc>) || model<ExperienceDoc>("Experience", ExperienceSchema);
