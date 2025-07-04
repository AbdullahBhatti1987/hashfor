import connectDB from "@/lib/db";
import AuthModel from "@/model/Auth.model";
import BuyPackageModel from "@/model/BuyPackage.model";
import CommissionsModel from "@/model/Commissions.model";
import CompanyCommissionModel from "@/model/companyCommission.model";
import PackageModel from "@/model/create-package.model";
import DailyEarningModel from "@/model/dailyEarning.model";
import WithdrawModel from "@/model/Withdraw.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const userCount = await AuthModel.countDocuments({ role: "user" });
    const packageCount = await PackageModel.countDocuments({
      status: "active",
    });
    const result = await WithdrawModel.aggregate([
      {
        $match: { status: { $ne: "Rejected" } },
      },
      {
        $group: {
          _id: null,
          totalAmount: {
            $sum: {
              $toDouble: "$withdrawAmount",
            },
          },
        },
      },
    ]);

    const totalWithdrawAmount = result[0]?.totalAmount || 0;

    const commission1 = await CommissionsModel.find({});
    const totalCommission1 = commission1.reduce(
      (sum, c) => sum + (c.amount || 0),
      0
    );

    const commission2 = await CompanyCommissionModel.find({});
    const totalCommission2 = commission2.reduce((sum, c) => {
      const amount = parseFloat(c.CommissionAmount || "0");
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);
    const totalCommission = totalCommission1 + totalCommission2;

    const earning = await DailyEarningModel.find({});
    const totalEarning = earning.reduce(
      (sum, e) => sum + (e.earningAmount || 0),
      0
    );
    const buyPackage = await BuyPackageModel.aggregate([
      {
        $match: {
          status: "active", // filter only active records
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$packageAmount" },
        },
      },
    ]);

    const totalBoughtPackageAmount = buyPackage[0]?.totalAmount || 0;
    // console.log("Total Active Package Amount:", totalBoughtPackageAmount);

    return NextResponse.json(
      {
        message: "User daily earning retrieved successfully",
        userCount,
        packageCount,
        totalWithdrawAmount,
        totalCommission,
        totalEarning,
        totalBoughtPackageAmount,
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
