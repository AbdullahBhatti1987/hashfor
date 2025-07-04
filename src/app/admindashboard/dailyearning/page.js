"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiTrendingUp } from "react-icons/fi";
import { FaSortUp, FaSortDown } from "react-icons/fa";

export default function DailyEarningsPage() {
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await axios.get("/api/admin/getDailyEarning");
        setEarnings(res.data.data || []);
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchEarnings();
  }, []);

  const sortedEarnings = [...earnings].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (sortConfig.key === "createdAt") {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }

    return sortConfig.direction === "asc"
      ? aValue > bValue
        ? 1
        : -1
      : aValue < bValue
      ? 1
      : -1;
  });

  // Top Box Calculations
  const totalEarnings = earnings.reduce(
    (sum, e) => sum + (e.earningAmount || 0),
    0
  );
  const uniqueUsers = new Map();
  earnings.forEach((e) => {
    if (!uniqueUsers.has(e.userId)) {
      uniqueUsers.set(e.userId, e.packageAmount || 0);
    }
  });
  const totalPackage = Array.from(uniqueUsers.values()).reduce(
    (sum, val) => sum + val,
    0
  );

  const avgPercentage = earnings.length
    ? earnings.reduce((sum, e) => sum + (e.percentage || 0), 0) /
      earnings.length
    : 0;
  const totalRecords = earnings.length;

  const formatId = (id = "") => id.slice(0, 4) + "..." + id.slice(-4);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        {/* <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500" /> */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* <FiTrendingUp className="text-3xl text-yellow-400" /> */}
             <h1 className="text-2xl sm:text-3xl font-bold text-[var(--themeColor)]">
              Daily Earnings Report
            </h1>
          </div>
          {/* <span className="text-gray-300">Total Records: {totalRecords}</span> */}
        </div>

        {/* Stat Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="bg-[#272727] p-4 rounded-lg border border-gray-700">
            <h3 className="text-xs sm:text-sm text-gray-400">Total Earnings</h3>
            <p className="text-lg sm:text-xl font-bold text-green-400 mt-1">
              ${totalEarnings.toFixed(2)}
            </p>
          </div>
          <div className="bg-[#272727] p-4 rounded-lg border border-gray-700">
            <h3 className="text-xs sm:text-sm text-gray-400">
              Total Package Amount
            </h3>
            <p className="text-lg sm:text-xl font-bold text-blue-400 mt-1">
              ${totalPackage.toFixed(2)}
            </p>
          </div>
          <div className="bg-[#272727] p-4 rounded-lg border border-gray-700">
            <h3 className="text-xs sm:text-sm text-gray-400">
              Average Earning %
            </h3>
            <p className="text-lg sm:text-xl font-bold text-yellow-400 mt-1">
              {avgPercentage.toFixed(2)}%
            </p>
          </div>
          <div className="bg-[#272727] p-4 rounded-lg border border-gray-700">
            <h3 className="text-xs sm:text-sm text-gray-400">Total Records</h3>
            <p className="text-lg sm:text-xl font-bold text-indigo-400 mt-1">
              {totalRecords}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#272727] border border-gray-700 rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-[#1f1f1f]">
              <tr>
                {[
                  { key: "userId", label: "User" },
                  { key: "packageName", label: "Package" },
                  { key: "packageAmount", label: "Pkg Amt" },
                  { key: "earningAmount", label: "Earnings" },
                  { key: "percentage", label: "%" },
                  { key: "createdAt", label: "Date" },
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
                    className="px-3 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer select-none"
                  >
                    <div className="flex items-center justify-between">
                      {label}
                      <span className="ml-1 flex flex-col">
                        <FaSortUp
                          className={
                            sortConfig.key === key &&
                            sortConfig.direction === "asc"
                              ? "text-yellow-400"
                              : "text-gray-600"
                          }
                        />
                        <FaSortDown
                          className={
                            sortConfig.key === key &&
                            sortConfig.direction === "desc"
                              ? "text-yellow-400"
                              : "text-gray-600"
                          }
                        />
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sortedEarnings.length > 0 ? (
                sortedEarnings.map((e) => (
                  <tr key={e._id} className="hover:bg-[#1a1a1a]">
                    <td className="px-3 py-2 text-sm text-white truncate max-w-[140px]">
                      {formatId(e.userId)}
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-200">
                      {e.packageName}
                    </td>
                    <td className="px-3 py-2 text-sm text-white text-center">
                      ${e.packageAmount || 0}
                    </td>
                    <td className="px-3 py-2 text-sm text-green-400 text-center">
                      ${e.earningAmount || 0}
                    </td>
                    <td className="px-3 py-2 text-sm text-yellow-300 text-center">
                      {e.percentage || 0}%
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-400 whitespace-nowrap">
                      {new Date(e.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-gray-500">
                    No earning records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Error */}
        {error && (
          <div className="text-red-500 text-sm mt-4 text-center">{error}</div>
        )}
      </div>
    </div>
  );
}
