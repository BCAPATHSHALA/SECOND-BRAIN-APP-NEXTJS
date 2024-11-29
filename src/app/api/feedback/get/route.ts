import dbConnect from "@/lib/dbConnect";
import { FeedbackModel } from "@/models/feedback.model";

export async function GET() {
  await dbConnect();

  try {
    const feedbacks = await FeedbackModel.find().sort({ createdAt: -1 });

    if (!feedbacks) {
      return Response.json(
        {
          success: false,
          message: "Feedbacks not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Feedbacks fetched successfully",
        data: feedbacks,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching feedbacks", error);
    return Response.json(
      {
        success: false,
        message: "Error fetching feedbacks",
      },
      {
        status: 500,
      }
    );
  }
}
