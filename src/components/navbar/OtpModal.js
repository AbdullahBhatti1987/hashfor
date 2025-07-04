// "use client";
// import { useEffect } from "react";
// import Modal from "./Modal";
// import Loader from "../loader";

// export default function OtpModal({
//   isOpen,
//   onClose,
//   otp,
//   onOtpChange,
//   onSubmit,
//   isLoading,
// }) {
//   return (
//     <>
//       {/* Full-screen loader */}
//       {isLoading && <Loader />}

//       <Modal isOpen={isOpen && !isLoading} onClose={onClose}>
//         <div className="space-y-6">
//           <h1 className="text-2xl font-bold text-center text-yellow-400">
//             OTP Verification
//           </h1>
//           <p className="text-center text-gray-300">
//             Please enter the OTP sent to your email address.
//           </p>

//           <div className="flex justify-center gap-3">
//             {[0, 1, 2, 3].map((index) => (
//               <input
//                 key={index}
//                 type="text"
//                 maxLength="1"
//                 value={otp[index] || ""}
//                 onChange={(e) => onOtpChange(e, index)}
//                 className="w-12 h-12 text-center text-xl font-bold rounded border border-gray-600 bg-gray-800 focus:border-yellow-400 focus:outline-none"
//                 disabled={isLoading}
//               />
//             ))}
//           </div>

//           <div className="flex justify-center gap-4 mt-6">
//             <button
//               type="button"
//               onClick={async (e) => {
//                 onClose(); // Close modal immediately
//                 await onSubmit(e); // Then trigger verification
//               }}
//               disabled={isLoading}
//               className="bg-yellow-400 text-black font-bold py-2 px-6 rounded hover:bg-yellow-300 transition min-w-32 h-12 flex items-center justify-center"
//             >
//               {isLoading ? (
//                 <span className="inline-flex items-center">
//                   <svg
//                     className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Verifying...
//                 </span>
//               ) : (
//                 "Verify"
//               )}
//             </button>

//             <button
//               type="button"
//               onClick={onClose}
//               disabled={isLoading}
//               className="bg-gray-600 text-white font-bold py-2 px-6 rounded hover:bg-gray-500 transition min-w-32 h-12"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// }
"use client";
import { useEffect } from "react";
import Modal from "./Modal";
import Loader from "../loader";

export default function OtpModal({
  isOpen,
  onClose,
  otp,
  onOtpChange,
  onSubmit,
  isLoading,
}) {
  return (
    <>
      {/* Full-screen loader */}
      {isLoading && <Loader />}

      <Modal isOpen={isOpen && !isLoading} onClose={onClose}>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-center text-yellow-400">
            OTP Verification
          </h1>
          <p className="text-center text-gray-300">
            Please enter the OTP sent to your email address.
          </p>

          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={otp[index] || ""}
                onChange={(e) => onOtpChange(e, index)}
                className="w-12 h-12 text-center text-xl font-bold rounded border border-gray-600 bg-gray-800 focus:border-yellow-400 focus:outline-none"
                disabled={isLoading}
              />
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={async (e) => {
                onClose(); // Close modal immediately
                await onSubmit(e); // Then trigger verification
              }}
              disabled={isLoading}
              className="bg-yellow-400 text-black font-bold py-2 px-6 rounded hover:bg-yellow-300 transition min-w-32 h-12 flex items-center justify-center"
            >
              {isLoading ? (
                <span className="inline-flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Verify"
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
      </Modal>
    </>
  );
}
