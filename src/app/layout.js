import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "./ClientLayout";
import { WalletProvider } from "@/context/WalletContext";
import { AuthProvider } from "@/context/AuthContext";
import { DashboardProvider } from "@/context/DashboardContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hashfor-Next Generation DeFi Platform",
  description: "Next Generation DeFi Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <WalletProvider>
            <DashboardProvider>
              <ClientLayout className="">{children}</ClientLayout>
            </DashboardProvider>
          </WalletProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
