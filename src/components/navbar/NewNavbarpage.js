"use client";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";
import { usePathname, useRouter } from "next/navigation";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import logo from "../../../public/logo.png";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: "Web3Modal Demo",
      rpc: "https://rpc.testnet.fantom.network",
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

const navigation = [
  { name: "Home", href: "/" },
  { name: "Packages", href: "/packages" },
  // { name: "Rector Message", href: "/reactormessage" },
  { name: "Compensation Plan", href: "/compensationplan" },
  { name: "Vision", href: "/vision" },
  { name: "Contact Us", href: "/contactus" },
  { name: "About Us", href: "/aboutus" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [account, setAccount] = useState(null);
  const web3ModalRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      web3ModalRef.current = new Web3Modal({
        cacheProvider: false,
        providerOptions,
        themeVariables: {
          "--w3m-color-mix": "#00BB7F",
          "--w3m-color-mix-strength": 40,
        },
      });
    }
  }, []);

  const connectWallet = async () => {
    try {
      const instance = await web3ModalRef.current.connect();
      const provider = new Web3Provider(instance);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setAccount(address);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await web3ModalRef.current.clearCachedProvider();
      setAccount(null);
    } catch (error) {
      console.error("Wallet disconnection failed:", error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [actualOtp, setActualOtp] = useState(null);
  const [inputOtp, setInputOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [otpChecking, setOtpChecking] = useState(false);
  const [formData, setFormData] = useState({
    referralCode: "",
    name: "",
    email: "",
    contactNo: "",
    walletAddress: "",
    password: "",
    ConfirmPassword: "",
  });
  const [loginFormData, setLoginFormData] = useState({
    userID: "",
    password: "",
  });
  const router = useRouter();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };
  // const handleSendOTP = async (e) => {
  //   e.preventDefault();

  //   if (!formData.email || formData.password !== formData.ConfirmPassword) {
  //     alert("Please enter a valid email and matching passwords");
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     const res = await fetch("/api/auth/send-otp", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email: formData.email }),
  //     });

  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data?.error || "Failed to send OTP");

  //     setActualOtp(data.otp);
  //     setOtpOpen(true);
  //     console.log("OTP sent:", data.otp);
  //   } catch (error) {
  //     alert("Failed to send OTP: " + error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!formData.email || formData.password !== formData.ConfirmPassword) {
      alert("Please enter a valid email and matching passwords");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post("/api/auth/send-otp", {
        email: formData.email,
      });

      setActualOtp(res.data.otp);
      setOtpOpen(true);
      console.log("OTP sent:", res.data.otp);
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message;
      alert("Failed to send OTP: " + errorMsg);
    } finally {
      setIsLoading(false);
    }
  };
  const handleOTPChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...inputOtp];
    newOtp[index] = value;
    setInputOtp(newOtp);

    const nextInput = e.target.nextElementSibling;
    if (value && nextInput) nextInput.focus();
  };

  // const handleCreateAccount = async (e) => {
  //   e.preventDefault();
  //   setOtpChecking(true); // Start loading
  //   try {
  //     const enteredOtp = inputOtp.join("");
  //     console.log("data with OTP", formData, enteredOtp);
  //     const res = await fetch("/api/auth/create-account", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         referralCode: formData.referralCode,
  //         name: formData.name,
  //         email: formData.email,
  //         contactNo: formData.contactNo,
  //         walletAddress: formData.walletAddress,
  //         password: formData.password,
  //         otp: enteredOtp,
  //       }),
  //     });

  //     const data = await res.json();

  //     if (res.ok) {
  //       window.location.href = "/userdashboard";
  //     } else {
  //       alert(data.error || "OTP verification failed");
  //     }
  //   } catch (error) {
  //     console.error("Account creation failed:", error);
  //     alert("An unexpected error occurred. Please try again.");
  //   } finally {
  //     setOtpChecking(false); // End loading
  //   }
  // };
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setOtpChecking(true); // Start loading

    try {
      const enteredOtp = inputOtp.join("");
      console.log("data with OTP", formData, enteredOtp);

      const res = await axios.post("/api/auth/create-account", {
        referralCode: formData.referralCode,
        name: formData.name,
        email: formData.email,
        contactNo: formData.contactNo,
        walletAddress: formData.walletAddress,
        password: formData.password,
        otp: enteredOtp,
      });

      // ✅ On success, redirect
      // window.location.href = "/userdashboard";
      router.push("/userdashboard");
    } catch (error) {
      console.error("Account creation failed:", error);
      const errorMsg = error.response?.data?.error || "OTP verification failed";
      alert(errorMsg);
    } finally {
      setOtpChecking(false); // End loading
    }
  };
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   // setOtpChecking(true);
  //   try {
  //     const res = await fetch("/api/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         userID: loginFormData.userID,
  //         password: loginFormData.password,
  //       }),
  //     });
  //     const data = await res.json();
  //     console.log("login data", data);
  //     if (res.ok) {
  //       localStorage.setItem("user", JSON.stringify(userID));
  //       window.location.href = "/userdashboard";
  //     } else {
  //       alert(data.error || "failed to login");
  //     }
  //   } catch (error) {
  //     console.error("Account creation failed:", error);
  //     alert("An unexpected error occurred. Please try again.");
  //   }
  // };
  const handleLogin = async (e) => {
    e.preventDefault();
    // setOtpChecking(true); // Uncomment if needed for loading state

    try {
      const res = await axios.post("/api/auth/login", {
        userID: loginFormData.userID,
        password: loginFormData.password,
      });

      console.log("login data", res.data);

      // Save user ID to localStorage (optional: you may want to save token or user object)
      localStorage.setItem("user", JSON.stringify(loginFormData.userID));

      // Redirect to user dashboard
      // window.location.href = "/userdashboard";
      router.push("/userdashboard");
    } catch (error) {
      console.error("Login failed:", error);
      const errorMsg = error.response?.data?.error || "Failed to login";
      alert(errorMsg);
    }
  };
  const SpringModal = ({ isOpen, setIsOpen }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-black text-white p-6 border border-yellow-400 rounded-xl w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            {isSignUp ? (
              <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-4 text-center gold-text">
                  Create Account
                </h1>
                <form className="space-y-4" onSubmit={handleSendOTP}>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/2">
                      <label className="block text-sm font-medium">
                        Referral Code
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your Referral Code"
                        autoComplete="off"
                        name="referralCode"
                        onChange={handleChange}
                        value={formData.referralCode}
                        className="w-full mt-1 p-2 rounded bg-white/10 text-white"
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <label className="block text-sm font-medium">Name</label>
                      <input
                        type="text"
                        placeholder="Enter your Name"
                        autoComplete="off"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                        className="w-full mt-1 p-2 rounded bg-white/10 text-white"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/2">
                      <label className="block text-sm font-medium">Email</label>
                      <input
                        type="email"
                        placeholder="Enter your Email"
                        autoComplete="off"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        className="w-full mt-1 p-2 rounded bg-white/10 text-white"
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <label className="block text-sm font-medium">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your Contact Number"
                        autoComplete="off"
                        name="contactNo"
                        onChange={handleChange}
                        value={formData.contactNo}
                        className="w-full mt-1 p-2 rounded bg-white/10 text-white"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium">
                      Wallet Address
                    </label>
                    <input
                      type="text"
                      name="walletAddress"
                      placeholder="Enter your Wallet Address"
                      autoComplete="off"
                      onChange={handleChange}
                      value={formData.walletAddress}
                      className="w-full mt-1 p-2 rounded bg-white/10 text-white"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium">
                      Create Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your Password"
                      autoComplete="off"
                      name="password"
                      onChange={handleChange}
                      value={formData.password}
                      className="w-full mt-1 p-2 rounded bg-white/10 text-white"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm your Password"
                      autoComplete="off"
                      name="ConfirmPassword"
                      onChange={handleChange}
                      value={formData.ConfirmPassword}
                      className="w-full mt-1 p-2 rounded bg-white/10 text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full font-bold py-2 rounded transition cursor-pointer ${
                      isLoading
                        ? "bg-gray-400 text-white"
                        : "gold-gradient-btn text-black hover:bg-indigo-100"
                    }`}
                  >
                    {isLoading ? "Sending OTP..." : "Send OTP to Email"}
                  </button>

                  <OTPSpringModal isOpen={otpOpen} setIsOpen={setOtpOpen} />
                  <div className="text-white text-center">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(false)}
                      className="gold-text font-bold hover:underline cursor-pointer"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-4 text-center gold-text">
                  Login
                </h1>
                <form className="space-y-4">
                  <div className="w-full">
                    <label className="block text-sm font-medium">User ID</label>
                    <input
                      type="text"
                      onChange={handleLoginChange}
                      value={loginFormData.userID}
                      placeholder="Enter your User ID"
                      className="w-full mt-1 p-2 rounded bg-white/10 text-white"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium">
                      Password
                    </label>
                    <input
                      type="password"
                      onChange={handleLoginChange}
                      value={loginFormData.password}
                      placeholder="Enter Your Password"
                      className="w-full mt-1 p-2 rounded bg-white/10 text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full gold-gradient-btn font-bold text-black py-2 rounded hover:bg-indigo-100 transition cursor-pointer"
                  >
                    Login
                  </button>
                  <div className="text-white text-center">
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(true)}
                      className="gold-text font-bold hover:underline cursor-pointer"
                    >
                      SignUp
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const OTPSpringModal = ({ isOpen, setIsOpen }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-black text-white p-6 border border-yellow-400 rounded-xl w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="text-white p-4">
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-white">
                  OTP Verification
                </h1>
                <p className="text-white/70 mt-2">
                  Please enter the OTP sent to your email address.
                </p>
              </div>

              {/* OTP Input Boxes */}
              <div className="flex justify-center gap-2">
                {inputOtp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="w-12 h-12 text-center text-white text-xl font-bold rounded border border-gray-300 focus:outline-none"
                    value={digit}
                    onChange={(e) => handleOTPChange(e, index)}
                  />
                ))}
              </div>

              <div className="text-center mt-6 flex justify-center gap-4">
                <button
                  onClick={handleCreateAccount}
                  disabled={otpChecking}
                  className={`gold-gradient-btn text-black font-bold py-2 px-4 rounded transition ${
                    otpChecking
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-yellow-300"
                  }`}
                >
                  {otpChecking ? "Verifying..." : "Verify OTP"}
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-red-600 text-black font-bold py-2 px-4 rounded hover:bg-red-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <Disclosure as="nav" className="bg-black fixed top-0 w-full z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between w-full">
              {/* Mobile Menu Button */}
              <div className="sm:hidden flex items-center">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Logo */}
              <div className="flex items-center flex-shrink-0">
                <Image
                  width={40}
                  height={40}
                  alt="Logo"
                  src={logo}
                  className="h-10 w-auto"
                />
                <h5 className="text-yellow-400 font-bold text-2xl ps-2 hidden sm:block">
                  Hashfor
                </h5>
              </div>

              {/* Nav Items */}
              <div className="hidden sm:flex flex-1 justify-center overflow-x-auto no-scrollbar">
                <div className="flex">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`rounded-md px-3 py-2 text-md font-medium whitespace-nowrap ${
                          isActive
                            ? "text-[var(--themeColor)]"
                            : "text-white hover:text-[var(--themeColor)]"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Wallet Buttons */}
              <div className="hidden sm:flex items-center gap-2 pl-2">
                <button
                  onClick={() => setIsOpen(true)}
                  className="flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-black font-medium shadow hover:opacity-90"
                >
                  Login / SignUp
                </button>
                <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
                {account ? (
                  <button
                    onClick={disconnectWallet}
                    className="flex items-center gap-2 rounded-full gold-gradient-btn px-4 py-2 text-black font-medium shadow hover:opacity-90"
                  >
                    Disconnect: {account.slice(0, 3)}...{account.slice(-2)}
                  </button>
                ) : (
                  <button
                    onClick={connectWallet}
                    className="flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-black font-medium shadow hover:opacity-90"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Panel */}
          <Disclosure.Panel className="sm:hidden px-4 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </Disclosure.Button>
            ))}
            <div className="mt-4 space-y-2">
              <button
                onClick={() => setIsOpen(true)}
                className="w-full flex items-center justify-center gap-2 rounded-full gold-gradient-btn px-4 py-2 text-black font-medium shadow hover:opacity-90"
              >
                Login / SignUp
              </button>
              {account ? (
                <button
                  onClick={disconnectWallet}
                  className="w-full flex items-center justify-center gap-2 rounded-full gold-gradient-btn px-4 py-2 text-black font-medium shadow hover:opacity-90"
                >
                  Disconnect: {account.slice(0, 3)}...{account.slice(-2)}
                </button>
              ) : (
                <button
                  onClick={connectWallet}
                  className="w-full flex items-center justify-center gap-2 rounded-full gold-gradient-btn px-4 py-2 text-black font-medium shadow hover:opacity-90"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
