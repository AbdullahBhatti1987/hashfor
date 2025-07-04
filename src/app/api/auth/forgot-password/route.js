// import connectDB from "../../../../lib/db";
// import AuthModel from "@/model/Auth.model";
// import { generateOTP } from "@/lib/helpers";

// export const POST = async (req) => {
//   try {
//     await connectDB();
//     const { email } = await req.json();

//     const user = await AuthModel.findOne({ email });
//     if (!user) {
//       return new Response(JSON.stringify({ error: "Email not found" }), {
//         status: 404,
//       });
//     }

//     const otp = generateOTP();
//     user.resetPasswordOtp = otp;
//     user.resetPasswordOtpExpiry = Date.now() + 3600000;
//     await user.save();

//     return new Response(JSON.stringify({
//       message: "OTP sent successfully",
//       otp
//     }), { status: 200 });

//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//     });
//   }
// };

import connectDB from "../../../../lib/db";
import AuthModel from "@/model/Auth.model";
import { generateOTP, getOtpExpiry } from "@/lib/helpers";
import { sendOtpEmail } from "@/lib/emailSender";

export const POST = async (req) => {
  try {
    await connectDB();
    const { email } = await req.json();

    const user = await AuthModel.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "Email not registered" }), {
        status: 404,
      });
    }

    const otp = generateOTP();
    const otpExpiry = getOtpExpiry();

    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpiry = otpExpiry;
    await user.save();

    // Send OTP via email
    await sendOtpEmail(email, otp);

    return new Response(JSON.stringify({ message: "OTP sent to your email" }), {
      status: 200,
    });
  } catch (error) {
    // console.error("Forgot password error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
