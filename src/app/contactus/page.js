"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Footer from "@/components/footer/page";
import ContactOTPModal from "@/components/ContactOTPModal";
import axios from "axios";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verifying, setVerifying] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOTPChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = e.target.parentElement.nextElementSibling?.querySelector('input');
      if (nextInput) nextInput.focus();
    }
  };

  const handleOTPPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const numbers = pastedData.replace(/\D/g, '').slice(0, 6);
    
    if (numbers.length === 6) {
      const newOtp = numbers.split('');
      setOtp(newOtp);
    }
  };

  // const handleSendOTP = async (e) => {
  //   e.preventDefault();
  //   if (!form.name || !form.email || !form.message) {
  //     setResult({ type: "error", message: "Please fill all fields." });
  //     return;
  //   }

  //   setLoading(true);
  //   setResult(null);
  //   try {
  //     const res = await fetch("/api/contactus/send-otp", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(form),
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       if (data.alreadyVerified) {
  //         // User already verified, message sent directly
  //         setResult({ type: "success", message: "Message sent successfully!" });
  //         setForm({ name: "", email: "", message: "" });
  //       } else {
  //         // User not verified, show OTP modal
  //         setShowOTPModal(true);
  //         setResult({ type: "success", message: "OTP sent to your email!" });
  //       }
  //     } else {
  //       setResult({ type: "error", message: data.error || "Failed to send OTP." });
  //     }
  //   } catch (err) {
  //     setResult({ type: "error", message: "Something went wrong." });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const handleSendOTP = async (e) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.message) {
    setResult({ type: "error", message: "Please fill all fields." });
    return;
  }

  setLoading(true);
  setResult(null);

  try {
    const res = await axios.post("/api/contactus/send-otp", form);
    const data = res.data;

    if (data) {
      // User already verified, message sent directly
      setResult({ type: "success", message: "Message sent successfully!" });
      setForm({ name: "", email: "", message: "" });
    } else {
      // User not verified, show OTP modal
      setShowOTPModal(true);
      setResult({ type: "success", message: "OTP sent to your email!" });
    }
  } catch (err) {
    const message =
      err?.response?.data?.error || "Failed to send OTP.";
    setResult({ type: "error", message });
  } finally {
    setLoading(false);
  }
};

  // const handleVerifyOTP = async () => {
  //   const enteredOtp = otp.join("");
  //   if (enteredOtp.length !== 6) {
  //     setResult({ type: "error", message: "Please enter 6-digit OTP." });
  //     return;
  //   }

  //   setVerifying(true);
  //   setResult(null);
  //   try {
  //     const res = await fetch("/api/contactus/verify-otp", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email: form.email, otp: enteredOtp }),
  //     });
  //     const data = await res.json();
      
  //     if (res.ok) {
  //       // After successful verification, submit the message
  //       const submitRes = await fetch("/api/contactus", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ email: form.email }),
  //       });
  //       const submitData = await submitRes.json();
        
  //       if (submitRes.ok) {
  //         setResult({ type: "success", message: "Message sent successfully!" });
  //         setForm({ name: "", email: "", message: "" });
  //         setShowOTPModal(false);
  //         setOtp(["", "", "", "", "", ""]);
  //       } else {
  //         setResult({ type: "error", message: submitData.error || "Failed to send message." });
  //       }
  //     } else {
  //       setResult({ type: "error", message: data.error || "Invalid OTP." });
  //     }
  //   } catch (err) {
  //     setResult({ type: "error", message: "Something went wrong." });
  //   } finally {
  //     setVerifying(false);
  //   }
  // };
const handleVerifyOTP = async () => {
  const enteredOtp = otp.join("");
  if (enteredOtp.length !== 6) {
    setResult({ type: "error", message: "Please enter 6-digit OTP." });
    return;
  }

  setVerifying(true);
  setResult(null);

  try {
    // First: verify OTP
    const verifyRes = await axios.post("/api/contactus/verify-otp", {
      email: form.email,
      otp: enteredOtp,
    });

    // If successful, send the message
    if (verifyRes.status === 200) {
      const submitRes = await axios.post("/api/contactus", {
        email: form.email,
        name: form.name,
        message: form.message,
      });

      if (submitRes) {
        setResult({ type: "success", message: "Message sent successfully!" });
        setForm({ name: "", email: "", message: "" });
        setShowOTPModal(false);
        setOtp(["", "", "", "", "", ""]);
      } else {
        setResult({
          type: "error",
          message: submitRes.data.error || "Failed to send message.",
        });
      }
    }
  } catch (err) {
    const errorMessage =
      err?.response?.data?.error || "Something went wrong.";
    setResult({ type: "error", message: errorMessage });
  } finally {
    setVerifying(false);
  }
};

  return (
    <div className="flex flex-col min-h-screen">
      <section
        className="flex-grow text-white px-4 bg-gold-gradient sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Info */}
          <div className="space-y-6 pt-4 sm:pt-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl pt-4 font-bold text-[var(--themeColor)]">
              Contact Us
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              We&apos;d love to hear from you. Reach out to us through the
              following contact details or send us a message using the form.
            </p>

            <div className="mt-8 sm:mt-10 space-y-4 text-base sm:text-lg">
              <div className="flex items-center gap-3">
                <Phone className="text-[var(--themeColor)] h-5 w-5 sm:h-6 sm:w-6" />
                <span>+1 (123) 456-7890</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-[var(--themeColor)] h-5 w-5 sm:h-6 sm:w-6" />
                <span>info@hashfor.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-[var(--themeColor)] h-5 w-5 sm:h-6 sm:w-6" />
                {/* <span>123 Business St, Suite 456, City, Country</span> */}
                 <span>1025</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            className="mt-8 sm:mt-4 space-y-6 bg-black/75 p-6 sm:p-8 rounded-xl shadow-lg 
                border border-transparent
                transition-all duration-500 ease-in-out
                hover:shadow-[0_0_20px_5px_rgba(212,175,55,0.3)]
                hover:border-[var(--themeColor)]/30
                group"
            onSubmit={handleSendOTP}
          >
            {/* Name Field */}
            <div className="space-y-2">
              <label
                className="block text-sm sm:text-base font-medium mb-2 text-gray-300 group-hover:text-[var(--themeColor)] transition-colors duration-300"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                disabled={loading || verifying}
                className="w-full px-4 py-3 rounded-lg bg-black/50 text-white 
                border border-gray-700 focus:outline-none 
                focus:ring-2 focus:ring-[var(--themeColor)] focus:border-transparent
                transition-all duration-300
                hover:border-[var(--themeColor)]/50
                placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Your Name"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                className="block text-sm sm:text-base font-medium mb-2 text-gray-300 group-hover:text-[var(--themeColor)] transition-colors duration-300"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                disabled={loading || verifying}
                className="w-full px-4 py-3 rounded-lg bg-black/50 text-white 
                border border-gray-700 focus:outline-none 
                focus:ring-2 focus:ring-[var(--themeColor)] focus:border-transparent
                transition-all duration-300
                hover:border-[var(--themeColor)]/50
                placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="you@example.com"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label
                className="block text-sm sm:text-base font-medium mb-2 text-gray-300 group-hover:text-[var(--themeColor)] transition-colors duration-300"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                value={form.message}
                onChange={handleChange}
                disabled={loading || verifying}
                className="w-full px-4 py-3 rounded-lg bg-black/50 text-white 
                border border-gray-700 focus:outline-none 
                focus:ring-2 focus:ring-[var(--themeColor)] focus:border-transparent
                transition-all duration-300
                hover:border-[var(--themeColor)]/50
                placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Your message..."
              ></textarea>
            </div>

            {/* Result Message */}
            {result && (
              <div className={`text-center py-1 ${result.type === "success" ? "text-yellow-400" : "text-red-400"}`}>
                {result.message}
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center pt-1">
              <button
                type="submit"
                className="bg-[var(--themeColor)] text-black font-semibold 
                py-3 px-8 rounded-full 
                shadow-lg hover:shadow-[0_0_15px_3px_rgba(212,175,55,0.5)]
                transform hover:scale-105
                transition-all duration-300 
                text-sm sm:text-base
                relative overflow-hidden
                after:content-[''] after:absolute after:inset-0 
                after:bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_70%)] 
                after:opacity-0 after:hover:opacity-100 after:transition-opacity after:duration-300
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
                disabled={loading || verifying}
              >
                {loading ? "Sending OTP..." : verifying ? "Verifying..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer with proper spacing */}
      <div className="mt-auto">
        <Footer />
      </div>

      {/* OTP Modal */}
      <ContactOTPModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        otp={otp}
        onOtpChange={handleOTPChange}
        onOtpPaste={handleOTPPaste}
        onSubmit={handleVerifyOTP}
        isLoading={verifying}
        email={form.email}
        result={result}
      />
    </div>
  );
};

export default ContactUs;
