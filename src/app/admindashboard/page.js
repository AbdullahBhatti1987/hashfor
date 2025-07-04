// // components/AdminDashboard.js
// "use client";

// import React, { useState } from "react";

// const Sidebar = ({ collapsed, toggleSidebar }) => {
//   const menuItems = [
//     { name: "Dashboard", icon: "📊" },
//     { name: "Users", icon: "👥" },
//     { name: "Referrals", icon: "🔗" },
//     { name: "Commissions", icon: "💸" },
//     { name: "Rewards", icon: "🎁" },
//     { name: "Reports", icon: "📄" },
//     { name: "Chat", icon: "💬" },
//   ];

//   return (
//     <div
//       className={`${
//         collapsed ? "w-16" : "w-48"
//       } bg-gray-800 text-white min-h-screen transition-all duration-300`}
//     >
//       <div className="flex justify-between items-center px-4 py-2">
//         <span className="text-lg font-bold">
//           {collapsed ? "📚" : "EduAdmin"}
//         </span>
//         <button onClick={toggleSidebar}>{collapsed ? "➡" : "⬅"}</button>
//       </div>
//       <ul className="space-y-2 mt-4">
//         {menuItems.map((item) => (
//           <li
//             key={item.name}
//             className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-700 cursor-pointer"
//           >
//             <span>{item.icon}</span>
//             {!collapsed && <span>{item.name}</span>}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <div className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
//       <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
//       <div className="relative">
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="w-10 h-10 rounded-full bg-yellow-500 text-white font-bold"
//         >
//           A
//         </button>
//         {menuOpen && (
//           <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md z-10 p-2 space-y-2">
//             <div className="border-b pb-3">
//               <div className="font-semibold text-gray-800">John Doe</div>
//               <div className="text-sm text-gray-500">john.doe@example.com</div>
//             </div>
//             <button className="block w-full text-left text-red-600 hover:bg-gray-100 px-2 py-2 rounded-md">
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const Card = ({ title, value }) => (
//   <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-start w-48">
//     <p className="text-sm text-gray-500">{title}</p>
//     <h2 className="text-2xl font-bold text-yellow-600">{value}</h2>
//   </div>
// );

// const ChartPlaceholder = ({ title }) => (
//   <div className="bg-white shadow-md rounded-xl p-4 h-64 w-full animate-pulse">
//     <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
//     <div className="h-full bg-gray-200 rounded-md"></div>
//   </div>
// );

// const AdminDashboard = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   return (
//     <div className="flex">
//       <Sidebar
//         collapsed={collapsed}
//         toggleSidebar={() => setCollapsed(!collapsed)}
//       />
//       <div className="flex-1 min-h-screen bg-gray-50">
//         <Header />
//         <div className="p-6 space-y-6">
//           {/* Top Cards */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <Card title="Total Users" value="1523" />
//             <Card title="Total Referrals" value="1203" />
//             <Card title="Pending Rewards" value="15" />
//             <Card title="Commission Paid" value="$23,560" />
//           </div>

//           {/* Charts Section */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="md:col-span-2">
//               <ChartPlaceholder title="User Package Purchases & Upgrades" />
//             </div>
//             <ChartPlaceholder title="Reward Requests by Category" />
//           </div>

//           {/* Additional Charts */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <ChartPlaceholder title="Referral Trends" />
//             <ChartPlaceholder title="Commission Distribution" />
//             <ChartPlaceholder title="Points Redeemed" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

"use client";
import AdminHoverDevCards from "@/components/admindashboard";
import AdminProductValuationChart from "@/components/admindashboard/chartone";
import dynamic from "next/dynamic";
import AdminTransactionHistory from "@/components/admindashboard/tableone";
import AdminSalesPerformanceCard from "@/components/admindashboard/chartThree";

const AdminPerformanceChart = dynamic(() => import("@/components/admindashboard/chartTwo"), {
  ssr: false,
});

function Userdash() {
  return (
    <>
      <div className="p-2 sm:p-3 bg-black flex flex-col gap-3 sm:gap-3">
         <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--themeColor)]">
              Admin Dashboard
            </h1>
            {/* <p className="text-gray-400 mt-1">
              Request withdrawal of your earnings.
            </p> */}
          </div>
        <div className="w-full">
          <AdminHoverDevCards />
        </div>

        <div className="flex flex-col lg:flex-row gap-3 w-full">
          <div className="w-full md:w-[100%] lg:w-[60%] xl:w-[65%]">
            <AdminPerformanceChart />
          </div>
          <div className="w-full md:w-[100%] lg:w-[40%] xl:w-[35%]">
            <AdminProductValuationChart />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 xs:gap-3 w-full h-full overflow-hidden">
           <div className="w-full md:w-[45%] lg:w-[40%] h-full">
            <AdminSalesPerformanceCard />
          </div>
          <div className="w-full md:w-[55%] lg:w-[60%] h-full">
            <AdminTransactionHistory />
          </div>
        </div>

       
      </div>
    </>
  );
}

export default Userdash;
