// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import WithdrawModel from "@/model/Withdraw.model";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const { withdrawId, newStatus } = await req.json();

//     if (!withdrawId || !newStatus) {
//       return NextResponse.json(
//         { error: "Missing withdrawId or newStatus" },
//         { status: 400 }
//       );
//     }

//     const updateFields = { status: newStatus };
//     const _id = withdrawId;
//     const updated = await WithdrawModel.findByIdAndUpdate(
//       _id,
//       { $set: updateFields },
//       { new: true }
//     );

//     if (!updated) {
//       return NextResponse.json(
//         { error: "Withdrawal record not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       {
//         message: "✅ Withdrawal status updated successfully",
//         data: updated,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("❌ Error updating withdrawal status:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import WithdrawModel from "@/model/Withdraw.model";

export async function POST(req) {
  try {
    await connectDB();
    const { withdrawId, newStatus } = await req.json();

    if (!withdrawId || !newStatus) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updated = await WithdrawModel.findByIdAndUpdate(
      withdrawId,
      { status: newStatus },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Withdrawal not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Status updated", data: updated },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Error updating withdrawal:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
