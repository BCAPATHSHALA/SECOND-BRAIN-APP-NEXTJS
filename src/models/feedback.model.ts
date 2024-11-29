import { Schema, model, models } from "mongoose";

const FeedbackSchema = new Schema(
  {
    linkedinURL: {
      type: String,
      required: true,
    },
    twitterURL: {
      type: String,
    },
    quote: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    src: {
      type: String,
    },
  },
  { timestamps: true }
);

export const FeedbackModel =
  models.Feedbacks || model("Feedbacks", FeedbackSchema);
