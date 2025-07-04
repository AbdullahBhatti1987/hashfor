"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiChevronsRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HiDocumentText } from "react-icons/hi2";
import { FaRegListAlt } from "react-icons/fa";
import {
  FiHome,
  FiUser,
  FiPackage,
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiCreditCard,
  FiLock,
  FiMessageSquare,
  FiHelpCircle,
} from "react-icons/fi";

const sidebarhead = [{ mainhead: "HashFor" }, { subhead: "User Dashboard" }];

const Sidebar = ({ open, setOpen }) => {
  const pathname = usePathname();
  const [selected, setSelected] = useState("Dashboard");

  useEffect(() => {
    // Find the item that matches the current path
    const matchingItem = sidebarItems.find((item) => pathname === item.route);
    if (matchingItem) {
      setSelected(matchingItem.title);
    }
  }, [pathname]);

  const sidebarItems = [
    { Icon: FiHome, title: "Dashboard", route: "/userdashboard" },
    // {
    //   Icon: FiLink,
    //   title: "Create Refferal Link",
    //   route: "/userdashboard/createrefferal",
    // },
    { Icon: FiUser, title: "Profile", route: "/userdashboard/profile" },
    {
      Icon: HiDocumentText,
      title: "Buy / Upgrade Package",
      route: "/userdashboard/buypackage",
    },
    {
      Icon: FiPackage,
      title: "My Packages",
      route: "/userdashboard/mypackage",
    },
    // {
    //   Icon: FiBarChart2,
    //   title: "Business (Left/Right)",
    //   route: "/userdashboard/business",
    // },
    {
      Icon: FiTrendingUp,
      title: "Earning (Left/Right)",
      route: "/userdashboard/earning",
    },
    { Icon: FiUsers, title: "Team (Left/Right)", route: "/userdashboard/team" },
    // { Icon: FiArrowUpCircle, title: "Upgarde Package", route: "/userdashboard/upgradepackage" },
    {
      Icon: FiDollarSign,
      title: "Request Withdraw",
      route: "/userdashboard/requestwithdraw",
    },
    {
      Icon: FiCreditCard,
      title: "Commission",
      route: "/userdashboard/comission",
    },
    {
      Icon: FiLock,
      title: "Change Password",
      route: "/userdashboard/changePassword",
    },
    // {
    //   Icon: FiClipboard,
    //   title: "Team's Report",
    //   route: "/userdashboard/teamreport",
    // },
    {
      Icon: FiMessageSquare,
      title: "Rector Message",
      route: "/userdashboard/rectormessage",
    },
    {
      Icon: FaRegListAlt,
      title: "Rules",
      route: "/userdashboard/rules",
    },
    { Icon: FiHelpCircle, title: "FAQs", route: "/userdashboard/faqs" },
    // { Icon: FiLogOut, title: "Logout", route: "/userdashboard/logout" },
  ];
  return (
    <motion.nav
      layout
      className="fixed top-0 left-0 h-screen z-50 flex flex-col justify-between border-r border-slate-300 bg-[#272727] p-2"
      style={{ width: open ? "225px" : "60px" }}
    >
      <div>
        <TitleSection open={open} />

        <div className="flex flex-col gap-1">
          {sidebarItems.map((item) => (
            <SidebarOption
              key={item.title}
              {...item}
              selected={selected}
              setSelected={setSelected}
              open={open}
            />
          ))}
        </div>
      </div>

      <ToggleSidebar open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const SidebarOption = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  notifs,
  route,
}) => {
  const router = useRouter();

  const handleClick = () => {
    setSelected(title);
    if (route) {
      router.push(route);
    }
  };

  return (
    <motion.button
      layout
      onClick={handleClick}
      className={`relative flex h-8 w-full items-center rounded-md transition-colors ${
        selected === title
          ? "bg-[var(--themeColor)] text-[#1E1E1E]"
          : "text-white hover:bg-[var(--themeColor)]"
      }`}
    >
      <motion.div
        layout
        className="grid h-full w-8 place-content-center text-sm"
      >
        <Icon />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-[11px] font-medium truncate"
        >
          {title}
        </motion.span>
      )}
      {notifs && open && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute right-2 top-1/2 size-4 -translate-y-1/2 rounded bg-indigo-500 text-xs text-white"
        >
          {notifs}
        </motion.span>
      )}
    </motion.button>
  );
};

const TitleSection = ({ open }) => (
  <div className="mb-3">
    <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors">
      <div className="flex items-center gap-2">
        <Logo />
        {open && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
          >
            {sidebarhead.map((data, index) => (
              <div key={index}>
                <span className="block text-xs text-white font-semibold">
                  {data.mainhead}
                </span>
                <span className="block text-xs text-slate-500">
                  {data.subhead}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  </div>
);

const Logo = () => (
  <motion.div
    layout
    className="grid size-8 shrink-0 place-content-center rounded-md"
  >
    <Image
      width={300}
      height={300}
      src="/hashfor-new-logo.png"
      alt="Logo-pic"
    />
  </motion.div>
);

const ToggleSidebar = ({ open, setOpen }) => (
  <motion.button
    layout
    onClick={() => setOpen((prev) => !prev)}
    className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-[var(--themeColor)]"
  >
    <div className="flex items-center">
      <motion.div layout className="grid size-6 place-content-center text-lg">
        <FiChevronsRight
          className={`transition-transform ${open && "rotate-180"}`}
        />
      </motion.div>
      {open && (
        <motion.span
          layout
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.125 }}
          className="text-xs text-white font-medium"
        >
          Hide
        </motion.span>
      )}
    </div>
  </motion.button>
);

export default Sidebar;
