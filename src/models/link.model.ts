import { Schema, model, models } from "mongoose";

const LinkSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      unique: true,
    },
    hash: {
      type: String,
    },
  },
  { timestamps: true }
);

export const LinkModel = models.Links || model("Links", LinkSchema);
