import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ContactMessage from "@/model/ContactMessage.model";

export async function POST(request) {
  try {
    await connectDB();
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const contactMessage = await ContactMessage.findOne({ email });
    if (!contactMessage) {
      return NextResponse.json(
        { error: "Contact message not found" },
        { status: 404 }
      );
    }

    if (contactMessage.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    if (contactMessage.otpExpiry < new Date()) {
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }

    // Mark as verified and clear OTP fields
    contactMessage.isVerified = true;
    contactMessage.otp = undefined;
    contactMessage.otpExpiry = undefined;
    await contactMessage.save();

    return NextResponse.json(
      { message: "OTP verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
