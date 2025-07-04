import connectDB from "@/lib/db";
import PackageModel from "@/model/create-package.model";

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { packageName, packageAmount, packageDailyPercentage, status } =
      await request.json();
    // console.log(
    //   "package Data",
    //   packageName,
    //   packageAmount,
    //   packageDailyPercentage
    // );
    // Connect to DB
    await connectDB();

    // Check if package already exists
    const existedPackage = await PackageModel.findOne({ packageName });
    if (existedPackage) {
      return NextResponse.json(
        { error: "Package already exists" },
        { status: 409 }
      );
    }

    // Create package
    const newPackage = await PackageModel.create({
      packageName,
      packageAmount,
      packageDailyPercentage,
      status: status || "active",
    });
    if (newPackage) {
      const packageData = {
        _id: newPackage._id,
        packageName: newPackage.packageName,
        packageAmount: newPackage.packageAmount,
        packageDailyPercentage: newPackage.packageDailyPercentage,
        status: newPackage.status,
      };

      return NextResponse.json(
        { message: "Package created successfully", package: packageData },
        { status: 201 }
      );
      // console.log("Package created successfully:", packageData);
    }
  } catch (error) {
    // console.log("Error creating package:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
