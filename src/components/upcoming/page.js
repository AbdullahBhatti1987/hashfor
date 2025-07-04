import React from "react";

function Upcoming() {
  const services = [
    "Mobile Application",
    "Immigration",
    "Crypto Trading",
    "Forex Trading",
    "Legal Consultancy",
    "Hashfor",
    "PayPal",
    "Live Stock",
    "Real Estate",
    "Gold Trading",
    "Travel & Tourism",
    "Legal Consultancy"
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-6 px-4">
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-[var(--themeColor)] mb-6 sm:mb-8">
        Upcoming Roadmap
      </h1>

      <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-5xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-[var(--themeColor)] text-xs sm:text-sm text-black hover:opacity-50 font-medium text-center py-1.5 px-2 sm:py-2 sm:px-3 rounded-tr-[15px] rounded-br-[15px] shadow-md border-l-4 border-white hover:shadow-lg hover:bg-black hover:text-[var(--themeColor)] transition-all duration-300 ease-in-out"
          >
            {service}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Upcoming;