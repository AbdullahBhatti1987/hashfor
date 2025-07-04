// "use client";
// import React, { useState } from "react";
// import AdminSidebar from "@/components/adminLayout/adminSidebar";
// import AdminHeader from "@/components/adminLayout/adminHeader";

// export default function DefaultLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   return (
//     <>
//       <div className="flex">
//         <AdminSidebar
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen}
//         />
//         <div className="relative  flex flex-1 flex-col bg-white">
//           <AdminHeader
//             sidebarOpen={sidebarOpen}
//             setSidebarOpen={setSidebarOpen}
//           />
//           <main className="bg-white">
//             <div className="mx-auto bg-[#121212] max-w-screen-2xl">
//               {children}
//             </div>
//           </main>
//         </div>
//       </div>
//     </>
//   );
// }

// "use client";
// import React, { useState } from "react";
// import Sidebar from "@/components/sidebar";
// import Header from "@/components/header";

// export default function DefaultLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <div className="flex">
//       <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
//       <div className="flex flex-col flex-1">
//         <Header setSidebarOpen={setSidebarOpen} />
        
//         <main
//           className="transition-all duration-300 flex-1 overflow-y-auto"
//           style={{ 
//             marginLeft: sidebarOpen ? "225px" : "60px",
//             marginTop: "64px" 
//           }}
//         >
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/adminLayout";
import AdminSmallscreenLayout from "@/components/adminsmallLayout";

export default function AdminResponsiveLayout({ children }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isSmallScreen ? (
    <AdminSmallscreenLayout>{children}</AdminSmallscreenLayout>
  ) : (
    <AdminLayout>{children}</AdminLayout>
  );
}
