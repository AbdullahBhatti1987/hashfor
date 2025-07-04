"use client";
import React, { useEffect, useState } from "react";
import { FiPackage } from "react-icons/fi";
import { FaThList, FaThLarge, FaSortUp, FaSortDown } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import axios from "axios";

const PackageDetailsPage = () => {
  const [packageData, setPackageData] = useState([]);
  const [view, setView] = useState("list");
  const [statusFilter, setStatusFilter] = useState("all");
  const [amountFilter, setAmountFilter] = useState("all");
  const [percentFilter, setPercentFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get("/api/user/get-package");
        setPackageData(response.data.packages || []);
      } catch (error) {
        alert("Error fetching package details:", error);
      }
    };
    fetchPackageDetails();
  }, []);

  return (
    <div className="p-4 sm:p-6 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-4">
          <div className="flex items-center mb-4 md:mb-0">
            {/* <BsBoxSeam className="text-xl sm:text-2xl text-indigo-600 mr-2 sm:mr-3" /> */}
            <h1 className="text-xl sm:text-2xl font-bold text-[var(--themeColor)]">
              Package Details
            </h1>
          </div>
        </div>

        {/* Stats Section - You may update values from API later */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-4">
          <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
            <h3 className="text-xs sm:text-sm font-medium text-gray-400">
              Total Packages
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-500 mt-1">
              {packageData.length}
            </p>
          </div>
          <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
            <h3 className="text-xs sm:text-sm font-medium text-gray-400">
              Active
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-500 mt-1">
              {packageData.filter((pkg) => pkg.status === "active").length}
            </p>
          </div>
          <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
            <h3 className="text-xs sm:text-sm font-medium text-gray-400">
              Deactivate
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-500 mt-1">
              {packageData.filter((pkg) => pkg.status === "Expired").length}
            </p>
          </div>
          <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
            <h3 className="text-xs sm:text-sm font-medium text-gray-400">
              Revenue
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-500 mt-1">
              $
              {packageData.reduce(
                (acc, pkg) => acc + parseFloat(pkg.amount || 0),
                0
              )}
            </p>
          </div>
        </div>

        {/* View Toggle Buttons (below stats, above table/card) */}
        {/* <div className="flex gap-2 mb-4 justify-end mt-2">
          <button
            className={`flex items-center px-3 py-1 rounded-md border text-sm font-medium transition-colors ${view === "list" ? "bg-yellow-500 text-white border-yellow-500" : "bg-gray-800 text-gray-300 border-gray-700"}`}
            onClick={() => setView("list")}
          >
            <FaThList className="mr-1" /> List
          </button>
          <button
            className={`flex items-center px-3 py-1 rounded-md border text-sm font-medium transition-colors ${view === "card" ? "bg-yellow-500 text-white border-yellow-500" : "bg-gray-800 text-gray-300 border-gray-700"}`}
            onClick={() => setView("card")}
          >
            <FaThLarge className="mr-1" /> Card
          </button>
        </div> */}

        {/* Card View */}
        {/* {view === "card" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {packageData.length > 0 ? (
              packageData.map((pkg, index) => (
                <div key={index} className="bg-[#272727] rounded-lg border border-gray-700 p-4 flex flex-col shadow hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-2">
                    <FiPackage className="text-lg text-indigo-500 mr-2" />
                    <span className="text-base font-semibold text-white">{pkg.packageName}</span>
                  </div>
                  <div className="text-xs text-gray-400 mb-1">Amount: <span className="text-white">${pkg.packageAmount}</span></div>
                  <div className="text-xs text-gray-400 mb-1">Daily %: <span className="text-white">{pkg.packageDailyPercentage}%</span></div>
                  <div className="text-xs text-gray-400 mb-1">Created: <span className="text-white">{pkg.createdAt ? new Date(pkg.createdAt).toLocaleDateString() : "-"}</span></div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-8">No packages found.</div>
            )}
          </div>
        )} */}

        {/* List/Table View */}
        {view === "list" && (
          <div className="bg-[#272727] rounded-lg sm:rounded-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                 <thead className="bg-[#1f1f1f]">
                  <tr>
                    <th
                      className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider cursor-pointer select-none"
                      onClick={() =>
                        setSortConfig({
                          key: "_id",
                          direction:
                            sortConfig.key === "_id" &&
                            sortConfig.direction === "asc"
                              ? "desc"
                              : "asc",
                        })
                      }
                    >
                      <span className="flex items-center justify-between ">
                        ID
                        <span className="ml-1">
                          <FaSortUp
                            className={
                              sortConfig.key === "_id" &&
                              sortConfig.direction === "asc"
                                ? "text-indigo-400"
                                : "text-gray-500"
                            }
                          />
                          <FaSortDown
                            className={
                              sortConfig.key === "_id" &&
                              sortConfig.direction === "desc"
                                ? "text-indigo-400"
                                : "text-gray-500"
                            }
                          />
                        </span>
                      </span>
                    </th>
                    <th
                      className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider cursor-pointer select-none"
                      onClick={() =>
                        setSortConfig({
                          key: "packageName",
                          direction:
                            sortConfig.key === "packageName" &&
                            sortConfig.direction === "asc"
                              ? "desc"
                              : "asc",
                        })
                      }
                    >
                      <span className="flex items-center justify-between ">
                        Package Name
                        <span className="ml-1">
                          <FaSortUp
                            className={
                              sortConfig.key === "packageName" &&
                              sortConfig.direction === "asc"
                                ? "text-indigo-400"
                                : "text-gray-500"
                            }
                          />
                          <FaSortDown
                            className={
                              sortConfig.key === "packageName" &&
                              sortConfig.direction === "desc"
                                ? "text-indigo-400"
                                : "text-gray-500"
                            }
                          />
                        </span>
                      </span>
                    </th>
                    <th
                      className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider cursor-pointer select-none"
                      onClick={() =>
                        setSortConfig({
                          key: "packageAmount",
                          direction:
                            sortConfig.key === "packageAmount" &&
                            sortConfig.direction === "asc"
                              ? "desc"
                              : "asc",
                        })
                      }
                    >
                      <span className="flex items-center justify-between ">
                        Amount
                        <span className="ml-1">
                          <FaSortUp
                            className={
                              sortConfig.key === "packageAmount" &&
                              sortConfig.direction === "asc"
                                ? "text-indigo-400"
                                : "text-gray-500"
                            }
                          />
                          <FaSortDown
                            className={
                              sortConfig.key === "packageAmount" &&
                              sortConfig.direction === "desc"
                                ? "text-indigo-400"
                                : "text-gray-500"
                            }
                          />
                        </span>
                      </span>
                    </th>
                    <th
                      className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider cursor-pointer select-none"
                      onClick={() =>
                        setSortConfig({
                          key: "packageDailyPercentage",
                          direction:
                            sortConfig.key === "packageDailyPercentage" &&
                            sortConfig.direction === "asc"
                              ? "desc"
                              : "asc",
                        })
                      }
                    >
                      <span className="flex items-center justify-between ">
                        Daily %
                        <span className="ml-1">
                          <FaSortUp
                            className={
                              sortConfig.key === "packageDailyPercentage" &&
                              sortConfig.direction === "asc"
                                ? "text-indigo-400"
                                : "text-gray-500"
                            }
                          />
                          <FaSortDown
                            className={
                              sortConfig.key === "packageDailyPercentage" &&
                              sortConfig.direction === "desc"
                                ? "text-indigo-400"
                                : "text-gray-500"
                            }
                          />
                        </span>
                      </span>
                    </th>
                    <th
                      className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider cursor-pointer select-none"
                      onClick={() =>
                        setSortConfig({
                          key: "createdAt",
                          direction:
                            sortConfig.key === "createdAt" &&
                            sortConfig.direction === "asc"
                              ? "desc"
                              : "asc",
                        })
                      }
                    >
                      <span className="flex items-center justify-between ">
                        Created
                        <span className="ml-1">
                          <FaSortUp
                            className={
                              sortConfig.key === "createdAt" &&
                              sortConfig.direction === "asc"
                                ? "text-indigo-400"
                                : "text-gray-500"
                            }
                          />
                          <FaSortDown
                            className={
                              sortConfig.key === "createdAt" &&
                              sortConfig.direction === "desc"
                                ? "text-indigo-400"
                                : "text-gray-500"
                            }
                          />
                        </span>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#272727] divide-y divide-gray-700">
                  {packageData.length > 0 ? (
                    packageData
                      .sort((a, b) => {
                        if (!sortConfig.key) return 0;
                        let aVal = a[sortConfig.key];
                        let bVal = b[sortConfig.key];
                        if (
                          sortConfig.key === "packageAmount" ||
                          sortConfig.key === "packageDailyPercentage"
                        ) {
                          aVal = parseFloat(aVal);
                          bVal = parseFloat(bVal);
                        }
                        if (sortConfig.key === "createdAt") {
                          aVal = new Date(aVal).getTime();
                          bVal = new Date(bVal).getTime();
                        }
                        if (sortConfig.direction === "asc") {
                          if (aVal < bVal) return -1;
                          if (aVal > bVal) return 1;
                          return 0;
                        } else {
                          if (aVal > bVal) return -1;
                          if (aVal < bVal) return 1;
                          return 0;
                        }
                      })
                      .map((pkg, index) => (
                       
                        <tr key={index} className="hover:bg-[#1f1f1f]">
                          <td className="px-3 py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-white">
                            {pkg._id || `#PKG${index + 1}`}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-white">
                            {pkg.packageName}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-white">
                            ${pkg.packageAmount}
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-xs sm:text-sm font-medium text-white">
                            {pkg.packageDailyPercentage}%
                          </td>
                          <td className="px-3 py-3 whitespace-nowrap text-xs sm:text-sm text-gray-400">
                            {pkg.createdAt
                              ? new Date(pkg.createdAt).toLocaleDateString()
                              : "-"}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-6 text-gray-400 text-sm"
                      >
                        No packages found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageDetailsPage;
