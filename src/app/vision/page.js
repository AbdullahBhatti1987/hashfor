import React from "react";
import Footer from "@/components/footer/page";

function Vision() {
  return (
    <>
      <section  style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }} className="text-white bg-gold-gradient py-16 min-h-screen">
        <div className="w-full flex justify-center h-screen items-center py-10">
          <div className="flex flex-col md:flex-row w-11/12 max-w-5xl gap-6">
            {/* Vision Card */}
            <div className="relative group flex-1">
              {/* Gradient Halo Effect */}
              <div className="absolute inset-0 -top-4 -left-4 w-full h-full rounded-3xl blur-2xl z-0 bg-gradient-to-br from-[var(--themeColor)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Card Content */}
              <div className="relative z-10 p-8 min-h-80 rounded-3xl bg-black/80 backdrop-blur-sm border border-white/10 shadow-xl transition-all duration-300 hover:border-[var(--themeColor)]/30 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                <h3 className="text-4xl text-center font-bold text-[var(--themeColor)] mb-6">
                  OUR VISION
                </h3>
                <p className="text-gray-300 text-xl text-center leading-relaxed">
                  At Hashfor, the world&apos;s fundamental objective is to deliver its services as well as we can.
                  Our goal is not only to create unbreakable ties with our members but also to keep them for a lifetime
                  and make this opportunity a lifelong benefit for them.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="relative group flex-1">
              {/* Gradient Halo Effect */}
              <div className="absolute inset-0 -top-4 -left-4 w-full h-full rounded-3xl blur-2xl z-0 bg-gradient-to-br from-[var(--themeColor)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Card Content */}
              <div className="relative z-10 p-8 min-h-80 rounded-3xl bg-black/80 backdrop-blur-sm border border-white/10 shadow-xl transition-all duration-300 hover:border-[var(--themeColor)]/30 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                <h3 className="text-4xl text-center font-bold text-[var(--themeColor)] mb-6">
                  OUR MISSION
                </h3>
                <p className="text-gray-300 text-xl text-center leading-relaxed">
                  Our mission is to forge meaningful, long-lasting bonds with our members by providing top-tier service
                  rooted in dedication, teamwork, and integrity. We are committed to inspiring and supporting our community
                  throughout their journey with enthusiasm, purpose, and passion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Vision;