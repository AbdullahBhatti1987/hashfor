"use client";
import React from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

const MarketPerformance = () => {
  const buttons = [
    { day: "1D" },
    { day: "1W" },
    { day: "1M" },
    { day: "1Y" },
    { day: "ALL" },
  ];

  return (
    <>
      <div className="w-full">
        {/* Heading Section */}
        <div className="flex flex-col md:flex-row justify-between mt-13 px-4 sm:px-6 md:px-10">
          <div className="mb-4 md:mb-0">
            <p className="text-3xl sm:text-4xl font-bold gold-text">Market Performance</p>
            <p className="text-md sm:text-lg text-gray-400">
              Token price and volume history
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-4 justify-start md:justify-end">
  {buttons?.map((e, i) => {
    return (
      <button
        key={i}
        className="text-[#ECCE68] font-bold text-sm sm:text-md border border-[#ECCE68] rounded-xl p-1 sm:p-2 cursor-pointer hover:text-black hover:bg-[#ECCE68]  transition-colors duration-200"
      >
        {e.day}
      </button>
    );
  })}
</div>

        </div>

        {/* Chart Section */}
        <div className="flex justify-center items-center p-4 sm:p-6 md:p-10 mt-5">
          <div
            className="border border-[#ECCE68] rounded-xl p-4 sm:p-6 w-full"
            style={{
              background:
                "linear-gradient(to left, rgba(217, 204, 138, 0.42), rgba(236, 206, 104, 0.3), rgba(181, 144, 44, 0.3))",
            }}
          >
            <Line
              data={{
                labels: ["Jan", "Feb", "March", "Apr", "May", "June"],
                datasets: [
                  {
                    label: "Finance",
                    data: [350, 126, 328, 119, 232, 345],
                    fill: true,
                    borderColor: "black",
                    tension: 0.4,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    labels: {
                      color: "#ffffff", // White legend text
                    },
                  },
                  tooltip: {
                    titleColor: "#ffffff",
                    bodyColor: "#ffffff",
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      color: "#ffffff", // White X-axis labels
                    },
                    grid: {
                      color: "rgba(255,255,255,0.1)", // Optional: faint white grid
                    },
                  },
                  y: {
                    ticks: {
                      color: "#ffffff", // White Y-axis labels
                    },
                    grid: {
                      color: "rgba(255,255,255,0.1)", // Optional: faint white grid
                    },
                  },
                },
              }}
              height={300}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketPerformance;
