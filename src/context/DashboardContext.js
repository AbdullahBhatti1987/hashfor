"use client";

import React, { createContext, useContext, useState } from "react";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [totalCommission, setTotalCommission] = useState("");

  return (
    <DashboardContext.Provider value={{ setTotalCommission, totalCommission }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useData = () => useContext(DashboardContext);
