import connectDB from "@/lib/db";
import DailyEarningModel from "@/model/dailyEarning.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const userEarning = await DailyEarningModel.find({});

    return NextResponse.json(
      {
        message: "User daily earning retrieved successfully",
        data: userEarning,
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
