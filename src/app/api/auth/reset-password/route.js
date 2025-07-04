// import connectDB from "../../../../lib/db";
// import AuthModel from "@/model/Auth.model";

// export const POST = async (req) => {
//   try {
//     await connectDB();
//     const { email, otp, newPassword } = await req.json();

//     // 1. Find the user
//     const user = await AuthModel.findOne({ email });
//     if (!user) {
//       return new Response(
//         JSON.stringify({ error: "User not found" }),
//         { status: 404 }
//       );
//     }

//     // 2. Verify OTP and expiry
//     if (user.resetPasswordOtp !== otp || user.resetPasswordOtpExpiry < new Date()) {
//       return new Response(
//         JSON.stringify({ error: "Invalid or expired OTP" }),
//         { status: 400 }
//       );
//     }

//     // 3. Validate password exists
//     if (!newPassword) {
//       return new Response(
//         JSON.stringify({ error: "Password is required" }),
//         { status: 400 }
//       );
//     }

//     // 4. Update the password
//     user.password = newPassword;
//     user.resetPasswordOtp = undefined;
//     user.resetPasswordOtpExpiry = undefined;

//     await user.save();

//     return new Response(
//       JSON.stringify({ message: "Password updated successfully" }),
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error("Reset password error:", error);
//     return new Response(
//       JSON.stringify({ error: error.message }),
//       { status: 500 }
//     );
//   }
// };

import connectDB from "../../../../lib/db";
import AuthModel from "@/model/Auth.model";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  try {
    await connectDB();
    const { email, newPassword } = await req.json();

    // 1. Find the user
    const user = await AuthModel.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    // 2. Verify OTP was previously verified (check if fields are cleared)
    if (user.resetPasswordOtp) {
      return new Response(JSON.stringify({ error: "OTP not verified" }), {
        status: 400,
      });
    }

    // 3. Hash and update password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    return new Response(
      JSON.stringify({ message: "Password reset successful" }),
      { status: 200 }
    );
  } catch (error) {
    // console.error("Reset password error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
