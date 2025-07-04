import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ContactMessage from "@/model/ContactMessage.model";
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
  const { email, name, message } = await request.json();

  if (!email || !name || !message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  await connectDB();

  try {
    // Check if user is already verified
    const existingMessage = await ContactMessage.findOne({
      email,
      isVerified: true,
    });

    if (existingMessage) {
      // User is already verified, create new message record and send directly to admin
      const newMessage = await ContactMessage.create({
        name,
        email,
        message,
        isVerified: true,
        createdAt: new Date(),
      });

      // Send email to admin directly
      await transporter.sendMail({
        to: "hashfor38@gmail.com",
        subject: `Contact Us Message from ${name}`,
        html: `
          <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;border:1px solid #ddd;border-radius:8px;padding:20px;background-color:#f9f9f9;">
            <h2 style="color:#4a90e2;">New Contact Us Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background:#fff;border-radius:6px;padding:15px 20px;margin:10px 0;color:#333;">${message}</div>
            <hr style="margin:30px 0;border:none;border-top:1px solid #eee;">
            <p style="font-size:14px;color:#aaa;text-align:center;">&copy; ${new Date().getFullYear()} Hashfor. All rights reserved.</p>
          </div>
        `,
      });

      return NextResponse.json(
        { message: "Message sent successfully", alreadyVerified: true },
        { status: 200 }
      );
    }

    // User not verified, send OTP
    const OTP = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    // Save or update contact message with OTP
    await ContactMessage.findOneAndUpdate(
      { email },
      {
        name,
        email,
        message,
        otp: OTP.toString(),
        otpExpiry,
        isVerified: false,
      },
      { upsert: true, new: true }
    );

    await transporter.sendMail({
      to: email,
      subject: "Contact Form Verification - OTP Code",
      html: `
        <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
          <div style="text-align: center; padding-bottom: 20px;">
            <h2 style="color: #4a90e2;">Email Verification Required</h2>
            <p style="font-size: 16px; color: #555;">Please enter the verification code below to submit your contact form:</p>
          </div>
          
          <div style="background-color: #fff; border-radius: 6px; padding: 20px; text-align: center; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
            <p style="margin: 0; font-size: 18px; color: #333;">Your Verification Code:</p>
            <h1 style="margin: 10px 0; color: #4CAF50; font-size: 32px; letter-spacing: 4px;">${OTP}</h1>
            <p style="font-size: 16px; color: #777;">This code will expire in 10 minutes.</p>
          </div>

          <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;">

          <p style="font-size: 14px; color: #aaa; text-align: center;">
            If you didn't request this verification, please ignore this email.<br/>
            &copy; ${new Date().getFullYear()} Hashfor. All rights reserved.
          </p>
        </div>
      `,
    });

    // Return OTP for testing — in production, don't send OTP back to frontend
    return NextResponse.json(
      { message: "OTP sent successfully", otp: OTP, alreadyVerified: false },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Error sending OTP:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
