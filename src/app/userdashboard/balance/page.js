"use client";
import React, { useState } from "react";
import { 
  FiDollarSign,
  FiRefreshCw,
  FiCreditCard
} from "react-icons/fi";

export default function BalancePage() {
  const [activeTab, setActiveTab] = useState("overview");

  const balanceData = {
    totalBalance: "$2,845.50",
    availableBalance: "$1,920.25",
    investedBalance: "$925.25",
    growthThisMonth: "+12.5%",
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-[var(--themeColor)] bg-clip-text text-transparent">
            My Balance
          </h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-[#272727] rounded-full p-1 border border-white/10">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "overview" ? "bg-[var(--themeColor)] text-black" : "text-gray-300 hover:text-white"
              }`}
            >
              Overview
            </button>
          </div>
        </div>

        {/* Main Content */}
          <div className="space-y-6">
            {/* Balance Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Balance */}
              <div className="bg-[#272727] border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400">Total Balance</h3>
                  <FiDollarSign className="text-[var(--themeColor)] text-xl" />
                </div>
                <div className="text-3xl font-bold mb-2">{balanceData.totalBalance}</div>
                <div className="text-sm text-green-400 flex items-center">
                  <FiDollarSign className="mr-1" />
                  {balanceData.growthThisMonth} this month
                </div>
              </div>

              {/* Available Balance */}
              <div className="bg-[#272727] border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400">Available</h3>
                  <FiCreditCard className="text-[var(--themeColor)] text-xl" />
                </div>
                <div className="text-3xl font-bold mb-2">{balanceData.availableBalance}</div>
                <div className="text-sm text-gray-400">
                  Ready to withdraw or invest
                </div>
              </div>

              {/* Invested Balance */}
              <div className="bg-[#272727] border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400">Invested</h3>
                  <FiRefreshCw className="text-[var(--themeColor)] text-xl" />
                </div>
                <div className="text-3xl font-bold mb-2">{balanceData.investedBalance}</div>
                <div className="text-sm text-gray-400">
                  In active business plans
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}