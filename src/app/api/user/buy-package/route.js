import connectDB from "@/lib/db";
import AuthModel from "@/model/Auth.model";
import BuyPackageModel from "@/model/BuyPackage.model";
import PackageModel from "@/model/create-package.model";
// import DailyEarningModel from "@/model/dailyEarning.model";
import { NextResponse } from "next/server";

// Recursive parent finder (up to 7 levels)
const findParentsUpTo7 = async (referralCode) => {
  const parentsArray = [];

  let currentCode = referralCode;
  let level = 0;

  while (currentCode && level < 7) {
    const parent = await AuthModel.findOne({ code: currentCode });

    if (!parent) break;

    parentsArray.push(parent._id);

    currentCode = parent.referralCode; // move up to next level
    level++;
  }
  console.log("parentsArray", parentsArray);
  return parentsArray;
};

// Function to get Pakistan timezone date
const getPakistanDate = () => {
  const now = new Date();
  const pakistanTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Karachi" })
  );
  return pakistanTime;
};

export async function POST(request) {
  try {
    const { userId, packageId, from, hash, network, purchaseDate } =
      await request.json();
    // console.log("Buy package Data", userId, packageId, purchaseDate);

    // Connect to DB
    await connectDB();

    // Check if package which is bought by user already exists
    const existedBoughtPackage = await BuyPackageModel.findOne({
      userId,
      packageId,
    });
    if (existedBoughtPackage) {
      return NextResponse.json(
        { error: "Package already bought" },
        { status: 409 }
      );
    }

    // Get user
    const user = await AuthModel.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    // Get the package details
    const packageData = await PackageModel.findById(packageId);
    if (!packageData) {
      return NextResponse.json(
        { error: "Package does not exist" },
        { status: 404 }
      );
    }

    // Find up to 7 parents
    const parentsArray = await findParentsUpTo7(user.referralCode);
    // console.log("Parent chain (up to 7 levels):", parentsArray);

    // Use Pakistan timezone for dates
    const buyDate = getPakistanDate();
    const expiryDate = new Date(buyDate);
    expiryDate.setDate(expiryDate.getDate() + 546); // 18 months ≈ 540 days
    let status = "active";
    // Save purchase info
    const UserBoughtPackage = await BuyPackageModel.create({
      userId,
      packageId,
      packageName: packageData.packageName,
      packageAmount: packageData.packageAmount,
      packageDailyPercentage: packageData.packageDailyPercentage,
      parentReferralChain: parentsArray, // Optional: Save this in DB
      from,
      hash,
      network,
      buyDate,
      expiryDate,
      status,
    });

    // Create daily earning entry for this purchase
    // const dailyEarning = await DailyEarningModel.create({
    //   userId,
    //   packageId,
    //   packageName: packageData.packageName,
    //   packageAmount: Number(packageData.packageAmount),
    //   percentage: Number(packageData.packageDailyPercentage),
    //   earningAmount: (Number(packageData.packageAmount) * Number(packageData.packageDailyPercentage)) / 100,
    //   creditedAt: buyDate,
    // });

    return NextResponse.json(
      // { success: true, parentsArray, UserBoughtPackage, dailyEarning },
      { success: true, parentsArray, UserBoughtPackage },
      { status: 201 }
    );
  } catch (error) {
    // console.log("Error buying package:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
