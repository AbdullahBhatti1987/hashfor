"use client";
import { WalletContext } from "@/context/WalletContext";
import axios from "axios";
import React, { useContext, useState } from "react";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

const ReferralModal = ({ open, onClose, referralCode, senderEmail }) => {
  // ✅ Hooks must be declared unconditionally at the top
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!email) {
      showErrorToast("Please enter an email address!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/sendReferralCode", {
        senderEmail,
        email,
        referralCode,
        website: "https://hashfor-pvxu.vercel.app/", // live link will be update
      });

      // console.log("Response from server:", res.data);
      showSuccessToast("Referral code sent successfully!");
      setEmail("");
      onClose();
    } catch (error) {
      showErrorToast("Error sending referral code:");
      showErrorToast("Failed to send referral code. Please try again");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  // ✅ Now conditionally return null (safe after hook declarations)
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white/50 bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#1E1E1E] rounded-lg shadow-xl p-6 w-full max-w-md border border-gray-700 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white text-xl hover:text-red-500"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Send Referral Code</h2>
        <form className="space-y-4" onSubmit={sendEmail}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-600 bg-[#2B2B2B] text-white focus:outline-none focus:ring-2 focus:ring-[var(--themeColor)]"
            disabled={loading}
          />
          <button
            type="submit"
            className="w-full font-semibold btn bg-[var(--themeColor)] rounded-lg h-10 text-black hover:opacity-90 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (             
             // <span className="animate-spin h-5 border-2 border-white border-t-transparent rounded-full"></span>
                 "Sending..."
            ) : (
              "Send"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReferralModal;
