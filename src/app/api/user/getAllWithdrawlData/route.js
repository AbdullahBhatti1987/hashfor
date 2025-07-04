import connectDB from "@/lib/db";
import WithdrawModel from "@/model/Withdraw.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const allData = await WithdrawModel.find({})
      .select(
        "_id userId packageId withdrawAmount from status buyDate expiryDate createdAt"
      )
      .lean();

    return NextResponse.json(
      {
        success: true,
        allData,
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch withdrawals",
      },
      { status: 500 }
    );
  }
}
