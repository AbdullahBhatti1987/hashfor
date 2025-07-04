"use client";
import axios from "axios";
import { useState } from "react";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

function CreatePackage() {
  const [packageName, setPackageName] = useState("");
  const [packageAmount, setPackageAmount] = useState("");
  const [packageDailyPercentage, setPackageDailyPercentage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/admin/create-package", {
        packageName,
        packageAmount,
        packageDailyPercentage,
      });

      const data = res.data;
      // console.log("Response data:", data);

      if (res.status === 201) {
        showSuccessToast("Package created successfully!");
        setPackageName("");
        setPackageAmount("");
        setPackageDailyPercentage("");
      } else {
        showErrorToast("Failed to create package.");
      }
    } catch (error) {
      alert("Error creating package:", error);
      showErrorToast("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="flex items-center h-screen justify-center py-9 bg-black px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-[#272727] rounded-2xl shadow-xl p-8 border border-gray-700"
        >
          <h1 className="text-3xl font-bold text-center text-[var(--themeColor)] mb-8">
            📦 Create Package
          </h1>

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Package Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--themeColor)] transition duration-200"
              placeholder="Enter package Name"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Package Amount
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--themeColor)] transition duration-200"
              placeholder="Enter package amount"
              value={packageAmount}
              onChange={(e) => setPackageAmount(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Package Daily Percentage
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--themeColor)] transition duration-200"
              placeholder="Enter package daily percentage"
              value={packageDailyPercentage}
              onChange={(e) => setPackageDailyPercentage(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[var(--themeColor)] text-[#1E1E1E] font-semibold hover:opacity-90 transition duration-200"
          >
            Create Package
          </button>
        </form>
      </div>
    </>
  );
}

export default CreatePackage;
