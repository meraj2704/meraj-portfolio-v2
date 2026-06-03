import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const ExpertiseSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    desc: { type: String, default: "" },
    // Grid width on the public page: 2 = standard (1/3), 3 = wide (1/2).
    span: { type: Number, default: 2 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type ExpertiseDoc = InferSchemaType<typeof ExpertiseSchema> & { _id: unknown };
export const Expertise: Model<ExpertiseDoc> =
  (models.Expertise as Model<ExpertiseDoc>) || model<ExpertiseDoc>("Expertise", ExpertiseSchema);
