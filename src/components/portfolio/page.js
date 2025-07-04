import React from "react";
import { LuCoins } from "react-icons/lu";

const Portfolio = () => {
  const portfolio = [
    {
      asset: [{ icon: <LuCoins /> }, { coin: "Bitcoin" }, { sub: "BTC" }],
      amount: "0.4 BTC",
      value: "$12,756.34",
      change: "+2.5%",
      allocation: "75",
    },
    {
      asset: [{ icon: <LuCoins /> }, { coin: "Ethereum" }, { sub: "ETH" }],
      amount: "3.21 ETH",
      value: "$7,246.12",
      change: "+1.8%",
      allocation: "35",
    },
    {
      asset: [{ icon: <LuCoins /> }, { coin: "Hashfor" }, { sub: "HFR" }],
      amount: "1,250 HFR",
      value: "$4,050.00",
      change: "-2.3%",
      allocation: "20",
    },
    {
      asset: [{ icon: <LuCoins /> }, { coin: "USD Coin" }, { sub: "USDC" }],
      amount: "2,500 USDC",
      value: "$2,500.00",
      change: "+0.0%",
      allocation: "5",
    },
  ];

  return (
    <>
      <div className="w-full min-h-screen px-4 py-10 flex flex-col items-center">
        {/* Heading */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-900/30">
            <LuCoins className="text-[#d2af57] text-3xl" />
          </div>
          <p className="gold-text text-3xl sm:text-4xl font-bold">Your Portfolio</p>
        </div>

        {/* Table */}
        <div className="w-full max-w-6xl border border-yellow-400 rounded-xl overflow-hidden p-4 sm:p-8 mb-[60px]">
          <div className="overflow-x-auto">
            <table className="table w-full text-white border-spacing-y-5">
              {/* Table Head */}
              <thead className="text-gray-300 bg-gray-800 font-thin">
                <tr>
                  <th className="text-sm sm:text-md">ASSET</th>
                  <th className="text-sm sm:text-md">AMOUNT</th>
                  <th className="text-sm sm:text-md">VALUE</th>
                  <th className="text-sm sm:text-md text-end">CHANGE (24H)</th>
                  <th className="text-sm sm:text-md">ALLOCATION</th>
                </tr>
              </thead>
              <tbody>
                {portfolio?.map((e, i) => (
                  <tr key={i}>
                    {/* Asset Info */}
                    <td className="py-5">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full gold-gradient-btn">
                          {e.asset[0]?.icon}
                        </div>
                        <div>
                          <p className="gold-text text-lg sm:text-xl">{e.asset[1]?.coin}</p>
                          <p className="text-gray-400 text-sm">{e.asset[2]?.sub}</p>
                        </div>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="text-lg sm:text-xl py-4">{e.amount}</td>

                    {/* Value */}
                    <td className="text-lg gold-text py-4">{e.value}</td>

                    {/* Change */}
                    <td className="text-lg text-end text-green-400 py-4">{e.change}</td>

                    {/* Allocation Progress Bar */}
                    <td className="text-lg py-4">
                      <progress
                        className="progress progress-success w-full sm:w-56"
                        value={e.allocation}
                        max="100"
                      ></progress>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
