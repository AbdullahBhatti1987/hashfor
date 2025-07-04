import connectDB from "@/lib/db";
import BuyPackageModel from "@/model/BuyPackage.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to DB
    await connectDB();

    // Fetch all packages
    const BoughtPackages = await BuyPackageModel.find({});

    return NextResponse.json(
      { message: "Packages fetched successfully", BoughtPackages },
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
