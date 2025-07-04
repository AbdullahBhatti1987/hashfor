"use client";
import { useContext, useEffect, useState } from "react";
import {
  FiDollarSign,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiPlus,
} from "react-icons/fi";
import { showErrorToast } from "@/lib/toast";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { PiUsersThreeBold } from "react-icons/pi";
import { TbBrandCashapp } from "react-icons/tb";
import { MdAccountBalanceWallet } from "react-icons/md";
import Modal from "@/components/navbar/Modal";
import { jwtDecode } from "jwt-decode";
import { WalletContext } from "@/context/WalletContext";
import axios from "axios";

const WithdrawalPage = () => {
  const [balance, setBalance] = useState(1850.5);
  const [totalWithdrawn, setTotalWithdrawn] = useState(3240.75);
  const [pendingWithdrawals, setPendingWithdrawals] = useState(450.0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  // const [packageId, setPackageId] = useState("");
  const [withdrawals, setWithdrawals] = useState([
    {
      id: 1,
      amount: 500.0,
      date: "2023-10-15",
      status: "Completed",
      transactionId: "TX78945612",
    },
    {
      id: 2,
      amount: 250.0,
      date: "2023-11-02",
      status: "Completed",
      transactionId: "TX32165498",
    },
    {
      id: 3,
      amount: 450.0,
      date: "2023-12-05",
      status: "Pending",
      transactionId: "TX14725836",
    },
    {
      id: 4,
      amount: 750.0,
      date: "2023-09-20",
      status: "Completed",
      transactionId: "TX96385274",
    },
    {
      id: 5,
      amount: 300.0,
      date: "2023-08-12",
      status: "Rejected",
      transactionId: "TX15935728",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientId, setClientId] = useState("");
  const [BoughtPackages, setBoughtPackages] = useState([]);
  const [withDrawData, setWithDrawData] = useState([]);
  const { walletAddress, setWalletAddress, signer, setSigner } =
    useContext(WalletContext);
  const [earning, setEarning] = useState();
  const [commission, setCommission] = useState();
  const [validationData, setValidationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const fetchBoughtData = async (userId) => {
    //   try {
    //     const res = await fetch("/api/user/getUserBoughtDetail", {
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${userId}`,
    //       },
    //     });
    //     const data = await res.json();

    //     if (res.ok) {
    //       console.log("✅ User Bought Data:", data.data);
    //       setBoughtPackages(data.data);
    //       // console.log("checking data", data.data[0].packageId);
    //       setPackageId(data.data[0].packageId);
    //       const earnings = data.data.reduce(
    //         (sum, pkg) => sum + (pkg.amount || 0),
    //         0
    //       );
    //       setTotalEarnings(earnings);
    //     } else {
    //       console.error("❌ Error fetching user data:", data.error);
    //     }
    //   } catch (error) {
    //     console.error("⚠️ Network error:", error);
    //   }
    // };
    // const fetchWithDrawData = async (userId) => {
    //   try {
    //     const res = await fetch("/api/user/getWithdrawDetail", {
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${userId}`,
    //       },
    //     });
    //     const data = await res.json();

    //     if (res.ok) {
    //       console.log("✅ WithDraw Data:", data.data);
    //       setWithDrawData(data.data);
    //       // console.log("checking data", data.data[0].packageId);
    //     } else {
    //       console.error("❌ Error fetching user data:", data.error);
    //     }
    //   } catch (error) {
    //     console.error("⚠️ Network error:", error);
    //   }
    // };
    // const getAllData = async (userId) => {
    //   try {
    //     const res = await fetch("/api/user/allDetails", {
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${userId}`,
    //       },
    //     });
    //     const data = await res.json();

    //     if (res.ok) {
    //       // console.log("✅ WithDraw Data:", data.data);
    //       setCommission(data.TotalCommission);
    //       setEarning(data.totalEarning);
    //       console.log("checking data", data.totalEarning);
    //       console.log("Total Commission", data.TotalCommission);
    //     } else {
    //       console.error("❌ Error fetching user data:", data.error);
    //     }
    //   } catch (error) {
    //     console.error("⚠️ Network error:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    const fetchBoughtData = async (userId) => {
      try {
        const res = await axios.get("/api/user/getUserBoughtDetail", {
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        });

        const data = res.data.data;

        console.log("✅ User Bought Data:", data);
        setBoughtPackages(data);

        if (data.length > 0) {
          setPackageId(data[0].packageId);
        }

        const earnings = data.reduce((sum, pkg) => sum + (pkg.amount || 0), 0);
        setTotalEarnings(earnings);
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
    const fetchWithDrawData = async (userId) => {
      try {
        const res = await axios.get("/api/user/getWithdrawDetail", {
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        });

        const data = res.data;

        if (data) {
          console.log("✅ WithDraw Data:", data.data);
          setWithDrawData(data.data);
          // console.log("checking data", data.data[0].packageId);
        } else {
          console.error("❌ Error fetching user data:", data.error);
        }
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
    const getAllData = async (userId) => {
      try {
        const res = await axios.get("/api/user/allDetails", {
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        });

        const data = res.data;

        // ✅ Handle successful response
        setCommission(data.TotalCommission);
        setEarning(data.totalEarning);
        console.log("checking data", data.totalEarning);
        console.log("Total Commission", data.TotalCommission);
      } catch (error) {
        if (error.response) {
          console.error(
            "❌ Error fetching user data:",
            error.response.data?.error || error.message
          );
        } else {
          console.error("⚠️ Network error:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.id) {
          setClientId(decoded.id);
          fetchBoughtData(decoded.id);
          fetchWithDrawData(decoded?.id);
          getAllData(decoded?.id);
          // getReferralDetail(decoded?.code, decoded?.id);
        }
      } catch (err) {
        console.error("Invalid token:", err);
      }
    }
  }, []);

  const handleWithdrawRequest = async (e) => {
    console.log("Withdrawal amount entered:", withdrawAmount);
    e.preventDefault();
    if (!walletAddress) {
      showErrorToast("connect Wallet First");
    }
    // if (!validationData) {
    //   alert("Validation data not loaded yet.");
    //   return;
    // }

    try {
      const response = await axios.post("/api/user/withdraw-request", {
        userId: clientId,
        withdrawAmount: withdrawAmount,
        from: walletAddress,
        status: "pending",
      });
      console.log("response WithDraw", response.data);
      setIsSubmitting(true);
      setIsModalOpen(false);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const StatusBadge = ({ status }) => {
    switch (status) {
      case "Completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FiCheckCircle className="mr-1" /> Completed
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <FiClock className="mr-1" /> Pending
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <FiXCircle className="mr-1" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };
  let totalBalance = parseFloat(earning) + parseFloat(commission);

  return (
    <div className="p-4 sm:p-6 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-4">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--themeColor)]">
              Withdrawal Funds
            </h1>
            {/* <p className="text-gray-400 mt-1">
              Request withdrawal of your earnings.
            </p> */}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 sm:mt-0 flex items-center justify-center px-4 py-2 bg-[var(--themeColor)] hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors"
          >
            <FiPlus className="mr-2" /> Request Withdrawal
          </button>
        </div>

        {/* Updated Balance Cards - Now with 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Total Earnings Card */}
          <div className="bg-[#272727] border border-gray-700 rounded-xl p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-500/20 text-purple-400">
                <FaHandHoldingDollar className="text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">
                  Total Daily Earning
                </p>
                <div className="text-2xl font-bold">
                  {/* ${totalEarnings.toFixed(2)} */}
                  {loading ? <h1>...</h1> : <h1 className="text-yellow-400">${earning}</h1>}
                </div>
              </div>
            </div>
          </div>

          {/* Available Balance Card */}
          <div className="bg-[#272727] border border-gray-700 rounded-xl p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-500/20 text-indigo-400">
                <PiUsersThreeBold className="text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400 text-nowrap">
                  Total Referral Commission
                </p>
                <div className="text-2xl font-bold">
                   {loading ? <h1>...</h1> : <h1 className="text-gray-400">${commission}</h1>}
                </div>
              </div>
            </div>
          </div>

          {/* Total Withdrawn Card */}
          <div className="bg-[#272727] border border-gray-700 rounded-xl p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-500/20 text-green-400">
                <MdAccountBalanceWallet className="text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">
                  Total Balance DE/RC
                </p>
                <p className="text-2xl font-bold text-green-500">
                  $
                  {(
                    totalBalance -
                    withDrawData
                      ?.filter((e) => e.status !== "Rejected") // ✅ exclude Rejected
                      .reduce((acc, e) => {
                        const amount = parseFloat(e?.withdrawAmount || 0);
                        return acc + (isNaN(amount) ? 0 : amount);
                      }, 0)
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Total Withdrawn Card */}
          <div className="bg-[#272727] border border-gray-700 rounded-xl p-5 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-500/20 text-yellow-400">
                <FiDollarSign className="text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-400">
                  Total Withdrawal
                </p>
                <p className="text-2xl font-bold text-red-500">
                  $
                  {withDrawData
                    ?.filter((e) => e.status !== "Rejected")
                    .reduce((acc, e) => {
                      const amount = parseFloat(e?.withdrawAmount || 0);
                      return acc + (isNaN(amount) ? 0 : amount);
                    }, 0)
                    .toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#272727] border border-gray-700 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-700">
            <h3 className="text-lg font-medium leading-6 text-white">
              Withdrawal History
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    S.No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#272727] divide-y divide-gray-700">
                {withDrawData.map((withdrawal, index) => (
                  <tr key={withdrawal._id} className="hover:bg-gray-800/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      ${withdrawal.withdrawAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      <StatusBadge status={withdrawal.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {/* {withdrawal.createdAt} */}
                      {withdrawal?.createdAt
                        ? new Date(withdrawal.createdAt)
                            .toISOString()
                            .split("T")[0]
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Withdrawal Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="bg-[#272727] p-6 rounded-lg max-w-md mx-auto">
            <h2 className="text-xl font-bold tex-[var(--themeColor)] mb-4">
              Request Withdrawal
            </h2>

            <div className="mb-6 p-4 bg-gray-800 rounded-lg">
              <p className="text-gray-400 text-sm">Available Balance</p>
              <p className="text-2xl font-bold text-white">
                ${totalBalance.toFixed(2)}
              </p>
            </div>

            <form onSubmit={handleWithdrawRequest}>
              <div className="mb-6">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Withdrawal Amount ($)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 text-white"
                  placeholder="Enter amount"
                  min="10"
                  max={totalBalance}
                  step="0.01"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Minimum withdrawal: $10.00
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-600 rounded-lg text-white hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Request Withdrawal"
                  )}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default WithdrawalPage;
