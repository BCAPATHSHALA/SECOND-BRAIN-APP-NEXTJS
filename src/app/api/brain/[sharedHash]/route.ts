import dbConnect from "@/lib/dbConnect";
import {
  TGetSharedLinkSchema,
  getSharedLinkSchema,
} from "@/schemas/brain.schemas";
import { LinkModel } from "@/models/link.model";
import { ContentModel } from "@/models/content.model";

export async function GET(
  request: Request,
  { params }: { params: { sharedHash: string } }
) {
  await dbConnect();

  try {
     const { sharedHash }: TGetSharedLinkSchema = params;

    const parsed = getSharedLinkSchema.safeParse({
      sharedHash,
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

    const link = await LinkModel.findOne({ hash: sharedHash });

    if (!link) {
      return Response.json(
        {
          success: false,
          message: "Link not found",
        },
        {
          status: 404,
        }
      );
    }

    // I want to share my brain to someone, so i want to get my content
    const content = await ContentModel.find({ userId: link.userId })
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    if (!content) {
      return Response.json(
        {
          success: false,
          message: "Content not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Content found successfully",
        data: content,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error founding shared link content:", error);
    return Response.json(
      {
        success: false,
        message: "Error founding shared link content",
      },
      {
        status: 500,
      }
    );
  }
}
