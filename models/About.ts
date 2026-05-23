import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const AboutSchema = new Schema(
  {
    singleton: { type: String, default: "about", unique: true },
    name: { type: String, default: "Meraj Hossain" },
    headline: { type: String, default: "" },
    lead: { type: String, default: "" },
    description: { type: String, default: "" },
    location: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    avatar: {
      url: String,
      publicId: String,
    },
    resume: {
      url: String,
      publicId: String,
    },
    socials: {
      type: [
        new Schema(
          { label: String, url: String },
          { _id: false }
        ),
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export type AboutDoc = InferSchemaType<typeof AboutSchema> & { _id: unknown };
export const About: Model<AboutDoc> =
  (models.About as Model<AboutDoc>) || model<AboutDoc>("About", AboutSchema);
