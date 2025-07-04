"use client";
import React, { useEffect, useState } from "react";

export default function CommissionsPage() {
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const res = await fetch("/api/user/getAllCommissions");
        const json = await res.json();

        if (!res.ok) throw new Error(json.error || "Failed to fetch");

        setCommissions(json.data);
        // console.log("Sample commission:", json.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommissions();
  }, []);

  const formatId = (id) => {
    if (!id) return "N/A";
    return `${id.slice(0, 3)}...${id.slice(-3)}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 py-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[var(--themeColor)] text-3xl font-bold">
          Commission Reports
        </h1>
        <span className="text-white text-2xl font-medium">
          Total Commissions :{" "}
          <span className="text-[var(--themeColor)]">{commissions.length}</span>
        </span>
      </div>

      {/* Table */}
      <div className="bg-[#272727] rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-600">
          <thead className="bg-[#1f1f1f]">
            <tr>
              {[
                "From User",
                "To User",
                "Type",
                "Package Amount",
                "Percent",
                "Commission",
                "Created",
              ].map((header) => (
                <th
                  key={header}
                  className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {commissions.length > 0 ? (
              commissions.map((commission) => (
                <tr key={commission._id} className="hover:bg-[#1a1a1a]">
                  <td className="px-3 py-2 text-sm text-gray-300 whitespace-nowrap">
                    <span
                      className="tooltip cursor-pointer"
                      title={commission.userId}
                    >
                      {formatId(commission.userId)}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-300 whitespace-nowrap">
                    <span
                      className="tooltip cursor-pointer"
                      title={commission.toUserId}
                    >
                      {formatId(commission.toUserId)}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-300 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        commission?.type === "direct"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {commission?.type}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-sm text-white whitespace-nowrap text-center">
                    ${commission?.packageAmount || 0}
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-400 whitespace-nowrap text-center">
                    {commission?.percent}%
                  </td>
                  <td className="px-3 py-2 text-sm text-white font-medium whitespace-nowrap text-center">
                    ${commission?.amount || 0}
                  </td>
                  <td className="px-3 py-2 text-sm text-gray-400 whitespace-nowrap">
                    {new Date(commission?.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-3 py-4 text-sm text-center text-gray-500"
                >
                  No commission records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
