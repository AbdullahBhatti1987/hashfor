// "use client";
// import React, { useContext, useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import ReferralModal from "../referralModal/ReferralModal";
// import { jwtDecode } from "jwt-decode";
// import { useRouter } from "next/navigation";
// import { WalletContext } from "@/context/WalletContext";
// import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
// import WalletConnectProvider from "@walletconnect/web3-provider";
// import Web3Modal from "web3modal";
// import { ethers } from "ethers";
// const providerOptions = {
//   coinbasewallet: {
//     package: CoinbaseWalletSDK,
//     options: {
//       appName: "Web3Modal Demo",
//       infuraId: "https://rpc.testnet.fantom.network", // Replace with the correct RPC URL if needed
//     },
//   },

//   walletconnect: {
//     package: WalletConnectProvider,
//     options: {
//       rpc: {
//         4002: "https://rpc.testnet.fantom.network", // Replace with the correct RPC URL
//       },
//       bridge: "https://bridge.walletconnect.org", // Default WalletConnect bridge
//       qrcode: true, // Show QR code for connection
//     },
//   },
// };

// const AdminHeader = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [profile, setProfile] = useState("");
//   const router = useRouter();
//   const { walletAddress, setWalletAddress, signer, setSigner } =
//     useContext(WalletContext);
//   const web3ModalRef = useRef(null);
//   function handleLogout() {
//     localStorage.removeItem("authToken");
//     router.push("../");
//   }

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       console.warn("No authToken found in localStorage.");
//       return;
//     }
//     try {
//       const decodedToken = jwtDecode(token);
//       setProfile({
//         name: decodedToken?.name || "Unknown User",
//         email: decodedToken?.email || "no-email@example.com",
//         code: decodedToken?.code || "No Code",
//       });
//       console.log(decodedToken, "decodedToken");
//     } catch (err) {
//       console.error("Invalid token format", err);
//     }
//   }, []);
//   const connectWallet = async () => {
//     try {
//       if (!web3ModalRef.current) {
//         web3ModalRef.current = new Web3Modal({
//           cacheProvider: false,
//           providerOptions,
//         });
//       }

//       const instance = await web3ModalRef.current.connect();
//       const provider = new ethers.providers.Web3Provider(instance); // Ethers v6
//       console.log("Provider instance:", provider);
//       const signer = await provider.getSigner(); // ✅ await here
//       console.log("Signer instance:", signer);
//       const address = await signer.getAddress(); // ✅ address from signer
//       console.log("Wallet connected successfully:", address);
//       console.log("Signer set successfully:", signer);
//       setWalletAddress(address);
//       setSigner(signer);
//     } catch (err) {
//       console.error("Wallet connection failed:", err);
//     }
//   };

//   return (
//     <>
//       <header className="sticky top-0 z-20 w-full bg-[#1E1E1E] border border-b-white border-t-[#1E1E1E] border-x-[#1E1E1E] drop-shadow-md">
//         <div className="flex flex-wrap items-center justify-between px-4 py-3 md:px-6 lg:px-11">
//           {/* Sidebar Toggle */}
//           <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
//             <button
//               aria-controls="sidebar"
//               className="block rounded-sm border border-white bg-white p-1.5 shadow-sm lg:hidden"
//             >
//               <span className="relative block h-5 w-5">
//                 <span className="absolute block w-full h-0.5 bg-black top-1" />
//                 <span className="absolute block w-full h-0.5 bg-black top-2" />
//                 <span className="absolute block w-full h-0.5 bg-black top-3" />
//               </span>
//             </button>
//           </div>

//           {/* Connect Wallet */}
//           <div className="flex items-center justify-center mt-3 lg:mt-0 lg:ml-auto lg:mr-6">
//             <button
//               className="btn btn-active bg-[var(--themeColor)] text-[#1E1E1E]"
//               onClick={connectWallet}
//             >
//               {walletAddress
//                 ? `Connected: ${walletAddress.slice(
//                     0,
//                     6
//                   )}...${walletAddress.slice(-4)}`
//                 : "Connect Wallet"}
//             </button>
//           </div>

//           {/* Profile Dropdown */}
//           <div className="flex items-center gap-3 mt-3 lg:mt-0">
//             <div className="dropdown dropdown-end">
//               <div
//                 tabIndex={0}
//                 role="button"
//                 className="avatar cursor-pointer transition-transform hover:scale-105"
//               >
//                 <div className="w-11 rounded-full ring ring-[var(--themeColor)] ring-offset-2 ring-offset-[#1E1E1E]">
//                   <Image
//                     src="https://www.shutterstock.com/image-vector/profile-picture-vector-260nw-404138239.jpg"
//                     alt="user"
//                     width={44}
//                     height={44}
//                     className="object-cover"
//                   />
//                 </div>
//               </div>

//               {profile && (
//                 <ul
//                   tabIndex={0}
//                   className="dropdown-content z-[999] menu p-4 shadow-lg border border-gray-700 bg-[#2B2B2B] rounded-xl w-64 space-y-3 text-white"
//                 >
//                   <li className="text-center border-b border-gray-600">
//                     <p className="font-semibold text-lg">{profile.name}</p>
//                     <p className="text-sm text-gray-300">{profile.email}</p>
//                     <p className="text-sm text-gray-300">
//                       referralCode: {profile.code}
//                     </p>
//                   </li>
//                   <li>
//                     <button
//                       className="w-full btn btn-sm bg-white text-black font-medium hover:bg-gray-100 transition"
//                       onClick={() => setOpenModal(true)}
//                     >
//                       Send referral Code
//                     </button>
//                   </li>
//                   <li>
//                     <button
//                       className="w-full btn btn-sm bg-[var(--themeColor)] text-black font-medium hover:opacity-90 transition"
//                       onClick={handleLogout}
//                     >
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Modal Component */}
//       <ReferralModal
//         open={openModal}
//         referralCode={profile?.code}
//         onClose={() => setOpenModal(false)}
//       />
//     </>
//   );
// };

// export default AdminHeader;
"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import ReferralModal from "../referralModal/ReferralModal";
import { WalletContext } from "@/context/WalletContext";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Web3Modal Demo",
      infuraId: "https://rpc.testnet.fantom.network",
    },
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        4002: "https://rpc.testnet.fantom.network",
      },
      bridge: "https://bridge.walletconnect.org",
      qrcode: true,
    },
  },
};

const Adminheader = (props) => {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { walletAddress, setWalletAddress, signer, setSigner } =
    useContext(WalletContext);
  const web3ModalRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  function handleLogout() {
    localStorage.removeItem("authToken");
    setIsLoggingOut(true);
    router.push("../");
  }

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.warn("No authToken found in localStorage.");
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      setProfile({
        name: decodedToken?.name || "Unknown User",
        email: decodedToken?.email || "no-email@example.com",
        code: decodedToken?.code || "No Code",
        button: "Connect Wallet",
        button2: "Logout",
        button3: "Change Password",
        button4: "Send Referral Code",
      });
    } catch (err) {
      console.error("Invalid token format", err);
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (!web3ModalRef.current) {
        web3ModalRef.current = new Web3Modal({
          cacheProvider: false,
          providerOptions,
        });
      }

      const instance = await web3ModalRef.current.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      setSigner(signer);
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };

  if (!profile) {
    return (
      <header className="fixed top-0 left-0 right-0 z-10 w-full bg-[#1E1E1E] drop-shadow-md h-16 flex items-center px-4">
        <span className="text-white">Loading...</span>
      </header>
    );
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 w-full bg-[#272727] border-b border-white/10 drop-shadow-md">
        <div className="flex flex-wrap items-center justify-between px-4 py-3 md:px-6 lg:px-11 h-16">
          {/* Sidebar toggle */}
          <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
            <button
              aria-controls="sidebar"
              onClick={() => props.setSidebarOpen(!props.sidebarOpen)}
              className="block rounded-sm p-1.5"
            >
              <span className="relative block h-5 w-5">
                <span className="absolute block w-full h-0.5 bg-[var(--themeColor)] top-1" />
                <span className="absolute block w-full h-0.5 bg-[var(--themeColor)] top-2" />
                <span className="absolute block w-full h-0.5 bg-[var(--themeColor)] top-3" />
              </span>
            </button>
          </div>

          {/* Connect Wallet */}
          <div className="flex items-center justify-center mt-0 lg:ml-auto lg:mr-6">
            <button
              onClick={connectWallet}
              className="bg-[var(--themeColor)] text-[#1E1E1E] px-4 py-2 rounded-lg font-medium hover:opacity-90 transition"
            >
              {walletAddress
                ? `Connected: ${walletAddress.slice(
                    0,
                    6
                  )}...${walletAddress.slice(-4)}`
                : profile.button}
            </button>
          </div>

          {/* Profile dropdown */}
          <div
            className="relative flex items-center gap-3 mt-0"
            ref={dropdownRef}
          >
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="w-11 h-11 rounded-full ring ring-[var(--themeColor)] ring-offset-2 ring-offset-[#1E1E1E] overflow-hidden">
                <Image
                  src="https://www.shutterstock.com/image-vector/profile-picture-vector-260nw-404138239.jpg"
                  alt="user"
                  width={44}
                  height={44}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 top-14 z-[999] bg-[#2B2B2B] text-white border border-gray-700 rounded-xl w-56 p-3 shadow-xl space-y-3">
                <div className="text-center border-b border-gray-600 pb-2">
                  <p className="font-semibold text-base">
                    {profile.name.toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-300">{profile.email}</p>
                  <p className="text-sm text-gray-300">code: {profile.code}</p>
                </div>

                {/* <button
                  onClick={() => {
                    router.push("/admindashboard/changepassword");
                    setDropdownOpen(false);
                  }}
                  className="w-full bg-white text-black font-medium py-1.5 rounded-lg hover:bg-gray-100 transition"
                >
                  {profile.button3}
                </button> */}

                <button
                  onClick={() => {
                    setOpenModal(true);
                    setDropdownOpen(false);
                  }}
                  className="w-full bg-white text-black font-medium py-1.5 rounded-lg hover:bg-gray-100 transition"
                >
                  {profile.button4}
                </button>

                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className={`w-full bg-[var(--themeColor)] text-black font-medium py-1.5 rounded-lg transition ${
                    isLoggingOut
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:opacity-90"
                  }`}
                >
                  {isLoggingOut ? "Logging out..." : profile.button2}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <ReferralModal
        open={openModal}
        senderEmail={profile?.email}
        referralCode={profile?.code}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
};

export default Adminheader;
