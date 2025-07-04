import React from "react";
import { LuCoins } from "react-icons/lu";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";

const FutureFinanace = () => {
  const data = [
    {
      icon: <LuCoins className="text-[#d2af57] text-2xl" />,
      heading: "Low Transaction ",
      text: "Save on costs with our optimized protocols that minimize gas fees and maximize returns.",
    },
    {
      icon: <SiGoogleanalytics className="text-[#d2af57] text-2xl" />,
      heading: "Advanced Analytics",
      text: "Make informed decisions with real-time data and powerful analytics tools.",
    },
    {
      icon: <FaWallet className="text-[#d2af57] text-2xl" />,
      heading: "Secure Wallet",
      text: "Your assets are protected with military-grade encryption and multi-signature technology.",
    },
    {
      icon: <FaArrowTrendUp className="text-[#d2af57] text-2xl" />,
      heading: "High Yield Farming",
      text: "Earn passive income through our innovative yield farming strategies.",
    },
  ];

  const marketOverview = [
    {
      icon: <FaWallet className="text-[#d2af57] text-2xl" />,
      name: "Total value Locked",
      price: "2.45B",
      changes: "+12.5",
    },
    {
      icon: <SiGoogleanalytics className="text-[#d2af57] text-2xl" />,
      name: "Trading Volume 24h",
      price: "847.2M",
      changes: "+5.8",
    },
    {
      icon: <LuCoins className="text-[#d2af57] text-2xl" />,
      name: "HFR Price",
      price: "3.24",
      changes: "-2.1",
    },
    {
      icon: <FaArrowTrendUp className="text-[#d2af57] text-2xl" />,
      name: "Active Users",
      price: "284.5K",
      changes: "+8.7",
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 md:px-12 py-10">
      {/* Heading Section */}
      <div className="text-center text-white space-y-3 mb-12">
        <p className="text-2xl sm:text-3xl md:text-4xl gold-text font-bold">
          Powering the Future of Finance
        </p>
        <p className="text-gray-300 text-md sm:text-lg md:text-xl">
          Experience the most advanced DeFi platform with innovative features
        </p>
        <p className="text-gray-300 text-md sm:text-lg md:text-xl">
          designed to maximize your investment potential.
        </p>
      </div>

      {/* Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-white mb-16">
        {data?.map((e, i) => (
          <div
            key={i}
            className="rounded-xl p-6 border border-white/20 hover:opacity-90 hover:-translate-y-1 transition duration-200 ease-in-out"
            style={{
              background:
                "linear-gradient(to left, rgba(217, 204, 138, 0.42), rgba(236, 206, 104, 0.3), rgba(181, 144, 44, 0.3))",
            }}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-900/30 mb-4">
              {e.icon}
            </div>
            <p className="gold-text text-xl sm:text-2xl font-bold">{e.heading}</p>
            <p className="text-sm sm:text-base text-white mt-1">{e.text}</p>
          </div>
        ))}
      </div>

      {/* Market Overview Section */}
      <div className="text-center mb-8">
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold gold-text">
          Market Overview
        </p>
      </div>

      {/* Market Cards */}
      <div className="flex justify-center flex-wrap gap-9 text-white mt-13 cursor-pointer">
        {marketOverview?.map((e, i) => {
          return (
            <div
              className="rounded-xl p-6 w-full md:w-1/5 border border-white/20 hover:opacity-90 hover:-translate-y-1 transition duration-200 ease-in-out mb-5"
              style={{
                background:
                  "linear-gradient(to left,rgba(217, 204, 138, 0.42), rgba(236, 206, 104, 0.3), rgba(181, 144, 44, 0.3))",
              }}
              key={i}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-900/30">
                  {e.icon}
                </div>
                <div className="text-xs bg-green-500 text-white rounded-full px-2 py-1">
                  {e.changes}%
                </div>
              </div>
              <p className="text-gray-400 text-sm">{e.name}</p>
              <p className="gold-text font-bold text-xl sm:text-2xl">${e.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FutureFinanace;
