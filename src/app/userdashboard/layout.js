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
import DefaultLayout from "@/components/LargescreenLayoutjs";
import SmallscreenLayout from "@/components/SmallscreenLayout";

export default function ResponsiveLayout({ children }) {
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
    <SmallscreenLayout>{children}</SmallscreenLayout>
  ) : (
    <DefaultLayout>{children}</DefaultLayout>
  );
}
