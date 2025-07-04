import React from "react";
import Link from "next/link";
import SidebarDropdown from "./sidebarDropdown";
import { usePathname } from "next/navigation";

const SidebarItem = ({ item, pageName, setPageName, onClick }) => {
  const handleClick = () => {
    const updatedPageName =
      pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : "";
    setPageName(updatedPageName);
    if (onClick) onClick();
  };

  const pathname = usePathname();

  const isActive = (item) => {
    if (item.route === pathname) return true;
    if (item.children) {
      return item.children.some((child) => isActive(child));
    }
    return false;
  };

  const isItemActive = isActive(item);
  const isExpanded = pageName === item.label.toLowerCase();

  return (
    <li>
      {item.children ? (
        <div
          onClick={handleClick}
          className={`${isItemActive ? "font-lora text-[#272727]" : "text-white"} group relative flex items-center gap-2.5 font-lora rounded-sm px-4 py-2 font-medium hover:text-white text-white duration-300 ease-in-out hover:bg-[#FDC700] cursor-pointer`}
        >
          {item.icon}
          {item.label}
          <svg
            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
              fill=""
            />
          </svg>
        </div>
      ) : (
        <Link
          href={item.route}
          onClick={handleClick}
          className={`${isItemActive ? "font-lora text-[#272727] font-semibold bg-[#FDC700]" : "text-white"} group font-light relative flex items-center gap-2.5 font-lora rounded-sm px-4 py-2 text-sm hover:text-white duration-300 ease-in-out hover:bg-[#FDC700]`}
        >
          {item.icon}
          {item.label}
        </Link>
      )}

      {item.children && isExpanded && (
        <div className="translate transform overflow-hidden">
          <SidebarDropdown item={item.children} onClick={onClick} />
        </div>
      )}
    </li>
  );
};

export default SidebarItem;