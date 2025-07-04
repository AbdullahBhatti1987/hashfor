import Image from "next/image";
import React from "react";
import home1 from "../../../public/home1.png";

const MembershipPage = () => {
  return (
    <div className="w-full text-white h-screen flex items-center justify-center px-4 py-6"  >
      <div className="relative w-full max-w-5xl flex flex-col md:flex-row items-center justify-between bg-[var(--themeColor)] border border-black rounded-3xl overflow-hidden shadow-lg transition duration-200 ease-in-out hover:opacity-90 hover:-translate-y-1">
        
        {/* Badge Section */}
      <div
  className="w-full md:w-1/2 flex justify-center items-center p-4 border-b-4 md:border-b-0 md:border-r-4"
  style={{
    borderImage: 'linear-gradient(90deg, hsla(0, 0%, 0%, 1) 26%, hsla(47, 89%, 36%, 1) 98%) 1',
    borderImageSlice: 1,
    borderStyle: 'solid',
  }}
>
  <Image
    src={home1}
    alt="Free Membership Badge"
    className="w-full h-auto object-contain max-w-[220px] sm:max-w-[300px] md:max-w-[320px]"
    width={1080}
  />
</div>


        {/* Text Section */}
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-center items-center text-left space-y-3">
          <ul className="text-sm sm:text-base md:text-xl font-bold text-black font-serif space-y-2 text-center md:text-left">
            <li>• No Monthly Charges</li>
            <li>• Full Business Tracking</li>
            <li>• Personalized Dashboard</li>
            <li>• No Subscription Required</li>
            <li>• Complete Customer Support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;
