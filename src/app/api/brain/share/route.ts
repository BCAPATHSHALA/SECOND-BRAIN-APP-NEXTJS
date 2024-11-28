import dbConnect from "@/lib/dbConnect";
import {
  createSharedLinkSchema,
  TCreateSharedLinkSchema,
} from "@/schemas/brain.schemas";
import { LinkModel } from "@/models/link.model";
import { createHashRandom } from "@/utils/constant";

// Get session from next auth
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(request: Request) {
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

    const { share }: TCreateSharedLinkSchema = await request.json();

    const parsed = createSharedLinkSchema.safeParse({
      share,
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

    if (share) {
      // Create link, if share is true and link does not exist for user because i want to create only one link per user
      const existingLink = await LinkModel.findOne({
        userId: session.user._id,
      });
      if (existingLink) {
        return Response.json(
          {
            success: true,
            message: "Link shared successfully",
            hash: existingLink.hash,
          },
          { status: 201 }
        );
      }

      const hash = createHashRandom(10);
      console.log("Hash:", hash);

      const newLink = await LinkModel.create({
        userId: session.user._id,
        hash,
      });

      if (!newLink) {
        return Response.json(
          {
            success: false,
            message: "Link could not created",
          },
          { status: 403 }
        );
      }

      return Response.json(
        {
          success: true,
          message: "Link shared successfully",
          hash,
        },
        { status: 201 }
      );
    } else {
      // Remove link because share is false
      const deletedLink = await LinkModel.findOneAndDelete({
        userId: session.user._id,
      });

      if (!deletedLink) {
        return Response.json(
          {
            success: false,
            message: "Link not found",
          },
          { status: 404 }
        );
      }

      return Response.json(
        {
          success: true,
          message: "Link removed successfully",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("Error creating shared link:", error);
    return Response.json(
      {
        success: false,
        message: "Error creating shared link",
      },
      {
        status: 500,
      }
    );
  }
}
