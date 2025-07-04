import { IoFilterOutline } from "react-icons/io5";
import React from "react";

export default function TransactionHistory() {
  const transactions = [
   { id: 1, name: "Netflix", date: "7 Nov, 3:20 PM", status: "In process", amount: "- $12.00", type: "Subscription", icon: <IoFilterOutline className="text-red-600 w-5 h-5" /> },
    { id: 2, name: "Lightroom", date: "6 Nov, 12:45 PM", status: "In process", amount: "- $19.99", type: "Subscription", icon: <IoFilterOutline className="text-blue-500 w-5 h-5" /> },
    { id: 3, name: "Mobbin", date: "5 Nov, 5:37 PM", status: "Completed", amount: "- $10.00", type: "Subscription", icon: <IoFilterOutline className="text-black w-5 h-5" /> },
    { id: 4, name: "Figma", date: "5 Nov, 11:02 AM", status: "Completed", amount: "- $15.00", type: "Subscription", icon: <IoFilterOutline className="text-purple-600 w-5 h-5" /> },
  ];

  const statusColors = {
    "In process": "bg-orange-500",
    "Completed": "bg-green-500",
  };

  return (
    <div className="p-3 xs:p-4 rounded-xl shadow-md bg-[#272727] border border-gray-400 w-full h-[295px] flex flex-col">
      <div className="flex justify-between items-center mb-3 xs:mb-4">
        <div>
          <h2 className="text-base xs:text-lg font-semibold text-white">Transaction History</h2>
          <p className="text-xs text-gray-500">Nov 5 2024 - Nov 7 2024</p>
        </div>
        <div className="flex space-x-2 xs:space-x-3">
          <IoFilterOutline className="w-3 h-3 xs:w-4 xs:h-4 text-gray-500 cursor-pointer" />
          <IoFilterOutline className="w-3 h-3 xs:w-4 xs:h-4 text-gray-500 cursor-pointer" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-1"> 
        <div className="space-y-2 xs:space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-800 transition">
             <div className="flex items-center space-x-2 xs:space-x-3 min-w-0">
              <div className="w-6 h-6 xs:w-8 xs:h-8 flex items-center justify-center bg-gray-600 rounded-full">
                {React.cloneElement(tx.icon, { className: `${tx.icon.props.className} w-3 h-3 xs:w-4 xs:h-4` })}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs xs:text-sm font-medium truncate">{tx.name}</h4>
                <p className="text-[10px] xs:text-xs text-gray-400 truncate">{tx.date}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 xs:space-x-2">
              <div className="hidden xs:flex items-center space-x-1">
                <span className={`w-2 h-2 rounded-full ${statusColors[tx.status]}`}></span>
                <span className="text-[10px] xs:text-xs text-gray-200">{tx.status}</span>
              </div>
              <div className="text-[8px] xs:text-[10px] border border-gray-500 rounded px-1 py-0.5 hidden sm:block">
                {tx.type}
              </div>
              <span className="text-xs xs:text-sm font-medium text-gray-200 whitespace-nowrap">
                {tx.amount}
              </span>
              <span className="text-gray-400 cursor-pointer text-sm xs:text-base">•••</span>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
