import connectDB from "@/lib/db";
import PackageModel from "@/model/create-package.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to DB
    await connectDB();

    // Fetch all packages
    const packages = await PackageModel.find({});

    return NextResponse.json(
      { message: "Packages fetched successfully", packages },
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
