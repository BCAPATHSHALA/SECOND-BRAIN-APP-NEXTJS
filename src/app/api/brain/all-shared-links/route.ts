import dbConnect from "@/lib/dbConnect";

import { LinkModel } from "@/models/link.model";

export async function GET() {
  await dbConnect();

  try {
    const sharedLinks = await LinkModel.find()
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    if (!sharedLinks) {
      return Response.json(
        {
          success: false,
          message: "No shared links found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Shared links fetched successfully",
        data: sharedLinks,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error founding all shared links:", error);
    return Response.json(
      {
        success: false,
        message: "Error founding all shared links",
      },
      {
        status: 500,
      }
    );
  }
}
