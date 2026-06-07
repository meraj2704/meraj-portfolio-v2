import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const ClientSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    logo: {
      url: String,
      publicId: String,
    },
    rotate: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type ClientDoc = InferSchemaType<typeof ClientSchema> & { _id: unknown };
export const Client: Model<ClientDoc> =
  (models.Client as Model<ClientDoc>) || model<ClientDoc>("Client", ClientSchema);
