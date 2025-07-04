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
import logo from "../../../public/hashfor-new-logo.png";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import ForgotPasswordModal from "./ForgetPassModal";
import OtpModal from "./OtpModal";
import { showSuccessToast, showErrorToast } from "@/lib/toast";
import axios from "axios";

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
  { name: "Compensation Plan", href: "/compensationplan" },
  { name: "Vision", href: "/vision" },
  { name: "About Us", href: "/aboutus" },
  { name: "Contact Us", href: "/contactus" },
  { name: "T&C", href: "/t&c" },
  { name: "Rules", href: "/rules" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [account, setAccount] = useState(null);
  const web3ModalRef = useRef(null);
  const pathname = usePathname();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [otpError, setOtpError] = useState("");
  const router = useRouter();
  function saveTokenToLocalStorage(token) {
    localStorage.setItem("authToken", token);
  }

  const handleForgotPasswordClick = () => {
    setIsModalOpen(false);
    setIsForgotPasswordOpen(true);
    setIsEmailVerified(false);
    setIsOtpVerified(false);
    setForgotPasswordEmail("");
  };

  // const handleVerifyEmail = async (email) => {
  //   setIsLoading(true);
  //   try {
  //     // Call your API to send OTP for password reset
  //     const res = await fetch("/api/auth/forgot-password", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email }),
  //     });

  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data?.error || "Failed to send OTP");

  //     setIsEmailVerified(true);
  //     setForgotPasswordEmail(email);
  //     showSuccessToast("OTP sent for password reset!");
  //   } catch (error) {
  //     showErrorToast("Failed to send OTP!");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleVerifyEmail = async (email) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/forgot-password", { email });

      setIsEmailVerified(true);
      setForgotPasswordEmail(email);
      showSuccessToast("OTP sent for password reset!");
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Failed to send OTP!";
      showErrorToast(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleResetPassword = async (email, newPassword, confirmPassword) => {
  //   if (newPassword !== confirmPassword) {
  //     showErrorToast("Passwords don't match");
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     const res = await fetch("/api/auth/reset-password", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, newPassword }),
  //     });

  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data?.error || "Failed to reset password");

  //     showSuccessToast("Password updated successfully!");

  //     // ✅ Reset all states
  //     setIsForgotPasswordOpen(false);
  //     setIsEmailVerified(false);
  //     setIsOtpVerified(false);
  //     setInputOtp(["", "", "", "", "", ""]);
  //   } catch (error) {
  //     showErrorToast("Error in updating password");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleResetPassword = async (email, newPassword, confirmPassword) => {
    if (newPassword !== confirmPassword) {
      showErrorToast("Passwords don't match");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post("/api/auth/reset-password", {
        email,
        newPassword,
      });

      showSuccessToast("Password updated successfully!");

      // ✅ Reset all states
      setIsForgotPasswordOpen(false);
      setIsEmailVerified(false);
      setIsOtpVerified(false);
      setInputOtp(["", "", "", "", "", ""]);
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || "Error in updating password";
      showErrorToast(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };
  // const handleVerifyOtp = async (email, otp) => {
  //   setIsLoading(true);
  //   try {
  //     const res = await fetch("/api/auth/verify-otp", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, otp }),
  //     });

  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data?.error || "Invalid OTP");

  //     setIsOtpVerified(true);
  //     setOtpError("");
  //   } catch (error) {
  //     setOtpError(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Form states
  const handleVerifyOtp = async (email, otp) => {
    setIsLoading(true);

    try {
      const res = await axios.post("/api/auth/verify-otp", {
        email,
        otp,
      });

      setIsOtpVerified(true);
      setOtpError("");
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Invalid OTP";
      setOtpError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };
  const [formData, setFormData] = useState({
    referralCode: "",
    name: "",
    email: "",
    contactNo: "",
    password: "",
    ConfirmPassword: "",
  });
  const [loginFormData, setLoginFormData] = useState({
    userID: "",
    password: "",
  });
  const [inputOtp, setInputOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [otpChecking, setOtpChecking] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
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

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!formData.email || formData.password !== formData.ConfirmPassword) {
      showErrorToast("Please enter a valid email and matching passwords");
      return;
    }

    setIsLoading(true);
    try {
      // const res = await fetch("/api/auth/sendotp", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     email: formData.email,
      //     referralCode: formData.referralCode,
      //   }),
      // });
      const res = await axios.post("/api/auth/sendotp", {
        email: formData.email,
        referralCode: formData.referralCode,
      });

      const data = await res.data;
      // if (!res.ok) throw new Error(data?.error || "Failed to send OTP");

      showSuccessToast("OTP sent:");
      setIsLoading(false); // First stop loading
      setIsModalOpen(false); // Then close signup modal
      setIsOtpModalOpen(true); // Finally open OTP modal
    } catch (error) {
      console.log(`Error of vercel is ${error}`);
      showErrorToast(`Failed to send vercel OTP:${error} `);
      setIsLoading(false);
    }
  };

  // const handleCreateAccount = async (e) => {
  //   e.preventDefault();
  //   setOtpChecking(true);
  //   try {
  //     const enteredOtp = inputOtp.join("");
  //     console.log({ ...formData, otp: enteredOtp });

  //     const res = await fetch("/api/auth/create-account", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         ...formData,
  //       }),
  //     });

  //     const data = await res.json();
  //     if (res.ok) {
  //       console.log("Account created successfully:", data.token);
  //       saveTokenToLocalStorage(data.token);
  //       if (data.user.role === "admin") {
  //         router.push("/admindashboard");
  //       } else {
  //         router.push("/userdashboard");
  //       }
  //     } else {
  //       alert(data.error || "OTP verification failed");
  //     }
  //   } catch (error) {
  //     console.error("Account creation failed:", error.message);
  //     alert("An unexpected error occurred. Please try again.");
  //   } finally {
  //     setOtpChecking(false);
  //   }
  // };

  // const handleCreateAccount = async (e) => {
  //   e.preventDefault();
  //   setOtpChecking(true); // This will trigger the loader

  //   try {
  //     const enteredOtp = inputOtp.join("");
  //     // console.log({ ...formData, otp: enteredOtp });

  //     const res = await fetch("/api/auth/create-account", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         ...formData,
  //       }),
  //     });

  //     const data = await res.json();
  //     if (res.ok) {
  //       showSuccessToast("Account created successfully:");
  //       saveTokenToLocalStorage(data.token);
  //       if (data.user.role === "admin") {
  //         router.push("/admindashboard");
  //       } else {
  //         router.push("/userdashboard");
  //       }
  //       // Don't setOtpChecking(false) here - let the navigation handle it
  //     } else {
  //       showErrorToast("OTP verification failed");
  //       setOtpChecking(false); // Only stop loading on error
  //     }
  //   } catch (error) {
  //     // console.error("Account creation failed:", error.message);
  //     showErrorToast("An unexpected error occurred. Please try again.");
  //     setOtpChecking(false);
  //   }
  // };
  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setOtpChecking(true); // Trigger loader

    try {
      const enteredOtp = inputOtp.join("");
      // Combine form data with entered OTP
      const payload = {
        ...formData,
      };

      const res = await axios.post("/api/auth/create-account", payload);

      showSuccessToast("Account created successfully:");
      saveTokenToLocalStorage(res.data.token);

      if (res.data.user.role === "admin") {
        router.push("/admindashboard");
      } else {
        router.push("/userdashboard");
      }

      // No need to stop loading manually — navigation will take over
    } catch (error) {
      const errorMsg = error.response?.data?.error || "OTP verification failed";
      showErrorToast(errorMsg);
      setOtpChecking(false); // Stop loading only on error
    }
  };
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     const res = await fetch("/api/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(loginFormData),
  //     });

  //     const data = await res.json();
  //     if (res.ok) {
  //       saveTokenToLocalStorage(data.token);
  //       if (data.user.role === "admin") {
  //         showSuccessToast("Admin Login Successfully!");
  //         router.push("/admindashboard");
  //       } else {
  //         showSuccessToast("User Login Successfully!");
  //         router.push("/userdashboard");
  //       }
  //     } else {
  //       showErrorToast("Failed To Login!");
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     // console.error("Login failed:", error);
  //     showErrorToast("An unexpected error occurred. Please try again.");
  //   }
  // };
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("/api/auth/login", loginFormData);

      saveTokenToLocalStorage(res.data.token);

      if (res.data.user.role === "admin") {
        showSuccessToast("Admin Login Successfully!");
        router.push("/admindashboard");
      } else {
        showSuccessToast("User Login Successfully!");
        router.push("/userdashboard");
      }
    } catch (error) {
      setIsLoading(false);
      const errorMsg =
        error.response?.data?.error ||
        "An unexpected error occurred. Please try again.";
      showErrorToast(errorMsg);
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
    setIsSignUp(false);
  };

  return (
    <Disclosure as="nav" className={`bg-black fixed top-0 w-full z-50 ${
        pathname === "/" ? "-ml-4" : ""
      }`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between w-full">
              {/* Mobile menu button */}
              <div className="lg:hidden flex items-center">
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
                  className="h-14 w-auto"
                />
                <h5 className="text-yellow-400 font-bold text-2xl ps-2">
                  Hashfor
                </h5>
              </div>

              {/* Nav items - shown only on lg screens and above */}
              <div className="hidden lg:flex flex-1 justify-center overflow-x-auto no-scrollbar">
                <div className="flex">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`rounded-md px-3 py-2 text-sm lg:text-md font-medium whitespace-nowrap ${
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

              {/* Wallet buttons - always visible except on mobile in dropdown */}
              <div className="flex items-center gap-2 pl-2">
                <button
                  onClick={openModal}
                  className="hidden sm:flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-black font-medium shadow hover:opacity-90"
                >
                  Login / SignUp
                </button>

                {/* {account ? (
                  <button
                    onClick={disconnectWallet}
                    className="hidden sm:flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-black font-medium shadow hover:opacity-90"
                  >
                    Disconnect: {account.slice(0, 3)}...{account.slice(-2)}
                  </button>
                ) : (
                  <button
                    onClick={connectWallet}
                    className="hidden sm:flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-black font-medium shadow hover:opacity-90"
                  >
                    Connect Wallet
                  </button>
                )} */}
              </div>
            </div>
          </div>

          {/* Mobile panel - shows on screens smaller than lg */}
          <Disclosure.Panel className="lg:hidden px-4 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className={classNames(
                  pathname === item.href
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.name}
              </Disclosure.Button>
            ))}
            <div className="mt-4 space-y-2">
              <button
                onClick={openModal}
                className="sm:hidden w-full flex items-center justify-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-black font-medium shadow hover:opacity-90"
              >
                Login / SignUp
              </button>
              {/* {account ? (
                <button
                  onClick={disconnectWallet}
                  className="sm:hidden w-full flex items-center justify-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-black font-medium shadow hover:opacity-90"
                >
                  Disconnect: {account.slice(0, 3)}...{account.slice(-2)}
                </button>
              ) : (
                <button
                  onClick={connectWallet}
                  className="sm:hidden w-full flex items-center justify-center gap-2 rounded-full bg-yellow-400 px-4 py-2 text-black font-medium shadow hover:opacity-90"
                >
                  Connect Wallet
                </button>
              )} */}
            </div>
          </Disclosure.Panel>

          {/* Modals */}
          {isSignUp ? (
            <SignupModal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setIsLoading(false);
              }}
              formData={formData}
              onFormChange={handleChange}
              onSubmit={handleSendOTP}
              isLoading={isLoading}
              onSwitchToLogin={() => setIsSignUp(false)}
            />
          ) : (
            <LoginModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              formData={loginFormData}
              onFormChange={handleLoginChange}
              onSubmit={handleLogin}
              onSwitchToSignup={() => setIsSignUp(true)}
              onForgotPassword={handleForgotPasswordClick}
              isLoading={isLoading}
            />
          )}

          <ForgotPasswordModal
            isOpen={isForgotPasswordOpen}
            onClose={() => setIsForgotPasswordOpen(false)}
            onVerifyEmail={handleVerifyEmail}
            onResetPassword={handleResetPassword}
            isLoading={isLoading}
            isEmailVerified={isEmailVerified}
            isOtpVerified={isOtpVerified}
            otp={inputOtp}
            onVerifyOtp={handleVerifyOtp}
            otpError={otpError}
            onOtpChange={handleOTPChange}
          />

          <OtpModal
            isOpen={isOtpModalOpen}
            onClose={() => {
              setIsOtpModalOpen(false);
              setIsLoading(false);
            }}
            otp={inputOtp}
            onOtpChange={handleOTPChange}
            onSubmit={handleCreateAccount}
            isLoading={otpChecking}
          />
        </>
      )}
    </Disclosure>
  );
}

{
  /* <SignupModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              formData={formData}
              onFormChange={handleChange}
              onSubmit={handleSendOTP}
              isLoading={isLoading}
              onSwitchToLogin={() => setIsSignUp(false)}
            />
<OtpModal
            isOpen={isOtpModalOpen}
            onClose={() => setIsOtpModalOpen(false)}
            otp={inputOtp}
            onOtpChange={handleOTPChange}
            onSubmit={handleCreateAccount}
            isLoading={otpChecking}
          /> 
          
           <LoginModal
              isOpen={isModalOpen && !isSignUp}
              onClose={() => setIsModalOpen(false)}
              formData={loginFormData}
              onFormChange={handleLoginChange}
              onSubmit={handleLogin}
              onSwitchToSignup={() => setIsSignUp(true)}
              onForgotPassword={handleForgotPasswordClick}
              isLoading={isLoading}
            />
          */
}
