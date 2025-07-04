import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarDropdown = ({ item, onClick }) => {
  const pathname = usePathname();

  return (
    <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
      {item.map((dropdownItem, index) => (
        <li key={index}>
          <Link
            href={dropdownItem.route}
            onClick={onClick} // This will close the sidebar when clicked
            className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out ${
              pathname === dropdownItem.route ? "text-[#F1BE11]" : ""
            }`}
          >
            {dropdownItem.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarDropdown;