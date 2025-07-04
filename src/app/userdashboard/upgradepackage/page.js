// "use client";

// import React, { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/upgradeplan/card";
// import { Button } from "@/components/upgradeplan/button";
// import { HiBadgeCheck } from "react-icons/hi";
// import { FiArrowUpRight } from "react-icons/fi";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// export default function UpgradePlanPage() {
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [allPackages, setAllPackages] = useState([]);
//   const [clientId, setClientId] = useState(null);
//   // Fetch all packages from API
//   useEffect(() => {
//     const fetchPackage = async () => {
//       try {
//         const response = await axios.get("/api/user/get-package");
//         console.log(response.data, "response data");
//         if (response.status === 200) {
//           setAllPackages(response.data.packages);
//         } else {
//           console.error("Failed to fetch current package");
//         }
//       } catch (err) {
//         console.error("API error:", err);
//       }
//     };
//     fetchPackage();
//     const token = localStorage.getItem("authToken");
//     if (!token) {
//       console.warn("No authToken found in localStorage.");
//       return null;
//     }
//     // console.log(token);
//     const decodedToken = jwtDecode(token);
//     // console.log(decodedToken, "decodedToken");
//     setClientId(decodedToken?.id);
//     console.log(decodedToken?.id, "decodedid");
//     const fetchBoughtData = async () => {
//       if (!decodedToken?.id) {
//         console.error("Client ID not found");
//         return;
//       }

//       try {
//         const res = await fetch("/api/user/getUserBoughtDetail", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${decodedToken.id}`,
//           },
//         });

//         const data = await res.json();
//         if (res.ok) {
//           console.log("User Orders:", data.data);
//         } else {
//           console.error("Error fetching user data:", data.error);
//         }
//       } catch (error) {
//         console.log("Network or server error:", error);
//       }
//     };

//     fetchBoughtData();
//   }, []);

//   // Helper to get image based on amount
//   const getImageByAmount = (amount) => {
//     const numericAmount = Number(amount); // convert string to number
//     switch (numericAmount) {
//       case 100:
//         return "/shield-pic2.png";
//       case 200:
//         return "/shield-pic3.png";
//       case 500:
//         return "/shield-pic4.png";
//       case 1000:
//         return "/shield-pic5.png";
//       case 3000:
//         return "/shield-pic6.png";
//       case 5000:
//         return "/shield-pic8.png";
//       default:
//         return "/default-package.png";
//     }
//   };

//   // Helper to get background color based on name
//   const getColorByPackage = (name) => {
//     switch (name.toLowerCase()) {
//       case "toddler":
//         return "bg-red-600";
//       case "analytical":
//         return "bg-olive-600";
//       case "professional":
//         return "bg-slate-600";
//       case "business":
//         return "bg-green-600";
//       case "trading":
//         return "bg-black";
//       case "mining":
//         return "bg-blue-600";
//       default:
//         return "bg-yellow-600"; // fallback color
//     }
//   };

//   // When user selects a package
//   const handleSelect = (pkg) => {
//     const image = getImageByAmount(pkg.packageAmount);
//     const price = `${pkg.packageAmount}€`;
//     const daily = `${pkg.packageDailyPercentage}%`;

//     setSelectedPackage({
//       ...pkg,
//       image,
//       price,
//       daily,
//       title: pkg.packageName,
//     });
//   };

//   const BuyPackage = async (pkg) => {
//     try {
//       const response = await axios.post("/api/user/buy-package", {
//         userId: clientId,
//         packageId: pkg._id,
//         packageName: pkg.packageName,
//         packageAmount: pkg.packageAmount,
//         packageDailyPercentage: pkg.packageDailyPercentage,
//       });
//       if (response.status === 201) {
//         console.log("Package purchased successfully:", response.data);
//         alert("Package purchased successfully!");
//       } else {
//         console.error("Failed to purchase package");
//       }
//     } catch (err) {
//       console.error("API error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#1E1E1E] via-[#2A2A2A] to-[#1E1E1E] text-white px-4 py-10">
//       <h1 className="text-3xl font-bold text-center mb-10">
//         Upgrade Your Plan
//       </h1>

//       {/* Selected Package Card */}
//       {selectedPackage && (
//         <div className="max-w-md mx-auto mb-8">
//           <Card className="bg-gradient-to-r from-yellow-700 to-[#FDC700] text-black shadow-xl">
//             <CardContent className="flex flex-col items-center gap-2 py-6">
//               <img
//                 src={selectedPackage.image || "/default-package.png"}
//                 alt={selectedPackage.title || "Selected Package"}
//                 className="w-36 h-36 mb-3 rounded-md"
//               />
//               <HiBadgeCheck size={24} className="text-green-800" />
//               <h2 className="text-xl font-bold">Current Package</h2>
//               <p className="text-2xl font-extrabold">{selectedPackage.price}</p>
//               <p className="italic text-sm">{selectedPackage.title}</p>
//               <p className="text-sm">Up to {selectedPackage.daily} daily</p>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* All Packages Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
//         {allPackages.map((pkg, index) => {
//           const imageSrc = getImageByAmount(pkg.packageAmount);
//           const color = getColorByPackage(pkg.packageName);

//           return (
//             <Card
//               key={index}
//               className="bg-gradient-to-b from-[#272727] to-[#272727] border border-yellow-500 shadow-lg"
//             >
//               <CardContent className="flex flex-col items-center text-center py-6">
//                 <div
//                   className={`px-3 py-1 text-sm font-semibold rounded-full text-white mb-3 ${color}`}
//                 >
//                   {pkg.packageName}
//                 </div>

//                 <img
//                   src={imageSrc}
//                   alt={pkg.packageName}
//                   className="w-36 h-36 object-contain mb-3 rounded-md"
//                 />

//                 <p className="text-sm text-gray-300">
//                   Up to {pkg.packageDailyPercentage}% daily
//                 </p>

//                 <Button
//                   className="mt-4 w-3/5 h-12"
//                   // onClick={() => handleSelect(pkg)}
//                   onClick={() => {
//                     // handleSelect(pkg);
//                     BuyPackage(pkg);
//                   }}
//                 >
//                   Upgrade to {pkg.packageName}
//                 </Button>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       {/* Confirm Button */}
//       <div className="flex justify-center">
//         <Button
//           variant="secondary"
//           className="text-black font-semibold px-6 py-3 flex items-center gap-2"
//         >
//           Confirm Upgrade <FiArrowUpRight size={18} />
//         </Button>
//       </div>
//     </div>
//   );
// }
