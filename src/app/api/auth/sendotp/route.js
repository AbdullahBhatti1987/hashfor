import connectDB from "@/lib/db";
import AuthModel from "@/model/Auth.model";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create transporter (use real credentials in production)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "hashfor38@gmail.com",
    pass: "taxyzjuvjasapmru",
  },
});

export async function POST(request) {
  const { email, referralCode } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  await connectDB();
  const OTP = Math.floor(1000 + Math.random() * 9000);
  const existedReferralCode = await AuthModel.findOne({
    code: referralCode,
  });
  try {
    if (!existedReferralCode) {
      return NextResponse.json(
        { error: "Invalid referral code" },
        { status: 400 }
      );
    }
    await transporter.sendMail({
      to: email,
      subject: "Your OTP Code",
      html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
      <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h2 style="color: #333333;">🔐 One-Time Password (OTP)</h2>
        <p style="font-size: 16px; color: #555555;">
          Please use the following OTP to complete your verification:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="display: inline-block; font-size: 32px; font-weight: bold; color: #4A90E2; background-color: #f0f8ff; padding: 10px 20px; border-radius: 6px;">
            ${OTP}
          </span>
        </div>
        <p style="font-size: 14px; color: #999999;">
          This code will expire in 10 minutes. Please do not share it with anyone.
        </p>
        <hr style="margin: 30px 0;">
        <p style="font-size: 12px; color: #cccccc;">
          If you did not request this code, you can ignore this email.
        </p>
      </div>
    </div>
  `,
    });

    // Return OTP for testing — in production, don't send OTP back to frontend
    return NextResponse.json(
      { message: "OTP sent successfully", otp: OTP },
      { status: 200 }
    );
    // return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    // console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
