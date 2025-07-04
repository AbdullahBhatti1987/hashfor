import connectDB from "@/lib/db";
import AuthModel from "@/model/Auth.model";
import CommissionsModel from "@/model/Commissions.model";

import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // Connect to DB
    await connectDB();
    const authHeader = req.headers.get("authorization");
    const userId = req.headers.get("x-user-id");
    console.log(authHeader, "authHeader");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const referralCode = authHeader.split(" ")[1];

    if (!referralCode) {
      return NextResponse.json(
        { error: "referralCode is required" },
        { status: 400 }
      );
    }
    // Fetch all packages
    const ReferralChildren = await AuthModel.find({ referralCode });
    const type = "direct";
    const getDirectCommision = await CommissionsModel.find({
      toUserId: userId,
      type,
    });

    return NextResponse.json(
      {
        message: "Referral fetched successfully",
        ReferralChildren,
        getDirectCommision,
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Error fetching packages:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
