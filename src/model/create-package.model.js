import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema(
  {
    packageName: {
      type: String,
      required: true,
    },
    packageAmount: {
      type: String,
      required: true,
    },
    packageDailyPercentage: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
);

const PackageModel =
  mongoose.models.Package || mongoose.model("Package", PackageSchema);
export default PackageModel;
