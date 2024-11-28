/* eslint-disable @typescript-eslint/no-unused-vars */
import dbConnect from "@/lib/dbConnect";
import { ContentModel } from "@/models/content.model";
import { TagsModel } from "@/models/tags.model";
import {
  TUpdateContentSchema,
  updateContentSchema,
} from "@/schemas/content.schemas";

// Get session from next auth
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function PUT(request: Request, response: Response) {
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

    const {
      contentId,
      tags,
      title,
      type,
      link,
      content,
    }: TUpdateContentSchema = await request.json();

    const parsed = updateContentSchema.safeParse({
      contentId,
      tags,
      title,
      type,
      link,
      content,
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

    // Todo: Create and update tags
    let allTagTitles: string[] = [];
    if (tags && tags.length !== 0) {
      // Find existing tags
      const existingTags = await TagsModel.find({ title: { $in: tags } });
      const existingTagNames = existingTags.map((tag) => tag.title);

      // Filter out duplicate tags
      const newTagNames = tags.filter((tag) => !existingTagNames.includes(tag));

      // Create new tags
      const newTags = await TagsModel.insertMany(
        newTagNames.map((tag) => ({ title: tag }))
      );

      // Merge New and Old Tags
      allTagTitles = [...existingTagNames, ...newTags.map((tag) => tag.title)];
    }

    const updatedContent = await ContentModel.findOneAndUpdate(
      { _id: contentId, userId: session.user._id },
      {
        $set: {
          tags: allTagTitles,
          title,
          type,
          link,
          content,
        },
      },
      {
        new: true,
      }
    );

    if (!updatedContent) {
      return Response.json(
        {
          success: false,
          message: "Could not update content",
        },
        { status: 403 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Content updated successfully",
        data: { updatedContent },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error updating content", error);
    return Response.json(
      {
        success: false,
        message: "Error updating content",
      },
      {
        status: 500,
      }
    );
  }
}
