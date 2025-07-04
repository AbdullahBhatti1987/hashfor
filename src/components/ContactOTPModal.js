"use client";
import { useEffect } from "react";

export default function ContactOTPModal({ 
  isOpen, 
  onClose, 
  otp, 
  onOtpChange, 
  onOtpPaste,
  onSubmit,
  isLoading,
  email,
  result 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div 
        className="relative bg-black text-white p-6 rounded-xl border border-yellow-400 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl"
        >
          &times;
        </button>
        
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-center text-yellow-400">Email Verification</h1>
          <p className="text-center text-gray-300">
            Please enter the 6-digit verification code sent to <strong>{email}</strong>
          </p>
          
          <div className="flex justify-center gap-2">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={otp[index] || ""}
                onChange={(e) => onOtpChange(e, index)}
                onPaste={onOtpPaste}
                className="w-10 h-10 text-center text-lg font-bold rounded border border-gray-600 bg-gray-800 focus:border-yellow-400 focus:outline-none"
                disabled={isLoading}
              />
            ))}
          </div>

          {/* Result Message in Modal */}
          {result && (
            <div className={`text-center py-2 ${result.type === "success" ? "text-yellow-400" : "text-red-400"}`}>
              {result.message}
            </div>
          )}
          
          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={onSubmit}
              disabled={isLoading}
              className="bg-yellow-400 text-black font-bold py-2 px-6 rounded hover:bg-yellow-300 transition min-w-32 h-12 flex items-center justify-center"
            >
              {isLoading ? (
                <span className="inline-flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Verify & Send"
              )}
            </button>
            
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="bg-gray-600 text-white font-bold py-2 px-6 rounded hover:bg-gray-500 transition min-w-32 h-12"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 