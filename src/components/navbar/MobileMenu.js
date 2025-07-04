import { Disclosure } from "@headlessui/react";
import { navigation } from "@/content/data";
import Link from "next/link";

export const MobileMenu = ({
  account,
  connectWallet,
  disconnectWallet,
  setIsOpen,
}) => {
  return (
    <Disclosure.Panel className="sm:hidden px-4 pt-2 pb-3 space-y-1">
      {navigation.map((item) => (
        <Disclosure.Button
          key={item.name}
          as="a"
          href={item.href}
          className={classNames(
            item.current
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white",
            "block rounded-md px-3 py-2 text-base font-medium"
          )}
          aria-current={item.current ? "page" : undefined}
        >
          {item.name}
        </Disclosure.Button>
      ))}
      <div className="mt-4 space-y-2">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-center gap-2 rounded-full gold-gradient-btn px-4 py-2 text-black font-medium shadow hover:opacity-90"
        >
          Login / SignUp
        </button>
        {account ? (
          <button
            onClick={disconnectWallet}
            className="w-full flex items-center justify-center gap-2 rounded-full gold-gradient-btn px-4 py-2 text-black font-medium shadow hover:opacity-90"
          >
            Disconnect: {account.slice(0, 3)}...{account.slice(-2)}
          </button>
        ) : (
          <button
            onClick={connectWallet}
            className="w-full flex items-center justify-center gap-2 rounded-full gold-gradient-btn px-4 py-2 text-black font-medium shadow hover:opacity-90"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </Disclosure.Panel>
  );
};
