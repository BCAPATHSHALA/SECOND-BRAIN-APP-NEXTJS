import dbConnect from "@/lib/dbConnect";
import { ContentModel } from "@/models/content.model";

// Get session from next auth
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET() {
  await dbConnect();

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized user",
        },
        { status: 401 }
      );
    }

    const content = await ContentModel.find({
      userId: session.user._id,
    }).populate("userId", "username");

    if (!content) {
      return Response.json(
        {
          success: false,
          message: "Content not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Content fetched successfully",
        data: content,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching content", error);
    return Response.json(
      {
        success: false,
        message: "Error fetching content",
      },
      {
        status: 500,
      }
    );
  }
}
