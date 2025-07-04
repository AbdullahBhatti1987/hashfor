"use client";

import React, { useEffect, useState } from "react";
import Card from "./cards";
import { LuPackageCheck } from "react-icons/lu";
import { FiPackage } from "react-icons/fi";
import { BsMicrosoftTeams } from "react-icons/bs";
import { GiUpgrade } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";
import { PiHandWithdraw } from "react-icons/pi";
import { FaBalanceScaleRight } from "react-icons/fa";
import { LuBriefcaseBusiness } from "react-icons/lu";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { showErrorToast } from "@/lib/toast";

function HoverDevCards() {
  const [balance, setBalance] = useState(null);
  const [dailyEarning, setDailyEarning] = useState(null);
  const [loading, setLoading] = useState(true);
  const [earning, setEarning] = useState();
  const [commission, setCommission] = useState();
  const [withDrawData, setWithDrawData] = useState([]);

  // const { user, token } = useAuth();
  // const userId = user?.id || user?._id;

  //Data fetching
  useEffect(() => {
    // console.log("userId", userId);
    // const fetchDailyEarnings = async (userId) => {
    //   try {
    //     const response = await axios.get("/api/user/daily-earning", {
    //       headers: {
    //         Authorization: `Bearer ${userId}`,
    //       },
    //     });
    //     console.log("earning", response.data.data);
    //   } catch (error) {
    //     console.error("Error fetching daily earnings:", error);
    //   } finally {
    //     setLoading(false);
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
    // // referral Based Commission
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
    const fetchWithDrawData = async (userId) => {
      try {
        const res = await fetch("/api/user/getWithdrawDetail", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        });
        const data = await res.json();

        if (res.ok) {
          // console.log("✅ WithDraw Data:", data.data);
          setWithDrawData(data.data);
          // console.log("checking data", data.data[0].packageId);
        } else {
          showErrorToast("❌ Error fetching user data:");
        }
      } catch (error) {
        showErrorToast("⚠️ Network error:");
      }
    };
    const getAllData = async (userId) => {
      try {
        const res = await fetch("/api/user/allDetails", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        });
        const data = await res.json();

        if (res.ok) {
          // console.log("✅ WithDraw Data:", data.data);
          setCommission(data.TotalCommission);
          setEarning(data.totalEarning);
          // console.log("checking data", data.totalEarning);
          // console.log("checking data", data.TotalCommission);
        } else {
          showErrorToast("❌ Error fetching user data:");
        }
      } catch (error) {
        showErrorToast("⚠️ Network error:");
      } finally {
        setLoading(false);
      }
    };
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.id && decoded?.code) {
          // setClientId(decoded.id);
          getAllData(decoded?.id);
          fetchWithDrawData(decoded?.id);
        }
      } catch (err) {
        showErrorToast("Invalid token:");
      }
    }
  }, []);
  let totalBalance = parseFloat(earning) + parseFloat(commission);
  const cardData = [
    // {
    //   name: "Buy Package",
    //   Icon: LuPackageCheck,
    //   price: "21182.50",
    //   change: "+1.25%",
    //   color: "#16A34A",
    //   bgColor: "#FEF3C7",
    // },
    // {
    //   name: "My Package",
    //   Icon: FiPackage,
    //   price: "598.296",
    //   change: "+2.73%",
    //   color: "#16A34A",
    //   bgColor: "#EDE9FE",
    // },
    // {
    //   name: "Business (Left/Right)",
    //   Icon: LuBriefcaseBusiness,
    //   price: "0.24548",
    //   change: "-1.25%",
    //   color: "#B91C1C",
    //   bgColor: "#E0F2FE",
    // },
    {
      name: "Total Earning ",
      Icon: BsCashCoin,
      price: earning,
      change: "+0.89%",
      color: "#16A34A",
      bgColor: "#ECFDF5",
    },
    {
      name: "Total Commission",
      Icon: BsMicrosoftTeams,
      price: commission,
      // dailyEarning === null
      //   ? "Loading..."
      //   : Number(dailyEarning) === 0 ||
      //     dailyEarning === "0.00" ||
      //     dailyEarning === "0"
      //   ? 0
      //   : dailyEarning,
      change: "+2.73%",
      color: "#16A34A",
      bgColor: "#FEF3C7",
    },
    {
      name: "Total Balance",
      Icon: GiUpgrade,
      price:
        totalBalance -
        withDrawData
          ?.filter((e) => e.status !== "Rejected") // ✅ exclude Rejected
          .reduce((acc, e) => {
            const amount = parseFloat(e?.withdrawAmount || 0);
            return acc + (isNaN(amount) ? 0 : amount);
          }, 0)
          .toFixed(2),
      change: "+2.73%",
      color: "#16A34A",
      bgColor: "#16A34A",
    },
    {
      name: "Total Withdraw",
      Icon: PiHandWithdraw,
      price: withDrawData
        ?.filter((e) => e.status !== "Rejected")
        .reduce((acc, e) => {
          const amount = parseFloat(e?.withdrawAmount || 0);
          return acc + (isNaN(amount) ? 0 : amount);
        }, 0)
        .toFixed(2),
      change: "+2.73%",
      color: "#16A34A",
      bgColor: "#16A34A",
    },
    // {
    //   name: "Commission",
    //   Icon: FaBalanceScaleRight,
    //   price:
    //     balance === null
    //       ? "Loading..."
    //       : Number(balance) === 0 || balance === "0.00" || balance === "0"
    //       ? 0
    //       : balance,
    //   change: "+2.73%",
    //   color: "#16A34A",
    //   bgColor: "#16A34A",
    // },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-2 sm:gap-3 w-full">
      {cardData.map((item, index) => (
        <Card
          key={index}
          name={item.name}
          Icon={item.Icon}
          price={item.price}
          change={item.change}
          color={item.color}
          bgColor={item.bgColor}
        />
      ))}
    </div>
  );
}

export default HoverDevCards;
