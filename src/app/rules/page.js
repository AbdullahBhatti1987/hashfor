"use client";
import React from "react";
import { FiDollarSign, FiCalendar, FiGift, FiSettings, FiAlertCircle, FiInfo } from "react-icons/fi";
import Footer from "@/components/footer/page";

export default function RulesPage() {
  return (
    <>
    <div className='bg-gold-gradient px-4 sm:px-6' style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
    <div className="min-h-screen mt-14 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-[var(--themeColor)] bg-clip-text text-transparent">
            Rules
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto">
            Clear guidelines for participation and rewards distribution
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Rule 1 */}
          <div className="bg-black/60 border border-white/10 rounded-xl p-6 group hover:border-[#FFE990]/30 transition-all">
            <div className="flex items-start mb-4">
              <div className="bg-[#272727] p-3 rounded-lg mr-4 group-hover:bg-[var(--themeColor)] group-hover:text-black transition-all">
                <FiDollarSign className="text-[var(--themeColor)] group-hover:text-black text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Pocket Money Distribution</h3>
                <p className="text-gray-300">
                  Shared <span className="text-[var(--themeColor)]">5 days a week</span> (Monday to Friday)
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Saturdays and Sundays excluded from pocket money distribution
                </p>
              </div>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="bg-black/60 border border-white/10 rounded-xl p-6 group hover:border-[#FFE990]/30 transition-all">
            <div className="flex items-start mb-4">
              <div className="bg-[#272727] p-3 rounded-lg mr-4 group-hover:bg-[var(--themeColor)] group-hover:text-black transition-all">
                <FiCalendar className="text-[var(--themeColor)] group-hover:text-black text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Stipend Schedule</h3>
                <p className="text-gray-300">
                  Distributed <span className="text-[var(--themeColor)]">7 days a week</span>, including weekends
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Daily stipends processed at 12:00 AM UTC
                </p>
              </div>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="bg-black/60 border border-white/10 rounded-xl p-6 group hover:border-[#FFE990]/30 transition-all">
            <div className="flex items-start mb-4">
              <div className="bg-[#272727] p-3 rounded-lg mr-4 group-hover:bg-[var(--themeColor)] group-hover:text-black transition-all">
                <FiGift className="text-[var(--themeColor)] group-hover:text-black text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Package Upgrade Rule</h3>
                <p className="text-gray-300">
                  Minimum <span className="text-[var(--themeColor)]">same or higher package</span> required after 3X, 4X or 5X return
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  System will notify you when upgrade is required
                </p>
              </div>
            </div>
          </div>

          {/* Rule 4 */}
          <div className="bg-black/60 border border-white/10 rounded-xl p-6 group hover:border-[#FFE990]/30 transition-all">
            <div className="flex items-start mb-4">
              <div className="bg-[#272727] p-3 rounded-lg mr-4 group-hover:bg-[var(--themeColor)] group-hover:text-black transition-all">
                <FiSettings className="text-[var(--themeColor)] group-hover:text-black text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Humanitarian Reward</h3>
                <p className="text-gray-300">
                  <span className="text-[var(--themeColor)]">3% default</span> applied to every package
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Can be disabled in account settings if desired
                </p>
              </div>
            </div>
          </div>

          {/* Rule 5 */}
          <div className="bg-black/60 border border-white/10 rounded-xl p-6 group hover:border-[#FFE990]/30 transition-all">
            <div className="flex items-start mb-4">
              <div className="bg-[#272727] p-3 rounded-lg mr-4 group-hover:bg-[var(--themeColor)] group-hover:text-black transition-all">
                <FiDollarSign className="text-[var(--themeColor)] group-hover:text-black text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Withdrawal Minimum</h3>
                <p className="text-gray-300">
                  <span className="text-[var(--themeColor)]">$10 minimum</span> withdrawal amount
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  No maximum limit for withdrawals
                </p>
              </div>
            </div>
          </div>

          {/* Rule 6 */}
          <div className="bg-black/60 border border-white/10 rounded-xl p-6 group hover:border-[#FFE990]/30 transition-all">
            <div className="flex items-start mb-4">
              <div className="bg-[#272727] p-3 rounded-lg mr-4 group-hover:bg-[var(--themeColor)] group-hover:text-black transition-all">
                <FiAlertCircle className="text-[var(--themeColor)] group-hover:text-black text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Free Membership</h3>
                <p className="text-gray-300">
                  Free joining benefits expire after <span className="text-[var(--themeColor)]">30 days</span>
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Upgrade required to maintain account access
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
     <Footer />
     </>
  );
}