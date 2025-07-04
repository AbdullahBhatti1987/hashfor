import connectDB from "@/lib/db"; // your DB connection
import CommissionsModel from "@/model/Commissions.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { userId, packageId, packageAmount, commissions } = body;

    if (!userId || !packageId || !commissions || !Array.isArray(commissions)) {
      return NextResponse.json(
        { success: false, error: "Invalid data format." },
        { status: 400 }
      );
    }

    const docs = commissions.map((c) => ({
      userId,
      packageId,
      packageAmount,
      toUserId: c.toUserId,
      type: c.type,
      percent: c.percent,
      amount: c.amount,
    }));

    await CommissionsModel.insertMany(docs);

    return NextResponse.json({ success: true, count: docs.length });
  } catch (error) {
    // console.error("Error saving commissions:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const toUserId = searchParams.get("toUserId");
    if (!toUserId) {
      return NextResponse.json(
        { success: false, error: "toUserId is required" },
        { status: 400 }
      );
    }
    const commissions = await CommissionsModel.find({ toUserId });
    const totalAmount = commissions.reduce(
      (sum, c) => sum + (c.amount || 0),
      0
    );
    return NextResponse.json({ success: true, totalAmount });
  } catch (error) {
    // console.error("Error fetching commission:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
