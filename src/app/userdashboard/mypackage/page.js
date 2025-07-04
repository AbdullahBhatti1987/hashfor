// "use client";
// import { jwtDecode } from "jwt-decode";
// import React, { useEffect, useState } from "react";
// import { FiArrowUpRight } from "react-icons/fi";

// export default function MyPackagesPage() {
//   const [clientId, setClientId] = useState("");
//   const [boughtData, setBoughtData] = useState("");
//   useEffect(() => {
//     const fetchBoughtData = async (userId) => {
//       try {
//         const res = await fetch("/api/user/getUserBoughtDetail", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${userId}`,
//           },
//         });
//         const data = await res.json();
//         console.log("User Bought Data:", data.data);
//         const bought = data.data;

//         if (res.ok) {
//           setBoughtData(bought);
//         } else {
//           console.error("Error fetching user data:", data.error);
//         }
//       } catch (error) {
//         console.log("Network or server error:", error);
//       }
//     };
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       console.log(decodedToken, "decodedToken");
//       setClientId(decodedToken?.id);
//       // setCode(decodedToken?.code);
//       // setReferralCode(decodedToken?.referralCode);
//       fetchBoughtData(decodedToken?.id);
//     }
//   }, []);

//   const myPackages = [
//     {
//       _id: "1",
//       packageName: "Professional",
//       packageAmount: "500",
//       packageDailyPercentage: "5",
//       purchaseDate: "2023-05-15",
//       expiryDate: "2023-11-15",
//       status: "Active",
//     },
//     {
//       _id: "2",
//       packageName: "Trading",
//       packageAmount: "200",
//       packageDailyPercentage: "3",
//       purchaseDate: "2023-06-20",
//       expiryDate: "2023-12-20",
//       status: "Active",
//     },
//     {
//       _id: "3",
//       packageName: "Basic",
//       packageAmount: "50",
//       packageDailyPercentage: "1",
//       purchaseDate: "2023-01-10",
//       expiryDate: "2023-07-10",
//       status: "Complete",
//     },
//   ];

//   const getImageByAmount = (amount) => {
//     const numericAmount = Number(amount);
//     switch (numericAmount) {
//       case 50:
//         return "/image-4.jpeg";
//       case 100:
//         return "/image-1.png";
//       case 200:
//         return "/image-2.jpeg";
//       case 500:
//         return "/image-3.jpeg";
//       case 1000:
//         return "/image-5.jpeg";
//       case 3000:
//         return "/image-6.jpeg";
//       case 5000:
//         return "/image-7.jpeg";
//       case 10000:
//         return "/image-8.jpeg";
//       default:
//         return "/default-package.png";
//     }
//   };

//   const getColorByPackage = (name) => {
//     switch (name.toLowerCase()) {
//       case "basic":
//         return "bg-[#A53168]";
//       case "apprentice":
//         return "bg-red-500";
//       case "trading":
//         return "bg-yellow-600";
//       case "blockchain":
//         return "bg-gray-600";
//       case "professional":
//         return "bg-green-600";
//       case "mining":
//         return "bg-black";
//       case "forex":
//         return "bg-blue-600";
//       case "robotics":
//         return "bg-[#6E2B8A]";
//       default:
//         return "bg-yellow-600";
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case "active":
//         return "bg-green-500";
//       case "expired":
//         return "bg-red-500";
//       case "pending":
//         return "bg-yellow-500";
//       default:
//         return "bg-gray-500";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black text-white px-4 py-8">
//       <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
//         My Packages
//       </h1>

//       {boughtData.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-gray-400 mb-4">
//             You haven&apos;t purchased any packages yet
//           </p>
//           <button className="bg-[var(--themeColor)] text-black font-semibold px-5 py-2 rounded-full flex items-center gap-2 mx-auto shadow-md hover:bg-yellow-600 transition-all duration-300">
//             Browse Packages <FiArrowUpRight size={16} />
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
//           {myPackages.map((pkg, index) => {
//             const imageSrc = getImageByAmount(pkg.packageAmount);
//             const color = getColorByPackage(pkg.packageName);
//             const statusColor = getStatusColor(pkg.status);

//             return (
//               <div key={index} className="relative flex-1 group">
//                 {/* Gradient Halo Effect */}
//                 <div
//                   className={`absolute inset-0 -top-3 -left-3 w-full h-full rounded-2xl blur-xl z-0 bg-gradient-to-br from-[var(--themeColor)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
//                 />

//                 {/* Card Container */}
//                 <div
//                   className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#272727] border border-white/10 shadow-lg transition-all duration-300 hover:border-[var(--themeColor)]/30 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)]`}
//                 >
//                   {/* Package Name and Status */}
//                   <div className="flex justify-between items-center w-full mb-2">
//                     {/* <div className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${color}`}>
//                       {pkg.packageName}
//                     </div> */}
//                     <div
//                       className={`px-2 py-1 text-xs rounded-full text-white ${statusColor}`}
//                     >
//                       {pkg.status}
//                     </div>
//                   </div>

//                   {/* Shield Image */}
//                   <div className="relative">
//                     <div
//                       className={`absolute inset-0 rounded-lg flex items-center justify-center ${
//                         pkg.status === "Expired"
//                           ? "bg-gray-500/20"
//                           : "bg-[var(--themeColor)]/20"
//                       } blur-sm`}
//                     />
//                     <img
//                       src={imageSrc}
//                       alt={pkg.packageName}
//                       className="relative h-40 w-40 object-contain rounded-lg"
//                     />
//                   </div>

//                   {/* Package Details */}
//                   <div className="flex flex-col items-center justify-center space-y-2 w-full">
//                     <div className="text-center">
//                       <p className="text-xl font-extrabold text-[var(--themeColor)]">
//                         ${pkg.packageAmount}€
//                       </p>
//                       <p className="text-xs text-gray-300">
//                         Up to {pkg.packageDailyPercentage}% daily
//                       </p>
//                     </div>

//                     <div className="w-full border-t border-white/10 pt-3 mt-2">
//                       <div className="flex justify-between text-xs text-gray-400">
//                         <span>Buy:</span>
//                         <span>{pkg.purchaseDate}</span>
//                       </div>
//                       <div className="flex justify-between text-xs text-gray-400 mt-1">
//                         <span>Completes:</span>
//                         <span>{pkg.expiryDate}</span>
//                       </div>
//                     </div>

//                     <button
//                       className={`mt-3 w-full max-w-[130px] h-8 rounded-full font-bold text-xs shadow-md transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis px-2 ${
//                         pkg.status === "Complete"
//                           ? "bg-gray-500 text-yellow-600 border border-yellow-600 cursor-not-allowed"
//                           : "bg-[var(--themeColor)] hover:bg-yellow-600 text-black transform group-hover:scale-105"
//                       }`}
//                       disabled={pkg.status === "Expired"}
//                       title={
//                         pkg.status === "Expired"
//                           ? "Package Expired"
//                           : "View Details"
//                       }
//                     >
//                       {pkg.status === "Expired" ? "Expired" : "View Details"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
export default function MyPackagesPage() {
  const [clientId, setClientId] = useState("");
  const [boughtData, setBoughtData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // const fetchBoughtData = async (userId) => {
    //   try {
    //     const res = await fetch("/api/user/getUserBoughtDetail", {
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${userId}`,
    //       },
    //     });
    //     const data = await res.json();
    //     console.log("User Bought Data:", data.data);
    //     if (res.ok) {
    //       setBoughtData(data.data);
    //     } else {
    //       console.error("Error fetching user data:", data.error);
    //     }
    //   } catch (error) {
    //     console.log("Network or server error:", error);
    //   }
    // };
    const fetchBoughtData = async (userId) => {
      try {
        const res = await axios.get("/api/user/getUserBoughtDetail", {
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        });

        console.log("User Bought Data:", res.data.data);
        setBoughtData(res.data.data);
      } catch (error) {
        if (error.response) {
          console.error(
            "Error fetching user data:",
            error.response.data?.error || error.message
          );
        } else {
          console.log("Network or server error:", error.message);
        }
      }
    };
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setClientId(decodedToken?.id);
      fetchBoughtData(decodedToken?.id);
    }
  }, []);

  const getImageByAmount = (amount) => {
    const numericAmount = Number(amount);
    switch (numericAmount) {
      case 50:
        return "/image-4.jpeg";
      case 100:
        return "/image-1.png";
      case 200:
        return "/image-2.jpeg";
      case 500:
        return "/image-3.jpeg";
      case 1000:
        return "/image-5.jpeg";
      case 3000:
        return "/image-6.jpeg";
      case 5000:
        return "/image-7.jpeg";
      case 10000:
        return "/image-8.jpeg";
      default:
        return "/default-package.png";
    }
  };

  const getColorByPackage = (name) => {
    switch (name.toLowerCase()) {
      case "basic":
        return "bg-[#A53168]";
      case "apprentice":
        return "bg-red-500";
      case "trading":
        return "bg-yellow-600";
      case "blockchain":
        return "bg-gray-600";
      case "professional":
        return "bg-green-600";
      case "mining":
        return "bg-black";
      case "forex":
        return "bg-blue-600";
      case "robotics":
        return "bg-[#6E2B8A]";
      default:
        return "bg-yellow-600";
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500";
      case "expired":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleBrowsePackages = () => {
    router.push("/userdashboard/buypackage");
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-[var(--themeColor)] text-center mb-8">
        My Packages
      </h1>

      {boughtData.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">
            You haven&apos;t purchased any packages yet
          </p>
          <button
            onClick={handleBrowsePackages}
            className="bg-[var(--themeColor)] text-black font-semibold px-5 py-2 rounded-full flex items-center gap-2 mx-auto shadow-md hover:bg-yellow-600 transition-all duration-300"
          >
            Browse Packages <FiArrowUpRight size={16} />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {boughtData.map((pkg, index) => {
            const imageSrc = getImageByAmount(pkg.packageAmount);
            const color = getColorByPackage(pkg.packageName);
            const status = "Active"; // You can add logic to check expiry
            const statusColor = getStatusColor(status);

            const createdAt = new Date(pkg.createdAt);
            const purchaseDate = createdAt.toISOString().split("T")[0];
            const expiryDate = new Date(
              createdAt.setMonth(createdAt.getMonth() + 6)
            )
              .toISOString()
              .split("T")[0];

            return (
              <div key={index} className="relative flex-1 group">
                <div
                  className={`absolute inset-0 -top-3 -left-3 w-full h-full rounded-2xl blur-xl z-0 bg-gradient-to-br from-[var(--themeColor)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div
                  className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#272727] border border-white/10 shadow-lg transition-all duration-300 hover:border-[var(--themeColor)]/30 hover:shadow-[0_0_15px_rgba(255,215,0,0.2)]`}
                >
                  <div className="flex justify-between items-center w-full mb-2">
                    <div
                      className={`px-2 py-1 text-xs rounded-full text-white ${statusColor}`}
                    >
                      {status}
                    </div>
                  </div>

                  <div className="relative">
                    <div
                      className={`absolute inset-0 rounded-lg flex items-center justify-center ${
                        status === "Expired"
                          ? "bg-gray-500/20"
                          : "bg-[var(--themeColor)]/20"
                      } blur-sm`}
                    />
                    <img
                      src={imageSrc}
                      alt={pkg.packageName}
                      className="relative h-40 w-40 object-contain rounded-lg"
                    />
                  </div>

                  <div className="flex flex-col items-center justify-center space-y-2 w-full">
                    <div className="text-center">
                      <p className="text-xl font-extrabold text-[var(--themeColor)]">
                        ${pkg.packageAmount}
                      </p>
                      <p className="text-xs text-gray-300">
                        Up to {pkg.packageDailyPercentage}% daily
                      </p>
                      <p className="text-xs text-green-400 mt-1">
                        Earned: ${pkg.totalEarning || 0}
                      </p>
                    </div>

                    <div className="w-full border-t border-white/10 pt-3 mt-2">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Buy:</span>
                        <span>{purchaseDate}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Completes:</span>
                        <span>
                          {new Date(pkg.expiryDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* <button
                      className={`mt-3 w-full max-w-[130px] h-8 rounded-full font-bold text-xs shadow-md transition-all duration-300 whitespace-nowrap overflow-hidden text-ellipsis px-2 ${
                        status === "Expired"
                          ? "bg-gray-500 text-yellow-600 border border-yellow-600 cursor-not-allowed"
                          : "bg-[var(--themeColor)] hover:bg-yellow-600 text-black transform group-hover:scale-105"
                      }`}
                      disabled={status === "Expired"}
                      title={
                        status === "Expired"
                          ? "Package Expired"
                          : "View Details"
                      }
                    >
                      {status === "Expired" ? "Expired" : "View Details"}
                    </button> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
