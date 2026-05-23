import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const StackSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    percent: { type: String, default: "" },
    desc: { type: String, default: "" },
    icon: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type StackDoc = InferSchemaType<typeof StackSchema> & { _id: unknown };
export const Stack: Model<StackDoc> =
  (models.Stack as Model<StackDoc>) || model<StackDoc>("Stack", StackSchema);
