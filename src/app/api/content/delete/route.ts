import dbConnect from "@/lib/dbConnect";
import { ContentModel } from "@/models/content.model";

// Get session from next auth
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import {
  deleteContentSchema,
  TDeleteContentSchema,
} from "@/schemas/content.schemas";

export async function DELETE(request: Request) {
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

    const { contentId }: TDeleteContentSchema = await request.json();

    const parsed = deleteContentSchema.safeParse({
      contentId,
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

    const content = await ContentModel.findOneAndDelete({
      _id: contentId,
      userId: session.user._id,
    });

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
        message: "Content deleted successfully",
        data: content,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error deleting content", error);
    return Response.json(
      {
        success: false,
        message: "Error deleting content",
      },
      {
        status: 500,
      }
    );
  }
}
