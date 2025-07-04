"use client";
import React from "react";
import { showSuccessToast } from "@/lib/toast";
const PackageDetailCard = ({ pkg }) => {
  const handleBuy = () => {
    showSuccessToast(`Proceeding to buy the ${pkg.name} package.`);
  };

  // Simulate breakdown of commission
  const dailyRate = parseFloat(pkg.commission.match(/[\d.]+/)[0]);
  const daily = (dailyRate).toFixed(2);

  return (
    <div className="bg-[var(--themeColor)] text-black p-10 rounded-3xl shadow-2xl max-w-xl w-full border border-black relative">
      {/* Logo at the top */}
      <div className="flex justify-center mb-6">
        <img 
          src="/shield-pic2.png"
          alt="Company Logo"
          className="h-36 w-auto" 
        />
      </div>

      <h2 className="text-4xl font-bold mb-6 tracking-wide text-center">
        {pkg.name} Package
      </h2>

      <div className="bg-black text-[var(--themeColor)] rounded-xl p-6 shadow-inner mb-8 space-y-3">
        <div className="text-lg font-medium">
          <span className="block mb-1"><strong>Level:</strong> {pkg.level}</span>
          <span className="block mb-1"><strong>Daily Commission:</strong> {dailyRate}%</span>
        </div>

        <div className="mt-4 text-sm">
          <div className="bg-[var(--themeColor)] p-3 rounded-lg shadow text-center text-black col-span-2">
            <p className="font-semibold">Daily</p>
            <p>Upto {daily}%</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleBuy}
          className="mt-2 inline-block w-full bg-black text-[var(--themeColor)] font-semibold py-3 px-6 rounded-xl text-lg shadow-md hover:opacity-90 transition-all duration-300"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default PackageDetailCard;