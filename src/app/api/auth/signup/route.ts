/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import { signupSchema, TSignupSchema } from "@/schemas/user.schemas";

export async function POST(request: Request) {
  await dbConnect();

  try {
    // Step 1: Get data from user
    const { username, password, confirmPassword }: TSignupSchema =
      await request.json();

    // Step 2: Validate user data using the schema
    const parsed = signupSchema.safeParse({
      username,
      password,
      confirmPassword,
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

    // Step 3: Validate the username is exist with database
    const existingVerifiedUserByUsername = await UserModel.findOne({
      username,
    });

    if (existingVerifiedUserByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already exist",
        },
        { status: 403 }
      );
    }

    // Step 4: Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      username,
      password: hashedPassword,
      role: "USER",
    });

    // Step 5: Return response to the user
    return Response.json(
      {
        success: true,
        message: "User registered successfully",
        data: username,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error registering user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
