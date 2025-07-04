// // "use client";
// // import { useAuth } from "@/context/AuthContext";
// // import { jwtDecode } from "jwt-decode";
// // import { Allison } from "next/font/google";
// // import { useEffect, useState } from "react";
// // import { FiPackage } from "react-icons/fi";
// // import { FaThList, FaThLarge, FaSortUp, FaSortDown } from "react-icons/fa";
// // import { useData } from "@/context/DashboardContext";

// // function Commission() {
// //   const [clientId, setClientId] = useState("");
// //   const [validationData, setValidationData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [companyCommission, setCompanyCommission] = useState(null);
// //   const [referralCommission, setReferralCommission] = useState(null);
// //   const [all, setAll] = useState(null);
// //   const [view, setView] = useState("list");
// //   const { totalCommission, setTotalCommission } = useData();
// //   // 🔹 Step 1: Fetch Referral Data
// //   useEffect(() => {
// //     const getReferralDetail = async (code, id) => {
// //       try {
// //         const res = await fetch("/api/user/get-parents", {
// //           method: "GET",
// //           headers: {
// //             Authorization: `Bearer ${code}`,
// //             "x-user-id": id,
// //           },
// //         });
// //         const data = await res.json();

// //         if (res.ok) {
// //           console.log("✅ get Validation Data:", data);
// //           setValidationData(data);
// //         } else {
// //           console.error("❌ Error fetching user data:", data.error);
// //         }
// //       } catch (error) {
// //         console.error("⚠️ Network error:", error);
// //       }
// //     };

// //     const GetCompanyCommission = async (id) => {
// //       try {
// //         const res = await fetch("/api/user/get-company-commission", {
// //           method: "GET",
// //           headers: {
// //             "x-user-id": id,
// //           },
// //         });

// //         const result = await res.json();
// //         console.log("💰 Company Commission:", result.data);
// //         setCompanyCommission(result.data);
// //       } catch (error) {
// //         console.log("error", error.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     // referral Based Commission
// //     const GetReferralCommission = async (id) => {
// //       try {
// //         const res = await fetch("/api/user/get-Commissions", {
// //           method: "GET",
// //           headers: {
// //             "x-user-id": id,
// //           },
// //         });

// //         const result = await res.json();
// //         console.log("💰 Referral Commission:", result.data);
// //         setReferralCommission(result.data);
// //       } catch (error) {
// //         console.log("error", error.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     const token = localStorage.getItem("authToken");
// //     if (token) {
// //       try {
// //         const decoded = jwtDecode(token);
// //         if (decoded?.id && decoded?.code) {
// //           setClientId(decoded.id);
// //           getReferralDetail(decoded.code, decoded.id);
// //           GetCompanyCommission(decoded.id);
// //           GetReferralCommission(decoded.id);
// //         }
// //       } catch (err) {
// //         console.error("Invalid token:", err);
// //       }
// //     }
// //   }, []);
// //   // 🔹 Step 2: Process commission after data is fetched
// //   useEffect(() => {
// //     const processCommissionPairs = async () => {
// //       if (!validationData?.getDirectCommision?.length) return;

// //       const commissions = validationData.getDirectCommision;

// //       for (let i = 0; i < commissions.length - 1; i += 2) {
// //         const data1 = commissions[i];
// //         const data2 = commissions[i + 1];

// //         // const user1 = children.find((u) => u._id === data1.userId);
// //         // const user2 = children.find((u) => u._id === data2.userId);

// //         // if (!user1 || !user2) continue;

// //         const amount1 = parseFloat(data1.packageAmount || 0);
// //         const amount2 = parseFloat(data2.packageAmount || 0);

// //         // Skip if both packages are 0
// //         if (amount1 === 0 && amount2 === 0) continue;

// //         const commissionAmount = (Math.max(amount1, amount2) * 0.1).toFixed(2);

// //         // ✅ Always give commission to logged-in user
// //         const toUserId = clientId;

// //         try {
// //           const res = await fetch("/api/user/save-company-commission", {
// //             method: "POST",
// //             headers: {
// //               "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify({
// //               user1: data1.userId,
// //               user2: data2.userId,
// //               toUserId,
// //               commissionAmount,
// //             }),
// //           });

// //           const result = await res.json();
// //           console.log(`✅ Pair ${i}-${i + 1} processed:`, result.message);
// //         } catch (err) {
// //           console.error("❌ Error saving commission:", err);
// //         }
// //       }
// //     };

// //     if (validationData && clientId) {
// //       processCommissionPairs();
// //     }
// //     const allCommission = [companyCommission, referralCommission];
// //     console.log("allCommissions", allCommission);
// //     setAll(allCommission);
// //     const total = allCommission.flat().reduce((acc, e) => {
// //       if (!e) return acc;
// //       const amount = parseFloat(e.amount || e.CommissionAmount || 0);
// //       return acc + (isNaN(amount) ? 0 : amount);
// //     }, 0);

// //     setTotalCommission(total.toFixed(2));
// //     // console.log("allData", all);
// //   }, [validationData, clientId]);

// //   return (
// //     <div className="p-4 sm:p-6 bg-black min-h-screen">
// //       <div className="max-w-7xl mx-auto">
// //         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8">
// //           <div className="flex items-center mb-4 md:mb-0">
// //             <FiPackage className="text-xl sm:text-2xl text-indigo-600 mr-2 sm:mr-3" />
// //             <h1 className="text-xl sm:text-2xl font-bold text-gray-200">
// //               Commission
// //             </h1>
// //           </div>
// //         </div>

// //         {/* Stats Section */}
// //         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
// //           <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
// //             <h3 className="text-xs sm:text-sm font-medium text-gray-400">
// //               Company Add Commission
// //             </h3>
// //             <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-500 mt-1">
// //               {loading
// //                 ? "..."
// //                 : `$${companyCommission
// //                     .reduce(
// //                       (acc, e) => acc + parseFloat(e.CommissionAmount || 0),
// //                       0
// //                     )
// //                     .toFixed(2)}`}
// //             </p>
// //           </div>

// //           <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
// //             <h3 className="text-xs sm:text-sm font-medium text-gray-400">
// //               Indirect Referral Commission
// //             </h3>
// //             <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-500 mt-1">
// //               {loading
// //                 ? "..."
// //                 : `$${referralCommission
// //                     ?.filter((e) => e.type === "indirect")
// //                     .reduce((acc, e) => acc + parseFloat(e.amount || 0), 0)
// //                     .toFixed(2)}`}
// //             </p>
// //           </div>

// //           <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
// //             <h3 className="text-xs sm:text-sm font-medium text-gray-400">
// //               Direct Referral Commission
// //             </h3>
// //             <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-500 mt-1">
// //               {loading
// //                 ? "..."
// //                 : `$${referralCommission
// //                     ?.filter((e) => e.type === "direct")
// //                     .reduce((acc, e) => acc + parseFloat(e.amount || 0), 0)
// //                     .toFixed(2)}`}
// //             </p>
// //           </div>
// //           <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
// //             <h3 className="text-xs sm:text-sm font-medium text-gray-400">
// //               Total Commissions
// //             </h3>
// //             <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-500 mt-1">
// //               {loading
// //                 ? "..."
// //                 : `$${(all || [])
// //                     .flat()
// //                     .reduce((acc, e) => {
// //                       if (!e) return acc; // ✅ skip null or undefined entries
// //                       const amount = parseFloat(
// //                         e.amount || e.CommissionAmount || 0
// //                       );
// //                       return acc + (isNaN(amount) ? 0 : amount);
// //                       // ✅ handle non-numeric values safely
// //                     }, 0)
// //                     .toFixed(2)}`}
// //             </p>
// //           </div>
// //         </div>
// //         {/* View Toggle Buttons */}
// //         <div className="flex gap-2 mb-4 justify-end mt-2">
// //           <button
// //             className={`flex items-center px-3 py-1 rounded-md border text-sm font-medium transition-colors ${
// //               view === "list"
// //                 ? "bg-yellow-500 text-white border-yellow-500"
// //                 : "bg-gray-800 text-gray-300 border-gray-700"
// //             }`}
// //             onClick={() => setView("list")}
// //           >
// //             <FaThList className="mr-1" /> List
// //           </button>
// //           <button
// //             className={`flex items-center px-3 py-1 rounded-md border text-sm font-medium transition-colors ${
// //               view === "card"
// //                 ? "bg-yellow-500 text-white border-yellow-500"
// //                 : "bg-gray-800 text-gray-300 border-gray-700"
// //             }`}
// //             onClick={() => setView("card")}
// //           >
// //             <FaThLarge className="mr-1" /> Card
// //           </button>
// //         </div>

// //         {/* Card View */}
// //         {view === "card" && (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
// //             {loading ? (
// //               <div className="col-span-full text-center text-gray-400 py-8">
// //                 Loading...
// //               </div>
// //             ) : all.length > 0 ? (
// //               all.flat().map((e, index) => (
// //                 <div
// //                   key={index}
// //                   className="bg-[#272727] rounded-lg border border-gray-700 p-4 flex flex-col shadow hover:shadow-lg transition-shadow"
// //                 >
// //                   <div className="flex items-center mb-2">
// //                     <FiPackage className="text-lg text-indigo-500 mr-2" />
// //                     <span className="text-base font-semibold text-white">
// //                       {e?.packageName || "-"}
// //                     </span>
// //                   </div>
// //                   <div className="text-xs text-gray-400 mb-1">
// //                     Amount:{" "}
// //                     <span className="text-white">
// //                       ${e?.packageAmount || "0"}
// //                     </span>
// //                   </div>
// //                   <div className="text-xs text-gray-400 mb-1">
// //                     Daily %:{" "}
// //                     <span className="text-white">{e?.percentage || 0}%</span>
// //                   </div>
// //                   <div className="text-xs text-gray-400 mb-1">
// //                     Earning:{" "}
// //                     <span className="text-white">
// //                       ${e?.earningAmount || "0"}
// //                     </span>
// //                   </div>
// //                   <div className="text-xs text-gray-400 mb-1">
// //                     Credited At:{" "}
// //                     <span className="text-white">
// //                       {e?.creditedAt
// //                         ? new Date(e.creditedAt).toLocaleDateString()
// //                         : "-"}
// //                     </span>
// //                   </div>
// //                 </div>
// //               ))
// //             ) : (
// //               <div className="col-span-full text-center text-gray-400 py-8">
// //                 No earnings found.
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {/* List/Table View */}
// //         {view === "list" && (
// //           <div className="bg-[#272727] rounded-lg sm:rounded-xl border border-gray-700 overflow-hidden">
// //             <div className="overflow-x-auto">
// //               <table className="min-w-full divide-y divide-gray-700">
// //                 <thead className="bg-gray-800">
// //                   <tr>
// //                     <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
// //                       Commission Amount
// //                     </th>
// //                     <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
// //                       Commission %
// //                     </th>
// //                     <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
// //                       Type
// //                     </th>

// //                     <th className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">
// //                       Credited At
// //                     </th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="bg-[#272727] divide-y divide-gray-700">
// //                   {loading ? (
// //                     <tr>
// //                       <td
// //                         colSpan={5}
// //                         className="text-center py-6 text-gray-400 text-sm"
// //                       >
// //                         Loading...
// //                       </td>
// //                     </tr>
// //                   ) : all.length > 0 ? (
// //                     all.flat().map((e, index) => (
// //                       <tr key={index}>
// //                         <td className="px-3 py-2 sm:px-4 sm:py-3 text-sm text-white">
// //                           {e?.CommissionAmount || e?.amount}
// //                         </td>
// //                         <td className="px-3 py-2 sm:px-4 sm:py-3 text-sm text-white">
// //                           ${e?.percent || "10"}%
// //                         </td>
// //                         <td className="px-3 py-2 sm:px-4 sm:py-3 text-sm text-white">
// //                           {e?.type || "Company"}
// //                         </td>
// //                         <td className="px-3 py-2 sm:px-4 sm:py-3 text-sm text-white">
// //                           {e?.createdAt
// //                             ? new Date(e.createdAt).toISOString().split("T")[0]
// //                             : "-"}
// //                         </td>
// //                       </tr>
// //                     ))
// //                   ) : (
// //                     <tr>
// //                       <td
// //                         colSpan={5}
// //                         className="text-center py-6 text-gray-400 text-sm"
// //                       >
// //                         No earnings found.
// //                       </td>
// //                     </tr>
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Commission;

// // "use client";
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { FiPackage } from "react-icons/fi";

// // export default function CommissionsPage() {
// //   const [commissions, setCommissions] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchCommissions = async () => {
// //       try {
// //         const res = await axios.get("/api/user/getAllCommissions");
// //         setCommissions(res.data.data || []);
// //       } catch (err) {
// //         setError(err.response?.data?.error || err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchCommissions();
// //   }, []);

// //   const formatId = (id) => {
// //     if (!id) return "N/A";
// //     return `${id.slice(0, 3)}...${id.slice(-3)}`;
// //   };

// //   // Calculate totals
// //   const companyTotal = commissions
// //     .filter((c) => c.type === "company")
// //     .reduce((acc, cur) => acc + parseFloat(cur.CommissionAmount || cur.amount || 0), 0);

// //   const directTotal = commissions
// //     .filter((c) => c.type === "direct")
// //     .reduce((acc, cur) => acc + parseFloat(cur.amount || 0), 0);

// //   const indirectTotal = commissions
// //     .filter((c) => c.type === "indirect")
// //     .reduce((acc, cur) => acc + parseFloat(cur.amount || 0), 0);

// //   const total = commissions.reduce(
// //     (acc, cur) => acc + parseFloat(cur.amount || cur.CommissionAmount || 0),
// //     0
// //   );

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-screen bg-black">
// //         {/* <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div> */}
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="flex justify-center items-center h-screen bg-black">
// //         <div className="text-red-500 text-xl">Error: {error}</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-black px-4 py-6">
// //       {/* Header */}
// //       <div className="flex justify-between items-center mb-6">
// //         <h1 className="text-[var(--themeColor)] text-3xl font-bold flex items-center gap-2">
// //           <FiPackage className="text-indigo-500" />
// //           Commission Reports
// //         </h1>

// //       </div>

// //       {/* Top Stats Cards */}
// //       <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
// //         <div className="bg-[#272727] p-4 rounded-lg border border-gray-700">
// //           <h3 className="text-xs sm:text-sm font-medium text-gray-400">Company Add Commission</h3>
// //           <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-500 mt-1">
// //             ${companyTotal.toFixed(2)}
// //           </p>
// //         </div>
// //         <div className="bg-[#272727] p-4 rounded-lg border border-gray-700">
// //           <h3 className="text-xs sm:text-sm font-medium text-gray-400">Direct Referral Commission</h3>
// //           <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-500 mt-1">
// //             ${directTotal.toFixed(2)}
// //           </p>
// //         </div>
// //         <div className="bg-[#272727] p-4 rounded-lg border border-gray-700">
// //           <h3 className="text-xs sm:text-sm font-medium text-gray-400">Indirect Referral Commission</h3>
// //           <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-500 mt-1">
// //             ${indirectTotal.toFixed(2)}
// //           </p>
// //         </div>
// //         <div className="bg-[#272727] p-4 rounded-lg border border-gray-700">
// //           <h3 className="text-xs sm:text-sm font-medium text-gray-400">Total Commissions</h3>
// //           <p className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-500 mt-1">
// //             ${total.toFixed(2)}
// //           </p>
// //         </div>
// //       </div>

// //       {/* Table */}
// //       <div className="bg-[#272727] rounded-lg shadow overflow-x-auto">
// //         <table className="min-w-full divide-y divide-gray-600">
// //           <thead className="bg-[#1f1f1f]">
// //             <tr>
// //               {[
// //                 "From User",
// //                 "To User",
// //                 "Type",
// //                 "Package Amount",
// //                 "Percent",
// //                 "Commission",
// //                 "Created",
// //               ].map((header) => (
// //                 <th
// //                   key={header}
// //                   className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap"
// //                 >
// //                   {header}
// //                 </th>
// //               ))}
// //             </tr>
// //           </thead>
// //           <tbody className="divide-y divide-gray-700">
// //             {commissions.length > 0 ? (
// //               commissions.map((commission) => (
// //                 <tr key={commission._id} className="hover:bg-[#1a1a1a]">
// //                   <td className="px-3 py-2 text-sm text-gray-300 whitespace-nowrap">
// //                     <span className="tooltip cursor-pointer" title={commission.userId}>
// //                       {formatId(commission.userId)}
// //                     </span>
// //                   </td>
// //                   <td className="px-3 py-2 text-sm text-gray-300 whitespace-nowrap">
// //                     <span className="tooltip cursor-pointer" title={commission.toUserId}>
// //                       {formatId(commission.toUserId)}
// //                     </span>
// //                   </td>
// //                   <td className="px-3 py-2 text-sm text-gray-300 whitespace-nowrap">
// //                     <span
// //                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
// //                         commission?.type === "direct"
// //                           ? "bg-blue-100 text-blue-800"
// //                           : commission?.type === "indirect"
// //                           ? "bg-purple-100 text-purple-800"
// //                           : "bg-yellow-100 text-yellow-800"
// //                       }`}
// //                     >
// //                       {commission?.type}
// //                     </span>
// //                   </td>
// //                   <td className="px-3 py-2 text-sm text-white whitespace-nowrap text-center">
// //                     ${commission?.packageAmount || 0}
// //                   </td>
// //                   <td className="px-3 py-2 text-sm text-gray-400 whitespace-nowrap text-center">
// //                     {commission?.percent || 0}%
// //                   </td>
// //                   <td className="px-3 py-2 text-sm text-white font-medium whitespace-nowrap text-center">
// //                     ${commission?.amount || commission?.CommissionAmount || 0}
// //                   </td>
// //                   <td className="px-3 py-2 text-sm text-gray-400 whitespace-nowrap">
// //                     {new Date(commission?.createdAt).toLocaleDateString()}
// //                   </td>
// //                 </tr>
// //               ))
// //             ) : (
// //               <tr>
// //                 <td
// //                   colSpan="7"
// //                   className="px-3 py-4 text-sm text-center text-gray-500"
// //                 >
// //                   No commission records found
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaSortUp, FaSortDown } from "react-icons/fa";
// import { FiPackage } from "react-icons/fi";

// export default function AdminCommissionsPage() {
//   const [refCommissions, setRefCommissions] = useState(null);
//   const [companyCommissions, setCompanyCommissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const [refRes] = await Promise.all([
//           axios.get("/api/user/getAllCommissions"),
//           // axios.get("/api/user/get-company-commission"),
//         ]);

//         // console.log("📦 Referral Commissions Response:", refRes.data);
//         // console.log("🏢 Company Commissions Response:", compRes.data);

//         setRefCommissions(refRes.data || []);
//         console.log("allCommission", refRes.data);
//         // setCompanyCommissions(compRes.data.data || []);
//       } catch (err) {
//         alert("❌ Error fetching commissions", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   // // Sort combined referral + company list
//   const combined = [
//     refCommissions.companyCommission,
//     refCommissions.allCommissions,
//   ];
//   const sorted = [...combined].sort((a, b) => {
//     if (!sortConfig.key) return 0;
//     let aV = a[sortConfig.key];
//     let bV = b[sortConfig.key];
//     if (sortConfig.key === "createdAt") {
//       aV = new Date(aV).getTime();
//       bV = new Date(bV).getTime();
//     }
//     return sortConfig.direction === "asc"
//       ? aV > bV
//         ? 1
//         : -1
//       : aV < bV
//       ? 1
//       : -1;
//   });

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-black">
//         {/* <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500" /> */}
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black px-4 py-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="flex items-center gap-2 text-[var(--themeColor)] text-3xl font-bold">
//           <FiPackage className="text-indigo-500" /> Commission Reports
//         </h1>
//         {/* <span className="text-white text-xl font-medium">
//           Total Records:{" "}
//           <span className="text-[var(--themeColor)]">{sorted.length}</span>
//         </span> */}
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//         <div className="bg-[#272727] p-4 rounded-lg border border-gray-700">
//           <h3 className="text-xs sm:text-sm text-gray-400">
//             Company Add Commission
//           </h3>
//           <p className="text-lg sm:text-xl font-bold text-yellow-500 mt-1">
//             $
//             {refCommissions.companyCommission
//               ?.reduce(
//                 (sum, c) => sum + parseFloat(c?.CommissionAmount || 0),
//                 0
//               )
//               .toFixed(2)}
//           </p>
//         </div>
//         <div className="bg-[#272727] p-4 rounded-lg border border-gray-700">
//           <h3 className="text-xs sm:text-sm text-gray-400">
//             Direct Referral Commission
//           </h3>
//           <p className="text-lg sm:text-xl font-bold text-red-500 mt-1">
//             $
//             {refCommissions.allCommissions
//               .filter((c) => c.type === "direct")
//               .reduce((sum, c) => sum + parseFloat(c?.amount || 0), 0)
//               .toFixed(2)}
//           </p>
//         </div>
//         <div className="bg-[#272727] p-4 rounded-lg border border-gray-700">
//           <h3 className="text-xs sm:text-sm text-gray-400">
//             Indirect Referral Commission
//           </h3>
//           <p className="text-lg sm:text-xl font-bold text-green-500 mt-1">
//             $
//             {refCommissions.allCommissions
//               .filter((c) => c.type === "indirect")
//               .reduce((sum, c) => sum + parseFloat(c?.amount || 0), 0)
//               .toFixed(2)}
//           </p>
//         </div>
//         <div className="bg-[#272727] p-4 rounded-lg border border-gray-700">
//           <h3 className="text-xs sm:text-sm text-gray-400">
//             Total Commissions
//           </h3>
//           <p className="text-lg sm:text-xl font-bold text-indigo-500 mt-1">
//             $
//             {(
//               refCommissions.companyCommission?.reduce(
//                 (sum, c) => sum + parseFloat(c?.CommissionAmount || 0),
//                 0
//               ) +
//               refCommissions.allCommissions?.reduce(
//                 (sum, c) => sum + parseFloat(c?.amount || 0),
//                 0
//               )
//             ).toFixed(2)}
//           </p>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-[#272727] rounded-lg border border-gray-700 overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-600">
//           <thead className="bg-[#1f1f1f]">
//             <tr>
//               {[
//                 { key: "toUserId", label: "To User" },
//                 { key: "type", label: "Type" },
//                 { key: "packageAmount", label: "Package Amount" },
//                 { key: "percent", label: "Percent" },
//                 { key: "amount", label: "Referral Commission" },
//                 { key: "createdAt", label: "Created" },
//               ].map(({ key, label }) => (
//                 <th
//                   key={key}
//                   onClick={() =>
//                     setSortConfig({
//                       key,
//                       direction:
//                         sortConfig.key === key && sortConfig.direction === "asc"
//                           ? "desc"
//                           : "asc",
//                     })
//                   }
//                   className="px-3 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer select-none"
//                 >
//                   <div className="flex items-center justify-between">
//                     {label}
//                     <span className="ml-1 flex flex-col">
//                       <FaSortUp
//                         className={
//                           sortConfig.key === key &&
//                           sortConfig.direction === "asc"
//                             ? "text-yellow-400"
//                             : "text-gray-600"
//                         }
//                       />
//                       <FaSortDown
//                         className={
//                           sortConfig.key === key &&
//                           sortConfig.direction === "desc"
//                             ? "text-yellow-400"
//                             : "text-gray-600"
//                         }
//                       />
//                     </span>
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-700">
//             {sorted.map((c) => (
//               <tr key={c._id} className="hover:bg-[#1a1a1a]">
//                 <td className="px-3 py-2 text-sm text-white truncate max-w-[140px]">
//                   {c.toUserId?.slice(0, 4)}...{c.toUserId?.slice(-4)}
//                 </td>
//                 <td className="px-3 py-2 text-sm capitalize">
//                   <span
//                     className={`px-2 inline-flex text-xs font-semibold rounded-full ${
//                       c.type === "direct"
//                         ? "bg-blue-100 text-blue-800"
//                         : "bg-purple-100 text-purple-800"
//                     }`}
//                   >
//                     {c.type}
//                   </span>
//                 </td>
//                 <td className="px-3 py-2 text-sm text-white text-center">
//                   ${c?.packageAmount || c?.amount || 0}
//                 </td>
//                 <td className="px-3 py-2 text-sm text-gray-400 text-center">
//                   {c?.percent || 0}%
//                 </td>
//                 <td className="px-3 py-2 text-sm text-green-400 text-center">
//                   ${c.amount || 0}
//                 </td>
//                 <td className="px-3 py-2 text-sm text-gray-400 whitespace-nowrap">
//                   {new Date(c.createdAt).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))}
//             {sorted.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="py-6 text-center text-gray-500">
//                   No commission records found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";

export default function AdminCommissionsPage() {
  const [refCommissions, setRefCommissions] = useState({
    allCommissions: [],
    companyCommission: [],
  });
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/user/getAllCommissions");
        setRefCommissions(
          res.data || { allCommissions: [], companyCommission: [] }
        );
      } catch (err) {
        alert("❌ Error fetching commissions");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const combined = [
    ...(refCommissions.companyCommission || []),
    ...(refCommissions.allCommissions || []),
  ];

 const sorted = [...combined].sort((a, b) => {
  if (!sortConfig.key) return 0;

  let aVal = a[sortConfig.key] || a.CommissionAmount || a.amount || 0;
  let bVal = b[sortConfig.key] || b.CommissionAmount || b.amount || 0;

  if (sortConfig.key === "createdAt") {
    aVal = new Date(a.createdAt).getTime();
    bVal = new Date(b.createdAt).getTime();
  } else if (sortConfig.key === "type") {
    aVal = (a.type || "").toLowerCase();
    bVal = (b.type || "").toLowerCase();
    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  } else {
    aVal = parseFloat(aVal);
    bVal = parseFloat(bVal);
  }

  return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
});


  const totalCompany = refCommissions.companyCommission?.reduce(
    (sum, c) => sum + parseFloat(c?.CommissionAmount || 0),
    0
  );

  const totalDirect = refCommissions.allCommissions
    ?.filter((c) => c.type === "direct")
    .reduce((sum, c) => sum + parseFloat(c?.amount || 0), 0);

  const totalIndirect = refCommissions.allCommissions
    ?.filter((c) => c.type === "indirect")
    .reduce((sum, c) => sum + parseFloat(c?.amount || 0), 0);

  const totalCommission = (totalCompany + totalDirect + totalIndirect).toFixed(
    2
  );

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen bg-black text-white">
  //       Loading...
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-4">
          {/* <FiPackage className="text-indigo-500" /> */}
          <h1 className="flex items-center gap-2 text-yellow-400 text-3xl font-bold">
            Commission Reports
          </h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="bg-[#272727] p-4 rounded-lg border border-gray-700">
            <h3 className="text-xs text-gray-400">Company Add Commission</h3>
            <p className="text-lg font-bold text-yellow-500 mt-1">
              ${totalCompany.toFixed(2)}
            </p>
          </div>
          <div className="bg-[#272727] p-4 rounded-lg border border-gray-700">
            <h3 className="text-xs text-gray-400">
              Direct Referral Commission
            </h3>
            <p className="text-lg font-bold text-red-500 mt-1">
              ${totalDirect.toFixed(2)}
            </p>
          </div>
          <div className="bg-[#272727] p-4 rounded-lg border border-gray-700">
            <h3 className="text-xs text-gray-400">
              Indirect Referral Commission
            </h3>
            <p className="text-lg font-bold text-green-500 mt-1">
              ${totalIndirect.toFixed(2)}
            </p>
          </div>
          <div className="bg-[#272727] p-4 rounded-lg border border-gray-700">
            <h3 className="text-xs text-gray-400">Total Commissions</h3>
            <p className="text-lg font-bold text-indigo-500 mt-1">
              ${totalCommission}
            </p>
          </div>
        </div>

        {/* Commission Table */}
        <div className="bg-[#272727] rounded-lg border border-gray-700 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-[#1f1f1f]">
              <tr>
                {[
                  { key: "toUserId", label: "To User" },
                  { key: "type", label: "Type" },
                  { key: "packageAmount", label: "Package Amount" },
                  { key: "percent", label: "Percent" },
                  { key: "amount", label: "Commission" },
                  { key: "createdAt", label: "Created At" },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    onClick={() =>
                      setSortConfig({
                        key,
                        direction:
                          sortConfig.key === key &&
                          sortConfig.direction === "asc"
                            ? "desc"
                            : "asc",
                      })
                    }
                    className="px-3 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      {label}
                      <span className="ml-1 flex flex-col">
                        <FaSortUp
                          className={`${
                            sortConfig.key === key &&
                            sortConfig.direction === "asc"
                              ? "text-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                        <FaSortDown
                          className={`${
                            sortConfig.key === key &&
                            sortConfig.direction === "desc"
                              ? "text-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sorted.length > 0 ? (
                sorted.map((c, i) => (
                  <tr key={i} className="hover:bg-[#1a1a1a]">
                    <td className="px-3 py-2 text-sm text-white">
                      {c.toUserId?.slice(0, 4)}...{c.toUserId?.slice(-4)}
                    </td>
                    <td className="px-3 py-2 text-sm capitalize text-white">
                      {/* <span
                      className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                        c.type === "direct"
                          ? "bg-blue-100 text-blue-800"
                          : c.type === "indirect"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {c.type || "company"}
                    </span> */}
                     <span
  className={`px-2 py-0.5 text-xs text-center font-medium rounded text-gray-400
    ${
      c.type === "direct"
        ? " text-gray-400"
        : c.type === "indirect"
        ? " text-gray-400"
        : " text-yellow-400"
    }`}
>
  {c.type || "Company"}
</span>

                    </td>
                    <td className="px-3 py-2 text-sm text-center text-white">
                      ${c.packageAmount || c.amount || 0}
                    </td>
                    <td className="px-3 py-2 text-sm text-center text-gray-300">
                      {c.percent || "10"}%
                    </td>
                    <td className="px-3 py-2 text-sm text-center text-green-400">
                      ${c.amount || c.CommissionAmount || 0}
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-400">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-sm text-gray-500"
                  >
                    No commission records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
