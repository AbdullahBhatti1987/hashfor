import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import BuyPackageModel from "@/model/BuyPackage.model";
import WithdrawModel from "@/model/Withdraw.model";

export async function POST(req) {
  await connectDB();

  try {
    const { userId, withdrawAmount, from, status } = await req.json();

    // console.log(userId, withdrawAmount, from, status, "daily earning data");

    // Validate required fields
    if (!userId || !withdrawAmount || !from) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if the package exists for the user
    // const existedBoughtPackage = await BuyPackageModel.findOne({
    //   userId,
    // });

    // if (!existedBoughtPackage) {
    //   return NextResponse.json(
    //     { error: "Package not found for this user" },
    //     { status: 404 }
    //   );
    // }

    // Create the withdrawal record
    const withDrawData = await WithdrawModel.create({
      userId,
      withdrawAmount,
      from,
      status: status || "pending",
    });

    return NextResponse.json(
      { message: "Withdrawal request submitted", data: withDrawData },
      { status: 201 }
    );
  } catch (error) {
    // console.error("❌ Error in withdrawal API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
