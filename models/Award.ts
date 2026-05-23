import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const AwardSchema = new Schema(
  {
    award: { type: String, required: true, trim: true },
    project: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    desc: { type: String, default: "" },
    image: {
      url: String,
      publicId: String,
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type AwardDoc = InferSchemaType<typeof AwardSchema> & { _id: unknown };
export const Award: Model<AwardDoc> =
  (models.Award as Model<AwardDoc>) || model<AwardDoc>("Award", AwardSchema);
