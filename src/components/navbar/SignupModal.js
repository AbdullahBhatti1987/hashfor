// "use client";
// import Modal from "./Modal";

// export default function SignupModal({
//   isOpen,
//   onClose,
//   formData,
//   onFormChange,
//   onSubmit,
//   isLoading,
//   onSwitchToLogin,
// }) {

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <div className="space-y-4">
//         <h1 className="text-2xl font-bold text-center text-yellow-400">
//           Create Account
//         </h1>

//         <form onSubmit={onSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Referral Code
//               </label>
//               <input
//                 type="text"
//                 name="referralCode"
//                 value={formData.referralCode}
//                 onChange={onFormChange}
//                 placeholder="Optional"
//                 className="w-full p-2 rounded bg-[#272727] text-white border border-gray-400 focus:border-yellow-400 focus:outline-none"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={onFormChange}
//                 placeholder="Enter your name"
//                 className="w-full p-2 rounded bg-[#272727] text-white border border-gray-400 focus:border-yellow-400 focus:outline-none"
//                 required
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={onFormChange}
//                 placeholder="Enter your email"
//                 className="w-full p-2 rounded bg-[#272727] text-white border border-gray-400 focus:border-yellow-400 focus:outline-none"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Contact Number
//               </label>
//               <input
//                 type="text"
//                 name="contactNo"
//                 value={formData.contactNo}
//                 onChange={onFormChange}
//                 placeholder="Enter your number"
//                 className="w-full p-2 rounded bg-[#272727] text-white border border-gray-400 focus:border-yellow-400 focus:outline-none"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={onFormChange}
//               placeholder="Create password"
//               className="w-full p-2 rounded bg-[#272727] text-white border border-gray-400 focus:border-yellow-400 focus:outline-none"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               name="ConfirmPassword"
//               value={formData.ConfirmPassword}
//               onChange={onFormChange}
//               placeholder="Confirm password"
//               className="w-full p-2 rounded bg-[#272727] text-white border border-gray-400 focus:border-yellow-400 focus:outline-none"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-300 transition ${
//               isLoading ? "opacity-70 cursor-not-allowed" : ""
//             }`}
//           >
//             {isLoading ? "Processing..." : "Send OTP To Email"}
//           </button>

//           <div className="text-center text-sm">
//             Already have an account?{" "}
//             <button
//               type="button"
//               onClick={onSwitchToLogin}
//               className="text-yellow-400 font-bold hover:underline"
//             >
//               Login
//             </button>
//           </div>
//         </form>
//       </div>
//     </Modal>
//   );
// }






"use client";
import Modal from "./Modal";
import Loader from "../loader";
export default function SignupModal({
  isOpen,
  onClose,
  formData,
  onFormChange,
  onSubmit,
  isLoading,
  onSwitchToLogin,
}) {
  return (
    <>
      {isLoading && (
       <Loader />
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-center text-yellow-400">
            Create Account
          </h1>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Referral Code
                </label>
                <input
                  type="text"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={onFormChange}
                  placeholder="Optional"
                  className="w-full p-2 rounded bg-[#272727] text-white border border-gray-400 focus:border-yellow-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onFormChange}
                  placeholder="Enter your name"
                  className="w-full p-2 rounded bg-[#272727] text-white border border-gray-400 focus:border-yellow-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onFormChange}
                  placeholder="Enter your email"
                  className="w-full p-2 rounded bg-[#272727] text-white border border-gray-400 focus:border-yellow-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={onFormChange}
                  placeholder="Enter your number"
                  className="w-full p-2 rounded bg-[#272727] text-white border border-gray-400 focus:border-yellow-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={onFormChange}
                placeholder="Create password"
                className="w-full p-2 rounded bg-[#272727] text-white border border-gray-400 focus:border-yellow-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="ConfirmPassword"
                value={formData.ConfirmPassword}
                onChange={onFormChange}
                placeholder="Confirm password"
                className="w-full p-2 rounded bg-[#272727] text-white border border-gray-400 focus:border-yellow-400 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-300 transition flex items-center justify-center ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending OTP...
                </>
              ) : (
                "Send OTP To Email"
              )}
            </button>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-yellow-400 font-bold hover:underline"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}