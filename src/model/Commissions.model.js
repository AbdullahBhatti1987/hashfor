// import mongoose from "mongoose";

// const CommissionSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     }, // the buyer
//     packageId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Package",
//       required: true,
//     },
//     to: { type: String, required: true }, // wallet address of the parent
//     type: { type: String, enum: ["direct", "indirect"], required: true },
//     percent: { type: Number, required: true },
//     amount: { type: Number, required: true }, // USD value or USDT sent
//   },
//   { timestamps: true }
// );

// // export default mongoose.models.Commission ||
// //   mongoose.model("Commission", CommissionSchema);
// const CommissionModel =
//   mongoose.models.Commission || mongoose.model("Commission", CommissionSchema);
// export default CommissionModel;
import mongoose from "mongoose";

const CommissionsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Buyer ID
      required: true,
      ref: "Auth", // Change to your actual User model name
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Package",
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Auth", // Commission recipient
    },
    type: {
      type: String,
      enum: ["direct", "indirect"],
      required: true,
    },
    packageAmount: {
      type: String,
      required: true,
    },
    percent: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const CommissionsModel =
  mongoose.models.Commissions ||
  mongoose.model("Commissions", CommissionsSchema);
export default CommissionsModel;
