"use client";
import React, { useState } from "react";
import {
  FiUsers,
  FiTrendingUp,
  FiDollarSign,
  FiBarChart2,
  FiUserPlus,
  FiDownload,
  FiSearch,
  FiInfo
} from "react-icons/fi";

export default function TeamReportPage() {
  const [timeRange, setTimeRange] = useState("weekly");
  const [activeTab, setActiveTab] = useState("summary");
  const [searchQuery, setSearchQuery] = useState("");

  const teamStats = {
    totalMembers: 42,
    activeMembers: 36,
    newThisWeek: 5,
    totalSales: "$28,450",
    teamBonus: "$2,845",
    growthRate: "18.5%"
  };

  const teamMembers = [
    { id: 1, name: "Alex Johnson", level: 1, joinDate: "2023-05-15", status: "active", sales: "$4,250", bonus: "$425" },
    { id: 2, name: "Sarah Williams", level: 2, joinDate: "2023-04-22", status: "active", sales: "$3,750", bonus: "$375" },
    { id: 3, name: "Michael Brown", level: 1, joinDate: "2023-06-10", status: "active", sales: "$2,980", bonus: "$298" },
    { id: 4, name: "Emily Davis", level: 3, joinDate: "2023-03-05", status: "active", sales: "$5,620", bonus: "$562" },
    { id: 5, name: "David Wilson", level: 1, joinDate: "2023-07-18", status: "inactive", sales: "$1,250", bonus: "$125" },
    { id: 6, name: "Jessica Lee", level: 2, joinDate: "2023-05-30", status: "active", sales: "$3,420", bonus: "$342" },
  ];

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#FFE990] to-[#FFD700] bg-clip-text text-transparent">
            Team Report
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Track your team&apos;s performance and growth metrics
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-between items-center mb-8">
          <div className="inline-flex bg-[#272727] rounded-full p-1 border border-white/10">
            <button
              onClick={() => setTimeRange("weekly")}
              className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
                timeRange === "weekly" ? "bg-[#FFE990] text-black" : "text-gray-300 hover:text-white"
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeRange("monthly")}
              className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
                timeRange === "monthly" ? "bg-[#FFE990] text-black" : "text-gray-300 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setTimeRange("all")}
              className={`px-4 py-1 rounded-full text-xs font-medium transition-all ${
                timeRange === "all" ? "bg-[#FFE990] text-black" : "text-gray-300 hover:text-white"
              }`}
            >
              All Time
            </button>
          </div>

          <button className="flex items-center bg-[#FFE990] hover:bg-[#FFD700] text-black font-semibold px-4 py-2 rounded-full text-sm transition-all">
            <FiDownload className="mr-2" /> Export Report
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab("summary")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
              activeTab === "summary" ? "border-[#FFE990] text-[#FFE990]" : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Summary
          </button>
          <button
            onClick={() => setActiveTab("members")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
              activeTab === "members" ? "border-[#FFE990] text-[#FFE990]" : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Team Members
          </button>
          <button
            onClick={() => setActiveTab("structure")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
              activeTab === "structure" ? "border-[#FFE990] text-[#FFE990]" : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Team Structure
          </button>
        </div>

        {/* Main Content */}
        {activeTab === "summary" && (
          <div className="space-y-6">
            {/* Team Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Total Members */}
              <div className="bg-gradient-to-br from-[#1E1E1E] to-[#272727] border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400">Total Members</h3>
                  <FiUsers className="text-[#FFE990] text-xl" />
                </div>
                <div className="text-3xl font-bold mb-2">{teamStats.totalMembers}</div>
                <div className="text-sm text-green-400 flex items-center">
                  <FiUserPlus className="mr-1" />
                  +{teamStats.newThisWeek} this week
                </div>
              </div>

              {/* Active Members */}
              <div className="bg-gradient-to-br from-[#1E1E1E] to-[#272727] border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400">Active Members</h3>
                  <FiTrendingUp className="text-[#FFE990] text-xl" />
                </div>
                <div className="text-3xl font-bold mb-2">{teamStats.activeMembers}</div>
                <div className="text-sm text-gray-400">
                  {Math.round((teamStats.activeMembers / teamStats.totalMembers) * 100)}% active rate
                </div>
              </div>

              {/* Team Sales */}
              <div className="bg-gradient-to-br from-[#1E1E1E] to-[#272727] border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400">Team Sales</h3>
                  <FiDollarSign className="text-[#FFE990] text-xl" />
                </div>
                <div className="text-3xl font-bold mb-2">{teamStats.totalSales}</div>
                <div className="text-sm text-green-400">
                  +{teamStats.growthRate} from last {timeRange}
                </div>
              </div>

              {/* Team Bonus */}
              <div className="bg-gradient-to-br from-[#1E1E1E] to-[#272727] border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400">Your Team Bonus</h3>
                  <FiBarChart2 className="text-[#FFE990] text-xl" />
                </div>
                <div className="text-3xl font-bold mb-2">{teamStats.teamBonus}</div>
                <div className="text-sm text-gray-400">
                  10% of team sales
                </div>
              </div>
            </div>

            {/* Performance Chart */}
            <div className="bg-[#1E1E1E] border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Team Performance</h3>
              <div className="h-64 bg-[#272727] rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FiBarChart2 className="mx-auto text-4xl text-gray-600 mb-2" />
                  <p className="text-gray-500">Team performance chart</p>
                  <p className="text-xs text-gray-600 mt-1">
                    (Connect your chart library to visualize data)
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="bg-[#1E1E1E] hover:bg-[#272727] border border-white/10 rounded-xl p-6 text-left transition-all">
                <div className="flex items-center">
                  <FiUserPlus className="text-[#FFE990] text-xl mr-3" />
                  <div>
                    <h3 className="font-bold mb-1">Invite New Members</h3>
                    <p className="text-sm text-gray-400">Share your referral link</p>
                  </div>
                </div>
              </button>
              <button className="bg-[#1E1E1E] hover:bg-[#272727] border border-white/10 rounded-xl p-6 text-left transition-all">
                <div className="flex items-center">
                  <FiDownload className="text-[#FFE990] text-xl mr-3" />
                  <div>
                    <h3 className="font-bold mb-1">Download Report</h3>
                    <p className="text-sm text-gray-400">Export detailed team data</p>
                  </div>
                </div>
              </button>
              <button className="bg-[#1E1E1E] hover:bg-[#272727] border border-white/10 rounded-xl p-6 text-left transition-all">
                <div className="flex items-center">
                  <FiInfo className="text-[#FFE990] text-xl mr-3" />
                  <div>
                    <h3 className="font-bold mb-1">Team Resources</h3>
                    <p className="text-sm text-gray-400">Training materials</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {activeTab === "members" && (
          <div className="bg-[#1E1E1E] border border-white/10 rounded-xl p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <h3 className="text-lg font-bold">Team Members</h3>
              
              <div className="relative w-full md:w-64">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#272727] border border-white/10 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FFE990]"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-white/10">
                    <th className="pb-3">Member</th>
                    <th className="pb-3">Level</th>
                    <th className="pb-3">Join Date</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Sales</th>
                    <th className="pb-3 pr-2">Your Bonus</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="border-b border-white/5 hover:bg-[#272727]/50">
                      <td className="py-4 font-medium">{member.name}</td>
                      <td className="py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#272727] text-gray-300">
                          Level {member.level}
                        </span>
                      </td>
                      <td className="py-4 text-gray-400">{member.joinDate}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          member.status === "active" 
                            ? "bg-green-900/30 text-green-400" 
                            : "bg-red-900/30 text-red-400"
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="py-4 font-medium text-[#FFE990]">{member.sales}</td>
                      <td className="py-4 pr-2 font-medium text-[#FFE990]">{member.bonus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "structure" && (
          <div className="bg-[#1E1E1E] border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-6">Team Structure</h3>
            
            <div className="flex justify-center mb-8">
              <div className="bg-[#272727] border border-white/10 rounded-lg p-8 flex items-center justify-center">
                <div className="text-center">
                  <FiUsers className="mx-auto text-4xl text-gray-600 mb-4" />
                  <p className="text-gray-500">Team structure visualization</p>
                  <p className="text-xs text-gray-600 mt-2">
                    (Connect your team visualization library)
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-[#272727] border border-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold mb-1">12</div>
                <div className="text-sm text-gray-400">Level 1</div>
              </div>
              <div className="bg-[#272727] border border-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold mb-1">8</div>
                <div className="text-sm text-gray-400">Level 2</div>
              </div>
              <div className="bg-[#272727] border border-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold mb-1">5</div>
                <div className="text-sm text-gray-400">Level 3</div>
              </div>
              <div className="bg-[#272727] border border-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold mb-1">2</div>
                <div className="text-sm text-gray-400">Level 4+</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}