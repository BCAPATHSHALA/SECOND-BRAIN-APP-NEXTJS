import { Schema, model, models } from "mongoose";

const TagsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const TagsModel = models.Tags || model("Tags", TagsSchema);
