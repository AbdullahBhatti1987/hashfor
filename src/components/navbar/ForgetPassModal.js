"use client";
import { useState } from "react";
import Modal from "./Modal";
import { showErrorToast } from "@/lib/toast";

export default function ForgotPasswordModal({ 
  isOpen, 
  onClose,
  onVerifyEmail,
  onVerifyOtp,  // Add this new prop
  onResetPassword,
  isLoading,
  isEmailVerified,
  isOtpVerified,
  otp,
  onOtpChange,
  otpError  // Add this for error display
}) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!isEmailVerified && !isOtpVerified) {
    onVerifyEmail(email);
  } else if (isEmailVerified && !isOtpVerified) {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setOtpError("Please enter 6-digit OTP");
      return;
    }
    onVerifyOtp(email, enteredOtp);
  } else if (isOtpVerified) {
    if (!newPassword || !confirmPassword) {
      showErrorToast("Please fill in both password fields");
      return;
    }
    onResetPassword(email, newPassword, confirmPassword);
  }
};
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-center text-yellow-400">
          {!isEmailVerified ? "Forgot Password" : 
           !isOtpVerified ? "Verify OTP" : "Reset Password"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isEmailVerified ? (
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
                required
              />
            </div>
          ) : !isOtpVerified ? (
            <div className="space-y-4">
              <p className="text-center text-gray-300">
                OTP sent to your email. Please enter it below.
              </p>
              <div className="flex justify-center gap-3">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={otp[index] || ""}
                    onChange={(e) => onOtpChange(e, index)}
                    className="w-12 h-12 text-center text-xl font-bold rounded border border-gray-600 bg-gray-800 focus:border-yellow-400 focus:outline-none"
                  />
                ))}
              </div>
              {otpError && <p className="text-red-500 text-center">{otpError}</p>}
            </div>
          ) : (
            <div className="space-y-4">
                {isOtpVerified && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:outline-none"
                  required
                />
              </div>
            </div>
          )}
            </div>
          )}

           <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-300 transition ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading 
              ? "Processing..." 
              : !isEmailVerified 
                ? "Verify Email" 
                : !isOtpVerified 
                  ? "Verify OTP" 
                  : "Reset Password"}
          </button>
        </form>
      </div>
    </Modal>
  );
}