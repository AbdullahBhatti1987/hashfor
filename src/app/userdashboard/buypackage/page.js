"use client";
import React, { useContext, useEffect, useState } from "react";
import { HiBadgeCheck } from "react-icons/hi";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { WalletContext } from "@/context/WalletContext";
import { adminAddress, usdtAbi, usdtToken } from "@/content/data";
import { Contract } from "ethers";
import Loader from "@/components/loader";
import { showErrorToast } from "@/lib/toast";

export default function UpgradePlanPage() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [allPackages, setAllPackages] = useState([]);
  const [clientId, setClientId] = useState(null);
  const [boughtPackageIds, setBoughtPackageIds] = useState([]);
  const [highestBoughtIndex, setHighestBoughtIndex] = useState(null);

  const packageOrder = [
    "Basic",
    "Apprentice",
    "Trading",
    "Blockchain",
    "Professional",
    "Mining",
    "Forex",
    "Robotics",
  ];
  const { walletAddress, signer } = useContext(WalletContext);
  const sortedPackages = allPackages.sort((a, b) => {
    return (
      packageOrder.indexOf(a.packageName) - packageOrder.indexOf(b.packageName)
    );
  });
  const [loading, setLoading] = useState(false);
  // const [totalDailyEarning, setTotalDailyEarning] = useState(0);

  useEffect(() => {
    // const initialize = async () => {
    //   try {
    //     // 1. Fetch all packages first
    //     const res = await axios.get("/api/user/get-package");
    //     if (res.status === 200) {
    //       const packages = res.data.packages;
    //       setAllPackages(packages);

    //       if (token) {
    //         const decoded = jwtDecode(token);
    //         setClientId(decoded?.id);

    //         // 2. Now fetch bought data
    //         const boughtRes = await fetch("/api/user/getUserBoughtDetail", {
    //           method: "GET",
    //           headers: {
    //             Authorization: `Bearer ${decoded.id}`,
    //           },
    //         });

    //         const boughtData = await boughtRes.json();
    //         const bought = boughtData.data;

    //         // Run earnings logic
    //         for (const pkg of bought) await calculateDailyEarning(pkg);

    //         // Set bought IDs
    //         const ids = bought.map((pkg) => pkg.packageId);
    //         setBoughtPackageIds(ids);

    //         // ✅ Calculate highest bought index
    //         const boughtPkgs = packages.filter((p) => ids.includes(p._id));
    //         const boughtIndexes = boughtPkgs.map((p) =>
    //           packageOrder.indexOf(p.packageName)
    //         );
    //         const maxIndex = Math.max(...boughtIndexes);
    //         setHighestBoughtIndex(maxIndex);

    //         // Fetch total earning
    //         // fetchTotalDailyEarning(decoded.id);
    //       }
    //     }
    //   } catch (err) {
    //     console.error("Init error:", err);
    //   }
    // };

    // const fetchBoughtData = async (userId) => {
    //   try {
    //     const res = await fetch("/api/user/getUserBoughtDetail", {
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${userId}`,
    //       },
    //     });
    //     const data = await res.json();
    //     console.log("User Bought Data:", data.data);
    //     const boughtData = data.data;
    //     for (const pkg of boughtData) {
    //       await calculateDailyEarning(pkg);
    //     }
    //     if (res.ok) {
    //       const ids = data.data.map((pkg) => pkg.packageId);
    //       setBoughtPackageIds(ids);

    //       // ✅ Find highest bought package
    //       const boughtPackages = allPackages.filter((pkg) =>
    //         ids.includes(pkg._id)
    //       );
    //       if (boughtPackages.length > 0) {
    //         const boughtIndexes = boughtPackages.map((pkg) =>
    //           packageOrder.indexOf(pkg.packageName)
    //         );
    //         const maxIndex = Math.max(...boughtIndexes);
    //         setHighestBoughtIndex(maxIndex);
    //       }
    //     } else {
    //       console.error("Error fetching user data:", data.error);
    //     }
    //   } catch (error) {
    //     console.log("Network or server error:", error);
    //   }
    // };

    // const fetchTotalDailyEarning = async (userId) => {
    //   try {
    //     const res = await fetch(`/api/user/daily-earning?userId=${userId}`);
    //     const data = await res.json();
    //     if (data.success) {
    //       setTotalDailyEarning(data.totalEarning);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching total daily earning:", error);
    //   }
    // };
const initialize = async () => {
  try {
    // 1. Fetch all packages
    const res = await axios.get("/api/user/get-package");
    if (res.status === 200) {
      const packages = res.data.packages;
      setAllPackages(packages);

      if (token) {
        const decoded = jwtDecode(token);
        setClientId(decoded?.id);

        // 2. Fetch bought data using axios
        const boughtRes = await axios.get("/api/user/getUserBoughtDetail", {
          headers: {
            Authorization: `Bearer ${decoded.id}`,
          },
        });

        const bought = boughtRes.data.data;

        // Run earnings logic
        for (const pkg of bought) await calculateDailyEarning(pkg);

        // Set bought IDs
        const ids = bought.map((pkg) => pkg.packageId);
        setBoughtPackageIds(ids);

        // ✅ Calculate highest bought index
        const boughtPkgs = packages.filter((p) => ids.includes(p._id));
        const boughtIndexes = boughtPkgs.map((p) =>
          packageOrder.indexOf(p.packageName)
        );
        const maxIndex = Math.max(...boughtIndexes);
        setHighestBoughtIndex(maxIndex);

        // Optionally fetch earnings here:
        // await fetchTotalDailyEarning(decoded.id);
      }
    }
  } catch (err) {
    const errorMessage = err?.response?.data?.error || err.message;
    console.error("Init error:", errorMessage);
  }
};


const fetchBoughtData = async (userId) => {
  try {
    const res = await axios.get("/api/user/getUserBoughtDetail", {
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    });

    const boughtData = res.data.data;
    console.log("User Bought Data:", boughtData);

    for (const pkg of boughtData) {
      await calculateDailyEarning(pkg);
    }

    const ids = boughtData.map((pkg) => pkg.packageId);
    setBoughtPackageIds(ids);

    // ✅ Find highest bought package
    const boughtPackages = allPackages.filter((pkg) =>
      ids.includes(pkg._id)
    );
    if (boughtPackages.length > 0) {
      const boughtIndexes = boughtPackages.map((pkg) =>
        packageOrder.indexOf(pkg.packageName)
      );
      const maxIndex = Math.max(...boughtIndexes);
      setHighestBoughtIndex(maxIndex);
    }
  } catch (error) {
    const errMsg = error?.response?.data?.error || error.message;
    console.error("Error fetching user data:", errMsg);
  }
};

    initialize();
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setClientId(decodedToken?.id);
      fetchBoughtData(decodedToken?.id);
      // fetchTotalDailyEarning(decodedToken?.id);
    }
  }, []);

  const calculateDailyEarning = async (UserBoughtPackage) => {
    const {
      _id,
      userId,
      packageId,
      packageAmount,
      packageDailyPercentage,
      lastCreditedAt,
      createdAt,
    } = UserBoughtPackage;

    // ✅ Use lastCreditedAt if available, fallback to createdAt
    const lastUpdate = new Date(lastCreditedAt || createdAt);
    // Use Pakistan timezone
    const now = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" })
    );

    const msIn2Minutes = 1000 * 60 * 2; // for testing
    const intervalsPassed = Math.floor((now - lastUpdate) / msIn2Minutes);

    if (intervalsPassed < 1) {
      console.log("⏳ Less than 2 min passed since last credit.");
      return;
    }

    const dailyEarning = packageDailyPercentage;
    const totalEarning = dailyEarning * intervalsPassed;

    console.log(
      `✅ ${intervalsPassed} intervals passed. Crediting $${totalEarning}`
    );

    // ✅ Send to backend
    try {
      const response = await axios.post("/api/user/daily-earning", {
        userId,
        packageId,
        totalEarning,
        daysCredited: intervalsPassed,
        lastCreditedAt: now.toISOString(), // new reward timestamp
        packageLogId: _id,
      });

      if (response.status === 201) {
        console.log("✅ Earnings saved successfully");
      } else {
        console.error("❌ Failed to save earnings");
      }
    } catch (err) {
      console.error("❌ API error:", err);
    }
  };

  const getImageByAmount = (amount) => {
    const numericAmount = Number(amount);
    switch (numericAmount) {
      case 50:
        return "/image-4.jpeg";
      case 100:
        return "/image-1.png";
      case 200:
        return "/image-2.jpeg";
      case 500:
        return "/image-3.jpeg";
      case 1000:
        return "/image-5.jpeg";
      case 3000:
        return "/image-6.jpeg";
      case 5000:
        return "/image-7.jpeg";
      case 10000:
        return "/image-8.jpeg";
      default:
        return "/default-package.png";
    }
  };

  const getColorByPackage = (name) => {
    switch (name.toLowerCase()) {
      case "basic":
        return "bg-yellow-600";
      case "apprentice":
        return "bg-yellow-600";
      case "trading":
        return "bg-yellow-600";
      case "blockchain":
        return "bg-yellow-600";
      case "professional":
        return "bg-yellow-600";
      case "mining":
        return "bg-yellow-600";
      case "forex":
        return "bg-yellow-600";
      case "robotics":
        return "bg-yellow-600";
      default:
        return "bg-yellow-600";
    }
  };

  const INDIRECT_PERCENTAGES = [5, 3, 2, 1, 0.75, 0.5, 0.25];
  const DIRECT_PERCENTAGE = 10;

  // Top-level function to call
  const BuyPackage = async (pkg) => {
    if (!walletAddress) {
      showErrorToast("Please connect your wallet to buy a package");
      return;
    }
    setLoading(true);
    console.log("🔄 Starting USDT payment...");
    try {
      // Step 1: Transfer USDT to Admin
      console.log("🔁 Transferring USDT to admin address...");

      console.log("🔁 Transferring USDT to admin address...");
      const tx = await transferUSDTToAdmin(pkg.packageAmount);

      console.log("🔁 Transaction sent:", tx.hash);
      const receipt = await tx.wait();
      console.log("🔁 receipt:", receipt);
      if (!receipt.status) throw new Error("❌ Transaction failed on-chain.");
      console.log("🔁 receipt.status:", receipt.status);
      // Step 2: Save purchase and get parent user IDs from backend
      const { parentsArray, UserBoughtPackage } = await savePackagePurchase(
        pkg,
        tx.hash
      );
      console.log("🔁 parentsArray:", parentsArray);
      console.log("🔁 UserBoughtPackage:", UserBoughtPackage);
      // Step 3: Calculate commissions (no transfer)
      const commissionsLog = calculateCommissions(
        parentsArray,
        UserBoughtPackage.packageAmount
      );
      console.log("🔁 commissionsLog:", commissionsLog, UserBoughtPackage._id);
      // Step 4: Log commissions in backend
      await logCommissions(
        UserBoughtPackage._id,
        UserBoughtPackage.packageAmount,
        commissionsLog
      );

      // ✅ Update boughtPackageIds state immediately
      setBoughtPackageIds((prev) => [...prev, pkg._id]);

      console.log("✅ Package and commissions processed successfully!");
    } catch (err) {
      console.error("❌ Error in BuyPackage:", err);
    } finally {
      setLoading(false);
    }
  };

  const transferUSDTToAdmin = async (amount) => {
    console.log("amount", amount);
    const contract = new Contract(usdtToken, usdtAbi, signer);
    const tx = await contract.transfer(adminAddress, amount * 10 ** 6);
    console.log("tx:", tx);
    console.log("🔁 Transaction sent to admin:", tx.hash);
    return tx;
  };

  const savePackagePurchase = async (pkg, hash) => {
    const response = await axios.post("/api/user/buy-package", {
      userId: clientId,
      packageId: pkg._id,
      from: walletAddress,
      hash,
      network: "Binance", // or Ethereum, etc.
    });

    if (response.status !== 201) {
      throw new Error("❌ Backend failed to save transaction.");
    }

    return response.data; // should return { parentUserIds: [...], UserBoughtPackage: {...} }
  };

  const calculateCommissions = (parentUserIds, amount) => {
    const commissionsLog = [];

    // Direct (1st parent)
    if (parentUserIds[0]) {
      const directAmount = (amount * DIRECT_PERCENTAGE) / 100;
      commissionsLog.push({
        toUserId: parentUserIds[0],
        type: "direct",
        percent: DIRECT_PERCENTAGE,
        amount: directAmount,
      });
    }

    // Indirect (up to 7 total)
    for (
      let i = 0;
      i < Math.min(parentUserIds.length, INDIRECT_PERCENTAGES.length);
      i++
    ) {
      const userId = parentUserIds[i];
      const percent = INDIRECT_PERCENTAGES[i];
      const indirectAmount = (amount * percent) / 100;

      commissionsLog.push({
        toUserId: userId,
        type: "indirect",
        percent,
        amount: indirectAmount,
      });
    }

    return commissionsLog;
  };

  const logCommissions = async (packageId, packageAmount, commissionsLog) => {
    console.log("Logging commissions:", {
      packageId,
      commissionsLog,
      packageAmount,
    });

    await axios.post("/api/user/commissions", {
      userId: clientId,
      packageId,
      packageAmount: packageAmount,
      commissions: commissionsLog,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      {loading && <Loader />}
      <h1 className="text-2xl md:text-3xl font-bold text-[var(--themeColor)] text-center mb-8">
        Buy Package
      </h1>

      {selectedPackage && (
        <div className="max-w-md mx-auto mb-6">
          <div className="relative flex-1 group">
            <div className="absolute inset-0 -top-3 -left-3 w-full h-full rounded-2xl blur-xl z-0 bg-gradient-to-br from-[var(--themeColor)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center gap-4 p-5 rounded-2xl bg-[#272727] border border-white/10 shadow-lg transition-all duration-300 hover:border-[var(--themeColor)]/30 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)]">
              <div className="relative">
                <div className="absolute inset-0 rounded-lg flex items-center justify-center bg-[var(--themeColor)]/20 blur-sm" />
                <img
                  src={selectedPackage.image || "/default-package.png"}
                  alt={selectedPackage.title || "Selected Package"}
                  className="relative z-10 h-28 w-28 sm:h-32 sm:w-32 object-contain rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-center space-y-2">
                <HiBadgeCheck size={20} className="text-green-800" />
                <h2 className="text-lg font-bold text-white">
                  Current Package
                </h2>
                <p className="text-xl font-extrabold text-[var(--themeColor)]">
                  {selectedPackage.price}
                </p>
                <p className="italic text-xs text-gray-300">
                  {selectedPackage.title}
                </p>
                <p className="text-xs text-gray-300">
                  Up to {selectedPackage.daily} daily
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center items-center gap-5 max-w-5xl mx-auto mb-8">
        {sortedPackages
          .filter((pkg) => {
            const pkgIndex = packageOrder.indexOf(pkg.packageName);
            if (highestBoughtIndex === null) return true; // show all if none bought yet
            return pkgIndex >= highestBoughtIndex; // show only current or above
          })
          .map((pkg, index) => {
            const imageSrc = getImageByAmount(pkg.packageAmount);
            const color = getColorByPackage(pkg.packageName);
            const isBought = boughtPackageIds.includes(pkg._id);
            const hasAnyBought = boughtPackageIds.length > 0;

            let buttonLabel = "Buy Package";
            let buttonClass =
              "bg-[var(--themeColor)] hover:bg-yellow-600 text-black";
            let disabled = false;

            if (hasAnyBought) {
              if (isBought) {
                buttonLabel = "Already Bought";
                buttonClass =
                  "bg-gray-500 text-[var(--themeColor)] cursor-not-allowed";
                disabled = true;
              } else {
                buttonLabel = `Upgrade to ${pkg.packageName}`;
              }
            }

            return (
              <div
                key={index}
                className="relative flex-1 min-w-[300px] max-w-[300px]"
              >
                <div
                  className={`absolute inset-0 -top-3 -left-3 w-full h-full rounded-2xl blur-xl z-0 bg-gradient-to-br from-[var(--themeColor)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isBought ? "hidden" : ""
                  }`}
                />
                <div
                  className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#272727] border shadow-lg transition-all duration-300 ${
                    isBought
                      ? "border-gray-500"
                      : "border-white/10 hover:border-[var(--themeColor)]/30 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                  }`}
                >
                  <div
                    className={`px-3 py-1 text-xs font-semibold rounded-full text-white mb-2 ${color}`}
                  >
                    {pkg.packageName}
                  </div>
                  <div className="relative">
                    <div
                      className={`absolute inset-0 rounded-lg flex items-center justify-center ${
                        isBought
                          ? "bg-gray-500/20"
                          : "bg-[var(--themeColor)]/20"
                      } blur-sm`}
                    />
                    <img
                      src={imageSrc}
                      alt={pkg.packageName}
                      className="relative h-40 w-40 object-contain rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-2 w-full">
                    <p className="text-xs text-gray-300">
                      Up to {pkg.packageDailyPercentage}% daily
                    </p>
                    <button
                      className={`mt-3 w-full max-w-[180px] h-10 rounded-full font-bold text-sm shadow-md transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis px-2 transform group-hover:scale-105 ${buttonClass}`}
                      onClick={() => !disabled && BuyPackage(pkg)}
                      disabled={disabled}
                      title={disabled ? "Already Bought" : buttonLabel}
                    >
                      {buttonLabel}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}