"use client";
import {
  FaDollarSign,
  FaBitcoin,
  FaMoneyCheckAlt,
  FaLock,
  FaThumbsUp,
  FaGlobe,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import Footer from "@/components/footer/page";

export default function IncomeStreams() {
  const streams = [
    { number: "01", label: "Pocket Money" },
    { number: "02", label: "Stipend" },
    { number: "03", label: "Indirect Stipend" },
    { number: "04", label: "Colleagues Stipend" },
    { number: "05", label: "Renewal Stipend" },
    { number: "06", label: "Task Earning" },
    { number: "07", label: "Ranks & Rewards" },
    { number: "08", label: "Escrow Stipend" },
    { number: "09", label: "Humanitarian Reward" },
  ];

  const features = [
    {
      icon: <FaDollarSign size={30} />,
      text: "Can quit at any time and get back your package amount.",
    },
    {
      icon: <FaBitcoin size={30} />,
      text: "Convert your cash into crypto and crypto into cash",
    },
    {
      icon: <FaMoneyCheckAlt size={30} />,
      text: "Easy deposit & withdrawal system",
    },
    { icon: <FaLock size={30} />, text: "You can log in from world wide." },
    {
      icon: <FaThumbsUp size={30} />,
      text: "Our team stands to ensure your satisfaction.",
    },
    {
      icon: <FaGlobe size={30} />,
      text: "World famous crypto platform...Binance, Payoneer, Skrill, PayPal",
    },
  ];

  const angles = [-40, -20, 0, 20, 40, 150, 175, 200, 225];

  const [coords, setCoords] = useState([]);

  useEffect(() => {
    const updateCoords = () => {
      const width = window.innerWidth;
      let center, radius;

      if (width < 640) {
        center = 180;
        radius = 0.43 * 360;
      } else if (width < 768) {
        center = 225;
        radius = 0.43 * 450;
      } else {
        center = 250;
        radius = 0.43 * 500;
      }

      const updated = angles.map((angle) => {
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);
        return { x, y, center };
      });

      setCoords(updated);
    };

    updateCoords();
    window.addEventListener("resize", updateCoords);
    return () => window.removeEventListener("resize", updateCoords);
  }, []);

  return (
    <>
      <div
        className="bg-gold-gradient px-4 sm:px-6"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="w-full min-h-screen sm:flex justify-center items-center gap-10">
          <div className="flex flex-col py-10 w-full sm:w-2/5 mx-auto sm:mx-0">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--themeColor)] text-center sm:text-left mb-6 mt-14">
              Compensation Plan
            </h2>
            <p className="text-gray-300 mb-4 text-sm text-center sm:text-left sm:text-base">
              Our platform offers multiple ways to earn and grow your income.
              With 9 distinct income streams, you can maximize your earning
              potential through various activities and contributions.
            </p>
            <p className="text-gray-300 mb-4 text-sm text-center sm:text-left sm:text-base">
              Each stream is designed to reward different types of
              participation, from active tasks to passive growth opportunities.
            </p>
          </div>

          <div className="w-full md:w-2/5 flex flex-col items-center justify-center ml-6 sm:ml-0 mt-10">
            <div className="relative w-[90vw] h-[90vw] sm:w-[80vw] sm:h-[80vw] max-w-[360px] sm:max-w-[500px] max-h-[360px] sm:max-h-[500px] rounded-full">
              <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-white bg-opacity-20 blur-md"></div>

              <div className="absolute z-10 inset-1/2 -translate-x-1/2 -translate-y-1/2 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-white flex flex-col items-center justify-center shadow-lg">
                <div className="w-20 sm:w-28 h-20 sm:h-28 rounded-full bg-[var(--themeColor)] flex flex-col items-center justify-center">
                  <p className="text-3xl sm:text-5xl font-bold text-black">9</p>
                  <p className="text-[10px] sm:text-sm font-semibold text-black text-center">
                    INCOME STREAMS
                  </p>
                </div>
              </div>

              <svg className="absolute inset-0 w-full h-full z-0">
                {streams.map((item, i) => {
                  const { x, y, center } = coords[i] || {
                    x: 0,
                    y: 0,
                    center: 250,
                  };
                  return (
                    <line
                      key={item.number}
                      x1={center}
                      y1={center}
                      x2={center + x}
                      y2={center + y}
                      stroke="#facc15"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                  );
                })}
              </svg>

              {streams.map((item, i) => {
                const { x, y } = coords[i] || { x: 0, y: 0 };
                return (
                  <div
                    key={item.number}
                    style={{
                      top: `calc(50% + ${y}px - 32px)`,
                      left: `calc(50% + ${x}px - 72px)`,
                    }}
                    className="absolute w-28 sm:w-36 h-12 sm:h-16 flex items-center justify-center"
                  >
                    <div className="bg-[var(--themeColor)] text-black rounded-xl px-2 py-1 sm:px-3 sm:py-1 shadow-md flex items-center gap-2 text-[10px] sm:text-xs font-bold text-center hover:scale-105 transition-transform">
                      <div className="relative">
                        <div className="absolute -inset-2 -ml-4 rounded-full border-2 border-white"></div>
                        <div className="absolute -inset-1 -ml-4 rounded-full border-2 border-white bg-white"></div>
                        <div className="w-6 sm:w-8 h-6 -ml-4 sm:h-8 bg-[var(--themeColor)] text-white rounded-full flex items-center justify-center text-[10px] sm:text-[14px] font-extrabold relative">
                          {item.number}
                        </div>
                      </div>
                      <span>{item.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="min-h-screen text-white py-12 px-4 sm:px-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-center">
            Why Choose{" "}
            <span className="text-[var(--themeColor)]">Hashfor?</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-[var(--themeColor)] text-black rounded-lg p-4 sm:p-6 shadow-md text-center flex flex-col items-center min-h-[180px] sm:min-h-[200px] justify-center hover:shadow-lg transition-shadow duration-200"
              >
                <div className="mb-3 sm:mb-4">{feature.icon}</div>
                <p className="text-sm sm:text-md font-medium">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
