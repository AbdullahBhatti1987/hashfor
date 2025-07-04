"use client";
import React, { useState } from "react";
import { FiArrowUpRight, FiInfo, FiDollarSign, FiTrendingUp, FiClock } from "react-icons/fi";

export default function BusinessPage() {
  const [activeTab, setActiveTab] = useState("left");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const businessPlans = {
    left: [
      {
        id: 1,
        name: "Starter Pack",
        amount: "$50",
        dailyProfit: "2.5%",
        duration: "30 days",
        totalReturn: "$53.75",
        color: "bg-blue-500",
      },
      {
        id: 2,
        name: "Growth Plan",
        amount: "$200",
        dailyProfit: "3%",
        duration: "45 days",
        totalReturn: "$227.00",
        color: "bg-purple-500",
      },
      {
        id: 3,
        name: "Premium Plan",
        amount: "$500",
        dailyProfit: "3.5%",
        duration: "60 days",
        totalReturn: "$605.00",
        color: "bg-green-500",
      },
    ],
    right: [
      {
        id: 4,
        name: "Pro Investor",
        amount: "$1000",
        dailyProfit: "4%",
        duration: "30 days",
        totalReturn: "$1120.00",
        color: "bg-yellow-500",
      },
      {
        id: 5,
        name: "VIP Package",
        amount: "$3000",
        dailyProfit: "4.5%",
        duration: "45 days",
        totalReturn: "$3607.50",
        color: "bg-red-500",
      },
      {
        id: 6,
        name: "Elite Club",
        amount: "$5000",
        dailyProfit: "5%",
        duration: "60 days",
        totalReturn: "$6500.00",
        color: "bg-indigo-500",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#FFE990] to-[#FFD700] bg-clip-text text-transparent">
            Business Plans
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose your investment strategy and start growing your capital today
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-[#272727] rounded-full p-1 border border-white/10">
            <button
              onClick={() => setActiveTab("left")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "left" ? "bg-[#FFE990] text-black" : "text-gray-300 hover:text-white"
              }`}
            >
              Left Business
            </button>
            <button
              onClick={() => setActiveTab("right")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === "right" ? "bg-[#FFE990] text-black" : "text-gray-300 hover:text-white"
              }`}
            >
              Right Business
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {businessPlans[activeTab].map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan)}
              className={`relative group cursor-pointer transition-transform hover:scale-105 ${
                selectedPlan?.id === plan.id ? "ring-2 ring-[#FFE990]" : ""
              }`}
            >
              {/* Gradient Halo Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#FFE990]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Plan Card */}
              <div className="relative z-10 bg-[#1E1E1E] border border-white/10 rounded-xl p-6 h-full">
                <div className={`${plan.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <FiDollarSign className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-300">
                    <FiTrendingUp className="mr-2 text-[#FFE990]" />
                    <span>Daily Profit: <span className="text-white">{plan.dailyProfit}</span></span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <FiClock className="mr-2 text-[#FFE990]" />
                    <span>Duration: <span className="text-white">{plan.duration}</span></span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <FiDollarSign className="mr-2 text-[#FFE990]" />
                    <span>Total Return: <span className="text-white">{plan.totalReturn}</span></span>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold mb-4">{plan.amount}</div>
                  <button className="w-full bg-[#FFE990] hover:bg-[#FFD700] text-black font-semibold py-2 px-4 rounded-full flex items-center justify-center transition-all">
                    Invest Now <FiArrowUpRight className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Plan Details */}
        {selectedPlan && (
          <div className="bg-[#1E1E1E] border border-white/10 rounded-xl p-6 mb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">{selectedPlan.name}</h3>
                <p className="text-gray-400">You&apos;re about to invest in this business plan</p>
              </div>
              <div className="text-3xl font-bold mt-4 md:mt-0">{selectedPlan.amount}</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#272727] p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <FiTrendingUp className="text-[#FFE990] mr-2" />
                  <span className="text-gray-400">Daily Profit</span>
                </div>
                <div className="text-xl font-bold">{selectedPlan.dailyProfit}</div>
              </div>
              <div className="bg-[#272727] p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <FiClock className="text-[#FFE990] mr-2" />
                  <span className="text-gray-400">Duration</span>
                </div>
                <div className="text-xl font-bold">{selectedPlan.duration}</div>
              </div>
              <div className="bg-[#272727] p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <FiDollarSign className="text-[#FFE990] mr-2" />
                  <span className="text-gray-400">Total Return</span>
                </div>
                <div className="text-xl font-bold">{selectedPlan.totalReturn}</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-[#FFE990] hover:bg-[#FFD700] text-black font-semibold py-3 px-6 rounded-full transition-all">
                Confirm Investment
              </button>
              <button 
                onClick={() => setSelectedPlan(null)}
                className="flex-1 bg-transparent border border-white/20 hover:border-[#FFE990] text-white font-semibold py-3 px-6 rounded-full transition-all"
              >
                Choose Another Plan
              </button>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="bg-[#1E1E1E] border border-white/10 rounded-xl p-6">
          <div className="flex items-start">
            <FiInfo className="text-[#FFE990] text-xl mt-1 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-lg font-bold mb-2">How Business Plans Work</h4>
              <p className="text-gray-400 mb-4">
                Our business plans are designed to help you grow your investment through carefully calculated returns. 
                Choose between Left Business (short-term) or Right Business (long-term) based on your investment goals.
              </p>
              <ul className="text-gray-400 space-y-2 list-disc pl-5">
                <li>Profits are calculated daily and compounded</li>
                <li>Initial investment is returned at the end of the duration</li>
                <li>You can reinvest your profits anytime</li>
                <li>24/7 customer support available</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}