// import mongoose from "mongoose";

// const AuthSchema = new mongoose.Schema(
//   {
//     referralCode: {
//       type: String,
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//     contactNo: {
//       type: String,
//       required: true,
//     },
//     walletAddress: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     otp: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

// const AuthModel = mongoose.models.Auth || mongoose.model("Auth", AuthSchema);
// export default AuthModel;


import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema(
  {
    referralCode: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordOtp: {
      type: String,
    },
    resetPasswordOtpExpiry: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

AuthSchema.methods.comparePassword = async function (candidatePassword) {
  return candidatePassword === this.password;
};

const AuthModel = mongoose.models.Auth || mongoose.model("Auth", AuthSchema);
export default AuthModel;
