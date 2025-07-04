"use client";

import React from "react";
import { UserCircle } from "lucide-react";

function UserInTree({ id, onClick, size = "md" }) {
  const sizeClasses = {
    sm: "w-24 h-10 text-xs", // extra width for 8-char code
    md: "w-28 h-12 text-sm",
    lg: "w-32 h-14 text-base",
  };

  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <div
      id={`box-${id}`}
      onClick={() => onClick(id)}
      className={`flex items-center justify-center gap-2 rounded-lg border font-semibold 
        bg-gradient-to-br from-yellow-50 to-yellow-100 text-yellow-900 shadow-md 
        hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer 
        ${sizeClasses[size]}`}
    >
      <UserCircle size={iconSize[size]} className="shrink-0" />
      <span className="truncate">{id}</span>
    </div>
  );
}

export default UserInTree;
