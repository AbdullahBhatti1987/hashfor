import connectDB from "@/lib/db";
import CommissionsModel from "@/model/Commissions.model";
import CompanyCommissionModel from "@/model/companyCommission.model";

export async function GET(req) {
  try {
    await connectDB();

    const allCommissions = await CommissionsModel.find({}).sort({
      createdAt: -1,
    });
    const companyCommission = await CompanyCommissionModel.find({}).sort({
      createdAt: -1,
    });
    return new Response(
      JSON.stringify({
        message: "User Based Commission  fetched successfully",
        allCommissions,
        companyCommission,
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
