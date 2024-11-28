/* eslint-disable @typescript-eslint/no-unused-vars */
import dbConnect from "@/lib/dbConnect";
import { LinkModel } from "@/models/link.model";
import { UserModel } from "@/models/user.model";
import mongoose from "mongoose";

export async function GET() {
  await dbConnect();

  //! Interview Based Question: Ensure models are registered
  console.log(mongoose.modelNames()); // Should print ["Users", "Links"]

  try {
    const session = await UserModel.find();
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
