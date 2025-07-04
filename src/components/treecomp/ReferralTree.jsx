// // // // export default ReferralTree;
// // // "use client";
// // // import React, { useState, useEffect, useMemo } from "react";
// // // import Xarrow from "react-xarrows";
// // // import { users } from "@/content/data";
// // // import UserInTree from "./UserinTree";
// // // // import axios from "axios";

// // // const ReferralTree = () => {
// // //   const [rootId, setRootId] = useState(150001);
// // //   const [steps, setSteps] = useState(3);
// // //   const [paginationIndex, setPaginationIndex] = useState(0);
// // //   const [navigationPath, setNavigationPath] = useState([150001]);
// // //   const [renderArrows, setRenderArrows] = useState(false);

// // // //   const [users, setUsers] = useState([]);

// // // // useEffect(() => {
// // // //   const fetchUsers = async () => {
// // // //     try {
// // // //       const res = await axios.get("http://localhost:3000/api/user/getAllUsers");
// // // //       const data = res.data;
// // // //       console.log("Fetched users:", data);

// // // //       if (data && Array.isArray(data.users)) {
// // // //         setUsers(data.users); // ✅ use `data.users`
// // // //       } else {
// // // //         console.error("Invalid data format:", data);
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("Error fetching users:", err.message);
// // // //     }
// // // //   };

// // // //   fetchUsers();
// // // // }, []);

// // //   const childrenMap = useMemo(() => {
// // //     const map = new Map();
// // //     users.forEach((user) => {
// // //       if (!map.has(user.code)) {
// // //         map.set(user.code, []);
// // //       }
// // //       map.get(user.code).push(user);
// // //     });
// // //     return map;
// // //   }, [users]);

// // //   const handleUserClick = (id) => {
// // //     setRootId(id);
// // //     setNavigationPath((prev) => [...prev, id]);
// // //     setPaginationIndex(0);
// // //   };

// // //   const goToParent = () => {
// // //     if (navigationPath.length > 1) {
// // //       const newPath = [...navigationPath];
// // //       newPath.pop();
// // //       setNavigationPath(newPath);
// // //       setRootId(newPath[newPath.length - 1]);
// // //     }
// // //   };

// // //   const goToFirstChild = () => {
// // //     const firstChild = childrenMap.get(rootId)?.[0];
// // //     if (firstChild) handleUserClick(firstChild.id);
// // //   };

// // //   const buildTreeAndConnections = (id, depth, connections = []) => {
// // //     if (depth === 0 || !childrenMap.has(id)) return [];

// // //     const children = childrenMap
// // //       .get(id)
// // //       .slice(paginationIndex * 2, paginationIndex * 2 + 2);

// // //     return children.map((child) => {
// // //       connections.push({ from: id, to: child.id });
// // //       return {
// // //         id: child.id,
// // //         children: buildTreeAndConnections(child.id, depth - 1, connections),
// // //       };
// // //     });
// // //   };

// // //   const { tree, connections } = useMemo(() => {
// // //     const conn = [];
// // //     const tree = [
// // //       { id: rootId, children: buildTreeAndConnections(rootId, steps, conn) },
// // //     ];
// // //     return { tree, connections: conn };
// // //   }, [rootId, steps, paginationIndex]);

// // //   useEffect(() => {
// // //     const timeout = setTimeout(() => setRenderArrows(true), 50);
// // //     return () => {
// // //       setRenderArrows(false);
// // //       clearTimeout(timeout);
// // //     };
// // //   }, [tree]);

// // //   const totalPages = Math.ceil((childrenMap.get(rootId)?.length || 0) / 2);
// // //   const boxSize = steps >= 7 ? "sm" : steps >= 5 ? "md" : "lg";

// // //   const renderTree = (nodes) => {
// // //     if (!nodes.length) return null;

// // //     return (
// // //       <div className="flex flex-col items-center space-y-6">
// // //         <div className="flex justify-center space-x-6 relative">
// // //           {nodes.map((node) => (
// // //             <div key={node.id} className="relative flex flex-col items-center">
// // //               <UserInTree
// // //                 id={node.id}
// // //                 onClick={handleUserClick}
// // //                 size={boxSize}
// // //               />
// // //               {node.children.length > 0 && <div className="w-px h-6 my-1" />}
// // //               <div className="flex space-x-6">{renderTree(node.children)}</div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <div className="min-h-screen max-h-screen w-full  p-6 bg-black text-gray-800 scroll-smooth">
// // //       <h1 className="text-center text-3xl font-bold mb-2 text-yellow-700">
// // //         TREE
// // //       </h1>

// // //       <div id="tree-container" className="relative">
// // //         <div className="flex justify-center">{renderTree(tree)}</div>

// // //         {renderArrows &&
// // //           connections.map((conn, i) => (
// // //             <Xarrow
// // //               start={`box-${conn.from}`}
// // //               end={`box-${conn.to}`}
// // //               startAnchor="bottom"
// // //               endAnchor="top"
// // //               centerAnchor="straight"
// // //               color="#f59e0b"
// // //               strokeWidth={1}
// // //               headSize={4}
// // //               path="grid"
// // //             />
// // //           ))}
// // //       </div>

// // //       <div className="mt-12 flex flex-col items-center space-y-6">
// // //         <div className="flex items-center space-x-2">
// // //           <label className="text-sm font-medium text-gray-700">Depth:</label>
// // //           <select
// // //             value={steps}
// // //             onChange={(e) => setSteps(parseInt(e.target.value))}
// // //             className="border border-yellow-400 rounded px-3 py-1 bg-white text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
// // //           >
// // //             {[3, 5, 7].map((val) => (
// // //               <option key={val} value={val}>
// // //                 {val} Steps
// // //               </option>
// // //             ))}
// // //           </select>
// // //         </div>

// // //         {/* Pagination Slider */}
// // //         <div className="flex items-center space-x-6">
// // //           <button
// // //             onClick={() => setPaginationIndex((prev) => Math.max(prev - 1, 0))}
// // //             disabled={paginationIndex === 0}
// // //             className="w-10 h-10 flex items-center justify-center bg-yellow-300 text-white rounded-full hover:bg-yellow-400 disabled:opacity-40"
// // //           >
// // //             ⬅
// // //           </button>
// // //           <span className="text-sm">
// // //             Page <strong>{paginationIndex + 1}</strong> of{" "}
// // //             <strong>{totalPages}</strong>
// // //           </span>
// // //           <button
// // //             onClick={() =>
// // //               setPaginationIndex((prev) => Math.min(prev + 1, totalPages - 1))
// // //             }
// // //             disabled={paginationIndex >= totalPages - 1}
// // //             className="w-10 h-10 flex items-center justify-center bg-yellow-300 text-white rounded-full hover:bg-yellow-400 disabled:opacity-40"
// // //           >
// // //             ➡
// // //           </button>
// // //         </div>

// // //         {/* Navigation */}
// // //         <div className="flex space-x-4 mt-2">
// // //           <button
// // //             onClick={goToParent}
// // //             disabled={navigationPath.length <= 1}
// // //             className="px-4 py-2 rounded-lg bg-gray-700 text-yellow-100 hover:bg-gray-800 disabled:opacity-40"
// // //           >
// // //             ⬆ Previous
// // //           </button>
// // //           <button
// // //             onClick={goToFirstChild}
// // //             className="px-4 py-2 rounded-lg bg-gray-700 text-yellow-100 hover:bg-gray-800"
// // //           >
// // //             ⬇ Next
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ReferralTree;

// // "use client";

// // import React, { useState, useEffect, useMemo, useContext } from "react";
// // // import { users } from "@/content/data";
// // import Xarrow from "react-xarrows";
// // import UserInTree from "./UserinTree";
// // import axios from "axios";
// // import { useAuth } from "@/context/AuthContext";

// // const ReferralTree = () => {
// //   const [rootId, setRootId] = useState();
// //   const [steps, setSteps] = useState(3);
// //   const [paginationIndex, setPaginationIndex] = useState(0);
// //   const [navigationPath, setNavigationPath] = useState([]);
// //   const [renderArrows, setRenderArrows] = useState(false);

// //   const [users, setUsers] = useState([]);
// //   // const [currentUser, setCurrentUser] = useState();

// //   useEffect(() => {
// //     const fetchUsers = async () => {
// //       try {
// //         const res = await axios.get(
// //           "http://localhost:3000/api/user/getAllUsers"
// //         );
// //         const data = res.data;
// //         setUsers(data.users);
// //       } catch (err) {
// //         console.error("Error fetching users:", err.message);
// //       }
// //     };

// //     fetchUsers();
// //   }, []);

// //   const { user } = useAuth();

// //     useEffect(() => {
// //       console.log("Current user:", user);
// //       setRootId(user.code);
// //       console.log();
// //       console.log("Updated users:", users);
// //     }, [users]); // This will run whenever `users` changes

// //     // setTimeout(() => {

// //   // }, 1000);

// //   const childrenMap = useMemo(() => {
// //     const map = new Map();
// //     users.forEach((user) => {
// //       if (!map.has(user.parentId)) {
// //         map.set(user.parentId, []);
// //       }
// //       map.get(user.parentId).push(user);
// //     });
// //     return map;
// //   }, [users]);

// //   const handleUserClick = (id) => {
// //     setRootId(id);
// //     setNavigationPath((prev) => [...prev, id]);
// //     setPaginationIndex(0);
// //   };

// //   const goToParent = () => {
// //     if (navigationPath.length > 1) {
// //       const newPath = [...navigationPath];
// //       newPath.pop();
// //       setNavigationPath(newPath);
// //       setRootId(newPath[newPath.length - 1]);
// //     }
// //   };

// //   const goToFirstChild = () => {
// //     const firstChild = childrenMap.get(rootId)?.[0];
// //     if (firstChild) handleUserClick(firstChild.code);
// //   };

// //   const buildTreeAndConnections = (code, depth, connections = []) => {
// //     if (depth === 0 || !childrenMap.has(code)) return [];

// //     const children = childrenMap
// //       .get(code)
// //       .slice(paginationIndex * 2, paginationIndex * 2 + 2);

// //     return children.map((child) => {
// //       connections.push({ from: code, to: child.code });
// //       return {
// //         id: child.code,
// //         children: buildTreeAndConnections(child.code, depth - 1, connections),
// //       };
// //     });
// //   };

// //   const { tree, connections } = useMemo(() => {
// //     const conn = [];
// //     const tree = [
// //       { id: rootId, children: buildTreeAndConnections(rootId, steps, conn) },
// //     ];
// //     return { tree, connections: conn };
// //   }, [rootId, steps, paginationIndex]);

// //   useEffect(() => {
// //     const timeout = setTimeout(() => setRenderArrows(true), 50);
// //     return () => {
// //       setRenderArrows(false);
// //       clearTimeout(timeout);
// //     };
// //   }, [tree]);

// //   const totalPages = Math.ceil((childrenMap.get(rootId)?.length || 0) / 2);
// //   const boxSize = steps >= 7 ? "sm" : steps >= 5 ? "md" : "lg";

// //   const renderTree = (nodes) => {
// //     if (!nodes.length) return null;

// //     return (
// //       <div className="flex flex-col items-center space-y-6">
// //         <div className="flex justify-center space-x-6 relative">
// //           {nodes.map((node) => (
// //             <div key={node.code} className="relative flex flex-col items-center">
// //               <UserInTree
// //                 id={node.code}
// //                 onClick={handleUserClick}
// //                 size={boxSize}
// //               />
// //               {node.children.length > 0 && <div className="w-px h-6 my-1" />}
// //               <div className="flex space-x-6">{renderTree(node.children)}</div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800 scroll-smooth">
// //       <h1 className="text-center text-3xl font-bold mb-8 text-yellow-700">
// //         📊 Referral Tree Viewer
// //       </h1>

// //       <div id="tree-container" className="relative">
// //         <div className="flex justify-center">{renderTree(tree)}</div>

// //         {renderArrows &&
// //           connections.map((conn, i) => (
// //             <Xarrow
// //               start={`box-${conn.from}`}
// //               end={`box-${conn.to}`}
// //               startAnchor="bottom"
// //               endAnchor="top"
// //               centerAnchor="straight"
// //               color="#f59e0b"
// //               strokeWidth={1}
// //               headSize={4}
// //               path="grid"
// //             />
// //           ))}
// //       </div>

// //       {/* Controls */}
// //       <div className="mt-12 flex flex-col items-center space-y-6">
// //         {/* Step Selector */}
// //         <div className="flex items-center space-x-2">
// //           <label className="text-sm font-medium text-gray-700">Depth:</label>
// //           <select
// //             value={steps}
// //             onChange={(e) => setSteps(parseInt(e.target.value))}
// //             className="border border-yellow-400 rounded px-3 py-1 bg-white text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
// //           >
// //             {[3, 5, 7].map((val) => (
// //               <option key={val} value={val}>
// //                 {val} Steps
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* Pagination Slider */}
// //         <div className="flex items-center space-x-6">
// //           <button
// //             onClick={() => setPaginationIndex((prev) => Math.max(prev - 1, 0))}
// //             disabled={paginationIndex === 0}
// //             className="w-10 h-10 flex items-center justify-center bg-yellow-300 text-white rounded-full hover:bg-yellow-400 disabled:opacity-40"
// //           >
// //             ⬅
// //           </button>
// //           <span className="text-sm">
// //             Page <strong>{paginationIndex + 1}</strong> of{" "}
// //             <strong>{totalPages}</strong>
// //           </span>
// //           <button
// //             onClick={() =>
// //               setPaginationIndex((prev) => Math.min(prev + 1, totalPages - 1))
// //             }
// //             disabled={paginationIndex >= totalPages - 1}
// //             className="w-10 h-10 flex items-center justify-center bg-yellow-300 text-white rounded-full hover:bg-yellow-400 disabled:opacity-40"
// //           >
// //             ➡
// //           </button>
// //         </div>

// //         {/* Navigation */}
// //         <div className="flex space-x-4 mt-2">
// //           <button
// //             onClick={goToParent}
// //             disabled={navigationPath.length <= 1}
// //             className="px-4 py-2 rounded-lg bg-gray-700 text-yellow-100 hover:bg-gray-800 disabled:opacity-40"
// //           >
// //             ⬆ Parent
// //           </button>
// //           <button
// //             onClick={goToFirstChild}
// //             className="px-4 py-2 rounded-lg bg-gray-700 text-yellow-100 hover:bg-gray-800"
// //           >
// //             ⬇ First Child
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ReferralTree;

// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import Xarrow from "react-xarrows";
// import UserInTree from "./UserinTree";
// import axios from "axios";
// import { useAuth } from "@/context/AuthContext";

// const ReferralTree = () => {
//   const [rootId, setRootId] = useState();
//   const [steps, setSteps] = useState(3);
//   const [paginationIndex, setPaginationIndex] = useState(0);
//   const [navigationPath, setNavigationPath] = useState([]);
//   const [renderArrows, setRenderArrows] = useState(false);
//   const [users, setUsers] = useState([]);

//   const { user } = useAuth();

//   // ✅ Fetch users on mount
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:3000/api/user/getAllUsers"
//         );
//         const data = res.data;
//         setUsers(data.users);
//         console.log("✅ Users fetched:", data.users);
//       } catch (err) {
//         console.error("Error fetching users:", err.message);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // ✅ Set rootId once user is loaded
//   useEffect(() => {
//     if (user?.code) {
//       setRootId(user.code);
//       setNavigationPath([user.code]);
//       console.log("✅ Root ID set to:", user.code);
//     }
//   }, [user]);

//   // ✅ Log when users update
//   useEffect(() => {
//     console.log("✅ Updated users:", users);
//   }, [users]);

//   const childrenMap = useMemo(() => {
//     const map = new Map();
//     users.forEach((user) => {
//       if (!map.has(user.referralCode)) {
//         map.set(user.referralCode, []);
//       }
//       map.get(user.referralCode).push(user);
//     });
//     return map;
//   }, [users]);

//   const handleUserClick = (id) => {
//     setRootId(id);
//     setNavigationPath((prev) => [...prev, id]);
//     setPaginationIndex(0);
//   };

//   const goToParent = () => {
//     if (navigationPath.length > 1) {
//       const newPath = [...navigationPath];
//       newPath.pop();
//       setNavigationPath(newPath);
//       setRootId(newPath[newPath.length - 1]);
//     }
//   };

//   const goToFirstChild = () => {
//     const firstChild = childrenMap.get(rootId)?.[0];
//     if (firstChild) handleUserClick(firstChild.code);
//   };

//   const buildTreeAndConnections = (id, depth, connections = []) => {
//     if (depth === 0 || !childrenMap.has(id)) return [];

//     const children = childrenMap
//       .get(id)
//       .slice(paginationIndex * 2, paginationIndex * 2 + 2);

//     return children.map((child) => {
//       connections.push({ from: id, to: child.code });
//       return {
//         id: child.code,
//         children: buildTreeAndConnections(child.code, depth - 1, connections),
//       };
//     });
//   };

//   const { tree, connections } = useMemo(() => {
//     const conn = [];
//     const tree = [
//       { id: rootId, children: buildTreeAndConnections(rootId, steps, conn) },
//     ];
//     return { tree, connections: conn };
//   }, [rootId, steps, paginationIndex, childrenMap]);

//   useEffect(() => {
//     const timeout = setTimeout(() => setRenderArrows(true), 50);
//     return () => {
//       setRenderArrows(false);
//       clearTimeout(timeout);
//     };
//   }, [tree]);

//   const totalPages = Math.ceil((childrenMap.get(rootId)?.length || 0) / 2);
//   const boxSize = steps >= 7 ? "sm" : steps >= 5 ? "md" : "lg";

//   const renderTree = (nodes) => {
//     if (!nodes.length) return null;

//     return (
//       <div className="flex flex-col items-center space-y-6">
//         <div className="flex justify-center space-x-6 relative">
//           {nodes.map((node) => (
//             <div
//               key={node.id || Math.random()}
//               className="relative flex flex-col items-center"
//             >
//               <UserInTree
//                 id={node.id}
//                 onClick={handleUserClick}
//                 size={boxSize}
//               />
//               {node.children.length > 0 && <div className="w-px h-6 my-1" />}
//               <div className="flex space-x-6">{renderTree(node.children)}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800 scroll-smooth">
//       <h1 className="text-center text-3xl font-bold mb-8 text-yellow-700">
//         📊 Referral Tree Viewer
//       </h1>

//       <div id="tree-container" className="relative">
//         <div className="flex justify-center">{renderTree(tree)}</div>

//         {renderArrows &&
//           connections.map((conn, i) => (
//             <Xarrow
//               key={`${conn.from}-${conn.to}`}
//               start={`box-${conn.from}`}
//               end={`box-${conn.to}`}
//               startAnchor="bottom"
//               endAnchor="top"
//               centerAnchor="straight"
//               color="#f59e0b"
//               strokeWidth={1}
//               headSize={4}
//               path="grid"
//             />
//           ))}
//       </div>

//       {/* Controls */}
//       <div className="mt-12 flex flex-col items-center space-y-6">
//         {/* Step Selector */}
//         <div className="flex items-center space-x-2">
//           <label className="text-sm font-medium text-gray-700">Depth:</label>
//           <select
//             value={steps}
//             onChange={(e) => setSteps(parseInt(e.target.value))}
//             className="border border-yellow-400 rounded px-3 py-1 bg-white text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
//           >
//             {[3, 5, 7].map((val) => (
//               <option key={val} value={val}>
//                 {val} Steps
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Pagination Slider */}
//         <div className="flex items-center space-x-6">
//           <button
//             onClick={() => setPaginationIndex((prev) => Math.max(prev - 1, 0))}
//             disabled={paginationIndex === 0}
//             className="w-10 h-10 flex items-center justify-center bg-yellow-300 text-white rounded-full hover:bg-yellow-400 disabled:opacity-40"
//           >
//             ⬅
//           </button>
//           <span className="text-sm">
//             Page <strong>{paginationIndex + 1}</strong> of{" "}
//             <strong>{totalPages}</strong>
//           </span>
//           <button
//             onClick={() =>
//               setPaginationIndex((prev) => Math.min(prev + 1, totalPages - 1))
//             }
//             disabled={paginationIndex >= totalPages - 1}
//             className="w-10 h-10 flex items-center justify-center bg-yellow-300 text-white rounded-full hover:bg-yellow-400 disabled:opacity-40"
//           >
//             ➡
//           </button>
//         </div>

//         {/* Navigation */}
//         <div className="flex space-x-4 mt-2">
//           <button
//             onClick={goToParent}
//             disabled={navigationPath.length <= 1}
//             className="px-4 py-2 rounded-lg bg-gray-700 text-yellow-100 hover:bg-gray-800 disabled:opacity-40"
//           >
//             ⬆ Parent
//           </button>
//           <button
//             onClick={goToFirstChild}
//             className="px-4 py-2 rounded-lg bg-gray-700 text-yellow-100 hover:bg-gray-800"
//           >
//             ⬇ First Child
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReferralTree;


"use client";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import UserInTree from "./UserinTree.jsx";
import Xarrow from "react-xarrows";
import { useAuth } from "@/context/AuthContext";

const ReferralTree = () => {
  const [users, setUsers] = useState([]);
  const [rootId, setRootId] = useState(null);
  const [steps, setSteps] = useState(3);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [navigationPath, setNavigationPath] = useState([]);
  const [renderArrows, setRenderArrows] = useState(false);

  const { user } = useAuth();

  // ✅ Fetch users from DB
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/user/getAllUsers");
        setUsers(res.data.users);
        console.log("✅ Users Fetched:");
      } catch (err) {
        console.log("Error fetching users:");
      }
    };

    fetchUsers();
  }, []);

  // ✅ Set rootId once auth user is available
  useEffect(() => {
    if (user?.code) {
      setRootId(user.code);
      setNavigationPath([user.code]);
      // console.log("Root set to:", user.code);
    }
  }, [user]);

  // ✅ Build childrenMap using referralCode
  const childrenMap = useMemo(() => {
    const map = new Map();
    users.forEach((user) => {
      const parentId = user.referralCode;
      if (!map.has(parentId)) {
        map.set(parentId, []);
      }
      map.get(parentId).push(user);
    });
    return map;
  }, [users]);

  // ✅ Prevent duplicate rendering using a visited set
  const buildTreeAndConnections = (id, depth, connections = [], visited = new Set()) => {
    if (depth === 0 || !childrenMap.has(id) || visited.has(id)) return [];

    const children = childrenMap
      .get(id)
      .slice(paginationIndex * 2, paginationIndex * 2 + 2)
      .filter((child) => !visited.has(child.code)); // skip already rendered

    return children.map((child) => {
      visited.add(child.code);
      connections.push({ from: id, to: child.code });
      return {
        id: child.code,
        children: buildTreeAndConnections(child.code, depth - 1, connections, visited),
      };
    });
  };

  const { tree, connections } = useMemo(() => {
    if (!rootId) return { tree: [], connections: [] };
    const conn = [];
    const visited = new Set([rootId]);
    const tree = [
      { id: rootId, children: buildTreeAndConnections(rootId, steps, conn, visited) },
    ];
    return { tree, connections: conn };
  }, [rootId, steps, paginationIndex, childrenMap]);

  useEffect(() => {
    const timeout = setTimeout(() => setRenderArrows(true), 50);
    return () => {
      setRenderArrows(false);
      clearTimeout(timeout);
    };
  }, [tree]);

  const handleUserClick = (id) => {
    setRootId(id);
    setNavigationPath((prev) => [...prev, id]);
    setPaginationIndex(0);
  };

  const goToParent = () => {
    if (navigationPath.length > 1) {
      const newPath = [...navigationPath];
      newPath.pop();
      setNavigationPath(newPath);
      setRootId(newPath[newPath.length - 1]);
    }
  };

  const goToFirstChild = () => {
    const firstChild = childrenMap.get(rootId)?.[0];
    if (firstChild) handleUserClick(firstChild.code);
  };

  const totalPages = Math.ceil((childrenMap.get(rootId)?.length || 0) / 2);
  const boxSize = steps >= 7 ? "sm" : steps >= 5 ? "md" : "lg";

  const renderTree = (nodes) => {
    if (!nodes.length) return null;

    return (
      <div className="flex flex-col items-center space-y-6">
        <div className="flex justify-center space-x-6 relative">
          {nodes.map((node) => (
            <div key={node.id} className="relative flex flex-col items-center">
              <UserInTree id={node.id} onClick={handleUserClick} size={boxSize} />
              {node.children.length > 0 && <div className="w-px h-6 my-1" />}
              <div className="flex space-x-6">{renderTree(node.children)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800 scroll-smooth">
      <h1 className="text-center text-3xl font-bold mb-8 text-yellow-700">
        📊 Referral Tree Viewer
      </h1>

      <div id="tree-container" className="relative">
        <div className="flex justify-center">{renderTree(tree)}</div>

        {renderArrows &&
          connections.map((conn) => (
            <Xarrow
              key={`${conn.from}-${conn.to}`}
              start={`box-${conn.from}`}
              end={`box-${conn.to}`}
              startAnchor="bottom"
              endAnchor="top"
              centerAnchor="straight"
              color="#f59e0b"
              strokeWidth={1}
              headSize={4}
              path="grid"
            />
          ))}
      </div>

      {/* Controls */}
      <div className="mt-12 flex flex-col items-center space-y-6">
        {/* Depth Selector */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Depth:</label>
          <select
            value={steps}
            onChange={(e) => setSteps(parseInt(e.target.value))}
            className="border border-yellow-400 rounded px-3 py-1 bg-white text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
          >
            {[3, 5, 7].map((val) => (
              <option key={val} value={val}>
                {val} Steps
              </option>
            ))}
          </select>
        </div>

        {/* Pagination */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setPaginationIndex((prev) => Math.max(prev - 1, 0))}
            disabled={paginationIndex === 0}
            className="w-10 h-10 flex items-center justify-center bg-yellow-300 text-white rounded-full hover:bg-yellow-400 disabled:opacity-40"
          >
            ⬅
          </button>
          <span className="text-sm">
            Page <strong>{paginationIndex + 1}</strong> of <strong>{totalPages}</strong>
          </span>
          <button
            onClick={() =>
              setPaginationIndex((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={paginationIndex >= totalPages - 1}
            className="w-10 h-10 flex items-center justify-center bg-yellow-300 text-white rounded-full hover:bg-yellow-400 disabled:opacity-40"
          >
            ➡
          </button>
        </div>

        {/* Navigation */}
        <div className="flex space-x-4 mt-2">
          <button
            onClick={goToParent}
            disabled={navigationPath.length <= 1}
            className="px-4 py-2 rounded-lg bg-gray-700 text-yellow-100 hover:bg-gray-800 disabled:opacity-40"
          >
            ⬆ Parent
          </button>
          <button
            onClick={goToFirstChild}
            className="px-4 py-2 rounded-lg bg-gray-700 text-yellow-100 hover:bg-gray-800"
          >
            ⬇ First Child
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferralTree;
