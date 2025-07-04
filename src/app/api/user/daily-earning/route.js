import { NextResponse } from "next/server";
// import cron from "node-cron";
import connectDB from "@/lib/db";
import DailyEarningModel from "@/model/dailyEarning.model";

export async function GET(req) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");

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

    const userEarning = await DailyEarningModel.find({ userId });

    return NextResponse.json(
      {
        message: "Daily Earning detail retrieved successfully",
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
