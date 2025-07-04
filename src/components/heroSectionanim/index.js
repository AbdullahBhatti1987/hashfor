"use client";

import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";

const COLORS_TOP = [
  "#FFD700", // Bright Gold
  "#D4AF37", // Metallic Gold
  "#C0C0C0", // Silver
  "#E6E8FA", // Pale Silver/Lavender
  "#CFB53B", // Old Gold
];

const AuroraHero = ({ children }) => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    const animation = animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });

    return () => animation.stop();
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #0A0A0A 50%, ${color})`;

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative grid min-h-screen place-content-center overflow-hidden px-4 py-24 text-gray-200"
    >
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars 
            radius={50} 
            count={2500} 
            factor={4} 
            fade 
            speed={2}
            color="#FFD700"
          />
        </Canvas>
      </div>
      {children}
    </motion.section>
  );
};

export default AuroraHero;