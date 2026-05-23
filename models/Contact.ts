import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const ContactSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    ip: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true }
);

export type ContactDoc = InferSchemaType<typeof ContactSchema> & { _id: unknown };
export const Contact: Model<ContactDoc> =
  (models.Contact as Model<ContactDoc>) || model<ContactDoc>("Contact", ContactSchema);
