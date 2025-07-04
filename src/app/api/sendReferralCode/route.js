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
  const body = await request.json();
  // Contact form: name, email, message
  if (body.name && body.email && body.message && !body.referralCode) {
    try {
      await transporter.sendMail({
        to: "hashfor38@gmail.com",
        subject: `Contact Us Message from ${body.name}`,
        html: `
          <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;border:1px solid #ddd;border-radius:8px;padding:20px;background-color:#f9f9f9;">
            <h2 style="color:#4a90e2;">New Contact Us Message</h2>
            <p><strong>Name:</strong> ${body.name}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Message:</strong></p>
            <div style="background:#fff;border-radius:6px;padding:15px 20px;margin:10px 0;color:#333;">${
              body.message
            }</div>
            <hr style="margin:30px 0;border:none;border-top:1px solid #eee;">
            <p style="font-size:14px;color:#aaa;text-align:center;">&copy; ${new Date().getFullYear()} Hashfor. All rights reserved.</p>
          </div>
        `,
      });
      return NextResponse.json(
        { message: "Contact message sent successfully" },
        { status: 200 }
      );
    } catch (error) {
      // console.error("Error sending contact message:", error);
      return NextResponse.json(
        { error: "Failed to send contact message" },
        { status: 500 }
      );
    }
  }

  const { email, referralCode, website, senderEmail } = body;
  // console.log("Received data:", {
  //   senderEmail,
  //   email,
  //   referralCode,
  //   website,
  // });
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    // Update walletAddress in AuthModel
    // const updatedUser = await AuthModel.findOneAndUpdate(
    //   { email: senderEmail },
    //   { walletAddress },
    //   { new: true }
    // );

    // if (!updatedUser) {
    //   return NextResponse.json({ error: "User not found" }, { status: 404 });
    // }

    // await transporter.sendMail({
    //   to: email,
    //   subject: "Referral Code",
    //   html: `<p>Your referral code is: <strong>${referralCode}</strong> and website link is <strong>${website}</strong></p>`,
    // });
    await transporter.sendMail({
      to: email,
      subject: `🎁 Your Exclusive Referral Code Which is Given By ${senderEmail}`,
      html: `
    <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
      <div style="text-align: center; padding-bottom: 20px;">
        <h2 style="color: #4a90e2;">Welcome to Our Community!</h2>
        <p style="font-size: 16px; color: #555;">Thanks for joining us. Here's your personal referral code:</p>
      </div>
      
      <div style="background-color: #fff; border-radius: 6px; padding: 20px; text-align: center; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <p style="margin: 0; font-size: 18px; color: #333;">Your Referral Code:</p>
        <h1 style="margin: 10px 0; color: #4CAF50;">${referralCode}</h1>
        <p style="font-size: 16px; color: #777;">Share this code with friends and earn rewards!</p>
      </div>

      <div style="margin-top: 30px; text-align: center;">
        <a href="${website}" target="_blank" style="text-decoration: none;">
          <button style="padding: 12px 24px; background-color: #4a90e2; color: #fff; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
            Visit Our Website
          </button>
        </a>
      </div>

      <hr style="margin: 40px 0; border: none; border-top: 1px solid #eee;">

      <p style="font-size: 14px; color: #aaa; text-align: center;">
        If you didn't request this email, please ignore it.<br/>
        &copy; ${new Date().getFullYear()} Hashfor. All rights reserved.
      </p>
    </div>
  `,
    });

    // Return referral code for testing — in production, don't send referral code back to frontend
    return NextResponse.json(
      { message: "Referral code sent successfully", referralCode },
      { status: 200 }
    );
    // return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    // console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send referral code" },
      { status: 500 }
    );
  }
}
