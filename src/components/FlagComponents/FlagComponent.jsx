import Image from "next/image";
import React from "react";

function FlagComponent() {
  return (
    <div className="w-full min-h-[80vh] sm:min-h-screen flex justify-center items-center px-4 xs:px-6 sm:px-8 py-8 sm:py-12 md:py-16">
      <div className="w-full max-w-4xl xl:max-w-5xl flex flex-col lg:flex-row justify-center mx-auto items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16">
        {/* Image Section */}
        <div className="w-full md:w-10/12 lg:w-5/12 xl:w-2/5 flex justify-center items-center px-2">
          <div className="relative w-full aspect-square max-w-[250px] xs:max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-full">
            <Image
              src="/flags.png"
              alt="Flags"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 350px, 400px"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-7/12 xl:w-3/5 flex flex-col">
          <p className="text-white text-sm xs:text-base sm:text-[17px] md:text-lg lg:text-[19px] xl:text-xl 2xl:text-2xl font-medium md:font-semibold text-justify">
            Hashfor is a unique concept to aware people who are curious about
            Digital Currency, Coin Mining, Crypto Trading, Blockchain, Forex Trading and Robotics. Hashfor is the fastest growing
            concept of the fleet working since last two decades. It was started
            in Cyprus and has been spread in various
            countries of the world. It's first flock was started in 2022.
            Hashfor is growing day by day throughout the world through
            dedication, clarity of system, enthusiasm and zeal of network.
          </p>
          <div className="mt-4 xs:mt-5 sm:mt-6 md:mt-7 lg:mt-8 text-white text-xs xs:text-sm sm:text-[15px] md:text-base font-medium md:font-semibold text-justify space-y-1 sm:space-y-2">
            <p>If I would be given a chance to start all over again...</p>
            <p>I would have chosen "NETWORK MARKETING" (Bill Gates)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlagComponent;