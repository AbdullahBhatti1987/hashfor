"use client";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { WalletContext } from "@/context/WalletContext";
import { Contract } from "ethers";
import { usdtAbi, usdtToken } from "@/content/data";
import { showErrorToast } from "@/lib/toast";

// Icons added
import {
  FiTrendingUp,
  FiUsers,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { FaMoneyCheckAlt, FaSortUp, FaSortDown } from "react-icons/fa";

export default function AdminWithdrawalPage() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [disabledButtons, setDisabledButtons] = useState({});
  const { walletAddress, signer } = useContext(WalletContext);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const res = await axios.get("/api/user/getAllWithdrawlData");
        setWithdrawals(res.data.allData || []);
      } catch (err) {
        alert("Error fetching withdrawal data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWithdrawals();
  }, []);

  const updateWithdrawStatus = async (detail, status) => {
    setDisabledButtons((prev) => ({ ...prev, [detail._id]: true }));

    try {
      if (status === "Accepted") {
        if (!walletAddress) {
          showErrorToast("Connect wallet first");
          return;
        }

        const contract = new Contract(usdtToken, usdtAbi, signer);
        const tx = await contract.transfer(
          detail.from,
          detail.withdrawAmount * 10 ** 6
        );

        if (tx?.hash) {
          await axios.post("/api/admin/updateWithdrawStatus", {
            withdrawId: detail._id,
            newStatus: status,
            txHash: tx.hash,
          });

          setWithdrawals((prev) =>
            prev.map((w) =>
              w._id === detail._id ? { ...w, status: "Accepted" } : w
            )
          );
        }
      }

      if (status === "Rejected") {
        await axios.post("/api/admin/updateWithdrawStatus", {
          withdrawId: detail._id,
          newStatus: status,
        });

        setWithdrawals((prev) =>
          prev.map((w) =>
            w._id === detail._id ? { ...w, status: "Rejected" } : w
          )
        );
      }
    } catch (err) {
      console.error("Error updating withdrawal status:", err);
    } finally {
      setDisabledButtons((prev) => ({ ...prev, [detail._id]: false }));
    }
  };

  const sortedData = [...withdrawals].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];

    if (sortConfig.key === "withdrawAmount") {
      aVal = parseFloat(aVal || 0);
      bVal = parseFloat(bVal || 0);
    }

    return sortConfig.direction === "asc"
      ? aVal > bVal
        ? 1
        : -1
      : aVal < bVal
      ? 1
      : -1;
  });

  const totalUsers = new Set(withdrawals.map((w) => w.userId)).size;
  const totalAmount = withdrawals.reduce(
    (sum, w) => sum + parseFloat(w.withdrawAmount || 0),
    0
  );
  const approvedCount = withdrawals.filter(
    (w) => w.status === "Accepted"
  ).length;
  const rejectedCount = withdrawals.filter(
    (w) => w.status === "Rejected"
  ).length;

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
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          {/* <FiTrendingUp className="text-3xl text-yellow-400" /> */}
           <h1 className="text-2xl sm:text-3xl font-bold text-[var(--themeColor)]">
            Withdrawals Report
          </h1>
        </div>

        {/* Stat Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {[
            {
              icon: <FiUsers className="text-lg text-blue-400" />,
              label: "Total Users",
              value: totalUsers,
              color: "text-blue-400",
            },
            {
              icon: <FaMoneyCheckAlt className="text-lg text-green-400" />,
              label: "Total Withdraw Amount",
              value: `$${totalAmount.toFixed(2)}`,
              color: "text-green-400",
            },
            {
              icon: <FiCheckCircle className="text-lg text-yellow-400" />,
              label: "Approved",
              value: approvedCount,
              color: "text-yellow-400",
            },
            {
              icon: <FiXCircle className="text-lg text-red-400" />,
              label: "Rejected",
              value: rejectedCount,
              color: "text-red-400",
            },
          ].map((box, i) => (
            <div
              key={i}
              className="bg-[#272727] p-4 rounded-lg border border-gray-700 flex items-center gap-3"
            >
              {box.icon}
              <div>
                <h3 className="text-sm text-gray-400">{box.label}</h3>
                <p className={`text-xl font-bold mt-1 ${box.color}`}>
                  {box.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#272727] border border-gray-700 rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-600 text-sm">
            <thead className="bg-[#1f1f1f]">
              <tr>
                {[
                  { key: "userId", label: "UserId" },
                  { key: "withdrawAmount", label: "Amount" },
                  { key: "from", label: "Wallet Address" },
                  { key: "status", label: "Status" },
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
                    className="px-4 py-3 text-left text-gray-400 font-medium cursor-pointer whitespace-nowrap"
                  >
                    <div className="flex items-center justify-between">
                      {label}
                      <span className="ml-2 flex flex-col">
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
                <th className="px-2 py-3 text-left text-gray-400 font-medium w-[100px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {sortedData.length > 0 ? (
                sortedData.map((w) => (
                  <tr
                    key={w._id}
                    className="hover:bg-[#1a1a1a] h-[64px] whitespace-nowrap"
                  >
                    <td className="px-4 py-3 text-white">
                      {/* <div>{w.userName || "Unknown"}</div> */}
                      <div className="text-xs text-gray-400">
                        {w.userId?.slice(0, 4)}...{w.userId?.slice(-4)}
                      </div>
                    </td>

                    <td className="px-4 py-3 text-white">
                      ${parseFloat(w.withdrawAmount).toFixed(2)}
                    </td>

                    <td
                      className="px-4 py-3 text-gray-400 max-w-[260px] truncate"
                      title={w.from}
                    >
                      {w.from?.slice(0, 10)}...{w.from?.slice(-8)}
                    </td>

                    <td className="px-4 py-3 text-gray-300 capitalize">
                      {w.status}
                    </td>

                    <td className="px-2 py-3">
                      {w.status.toLowerCase() === "pending" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateWithdrawStatus(w, "Accepted")}
                            disabled={disabledButtons[w._id]}
                            className="bg-gray-700 text-gray-200 px-3 py-1 rounded-md text-sm hover:bg-gray-600 transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateWithdrawStatus(w, "Rejected")}
                            disabled={disabledButtons[w._id]}
                            className="bg-gray-700 text-gray-200 px-3 py-1 rounded-md text-sm hover:bg-gray-600 transition"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-500">—</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-6">
                    No withdrawal records found.
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
