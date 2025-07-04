"use client";
import React, { useState } from "react";
import Sidebar from "../sidebar";
import Header from "../header";

export default function DefaultLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1">
        <Header setSidebarOpen={setSidebarOpen} />
        
        <main
          className="transition-all duration-300 flex-1 overflow-y-auto"
          style={{ 
            marginLeft: sidebarOpen ? "225px" : "60px",
            marginTop: "64px" 
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}