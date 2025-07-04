// 'use client';
// import { useState } from 'react';

// // Sample trees for pagination (you can add more)
// const trees = [
//   {
//     label: 'Definite budget?',
//     color: 'bg-sky-900 text-white',
//     children: [
//       {
//         label: 'Known champion for it?',
//         color: 'bg-teal-400',
//         children: [
//           {
//             label: 'Clear project Scope?',
//             color: 'bg-orange-500',
//             children: [
//               {
//                 label: 'Achievable Timescale?',
//                 color: 'bg-pink-400',
//                 children: [
//                   { label: 'Go for it', color: 'bg-yellow-400' },
//                   { label: 'Get more time', color: 'bg-yellow-400' },
//                 ],
//               },
//               {
//                 label: 'Happy to profit?',
//                 color: 'bg-pink-400',
//                 children: [
//                   { label: 'Cash In', color: 'bg-yellow-400' },
//                   { label: 'Explain why it matters', color: 'bg-yellow-400' },
//                 ],
//               },
//             ],
//           },
//           { label: 'Leave it alone', color: 'bg-orange-500' },
//         ],
//       },
//       {
//         label: 'Alternative funding?',
//         color: 'bg-teal-400',
//         children: [
//           { label: 'Sort out funding', color: 'bg-orange-500' },
//           { label: 'Leave it alone', color: 'bg-orange-500' },
//         ],
//       },
//     ],
//   },
//   {
//     label: 'New Product Idea?',
//     color: 'bg-purple-900 text-white',
//     children: [
//       {
//         label: 'Validated Need?',
//         color: 'bg-blue-400',
//         children: [
//           {
//             label: 'Have MVP Ready?',
//             color: 'bg-green-500',
//             children: [
//               { label: 'Launch to Users', color: 'bg-indigo-400' },
//               { label: 'Build MVP First', color: 'bg-indigo-400' },
//             ],
//           },
//           { label: 'Do More Research', color: 'bg-green-500' },
//         ],
//       },
//       {
//         label: 'Competitor in Market?',
//         color: 'bg-blue-400',
//         children: [
//           { label: 'Differentiate', color: 'bg-green-500' },
//           { label: 'Find Niche', color: 'bg-green-500' },
//         ],
//       },
//     ],
//   },
// ];

// // Recursive component
// const TreeNode = ({ node, depth, maxDepth }) => {
//   const hasChildren = node.children && node.children.length > 0;
//   const showChildren = hasChildren && depth < maxDepth;

//   return (
//     <div className="relative flex flex-col items-center">
//       <div className="z-10">
//         <div className={`rounded px-4 py-2 text-center text-sm shadow ${node.color}`}>
//           {node.label}
//         </div>
//       </div>

//       {showChildren && (
//         <>
//           <div className="h-6 w-0.5 bg-gray-300"></div>
//           <div className="flex justify-center items-start space-x-6 relative">
//             <div className="absolute left-0 right-0 h-0.5 bg-gray-300 z-0"></div>
//             {node.children.map((child, index) => (
//               <div key={index} className="flex flex-col items-center relative">
//                 <div className="h-6 w-0.5 bg-gray-300"></div>
//                 <TreeNode node={child} depth={depth + 1} maxDepth={maxDepth} />
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default function FancyTimelineTree() {
//   const [visibleDepth, setVisibleDepth] = useState(3);
//   const [treeIndex, setTreeIndex] = useState(0);

//   const increaseDepth = () => setVisibleDepth((d) => Math.min(d + 1, 5));
//   const decreaseDepth = () => setVisibleDepth((d) => Math.max(d - 1, 1));

//   const nextTree = () => setTreeIndex((i) => Math.min(i + 1, trees.length - 1));
//   const prevTree = () => setTreeIndex((i) => Math.max(i - 1, 0));

//   const currentTree = trees[treeIndex];

//   return (
//     <div className="min-h-screen bg-white p-6 overflow-x-auto">
//       <h2 className="text-2xl font-bold text-black text-center mb-6">
//         Decision Timeline Tree {treeIndex + 1} of {trees.length}
//       </h2>

//       <div className="flex justify-center mb-4">
//         <button
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded mr-2"
//           onClick={increaseDepth}
//           disabled={visibleDepth >= 5}
//         >
//           + Add Row
//         </button>
//         <button
//           className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
//           onClick={decreaseDepth}
//           disabled={visibleDepth <= 1}
//         >
//           − Remove Row
//         </button>
//       </div>

//       <div className="flex justify-center mb-8">
//         <TreeNode node={currentTree} depth={1} maxDepth={visibleDepth} />
//       </div>

//       <div className="flex justify-center gap-4">
//         <button
//           className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded disabled:opacity-40"
//           onClick={prevTree}
//           disabled={treeIndex === 0}
//         >
//           ⬅️ Previous
//         </button>
//         <button
//           className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded disabled:opacity-40"
//           onClick={nextTree}
//           disabled={treeIndex === trees.length - 1}
//         >
//           Next ➡️
//         </button>
//       </div>
//     </div>
//   );
// }
