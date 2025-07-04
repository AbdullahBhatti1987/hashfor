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
  await connectDB();
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  try {
    // Find the verified contact message
    const contactMessage = await ContactMessage.findOne({
      email,
      isVerified: true,
    });
    if (!contactMessage) {
      return NextResponse.json(
        { error: "Please verify your email first." },
        { status: 400 }
      );
    }

    // Send email to admin
    await transporter.sendMail({
      to: "hashfor38@gmail.com",
      subject: `Contact Us Message from ${contactMessage.name}`,
      html: `
        <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;border:1px solid #ddd;border-radius:8px;padding:20px;background-color:#f9f9f9;">
          <h2 style="color:#4a90e2;">New Contact Us Message</h2>
          <p><strong>Name:</strong> ${contactMessage.name}</p>
          <p><strong>Email:</strong> ${contactMessage.email}</p>
          <p><strong>Message:</strong></p>
          <div style="background:#fff;border-radius:6px;padding:15px 20px;margin:10px 0;color:#333;">${
            contactMessage.message
          }</div>
          <hr style="margin:30px 0;border:none;border-top:1px solid #eee;">
          <p style="font-size:14px;color:#aaa;text-align:center;">&copy; ${new Date().getFullYear()} Hashfor. All rights reserved.</p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Contact message sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Error processing contact message:", error);
    return NextResponse.json(
      { error: "Failed to process message." },
      { status: 500 }
    );
  }
}
