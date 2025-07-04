import mongoose from "mongoose";

const DailyEarningSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    packageName: {
      type: String,
      required: true,
    },
    packageAmount: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    earningAmount: {
      type: Number,
      required: true,
    },
    creditedAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const DailyEarningModel =
  mongoose.models.DailyEarning || mongoose.model("DailyEarning", DailyEarningSchema);
export default DailyEarningModel; 