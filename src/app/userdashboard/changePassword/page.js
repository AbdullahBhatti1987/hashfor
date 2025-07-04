"use client";

import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/navigation";
import { showErrorToast,showSuccessToast } from "@/lib/toast";

const ChangePasswordPage = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const [knowsCurrentPassword, setKnowsCurrentPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const handleModalChoice = (knows) => {
    setKnowsCurrentPassword(knows);
    setModalOpen(false);
  };
  const [clientId, setClientId] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.warn("No authToken found in localStorage.");
      return null;
    }
    // console.log(token);
    const decodedToken = jwtDecode(token);
    // console.log(decodedToken, "decodedToken");
    setClientId(decodedToken?.id);
    // console.log(clientId, "decodedid");
  });
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !(currentPassword || newPassword || confirmPassword) &&
    newPassword !== confirmPassword
  ) {
    showErrorToast("New password and confirm password do not match.");
    return;
  }

  try {
    const res = await axios.post("/api/auth/change-password", {
      userId: clientId,
      newPassword,
    });

    if (res.status === 200) {
      console.log("Password changed successfully:", res.data);
      showSuccessToast("Password updated successfully.");
      setCurrentPassword(""); // ✅ Corrected
      setNewPassword("");     // ✅
      setConfirmPassword(""); // ✅
      router.push("/userdashboard");
    } else {
      console.error("Failed to change password:", res.data);
      showErrorToast("Something went wrong.");
    }
  } catch (error) {
    console.error("Error while changing password:", error);
    showErrorToast("Error updating password.");
  }
};


  return (
    <>
      {/* Modal */}
      {/* {modalOpen && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4 text-black">
              Do you know your current password?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={() => handleModalChoice(true)}
              >
                Yes
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => handleModalChoice(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* Form Section */}

     <div className="flex items-center justify-center min-h-screen bg-black px-4">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-md bg-[#1E1E1E] rounded-2xl shadow-xl p-8 border border-gray-700"
  >
    <h1 className="text-3xl font-bold text-center text-[var(--themeColor)] mb-8">
      🔒 Change Password
    </h1>

    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-300 mb-2">
        Current Password
      </label>
      <input
        type="password"
        className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--themeColor)] transition duration-200"
        placeholder="Enter your current password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        required
      />
    </div>

    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-300 mb-2">
        New Password
      </label>
      <input
        type="password"
        className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--themeColor)] transition duration-200"
        placeholder="Enter your new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
    </div>

    <div className="mb-8">
      <label className="block text-sm font-semibold text-gray-300 mb-2">
        Confirm Password
      </label>
      <input
        type="password"
        className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--themeColor)] transition duration-200"
        placeholder="Confirm your new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
    </div>

    <button
      type="submit"
      className="w-full py-3 rounded-xl bg-[var(--themeColor)] text-[#1E1E1E] font-semibold hover:opacity-90 transition duration-200"
    >
      Change Password
    </button>
  </form>
</div>

      </>
  );
};

export default ChangePasswordPage;
