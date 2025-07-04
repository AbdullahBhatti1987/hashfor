import AuthModel from "@/model/Auth.model";
import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function POST(request) {
  try {
    const { userID, password } = await request.json();
    // console.log("Login attempt:", userID, password);

    if (!userID || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const existedUser = await AuthModel.findOne({
      $or: [{ email: userID }],
    });

    if (!existedUser) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, existedUser.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }
    const token = jwt.sign(
      {
        id: existedUser._id,
        email: existedUser.email,
        name: existedUser.name,
        role: existedUser.role,
        referralCode: existedUser.referralCode,
        code: existedUser.code,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      { message: "Login successful", user: existedUser, token },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Login failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
