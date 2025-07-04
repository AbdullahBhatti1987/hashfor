"use client";

import React from "react";

function AdminUserInTree({ id, onClick, size = "md" }) {
  const sizeClasses = {
    sm: "w-12 h-6 text-xs",
    md: "w-16 h-8 text-sm",
    lg: "w-20 h-10 text-base",
  };

  return (
    <div
      id={`box-${id}`}
      onClick={() => onClick(id)}
      className={`flex items-center justify-center rounded-lg border font-semibold 
                  bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-900 shadow-md 
                  hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer 
                  ${sizeClasses[size]}`}
    >
      {id}
    </div>
  );
}

export default AdminUserInTree;
