"use client";

const DashPackageCard = ({ pkg, onClick }) => {
  return (
    <div className="relative flex-1 group">
      {/* Gradient Halo Effect */}
      <div className="absolute inset-0 -top-4 -left-4 w-full h-full rounded-3xl blur-2xl z-0 bg-gradient-to-br from-[var(--themeColor)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Card Container */}
      <div 
        className="relative z-10 flex items-center gap-4 p-6 rounded-3xl bg-black/80 backdrop-blur-sm border border-white/10 shadow-xl transition-all duration-300 hover:border-[var(--themeColor)]/30 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)]"
        onClick={() => onClick(pkg)}
      >
        {/* Shield Image */}
        <div className="relative">
          <div className="absolute inset-0 rounded-xl flex  items-center  justify-center bg-[var(--themeColor)]/20 blur-sm" />

          <img
            src={pkg.img}
            alt={`Shield ${pkg.id}`}
            className="relative z-10 h-36 w-36 sm:h-44 sm:w-44 object-contain rounded-xl"
          />
        </div>
        
        {/* Card Content */}
        <div className="flex flex-col justify-center space-y-3">
          <p className="text-lg text-gray-200 whitespace-nowrap">
            Up to <span className="text-[var(--themeColor)] font-bold">{pkg.rate}</span> daily
          </p>
          <button
            className="bg-[var(--themeColor)] hover:bg-yellow-600 text-black font-bold px-5 py-2 rounded-full shadow-lg transition-all duration-300 text-sm whitespace-nowrap transform group-hover:scale-105"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashPackageCard;