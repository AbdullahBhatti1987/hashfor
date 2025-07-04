"use client";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Xarrow, { useXarrow } from "react-xarrows";
import UserInTree from "./UserinTree";
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

const AdminReferralTree = () => {
  const [users, setUsers] = useState([]);
  const [rootId, setRootId] = useState("HF354701"); // Admin code
  const [steps, setSteps] = useState(3);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [navigationPath, setNavigationPath] = useState(["HF354701"]);
  const [renderArrows, setRenderArrows] = useState(false);

  // ✅ Fetch users from backend
  useEffect(() => {
    axios.get("/api/user/getAllUsers").then((res) => {
      setUsers(res.data.users);
    });
  }, []);

  // ✅ Build children map
  const childrenMap = useMemo(() => {
    const map = new Map();
    users.forEach((user) => {
      if (!user.referralCode) return; // Skip root/admin
      if (!map.has(user.referralCode)) {
        map.set(user.referralCode, []);
      }
      map.get(user.referralCode).push(user);
    });
    return map;
  }, [users]);

  const handleUserClick = (id) => {
    setRootId(id);
    setNavigationPath((prev) => [...prev, id]);
    setPaginationIndex(0);
  };

  const goToParent = () => {
    if (navigationPath.length > 1) {
      const newPath = [...navigationPath];
      newPath.pop();
      setNavigationPath(newPath);
      setRootId(newPath[newPath.length - 1]);
    }
  };

  const goToFirstChild = () => {
    const firstChild = childrenMap.get(rootId)?.[0];
    if (firstChild) handleUserClick(firstChild.code);
  };

  const buildTreeAndConnections = (id, depth, connections = []) => {
    if (depth === 0 || !childrenMap.has(id)) return [];

    const children = childrenMap
      .get(id)
      .slice(paginationIndex * 2, paginationIndex * 2 + 2);

    return children.map((child) => {
      connections.push({ from: id, to: child.code });
      return {
        id: child.code,
        children: buildTreeAndConnections(child.code, depth - 1, connections),
      };
    });
  };

  const { tree, connections } = useMemo(() => {
    const conn = [];
    const tree = [
      { id: rootId, children: buildTreeAndConnections(rootId, steps, conn) },
    ];
    return { tree, connections: conn };
  }, [rootId, steps, paginationIndex, childrenMap]);

  useEffect(() => {
    const timeout = setTimeout(() => setRenderArrows(true), 50);
    return () => {
      setRenderArrows(false);
      clearTimeout(timeout);
    };
  }, [tree]);

  const totalPages = Math.ceil((childrenMap.get(rootId)?.length || 0) / 2);
  const boxSize = steps >= 7 ? "sm" : steps >= 5 ? "md" : "lg";

  const updateXarrow = useXarrow();

  useEffect(() => {
    // Delay to allow DOM layout to finish
    const timeout = setTimeout(() => {
      updateXarrow(); // 🟡 Force re-render Xarrows
      setRenderArrows(true); // 🟡 Show Xarrows
    }, 100); // You can try 50–150ms depending on performance

    return () => {
      setRenderArrows(false);
      clearTimeout(timeout);
    };
  }, [tree, boxSize]);

  const renderTree = (nodes) => {
    if (!nodes.length) return null;

    return (
      <div className="flex flex-col items-center space-y-6">
        <div className="flex justify-center space-x-6 relative">
          {nodes.map((node) => (
            <div key={node.id} className="relative flex flex-col items-center">
              <UserInTree
                id={node.id}
                onClick={handleUserClick}
                size={boxSize}
              />
              {node.children.length > 0 && <div className="w-px h-6 my-1" />}
              <div className="flex space-x-6">{renderTree(node.children)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden flex flex-col bg-black text-gray-800 scroll-smooth pt-0">
      <div className="flex-1 w-full  flex flex-col justify-between items-center py-6">
        <div className="flex flex-col">
          <h1 className="h-8 text-center text-3xl font-bold mb-8 text-yellow-700">
            Team
          </h1>
          <div id="tree-container" className="relative">
            <div className="flex justify-center">{renderTree(tree)}</div>

            {renderArrows &&
              connections.map((conn) => (
                <Xarrow
                  key={`${conn.from}-${conn.to}`}
                  start={`box-${conn.from}`}
                  end={`box-${conn.to}`}
                  startAnchor="bottom"
                  endAnchor="top"
                  centerAnchor="straight"
                  color="#f59e0b"
                  strokeWidth={1}
                  headSize={4}
                  path="grid"
                />
              ))}
          </div>
        </div>

        <div className="mt-12 w-full max-w-3xl mx-auto bg-[#272727] rounded-xl shadow-lg p-6 border border-gray-700 text-white flex flex-wrap justify-between items-center gap-6">
          {/* Tree Depth */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-300">Tree Depth:</span>
            {[3, 5, 7].map((val) => (
              <button
                key={val}
                onClick={() => setSteps(val)}
                className={`w-10 h-10 rounded-full text-sm font-semibold flex items-center justify-center transition 
          ${
            steps === val
              ? "bg-yellow-400 text-black"
              : "bg-gray-700 hover:bg-yellow-600"
          }`}
              >
                {val}
              </button>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setPaginationIndex((prev) => Math.max(prev - 1, 0))
              }
              disabled={paginationIndex === 0}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-30 transition"
            >
              <FaArrowLeft />
            </button>

            <span className="text-sm text-gray-300">
              Page <strong>{paginationIndex + 1}</strong> of{" "}
              <strong>{totalPages}</strong>
            </span>

            <button
              onClick={() =>
                setPaginationIndex((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={paginationIndex >= totalPages - 1}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-30 transition"
            >
              <FaArrowRight />
            </button>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={goToParent}
              disabled={navigationPath.length <= 1}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-30 transition"
            >
              <FaArrowUp />
              <span className="text-sm font-medium">Parent</span>
            </button>

            <button
              onClick={goToFirstChild}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 text-black hover:bg-yellow-500 transition"
            >
              <FaArrowDown />
              <span className="text-sm font-medium">First Child</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReferralTree;
