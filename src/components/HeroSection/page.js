"use client";
import React from "react";
import { LuCoins } from "react-icons/lu";
import { FaArrowTrendUp } from "react-icons/fa6";
import GlobeCanvas from "../globeCanvas/page";
import AuroraHero from "../heroSectionanim";

const HeroSection = () => {
  return (
    <AuroraHero>
      {/* Foreground Content */}
      <div className="relative flex flex-col items-center justify-center md:flex-row w-full px-4 sm:px-6 md:px-10 py-10 max-w-6xl mx-auto">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center mt-10 md:mt-0">
          <div className="max-w-2xl text-center md:text-left">
            <h1 className="text-[var(--themeColor)] text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
            Your Crypto Education, Your Earning Future
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 pt-4">
             Unlock life-changing opportunities through crypto education, digital skill-building, and a unique earning ecosystem designed for ambitious learners worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mt-8 items-center sm:items-start justify-center sm:justify-start">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-yellow-900/30">
                  <LuCoins className="text-yellow-400 text-2xl sm:text-3xl" />
                </div>
                <div>
                  <h3 className="gold-text text-xl text-[var(--themeColor)] sm:text-2xl font-bold">
                    $3.3T+
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-md">
                    Total Value Locked
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-yellow-900/30">
                  <FaArrowTrendUp className="text-yellow-400 text-2xl sm:text-3xl" />
                </div>
                <div>
                  <h3 className="gold-text text-xl text-[var(--themeColor)] sm:text-2xl font-bold">
                    560M+
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-md">
                    Active Users
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex justify-end items-center mt-10 md:mt-0">
          <div className="w-full max-w-[320px] sm:max-w-md h-[300px] sm:h-[400px]">
            <GlobeCanvas />
          </div>
        </div>
      </div>
    </AuroraHero>
  );
};

export default HeroSection;