// import { NextResponse } from "next/server";
// import UserModel from "@/model/Auth.model";

// const INDIRECT_PERCENTAGES = [5, 3, 2, 1, 0.75, 0.5, 0.25]; // for 7 levels
// const DIRECT_PERCENTAGE = 10;

// export async function POST(req) {
//   const { parentsArray, packageAmount } = await req.json();

//   if (!parentsArray?.length || !packageAmount) {
//     return NextResponse.json(
//       { success: false, error: "Missing data" },
//       { status: 400 }
//     );
//   }

//   const updates = [];

//   // 🔹 1. Send 10% directly to first parent
//   const firstParentId = parentsArray[0];
//   const directCommission = (packageAmount * DIRECT_PERCENTAGE) / 100;

//   updates.push(
//     UserModel.findByIdAndUpdate(firstParentId, {
//       $inc: { walletBalance: directCommission },
//     })
//   );

//   // 🔹 2. Send indirect commissions to up to 7 parents (including first again)
//   for (let i = 0; i < Math.min(parentsArray.length, 7); i++) {
//     const parentId = parentsArray[i];
//     const percent = INDIRECT_PERCENTAGES[i];
//     const commission = (packageAmount * percent) / 100;

//     updates.push(
//       UserModel.findByIdAndUpdate(parentId, {
//         $inc: { walletBalance: commission },
//       })
//     );
//   }

//   // Run all updates concurrently
//   await Promise.all(updates);

//   return NextResponse.json({ success: true });
// }
import { NextResponse } from "next/server";
import UserModel from "@/model/Auth.model"; // used later when enabling DB

// Percentages for indirect levels (up to 7 parents)
const INDIRECT_PERCENTAGES = [5, 3, 2, 1, 0.75, 0.5, 0.25];
const DIRECT_PERCENTAGE = 10;

export async function POST(req) {
  const { parentsArray, packageAmount } = await req.json();

  if (!parentsArray?.length || !packageAmount) {
    return NextResponse.json(
      { success: false, error: "Missing data" },
      { status: 400 }
    );
  }

  // 1. Log the direct commission
  const firstParentId = parentsArray[0];
  const directCommission = (packageAmount * DIRECT_PERCENTAGE) / 100;

  // console.log(
  //   `Direct Commission (10%) => Parent ID: ${firstParentId}, Amount: ${directCommission}`
  // );

  // 2. Log indirect commissions for up to 7 parents (including first again)
  for (let i = 0; i < Math.min(parentsArray.length, 7); i++) {
    const parentId = parentsArray[i];
    const percent = INDIRECT_PERCENTAGES[i];
    const commission = (packageAmount * percent) / 100;

    // console.log(
    //   `Indirect Level ${
    //     i + 1
    //   } => Parent ID: ${parentId}, ${percent}% = ${commission}`
    // );
  }

  // No DB updates — just simulating for now
  return NextResponse.json({ success: true, message: "Simulation complete" });
}
