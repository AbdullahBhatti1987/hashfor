import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import WithdrawModel from "@/model/Withdraw.model";
import DailyEarningModel from "@/model/dailyEarning.model";
// import Commission from "@/app/userdashboard/comission/page";
import CompanyCommissionModel from "@/model/companyCommission.model";
import CommissionsModel from "@/model/Commissions.model";

export async function GET(req) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    console.log(authHeader, "authHeader");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = authHeader.split(" ")[1];

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const dailyEarning = await DailyEarningModel.find(
      { userId },
      { earningAmount: 1, _id: 0 } // include only earningAmount, exclude _id
    );
    const totalEarning = dailyEarning
      .reduce((acc, curr) => {
        const amt = parseFloat(curr.earningAmount || 0);
        return acc + (isNaN(amt) ? 0 : amt);
      }, 0)
      .toFixed(2);

    console.log("Total Earning:", totalEarning);

    const totalCommission = await CommissionsModel.find(
      { toUserId: userId },
      { amount: 1, _id: 0 } // include only amount, exclude _id
    );
    console.log("totalCommission", totalCommission);
    const companyCommission = await CompanyCommissionModel.find(
      { toUserId: userId },
      {
        CommissionAmount: 1,
        _id: 0,
      }
    );
    console.log("CompanyCommission", companyCommission);

    // Normalize both to same key
    const normalizedCommissions = [
      ...totalCommission.map((e) => ({ amount: e.amount })),
      ...companyCommission.map((e) => ({ amount: e.CommissionAmount })),
    ];

    console.log("Merged Commissions:", normalizedCommissions);
    const TotalCommission = normalizedCommissions
      .reduce((acc, curr) => {
        const amt = parseFloat(curr.amount || 0);
        return acc + (isNaN(amt) ? 0 : amt);
      }, 0)
      .toFixed(2);

    console.log("Total Combined Commission:", TotalCommission);

    return NextResponse.json(
      {
        message: "User Earning and Commission detail retrieved successfully",
        TotalCommission,
        totalEarning,
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
