// import connectDB from "@/lib/db";
// import CompanyCommissionModel from "@/model/companyCommission.model";

// export async function POST(req) {
//   try {
//     await connectDB();
//     const body = await req.json();

//     const { user1, user2, toUserId, commissionAmount } = body;

//     if (!user1 || !user2 || !toUserId || !commissionAmount) {
//       return new Response(
//         JSON.stringify({ error: "Missing required fields" }),
//         { status: 400 }
//       );
//     }

//     // Check if this pair already exists (in either order)
//     const exists = await CompanyCommissionModel.findOne({
//       $or: [
//         { user1, user2 },
//         { user1: user2, user2: user1 },
//       ],
//     });

//     if (exists) {
//       return new Response(
//         JSON.stringify({ message: "Pair already processed" }),
//         { status: 200 }
//       );
//     }

//     const newCommission = await CompanyCommissionModel.create({
//       user1,
//       user2,
//       toUserId,
//       CommissionAmount: commissionAmount,
//       status: "paid",
//     });

//     return new Response(
//       JSON.stringify({
//         message: "Commission created",
//         data: newCommission,
//       }),
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error("❌ Backend Error:", err);
//     return new Response(JSON.stringify({ error: "Internal server error" }), {
//       status: 500,
//     });
//   }
// }
import connectDB from "@/lib/db";
import CompanyCommissionModel from "@/model/companyCommission.model";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { user1, user2, toUserId, commissionAmount } = body;

    if (!user1 || !user2 || !toUserId || !commissionAmount) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // ✅ Check if this pair has already been processed
    const existing = await CompanyCommissionModel.findOne({
      $or: [
        { user1, user2 },
        { user1: user2, user2: user1 },
      ],
    });

    if (existing) {
      return new Response(
        JSON.stringify({ message: "Pair already processed" }),
        { status: 200 }
      );
    }

    // ✅ Create new commission
    const newCommission = await CompanyCommissionModel.create({
      user1,
      user2,
      toUserId,
      CommissionAmount: commissionAmount,
      status: "paid",
    });

    return new Response(
      JSON.stringify({
        message: "Commission successfully created",
        data: newCommission,
      }),
      { status: 201 }
    );
  } catch (err) {
    // console.error("❌ Server error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
