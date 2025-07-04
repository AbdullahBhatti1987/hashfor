// "use client";
// import React, { useEffect, useState } from "react";

// export default function UsersPage() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch("/api/user/getAllUsers");
//         const data = await res.json();

//         if (res.ok && data.success) {
//           setUsers(data.users);
//           console.log("users", data.users);
//         } else {
//           throw new Error(data.message || "Failed to fetch users");
//         }
//       } catch (err) {
//         console.error("❌ Error fetching users:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const filteredUsers = users.filter((user) => user.role === "user");

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-black">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-black">
//         <div className="text-red-500 text-xl">Error: {error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-black px-4 py-6">
//       {/* Top Bar */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-[var(--themeColor)] text-4xl font-bold">All Users</h1>
//         <span className="text-white text-2xl font-medium">
//           Total Users : <span className="text-[var(--themeColor)]">{filteredUsers.length}</span>
//         </span>
//       </div>

//       {/* Table */}
//       <div className="bg-[#272727] rounded-lg shadow overflow-x-auto">
//         <div className="inline-block min-w-full align-middle">
//           <div className="overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-600">
//               <thead className="bg-[#1f1f1f]">
//                 <tr>
//                   {[
//                     "S.No",
//                     "Code",
//                     "Name",
//                     "Email",
//                     "Contact",
//                     "Role",
//                     "Created",
//                   ].map((header) => (
//                     <th
//                       key={header}
//                       className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap"
//                     >
//                       {header}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-700">
//                 {filteredUsers.map((user, index) => (
//                   <tr key={user._id} className="hover:bg-[#1a1a1a]">
//                     <td className="px-3 py-2 text-sm text-gray-300 truncate max-w-[80px]">
//                       {index + 1}
//                     </td>
//                     <td className="px-3 py-2 text-sm text-gray-300 truncate max-w-[80px]">
//                       {user.code || "N/A"}
//                     </td>
//                     <td className="px-3 py-2 text-sm font-medium text-white truncate max-w-[100px]">
//                       {user.name || "N/A"}
//                     </td>
//                     <td className="px-3 py-2 text-sm text-gray-300 truncate max-w-[120px]">
//                       {user.email}
//                     </td>
//                     <td className="px-3 py-2 text-sm text-gray-300">
//                       {user.contactNo || "N/A"}
//                     </td>
//                     <td className="px-3 py-2">
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                           user.role === "admin"
//                             ? "bg-purple-100 text-purple-800"
//                             : "bg-blue-100 text-blue-800"
//                         }`}
//                       >
//                         {user.role}
//                       </span>
//                     </td>
//                     <td className="px-3 py-2 text-sm text-gray-300">
//                       {new Date(user.createdAt).toLocaleDateString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// ...same imports as before

// "use client";
// import React, { useEffect, useState } from "react";
// import { FaThList, FaThLarge, FaSortUp, FaSortDown } from "react-icons/fa";
// import { FiUsers } from "react-icons/fi";

// export default function UsersPage() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [view, setView] = useState("card");
//   const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch("/api/user/getAllUsers");
//         const data = await res.json();
//         if (res.ok && data.success) setUsers(data.users);
//         else throw new Error(data.message || "Failed to fetch users");
//       } catch (err) {
//         console.error("❌ Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const filteredUsers = users.filter((user) => user.role === "user");

//   const sortedUsers = [...filteredUsers].sort((a, b) => {
//     if (!sortConfig.key) return 0;
//     let aVal = a[sortConfig.key];
//     let bVal = b[sortConfig.key];
//     if (sortConfig.key === "createdAt") {
//       aVal = new Date(aVal).getTime();
//       bVal = new Date(bVal).getTime();
//     }
//     if (sortConfig.direction === "asc") return aVal > bVal ? 1 : -1;
//     return aVal < bVal ? 1 : -1;
//   });

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-black">
//         {/* <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500" /> */}
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 sm:p-6 bg-black min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8">
//           <h1 className="text-xl sm:text-2xl font-bold text-[var(--themeColor)]">
//             All Users
//           </h1>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
//           <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
//             <h3 className="text-xs sm:text-sm font-medium text-gray-400">
//               Total Users
//             </h3>
//             <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-500 mt-1">
//               {filteredUsers.length}
//             </p>
//           </div>
//         </div>

"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaThList, FaThLarge, FaSortUp, FaSortDown } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

useEffect(() => {
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/user/getAllUsers");
      const data = res.data;

      if (data) setUsers(data.users);
      else throw new Error(data.message || "Failed to fetch users");
    } catch (err) {
      alert("❌ Error: " + (err?.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);

  const filteredUsers = users.filter((user) => user.role === "user");
  const verifiedUsers = filteredUsers.filter((user) => user.isVerified);
  const unverifiedUsers = filteredUsers.filter((user) => !user.isVerified);
  const uniqueReferralCodes = [
    ...new Set(filteredUsers.map((u) => u.referralCode).filter(Boolean)),
  ];
  const lastCreatedDate = filteredUsers.length
    ? new Date(
        Math.max(...filteredUsers.map((u) => new Date(u.createdAt)))
      ).toLocaleDateString()
    : "-";

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig.key) return 0;
    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];
    if (sortConfig.key === "createdAt") {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }
    if (sortConfig.direction === "asc") return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--themeColor)]">
            All Users
          </h1>
        </div>

        {/* Top 4 Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-4">
          <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
            <h3 className="text-xs sm:text-sm font-medium text-gray-400">
              Verified Users
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-500 mt-1">
              {verifiedUsers.length}
            </p>
          </div>
          <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
            <h3 className="text-xs sm:text-sm font-medium text-gray-400">
              Inactive Users
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-500 mt-1">
              {unverifiedUsers.length}
            </p>
          </div>
          <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
            <h3 className="text-xs sm:text-sm font-medium text-gray-400">
              Unique Referrals
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-400 mt-1">
              {uniqueReferralCodes.length}
            </p>
          </div>
          <div className="bg-[#272727] p-3 sm:p-4 rounded-lg border border-gray-700">
            <h3 className="text-xs sm:text-sm font-medium text-gray-400">
              Last User Created
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-400 mt-1">
              {lastCreatedDate}
            </p>
          </div>
        </div>

        {/* View Toggle Buttons (Card/List) */}
        {/* ...Keep rest of the component unchanged */}

        {/* View Toggle */}
        {/* <div className="flex gap-2 mb-4 justify-end mt-2">
          <button
            className={`flex items-center px-3 py-1 rounded-md border text-sm font-medium transition-colors ${view === "list"
              ? "bg-yellow-500 text-white border-yellow-500"
              : "bg-gray-800 text-gray-300 border-gray-700"
              }`}
            onClick={() => setView("list")}
          >
            <FaThList className="mr-1" /> List
          </button>
          <button
            className={`flex items-center px-3 py-1 rounded-md border text-sm font-medium transition-colors ${view === "card"
              ? "bg-yellow-500 text-white border-yellow-500"
              : "bg-gray-800 text-gray-300 border-gray-700"
              }`}
            onClick={() => setView("card")}
          >
            <FaThLarge className="mr-1" /> Card
          </button>
        </div> */}

        {/* Card View */}
        {/* {view === "card" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="bg-[#272727] rounded-lg border border-gray-700 p-4 flex flex-col shadow hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-2">
                  <FiUsers className="text-lg text-indigo-500 mr-2" />
                  <span className="text-base font-semibold text-white">
                    {user.name || "N/A"}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mb-1">
                  Email: <span className="text-white">{user.email}</span>
                </div>
                <div className="text-xs text-gray-400 mb-1">
                  Code: <span className="text-white">{user.code || "N/A"}</span>
                </div>
                <div className="text-xs text-gray-400 mb-1">
                  Referral Code:{" "}
                  <span className="text-white">
                    {user.referralCode || "N/A"}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mb-1">
                  Contact: <span className="text-white">{user.contactNo || "N/A"}</span>
                </div>
                <div className="text-xs text-gray-400 mb-1">
                  Created:{" "}
                  <span className="text-white">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )} */}

        {/* List/Table View */}
        {view === "list" && (
          <div className="bg-[#272727] rounded-lg border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    {[
                      { key: "code", label: "Code" },
                      { key: "name", label: "Name" },
                      { key: "email", label: "Email" },
                      { key: "referralCode", label: "Referral" },
                      { key: "contactNo", label: "Contact" },
                      { key: "createdAt", label: "Created" },
                    ].map(({ key, label }) => (
                      <th
                        key={key}
                        onClick={() =>
                          setSortConfig({
                            key,
                            direction:
                              sortConfig.key === key &&
                              sortConfig.direction === "asc"
                                ? "desc"
                                : "asc",
                          })
                        }
                        className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer select-none"
                      >
                        <span className="flex items-center justify-between">
                          {label}
                          <span className="ml-1">
                            <FaSortUp
                              className={
                                sortConfig.key === key &&
                                sortConfig.direction === "asc"
                                  ? "text-indigo-400"
                                  : "text-gray-500"
                              }
                            />
                            <FaSortDown
                              className={
                                sortConfig.key === key &&
                                sortConfig.direction === "desc"
                                  ? "text-indigo-400"
                                  : "text-gray-500"
                              }
                            />
                          </span>
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-[#272727] divide-y divide-gray-700">
                  {sortedUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-800">
                      <td className="px-3 py-3 text-sm font-medium text-white">
                        {user.code || "N/A"}
                      </td>
                      <td className="px-3 py-3 text-sm font-medium text-white">
                        {user.name || "N/A"}
                      </td>
                      <td className="px-3 py-3 text-sm font-medium text-white">
                        {user.email}
                      </td>
                      <td className="px-3 py-3 text-sm font-medium text-white">
                        {user.referralCode || "N/A"}
                      </td>
                      <td className="px-3 py-3 text-sm font-medium text-white">
                        {user.contactNo || "N/A"}
                      </td>
                      <td className="px-3 py-3 text-sm font-medium text-white">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {sortedUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-6 text-center text-gray-400 text-sm"
                      >
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
