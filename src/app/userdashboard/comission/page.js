"use client";
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { Allison } from "next/font/google";
import { useEffect, useState } from "react";
import { FiPackage } from "react-icons/fi";
import { FaThList, FaThLarge, FaSortUp, FaSortDown } from "react-icons/fa";
import { useData } from "@/context/DashboardContext";
import axios from "axios";

function Commission() {
  const [clientId, setClientId] = useState("");
  const [validationData, setValidationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [companyCommission, setCompanyCommission] = useState(null);
  const [referralCommission, setReferralCommission] = useState(null);
  const [all, setAll] = useState(null);
  const [view, setView] = useState("list");
  const { totalCommission, setTotalCommission } = useData();
  // 🔹 Step 1: Fetch Referral Data
  useEffect(() => {
    // const getReferralDetail = async (code, id) => {
    //   try {
    //     const res = await fetch("/api/user/get-parents", {
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${code}`,
    //         "x-user-id": id,
    //       },
    //     });
    //     const data = await res.json();

    //     if (res.ok) {
    //       console.log("✅ get Validation Data:", data);
    //       setValidationData(data);
    //     } else {
    //       console.error("❌ Error fetching user data:", data.error);
    //     }
    //   } catch (error) {
    //     console.error("⚠️ Network error:", error);
    //   }
    // };

    // const GetCompanyCommission = async (id) => {
    //   try {
    //     const res = await fetch("/api/user/get-company-commission", {
    //       method: "GET",
    //       headers: {
    //         "x-user-id": id,
    //       },
    //     });

    //     const result = await res.json();
    //     console.log("💰 Company Commission:", result.data);
    //     setCompanyCommission(result.data);
    //   } catch (error) {
    //     console.log("error", error.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    const getReferralDetail = async (code, id) => {
      try {
        const res = await axios.get("/api/user/get-parents", {
          headers: {
            Authorization: `Bearer ${code}`,
            "x-user-id": id,
          },
        });

        console.log("✅ get Validation Data:", res.data);
        setValidationData(res.data);
      } catch (error) {
        if (error.response) {
          console.error(
            "❌ Error fetching user data:",
            error.response.data?.error || error.message
          );
        } else {
          console.error("⚠️ Network error:", error.message);
        }
      }
    };
    const GetCompanyCommission = async (id) => {
      try {
        const res = await axios.get("/api/user/get-company-commission", {
          headers: {
            "x-user-id": id,
          },
        });

        console.log("💰 Company Commission:", res.data.data);
        setCompanyCommission(res.data.data);
      } catch (error) {
        console.log("error", error.message);
      } finally {
        setLoading(false);
      }
    };
    // referral Based Commission
    // const GetReferralCommission = async (id) => {
    //   try {
    //     const res = await fetch("/api/user/get-Commissions", {
    //       method: "GET",
    //       headers: {
    //         "x-user-id": id,
    //       },
    //     });

    //     const result = await res.json();
    //     console.log("💰 Referral Commission:", result.data);
    //     setReferralCommission(result.data);
    //   } catch (error) {
    //     console.log("error", error.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    const GetReferralCommission = async (id) => {
      try {
        const res = await axios.get("/api/user/get-Commissions", {
          headers: {
            "x-user-id": id,
          },
        });

        console.log("💰 Referral Commission:", res.data.data);
        setReferralCommission(res.data.data);
      } catch (error) {
        console.log("error", error.message);
      } finally {
        setLoading(false);
      }
    };
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.id && decoded?.code) {
          setClientId(decoded.id);
          getReferralDetail(decoded.code, decoded.id);
          GetCompanyCommission(decoded.id);
          GetReferralCommission(decoded.id);
        }
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);
  // 🔹 Step 2: Process commission after data is fetched
  // useEffect(() => {
  //   const processCommissionPairs = async () => {
  //     if (!validationData?.getDirectCommision?.length) return;

  //     const commissions = validationData.getDirectCommision;

  //     for (let i = 0; i < commissions.length - 1; i += 2) {
  //       const data1 = commissions[i];
  //       const data2 = commissions[i + 1];

  //       // const user1 = children.find((u) => u._id === data1.userId);
  //       // const user2 = children.find((u) => u._id === data2.userId);

  //       // if (!user1 || !user2) continue;

  //       const amount1 = parseFloat(data1.packageAmount || 0);
  //       const amount2 = parseFloat(data2.packageAmount || 0);

  //       // Skip if both packages are 0
  //       if (amount1 === 0 && amount2 === 0) continue;

  //       const commissionAmount = (Math.max(amount1, amount2) * 0.1).toFixed(2);

  //       // ✅ Always give commission to logged-in user
  //       const toUserId = clientId;

  //       try {
  //         const res = await fetch("/api/user/save-company-commission", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             user1: data1.userId,
  //             user2: data2.userId,
  //             toUserId,
  //             commissionAmount,
  //           }),
  //         });

  //         const result = await res.json();
  //         console.log(`✅ Pair ${i}-${i + 1} processed:`, result.message);
  //       } catch (err) {
  //         console.error("❌ Error saving commission:", err);
  //       }
  //     }
  //   };

  //   if (validationData && clientId) {
  //     processCommissionPairs();
  //   }
  //   const allCommission = [companyCommission, referralCommission];
  //   console.log("allCommissions", allCommission);
  //   setAll(allCommission);
  //   const total = allCommission.flat().reduce((acc, e) => {
  //     if (!e) return acc;
  //     const amount = parseFloat(e.amount || e.CommissionAmount || 0);
  //     return acc + (isNaN(amount) ? 0 : amount);
  //   }, 0);

  //   setTotalCommission(total.toFixed(2));
  //   // console.log("allData", all);
  // }, [validationData, clientId]);
  useEffect(() => {
    const processCommissionPairs = async () => {
      if (!validationData?.getDirectCommision?.length) return;

      const commissions = validationData.getDirectCommision;

      for (let i = 0; i < commissions.length - 1; i += 2) {
        const data1 = commissions[i];
        const data2 = commissions[i + 1];

        const amount1 = parseFloat(data1.packageAmount || 0);
        const amount2 = parseFloat(data2.packageAmount || 0);

        if (amount1 === 0 && amount2 === 0) continue;
        let commissionAmount = 0;
        // ✅ Equal and non-zero
        if (amount1 === amount2 && amount1 !== 0) {
          commissionAmount = (amount1 * 0.1).toFixed(2);
        } else {
          // ✅ Different amounts — use max
          commissionAmount = (Math.max(amount1, amount2) * 0.1).toFixed(2);
        }
        // const commissionAmount = (Math.max(amount1, amount2) * 0.1).toFixed(2);

        const toUserId = clientId;

        try {
          const { data: result } = await axios.post(
            "/api/user/save-company-commission",
            {
              user1: data1.userId,
              user2: data2.userId,
              toUserId,
              commissionAmount,
            }
          );

          console.log(`✅ Pair ${i}-${i + 1} processed:`, result.message);
        } catch (err) {
          console.error("❌ Error saving commission:", err);
        }
      }
    };

    if (validationData && clientId) {
      processCommissionPairs();
    }

    const allCommission = [companyCommission, referralCommission];
    console.log("allCommissions", allCommission);
    setAll(allCommission);

    const total = allCommission.flat().reduce((acc, e) => {
      if (!e) return acc;
      const amount = parseFloat(e.amount || e.CommissionAmount || 0);
      return acc + (isNaN(amount) ? 0 : amount);
    }, 0);

    setTotalCommission(total.toFixed(2));
  }, [validationData, clientId]);

  return (
    <div className="p-4 sm:p-6 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-4">
          <div className="flex items-center mb-4 md:mb-0">
            {/* <FiPackage className="text-xl sm:text-2xl text-indigo-600 mr-2 sm:mr-3" /> */}
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--themeColor)]">
              Commission
            </h1>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-4">
          <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
            <h3 className="text-xs sm:text-sm font-medium text-gray-400">
              Company Add Commission
            </h3>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-500 mt-1">
              {loading
                ? "..."
                : `$${companyCommission
                    .reduce(
                      (acc, e) => acc + parseFloat(e.CommissionAmount || 0),
                      0
                    )
                    .toFixed(2)}`}
            </div>
          </div>

          <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
            <h3 className="text-xs sm:text-sm font-medium text-gray-400">
              Indirect Referral Commission
            </h3>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-500 mt-1">
              {loading
                ? "..."
                : `$${referralCommission
                    ?.filter((e) => e.type === "indirect")
                    .reduce((acc, e) => acc + parseFloat(e.amount || 0), 0)
                    .toFixed(2)}`}
            </div>
          </div>

          <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
            <h3 className="text-xs sm:text-sm font-medium text-gray-400">
              Direct Referral Commission
            </h3>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-red-500 mt-1">
              {loading
                ? "..."
                : `$${referralCommission
                    ?.filter((e) => e.type === "direct")
                    .reduce((acc, e) => acc + parseFloat(e.amount || 0), 0)
                    .toFixed(2)}`}
            </div>
          </div>
          <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
            <h3 className="text-xs sm:text-sm font-medium text-gray-400">
              Total Commissions
            </h3>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-500 mt-1">
              {loading
                ? "..."
                : `$${(all || [])
                    .flat()
                    .reduce((acc, e) => {
                      if (!e) return acc; // ✅ skip null or undefined entries
                      const amount = parseFloat(
                        e.amount || e.CommissionAmount || 0
                      );
                      return acc + (isNaN(amount) ? 0 : amount);
                      // ✅ handle non-numeric values safely
                    }, 0)
                    .toFixed(2)}`}
            </div>
          </div>
        </div>
        {/* View Toggle Buttons */}
        {/* <div className="flex gap-2 mb-4 justify-end mt-2">
          <button
            className={`flex items-center px-3 py-1 rounded-md border text-sm font-medium transition-colors ${
              view === "list"
                ? "bg-yellow-500 text-white border-yellow-500"
                : "bg-gray-800 text-gray-300 border-gray-700"
            }`}
            onClick={() => setView("list")}
          >
            <FaThList className="mr-1" /> List
          </button>
          <button
            className={`flex items-center px-3 py-1 rounded-md border text-sm font-medium transition-colors ${
              view === "card"
                ? "bg-yellow-500 text-white border-yellow-500"
                : "bg-gray-800 text-gray-300 border-gray-700"
            }`}
            onClick={() => setView("card")}
          >
            <FaThLarge className="mr-1" /> Card
          </button>
        </div> */}

        {/* Card View */}
        {/* {view === "card" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {loading ? (
              <div className="col-span-full text-center text-gray-400 py-8">
                Loading...
              </div>
            ) : all.length > 0 ? (
              all.flat().map((e, index) => (
                <div
                  key={index}
                  className="bg-[#272727] rounded-lg border border-gray-700 p-4 flex flex-col shadow hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-2">
                    <FiPackage className="text-lg text-indigo-500 mr-2" />
                    <span className="text-base font-semibold text-white">
                      {e?.packageName || "-"}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mb-1">
                    Amount:{" "}
                    <span className="text-white">
                      ${e?.packageAmount || "0"}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mb-1">
                    Daily %:{" "}
                    <span className="text-white">{e?.percentage || 0}%</span>
                  </div>
                  <div className="text-xs text-gray-400 mb-1">
                    Earning:{" "}
                    <span className="text-white">
                      ${e?.earningAmount || "0"}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mb-1">
                    Credited At:{" "}
                    <span className="text-white">
                      {e?.creditedAt
                        ? new Date(e.creditedAt).toLocaleDateString()
                        : "-"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-8">
                No earnings found.
              </div>
            )}
          </div>
        )} */}

        {/* List/Table View */}
        {view === "list" && (
          <div className="bg-[#272727] rounded-lg sm:rounded-xl border border-gray-700 overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
              <h3 className="text-lg font-medium leading-6 text-white">
                Commission History
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Commission Amount
                    </th>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Commission %
                    </th>
                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Type
                    </th>

                    <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
                      Credited At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#272727] divide-y divide-gray-700">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-6 text-gray-400 text-sm"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : all.length > 0 ? (
                    all.flat().map((e, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 sm:px-4 sm:py-3 text-sm text-white">
                          {e?.CommissionAmount || e?.amount}
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3 text-sm text-white">
                          ${e?.percent || "10"}%
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3 text-sm text-white">
                          {e?.type || "Company"}
                        </td>
                        <td className="px-3 py-2 sm:px-4 sm:py-3 text-sm text-white">
                          {e?.createdAt
                            ? new Date(e.createdAt).toISOString().split("T")[0]
                            : "-"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-6 text-gray-400 text-sm"
                      >
                        No earnings found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Commission;
