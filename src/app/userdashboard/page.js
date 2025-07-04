"use client";
import HoverDevCards from "@/components/ecommerce";
import ProductValuationChart from "@/components/charts/chartone";
import dynamic from "next/dynamic";
import TransactionHistory from "@/components/charts/tableone";
import SalesPerformanceCard from "@/components/charts/chartThree";

const PerformanceChart = dynamic(() => import("@/components/charts/chartTwo"), {
  ssr: false,
});

function Userdash() {
  return (
    <>
      <div className="p-2 sm:p-3 bg-black flex flex-col gap-2 sm:gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--themeColor)]">
            User Dashboard
          </h1>
          {/* <p className="text-gray-400 mt-1">
              Request withdrawal of your earnings.
            </p> */}
        </div>
        <div className="w-full">
          <HoverDevCards />
        </div>

        <div className="flex flex-col lg:flex-row gap-3 w-full">
          <div className="w-full md:w-[100%] lg:w-[60%] xl:w-[65%]">
            <PerformanceChart />
          </div>
          <div className="w-full md:w-[100%] lg:w-[40%] xl:w-[35%]">
            <ProductValuationChart />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 w-full h-full overflow-hidden">
          <div className="w-full md:w-[45%] lg:w-[40%] h-full">
            <SalesPerformanceCard />
          </div>
           <div className="w-full md:w-[55%] lg:w-[60%] h-full">
            <TransactionHistory />
          </div>
        </div>
      </div>
    </>
  );
}

export default Userdash;
