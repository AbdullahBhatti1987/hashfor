"use client";
import React from "react";
import { FiEdit, FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiShield } from "react-icons/fi";
import { HiOutlineCurrencyDollar, HiOutlineIdentification } from "react-icons/hi";

export default function ProfilePage() {
  // Mock user data - replace with your actual data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    joinDate: "January 15, 2023",
    membership: "Premium",
    balance: "$2,450.00",
    idVerified: true,
    profileImage: "/profile-pic.jpg",
    packages: [
      { name: "Professional", status: "Active" },
      { name: "Trading", status: "Active" },
      { name: "Basic", status: "Expired" }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--themeColor)] mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-[#272727] rounded-2xl border border-white/10 p-6 shadow-lg">
              <div className="flex flex-col items-center">
                {/* Profile Image with Edit Button */}
                <div className="relative mb-4 group">
                  <div className="absolute inset-0 rounded-full bg-[var(--themeColor)]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="relative w-32 h-32 rounded-full object-cover border-2 border-[var(--themeColor)]"
                  />
                  <button className="absolute bottom-2 right-2 bg-[var(--themeColor)] text-black p-2 rounded-full hover:bg-yellow-600 transition-all">
                    <FiEdit size={16} />
                  </button>
                </div>

                <h2 className="text-xl font-bold text-center">{user.name}</h2>
                <div className="flex items-center mt-1 text-[var(--themeColor)]">
                  <FiShield size={14} className="mr-1" />
                  <span className="text-sm">{user.membership} Member</span>
                </div>

                {/* Verification Badge */}
                {user.idVerified && (
                  <div className="mt-3 flex items-center bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-xs">
                    <HiOutlineIdentification size={14} className="mr-1" />
                    ID Verified
                  </div>
                )}

                {/* Account Balance */}
                <div className="mt-6 w-full bg-[#1a1a1a] rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center text-gray-400 text-sm mb-1">
                    <HiOutlineCurrencyDollar size={16} className="mr-1" />
                    Account Balance
                  </div>
                  <div className="text-2xl font-bold text-[var(--themeColor)]">{user.balance}</div>
                </div>

                {/* Packages Summary */}
                <div className="mt-6 w-full">
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">YOUR PACKAGES</h3>
                  <div className="space-y-2">
                    {user.packages.map((pkg, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>{pkg.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          pkg.status === 'Active' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                        }`}>
                          {pkg.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2">
            <div className="bg-[#272727] rounded-2xl border border-white/10 p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Personal Information</h2>
                <button className="flex items-center text-[var(--themeColor)] hover:text-yellow-600 text-sm">
                  <FiEdit size={16} className="mr-1" />
                  Edit Profile
                </button>
              </div>

              {/* Personal Info Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Info Item */}
                <div className="flex items-start">
                  <div className="bg-[#1a1a1a] p-3 rounded-lg mr-4">
                    <FiUser size={18} className="text-[var(--themeColor)]" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-400">Full Name</h3>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>

                {/* Info Item */}
                <div className="flex items-start">
                  <div className="bg-[#1a1a1a] p-3 rounded-lg mr-4">
                    <FiMail size={18} className="text-[var(--themeColor)]" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-400">Email Address</h3>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>

                {/* Info Item */}
                <div className="flex items-start">
                  <div className="bg-[#1a1a1a] p-3 rounded-lg mr-4">
                    <FiPhone size={18} className="text-[var(--themeColor)]" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-400">Phone Number</h3>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>

                {/* Info Item */}
                <div className="flex items-start">
                  <div className="bg-[#1a1a1a] p-3 rounded-lg mr-4">
                    <FiMapPin size={18} className="text-[var(--themeColor)]" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-400">Address</h3>
                    <p className="font-medium">{user.address}</p>
                  </div>
                </div>

                {/* Info Item */}
                <div className="flex items-start">
                  <div className="bg-[#1a1a1a] p-3 rounded-lg mr-4">
                    <FiCalendar size={18} className="text-[var(--themeColor)]" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-400">Member Since</h3>
                    <p className="font-medium">{user.joinDate}</p>
                  </div>
                </div>

                {/* Info Item */}
                <div className="flex items-start">
                  <div className="bg-[#1a1a1a] p-3 rounded-lg mr-4">
                    <FiShield size={18} className="text-[var(--themeColor)]" />
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-400">Account Status</h3>
                    <p className="font-medium text-green-400">Active</p>
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="mt-10">
                <h2 className="text-xl font-bold mb-6">Security</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-[#1a1a1a] rounded-lg">
                    <div className="flex items-center">
                      <FiShield size={20} className="text-[var(--themeColor)] mr-3" />
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-400">Add an extra layer of security</p>
                      </div>
                    </div>
                    <button className="text-[var(--themeColor)] hover:text-yellow-600 text-sm font-medium">
                      Enable
                    </button>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-[#1a1a1a] rounded-lg">
                    <div className="flex items-center">
                      <FiMail size={20} className="text-[var(--themeColor)] mr-3" />
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-400">Manage email preferences</p>
                      </div>
                    </div>
                    <button className="text-[var(--themeColor)] hover:text-yellow-600 text-sm font-medium">
                      Configure
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}