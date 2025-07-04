"use client";

import React, { useEffect, useState } from "react";
import AdminCard from "./cards";
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

function AdminHoverDevCards() {
  const [balance, setBalance] = useState(null);
  const [dailyEarning, setDailyEarning] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // useEffect(() => {
  //   const fetchStats = async () => {
  //     try {
  //       const res = await fetch("/api/admin/getDashboardData"); // ✅ Replace with actual path if different
  //       const data = await res.json();

  //       if (!res.ok) throw new Error(data.error || "Failed to fetch stats");
  //       console.log("adminData", data);
  //       setStats(data);
  //     } catch (err) {
  //       setError(err.message || "Unknown error");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchStats();
  // }, []);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/admin/getDashboardData"); // ✅ Adjust path if needed

        console.log("adminData", res.data);
        setStats(res.data);
      } catch (err) {
        const errorMsg =
          err.response?.data?.error || err.message || "Unknown error";
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
  const cardData = [
    {
      name: "Total Users",
      Icon: LuPackageCheck,
      price: stats?.userCount,
      change: "+1.25%",
      color: "#16A34A",
      bgColor: "#FEF3C7",
    },
    {
      name: "Total Packages",
      Icon: FiPackage,
      price: stats?.packageCount,
      change: "+2.73%",
      color: "#16A34A",
      bgColor: "#EDE9FE",
    },
    {
      name: "Total Earning",
      Icon: LuBriefcaseBusiness,
      price: stats?.totalEarning?.toFixed(2),
      change: "-1.25%",
      color: "#B91C1C",
      bgColor: "#E0F2FE",
    },
    {
      name: "Total Commission",
      Icon: BsCashCoin,
      price: stats?.totalCommission?.toFixed(2),
      change: "+0.89%",
      color: "#16A34A",
      bgColor: "#ECFDF5",
    },
    {
      name: "Total Withdraw",
      Icon: BsMicrosoftTeams,
      price: stats?.totalWithdrawAmount?.toFixed(2),
      change: "+2.73%",
      color: "#16A34A",
      bgColor: "#FEF3C7",
    },
    {
      name: "Bought Packages Amount",
      Icon: BsMicrosoftTeams,
      price: stats?.totalBoughtPackageAmount?.toFixed(2),
      change: "+2.73%",
      color: "#16A34A",
      bgColor: "#FEF3C7",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 sm:gap-3 w-full">
      {cardData.map((item, index) => (
        <AdminCard
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

export default AdminHoverDevCards;
