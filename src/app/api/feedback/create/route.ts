import dbConnect from "@/lib/dbConnect";
import { FeedbackModel } from "@/models/feedback.model";
import { feedbackSchema, TFeedbackSchema } from "@/schemas/feedback.schemas";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const {
      quote,
      name,
      designation,
      src,
      linkedinURL,
      twitterURL,
    }: TFeedbackSchema = await request.json();

    const parsed = feedbackSchema.safeParse({
      quote,
      name,
      designation,
      src,
      linkedinURL,
      twitterURL,
    });
    if (!parsed.success) {
      return Response.json(
        {
          success: false,
          message: parsed.error.message,
        },
        { status: 403 }
      );
    }

    const newFeedback = await FeedbackModel.create({
      quote,
      name,
      designation,
      src:
        src ||
        "https://images.unsplash.com/photo-1569516449983-5d9964272257?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      linkedinURL,
      twitterURL: twitterURL || "",
    });

    if (!newFeedback) {
      return Response.json(
        {
          success: false,
          message: "Could not create feedback",
        },
        { status: 403 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Feedback created successfully",
        data: newFeedback,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error creating feedback", error);
    return Response.json(
      {
        success: false,
        message: "Error creating feedback",
      },
      {
        status: 500,
      }
    );
  }
}
