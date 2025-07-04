"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "./sidebarItem";
import ClickOutside from "./clickOutside";
import { MdSpaceDashboard } from "react-icons/md";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import { FaChartLine, FaPercentage, FaUsers, FaSitemap } from "react-icons/fa";
import useLocalStorage from "./useLocalstorage";

const menuGroups = [
  {
    menuItems: [
      {
        icon: <MdSpaceDashboard className="text-xs" />,
        label: "Dashboard",
        route: "/admindashboard",
      },
      {
        icon: <AiOutlinePlusSquare className="text-xs" />,
        label: "Create Package",
        route: "/admindashboard/createpackage",
      },
      {
        icon: <BsBoxSeam className="text-xs" />,
        label: "Package Details",
        route: "/admindashboard/packagedetail",
      },
       {
        icon: <HiOutlineUsers className="text-xs" />,
        label: "User's Package",
        route: "/admindashboard/userspackage",
      },
       {
        icon: <FaMoneyCheckAlt className="text-xs" />,
        label: "Withdraw Details",
        route: "/admindashboard/withdrawdetails",
      },
       {
        icon: <FaChartLine className="text-xs" />,
        label: "Daily Earnings",
        route: "/admindashboard/dailyearning",
      },
       {
        icon: <FaPercentage className="text-xs" />,
        label: "Commission",
        route: "/admindashboard/comission",
      },
       {
        icon: <FaUsers className="text-xs" />,
        label: "Users",
        route: "/admindashboard/users",
      },
       {
        icon: <FaSitemap className="text-xs" />,
        label: "Refferal Tree",
        route: "/admindashboard/refferaltree",
      },
    ],
  },
];

const AdminMobilesidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  // Function to handle menu item clicks
  const handleMenuItemClick = (route) => {
    setSidebarOpen(false); // Close sidebar when any item is clicked
    setPageName(route.split('/').pop() || 'dashboard'); // Update the active page
  };

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed z-40 left-0 top-0 flex h-screen w-72.5 flex-col bg-[#272727] duration-300 ease-linear lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              width={50}
              height={50}
              src="/hashfor-new-logo.png"
              alt="Logo"
              priority
            />
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">Hashfor</h1>
              <p className="text-gray-400 text-sm">Admin Dashboard</p>
            </div>
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden text-white"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1">
          {menuGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <ul className="space-y-2">
                {group.menuItems.map((menuItem, menuIndex) => (
                  <SidebarItem
                    key={menuIndex}
                    item={{
                      ...menuItem,
                      labelClassName: "text-xs", 
                      iconClassName: "text-xs", 
                    }}
                    pageName={pageName}
                    setPageName={(name) => {
                      setPageName(name);
                      setSidebarOpen(false); // Close sidebar when item is clicked
                    }}
                    onClick={() => handleMenuItemClick(menuItem.route)} // Add onClick handler
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default AdminMobilesidebar;