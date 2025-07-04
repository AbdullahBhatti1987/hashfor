import connectDB from "../../../../lib/db";
import AuthModel from "@/model/Auth.model";

export const POST = async (req) => {
  try {
    await connectDB();
    const { email, otp } = await req.json();

    const user = await AuthModel.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    if (user.resetPasswordOtp !== otp) {
      return new Response(JSON.stringify({ error: "Invalid OTP" }), {
        status: 400,
      });
    }

    if (user.resetPasswordOtpExpiry < new Date()) {
      return new Response(JSON.stringify({ error: "OTP has expired" }), {
        status: 400,
      });
    }

    // Clear OTP fields after successful verification
    user.resetPasswordOtp = undefined;
    user.resetPasswordOtpExpiry = undefined;
    await user.save();

    return new Response(
      JSON.stringify({ message: "OTP verified successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
