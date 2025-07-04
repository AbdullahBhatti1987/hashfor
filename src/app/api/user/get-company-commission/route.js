import connectDB from "@/lib/db";
import CompanyCommissionModel from "@/model/companyCommission.model";

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

    const CompanyCommissions = await CompanyCommissionModel.find({ toUserId })
      .populate("user1", "name email")
      .populate("user2", "name email")
      .sort({ createdAt: -1 });

    return new Response(
      JSON.stringify({
        message: "Commission records fetched successfully",
        data: CompanyCommissions,
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
