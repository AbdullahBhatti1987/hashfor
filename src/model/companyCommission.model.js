// import mongoose from "mongoose";

// const CompanyCommissionSchema = new mongoose.Schema(
//   {
//     user1: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "Auth", // Commission recipient
//     },
//     user2: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "Auth", // Commission recipient
//     },

//     toUserId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "Auth", // Commission recipient
//     },
//     CommissionAmount: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const CompanyCommissionModel =
//   mongoose.models.Commissions ||
//   mongoose.model("CompanyCommission", CompanyCommissionSchema);
// export default CompanyCommissionModel;
// models/CompanyCommission.model.js
import mongoose from "mongoose";

const CompanyCommissionSchema = new mongoose.Schema(
  {
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    CommissionAmount: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "paid",
    },
  },
  { timestamps: true }
);

const CompanyCommissionModel =
  mongoose.models.CompanyCommission ||
  mongoose.model("CompanyCommission", CompanyCommissionSchema);

export default CompanyCommissionModel;
