import { NextResponse } from "next/server";
import connectDB from "@/lib/db"; // Make sure this connects to your MongoDB
import AuthModel from "@/model/Auth.model";

// GET method to fetch all users
export async function GET() {
  try {
    await connectDB(); // Ensure DB is connected

    // const users = await AuthModel.find().select("-password -resetPasswordOtp -resetPasswordOtpExpiry"); // Exclude sensitive fields
    const users = await AuthModel.find().select(); // Exclude sensitive fields
    // console.log("Fetched users:", users);
    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    // console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
