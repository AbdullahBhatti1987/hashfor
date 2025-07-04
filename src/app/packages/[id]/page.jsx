import React from "react";
import { notFound } from "next/navigation";
import PackageDetailCard from "@/components/educationpackage/PackageDetailCard";

const packages = [
  { id: 1, level: "€ - 100", commission: "UP TO 0.6 % DAILY", name: "Toddler" },
  { id: 2, level: "€ - 200", commission: "UP TO 0.6 % DAILY", name: "Analytical" },
  { id: 3, level: "€ - 500", commission: "UP TO 0.65 % DAILY", name: "Professional" },
  { id: 4, level: "€ - 1000", commission: "UP TO 0.65 % DAILY", name: "Business" },
  { id: 5, level: "€ - 3000", commission: "UP TO 0.7 % DAILY", name: "Trading" },
  { id: 6, level: "€ - 5000", commission: "UP TO 0.7 % DAILY", name: "Mining" },
  { id: 7, level: "€ - 10000", commission: "UP TO 0.8 % DAILY", name: "Entrepreneur" },
];

export default function PackageDetail({ params }) {
  const id = parseInt(params.id);
  const pkg = packages.find((p) => p.id === id);

  if (!pkg) return notFound();

  return (
    <div className="min-h-screen bg-black text-white px-6 py-48 flex items-center justify-center">
      <PackageDetailCard pkg={pkg} />
    </div>
  );
}
