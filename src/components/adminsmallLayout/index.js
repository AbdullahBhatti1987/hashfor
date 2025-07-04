"use client";
import React, { useState } from "react";
import AdminMobilesidebar from "../mobileSidebar/adminmobileSidebar";
import Header from "../header";

export default function AdminSmallscreenLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="flex bg-black"> {/* Changed bg-white to bg-black to match your theme */}
      <AdminMobilesidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="relative flex flex-1 flex-col">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="mx-auto w-full pt-16"> {/* Added pt-16 for header spacing */}
          {children}
        </main>
      </div>
    </div>
  );
}