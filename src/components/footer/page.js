import Link from "next/link";
import React from "react";
import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";
import Image from "next/image";
import logo from "../../../public/hashfor-new-logo.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 pt-4 border-t border-b border-[var(--themeColor)]">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row flex-wrap justify-between gap-8">
        {/* Logo and company info */}
        <aside className="flex-1 min-w-[200px]">
          <div className="flex items-center gap-2">
            <Image
              width={100}
              height={100}
              alt="Hashfor"
              src={logo}
              className="h-10 w-auto"
            />
            <p className="text-[var(--themeColor)] text-xl font-bold">
              Hashfor
            </p>
          </div>
          <p className="text-sm mt-2 max-w-xs">
            The next generation DeFi platform for trading, earning, and growing
            your digital assets.
          </p>
          <div className="flex gap-3 text-xl mt-3">
            <FaTwitter className="hover:text-[var(--themeColor)] cursor-pointer" />
            <FaGithub className="hover:text-[var(--themeColor)] cursor-pointer" />
            <FaDiscord className="hover:text-[var(--themeColor)] cursor-pointer" />
          </div>
        </aside>

        {/* PRODUCT Links */}
        <nav className="flex-1 min-w-[150px]">
          <h6 className="text-[var(--themeColor)] text-base font-semibold mb-2">
            Platform
          </h6>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/" className="hover:text-[var(--themeColor)]">
                Home
              </Link>
            </li>
            <li>
              <Link href="/packages" className="hover:text-[var(--themeColor)]">
                Packages
              </Link>
            </li>
            {/* <li>
              <Link href="" className="hover:text-[var(--themeColor)]">
                Dashboard
              </Link>
            </li> */}
          </ul>
        </nav>

        {/* RESOURCES Links */}
        <nav className="flex-1 min-w-[150px]">
          <h6 className="text-[var(--themeColor)] text-base font-semibold mb-2">
            Company
          </h6>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/aboutus" className="hover:text-[var(--themeColor)]">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/t&c" className="hover:text-[var(--themeColor)]">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/rules" className="hover:text-[var(--themeColor)]">
                Rules
              </Link>
            </li>
            <li>
              <Link href="/contactus" className="hover:text-[var(--themeColor)]">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        {/* COMPANY Links */}
        <nav className="flex-1 min-w-[150px]">
          <h6 className="text-[var(--themeColor)] text-base font-semibold mb-2">
            Learn
          </h6>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/vision" className="hover:text-[var(--themeColor)]">
                Vision
              </Link>
            </li>
            <li>
              <Link href="/compensationplan" className="hover:text-[var(--themeColor)]">
                Compensation Plan
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Hashfor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
