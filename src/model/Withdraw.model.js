// import mongoose from "mongoose";

// const WithdrawSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     packageId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Package",
//       required: true,
//     },
//     withdrawAmount: {
//       type: String,
//       required: true,
//     },
//     from: {
//       type: String,
//       required: true,
//     },
//     buyDate: {
//       type: Date,
//       required: true,
//     },
//     expiryDate: {
//       type: Date,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["pending", "success", "reject"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// const WithdrawModel =
//   mongoose.models.Withdraw || mongoose.model("Withdraw", WithdrawSchema);
// export default WithdrawModel;

// model/Withdraw.model.js
import mongoose from "mongoose";

const WithdrawSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    withdrawAmount: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "success", "reject"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const WithdrawModel =
  mongoose.models.Withdraw || mongoose.model("Withdraw", WithdrawSchema);
export default WithdrawModel;
