"use client";
import { motion } from "framer-motion";
import Footer from "@/components/footer/page";

export default function TermsAndConditions() {
  return (
    <>
    <div className='bg-gold-gradient px-4 sm:px-6' style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen px-4 py-10 sm:px-10 md:px-20 text-white"
    >
      <div className="max-w-4xl mx-auto bg-black/60 mt-10 p-8 rounded-2xl border border-yellow-500 shadow-2xl">
        <h1 className="text-4xl font-bold text-[var(--themeColor)] text-center mb-8">
          Terms & Conditions
        </h1>

        {/* Section 1 */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[var(--themeColor)] mb-2">
            Referral Positioning Confirmation
          </h2>
          <p className="text-white/80 leading-relaxed">
            When a user joins through your referral link, their position in your network (Left or Right) is determined based on your default placement preference or your last chosen side. Please make sure to select your preferred position from your dashboard before sending your referral link.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[var(--themeColor)] mb-2">
            General Disclaimer
          </h2>
          <p className="text-white/80 leading-relaxed">
            All information provided on this platform is for general informational purposes only. We do not guarantee income, returns, or network growth. Your results may vary based on your effort and strategy.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[var(--themeColor)] mb-2">
            Platform Responsibility
          </h2>
          <p className="text-white/80 leading-relaxed">
            We are not responsible for any losses due to incorrect wallet addresses, unauthorized account access, or third-party links. Please ensure your data is secure and updated regularly.
          </p>
        </div>

        {/* Section 4 */}
        <div>
          <h2 className="text-2xl font-semibold text-[var(--themeColor)] mb-2">
            Agreement
          </h2>
          <p className="text-white/80 leading-relaxed">
            By using this website, you agree to these terms and conditions. If you do not agree, you must discontinue use of the platform immediately.
          </p>
        </div>
      </div>
    </motion.div>
    </div>
    <Footer />
    </>
  );
}
