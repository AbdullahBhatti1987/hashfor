import cron from "node-cron";
import connectDB from "@/lib/db";
import BuyPackageModel from "@/model/BuyPackage.model";
import DailyEarningModel from "@/model/dailyEarning.model";

const isTesting = true;

// Function to get Pakistan timezone date
const getPakistanDate = () => {
  const now = new Date();
  const pakistanTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Karachi" })
  );
  return pakistanTime;
};

export function startEarningCronJob() {
  cron.schedule(isTesting ? "* * * * *" : "0 0 * * *", async () => {
    try {
      await connectDB();

      // Use Pakistan timezone
      const now = getPakistanDate();
      const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);

      const activePackages = await BuyPackageModel.find({
        expiryDate: { $gt: now },
        $or: [
          { lastCreditedAt: { $lt: oneMinuteAgo } },
          { lastCreditedAt: { $exists: false } },
        ],
      });

      for (const pkg of activePackages) {
        const percentage = isTesting
          ? pkg.packageDailyPercentage / (24 * 60)
          : pkg.packageDailyPercentage;

        const earningAmount = (pkg.packageAmount * percentage) / 100;

        await DailyEarningModel.create({
          userId: pkg.userId,
          packageId: pkg.packageId,
          packageName: pkg.packageName,
          packageAmount: pkg.packageAmount,
          percentage,
          earningAmount,
          creditedAt: now,
        });

        pkg.lastCreditedAt = now;
        pkg.totalEarning += earningAmount;
        await pkg.save();
      }

      // console.log(`⏱ Cron ran: ${now}, processed: ${activePackages.length}`);
    } catch (err) {
      // console.error("🔥 Cron job error:", err);
    }
  });
}
