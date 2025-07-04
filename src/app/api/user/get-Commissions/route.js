import connectDB from "@/lib/db";
import CommissionsModel from "@/model/Commissions.model";

export async function GET(req) {
  try {
    await connectDB();

    const toUserId = req.headers.get("x-user-id");

    if (!toUserId) {
      return new Response(
        JSON.stringify({ error: "Missing user ID in headers" }),
        { status: 400 }
      );
    }

    const UserCommissions = await CommissionsModel.find({ toUserId }).sort({
      createdAt: -1,
    });
    console.log("UserCommission", UserCommissions);
    return new Response(
      JSON.stringify({
        message: "User Based Commission  fetched successfully",
        data: UserCommissions,
      }),
      { status: 200 }
    );
  } catch (err) {
    // console.error("❌ Error fetching commissions:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
