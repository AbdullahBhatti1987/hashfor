// app/api/cron-daily/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import DailyEarningModel from "@/model/dailyEarning.model";
import BuyPackageModel from "@/model/BuyPackage.model";

export async function POST() {
  try {
    await connectDB();

    const activePackages = await BuyPackageModel.find({
      expiryDate: { $gt: new Date() },
    });

    for (const pkg of activePackages) {
      const {
        _id: packageId,
        userId,
        packageName,
        packageAmount,
        packageDailyPercentage,
      } = pkg;

      const earningAmount = (packageAmount * packageDailyPercentage) / 100;

      try {
        await DailyEarningModel.create({
          userId,
          packageId,
          packageName,
          packageAmount,
          percentage: packageDailyPercentage,
          earningAmount,
          creditedAt: new Date(),
        });
        // console.log(`✅ Saved earning for user ${userId}: $${earningAmount}`);
      } catch (err) {
        // console.error("❌ DB save error:", err.message);
      }
    }

    return NextResponse.json({ success: true, message: "✅ Earnings posted" });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
