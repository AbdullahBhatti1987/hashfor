"use client";
import React, { useEffect, useState } from "react";
import { FiPackage } from "react-icons/fi";
import { FaThList, FaThLarge } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const DailyEarningPage = () => {
  const [dailyearning, setdailyearning] = useState([]);
  const [view, setView] = useState("list"); // 'list' or 'card'
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [loading, setLoading] = useState(true);

  const { user, token } = useAuth();
  const userId = user?.id || user?._id;

  useEffect(() => {
    const fetchDailyEarnings = async () => {
      if (!userId || !token) return;
      try {
        const response = await axios.get("/api/user/daily-earning", {
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        });
        setdailyearning(response.data.data || []);
      } catch (error) {
        console.error("Error fetching daily earnings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDailyEarnings();
  }, [userId, token]);

  return (
    <div className="p-4 sm:p-6 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-4">
          <div className="flex items-center mb-4 md:mb-0">
            {/* <FiPackage className="text-xl sm:text-2xl text-indigo-600 mr-2 sm:mr-3" /> */}
           <h1 className="text-2xl sm:text-3xl font-bold text-[var(--themeColor)]">
              Daily Earning
            </h1>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-4">
          <StatCard
            title="Today's Earnings"
            color="text-yellow-500"
            loading={loading}
            amount={dailyearning
              .filter(
                (e) =>
                  new Date(e.creditedAt).toDateString() ===
                  new Date().toDateString()
              )
              .reduce((acc, e) => acc + (e.earningAmount || 0), 0)}
          />
          <StatCard
            title="This Week Earnings"
            color="text-green-500"
            loading={loading}
            amount={dailyearning
              .filter((e) => {
                const now = new Date();
                const startOfWeek = new Date(
                  now.setDate(now.getDate() - now.getDay())
                );
                return new Date(e.creditedAt) >= startOfWeek;
              })
              .reduce((acc, e) => acc + (e.earningAmount || 0), 0)}
          />
          <StatCard
            title="This Month Earnings"
            color="text-red-500"
            loading={loading}
            amount={dailyearning
              .filter((e) => {
                const now = new Date();
                const date = new Date(e.creditedAt);
                return (
                  date.getMonth() === now.getMonth() &&
                  date.getFullYear() === now.getFullYear()
                );
              })
              .reduce((acc, e) => acc + (e.earningAmount || 0), 0)}
          />
          <StatCard
            title="Total Earnings"
            color="text-indigo-500"
            loading={loading}
            amount={dailyearning.reduce(
              (acc, e) => acc + (e.earningAmount || 0),
              0
            )}
          />
        </div>

        {/* View Toggle */}
        {/* <div className="flex gap-2 mb-4 justify-end mt-2">
          <ToggleButton view={view} setView={setView} />
        </div> */}

        {/* Card View */}
        {view === "card" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {loading ? (
              <div className="col-span-full text-center text-gray-400 py-8">
                Loading...
              </div>
            ) : dailyearning.length > 0 ? (
              (() => {
                let totalTillNow = 0;
                return dailyearning.map((e, index) => {
                  totalTillNow += e.earningAmount || 0;
                  return (
                    <div
                      key={index}
                      className="bg-[#272727] rounded-lg border border-gray-700 p-4 flex flex-col shadow hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center mb-2">
                        <FiPackage className="text-lg text-indigo-500 mr-2" />
                        <span className="text-base font-semibold text-white">
                          {e.packageName}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mb-1">
                        Amount:{" "}
                        <span className="text-white">${e.packageAmount}</span>
                      </div>
                      <div className="text-xs text-gray-400 mb-1">
                        Daily %:{" "}
                        <span className="text-white">{e.percentage}%</span>
                      </div>
                      <div className="text-xs text-gray-400 mb-1">
                        Earning:{" "}
                        <span className="text-white">${e.earningAmount}</span>
                      </div>
                      <div className="text-xs text-gray-400 mb-1">
                        Total Till Now:{" "}
                        <span className="text-white">
                          ${totalTillNow.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mb-1">
                        Credited At:{" "}
                        <span className="text-white">
                          {e.creditedAt
                            ? new Date(e.creditedAt).toLocaleDateString()
                            : "-"}
                        </span>
                      </div>
                    </div>
                  );
                });
              })()
            ) : (
              <div className="col-span-full text-center text-gray-400 py-8">
                No earnings found.
              </div>
            )}
          </div>
        )}

        {/* List/Table View */}
        {view === "list" && (
          <div className="bg-[#272727] rounded-lg sm:rounded-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    {[
                      "Package Name",
                      "Package Amount",
                      "Daily %",
                      "Today Earning",
                      "Total Earning",
                      "Credited At",
                    ].map((head, i) => (
                      <th
                        key={i}
                        className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-[#272727] divide-y divide-gray-700">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-6 text-gray-400 text-sm"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : dailyearning.length > 0 ? (
                    (() => {
                      let totalTillNow = 0;
                      return dailyearning.map((e, index) => {
                        totalTillNow += e.earningAmount || 0;
                        return (
                          <tr key={index} className="hover:bg-gray-800">
                            <td className="px-3 py-3 text-white text-sm">
                              {e.packageName}
                            </td>
                            <td className="px-3 py-3 text-white text-sm">
                              ${e.packageAmount}
                            </td>
                            <td className="px-3 py-3 text-white text-sm">
                              {e.percentage}%
                            </td>
                            <td className="px-3 py-3 text-white text-sm">
                              ${e.earningAmount}
                            </td>
                            <td className="px-3 py-3 text-white text-sm">
                              ${totalTillNow.toFixed(2)}
                            </td>
                            <td className="px-3 py-3 text-gray-400 text-sm">
                              {e.creditedAt
                                ? new Date(e.creditedAt).toLocaleDateString()
                                : "-"}
                            </td>
                          </tr>
                        );
                      });
                    })()
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
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
};

const StatCard = ({ title, amount, color, loading }) => (
  <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
    <h3 className="text-xs sm:text-sm font-medium text-gray-400">{title}</h3>
    <p
      className={`text-lg sm:text-xl md:text-2xl font-bold ${color} mt-1`}
    >
      {loading ? "..." : `$${amount.toFixed(2)}`}
    </p>
  </div>
);

const ToggleButton = ({ view, setView }) => (
  <>
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
  </>
);

export default DailyEarningPage;
