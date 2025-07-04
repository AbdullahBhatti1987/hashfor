import React from "react";

function SourceOfIncome() {
  const services = [
    "IT Solutions",
    "Software Development",
    // "Mobile Application",
    "Media House",
    "Gold Trading",
    // "Immigration",
    "Travel & Tourism",
    "Import & Export",
    // "Crypto Trading",
    "Coin Mining",
    "E-Commerce",
    // "Forex Trading",
    "Real Estate",
    "Live Stock",
    // "Legal Consultancy",
    "Business Consultation",
    "Education",
    // "Hashfor",
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-6 px-4">
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-[var(--themeColor)] mb-6 sm:mb-8">
        Sources of Income
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

export default SourceOfIncome;