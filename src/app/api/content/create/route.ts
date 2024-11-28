import dbConnect from "@/lib/dbConnect";
import { ContentModel } from "@/models/content.model";
import { TagsModel } from "@/models/tags.model";
import { contentSchema, TContentSchema } from "@/schemas/content.schemas";

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

    const { tags, title, type, link, content }: TContentSchema =
      await request.json();

    const parsed = contentSchema.safeParse({
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

    const newContent = await ContentModel.create({
      userId: session.user._id,
      tags: allTagTitles,
      title,
      type,
      link,
      content,
    });

    if (!newContent) {
      return Response.json(
        {
          success: false,
          message: "Could not create content",
        },
        { status: 403 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Content created successfully",
        data: { newContent },
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error creating content", error);
    return Response.json(
      {
        success: false,
        message: "Error creating content",
      },
      {
        status: 500,
      }
    );
  }
}
