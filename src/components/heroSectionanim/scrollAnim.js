"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { LuCoins } from "react-icons/lu";
import { FaArrowTrendUp } from "react-icons/fa6";
import GlobeCanvas from "../globeCanvas/page";
import AuroraHero from ".";

export const TextParallaxContentExample = () => {
  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Collaborate"
        heading="Built for all of us."
      >
        <ExampleContent />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Quality"
        heading="Never compromise."
      >
        <ExampleContent />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="Modern"
        heading="Dress for the best."
      >
        <ExampleContent />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const ExampleContent = () => (
 <AuroraHero>
       {/* Foreground Content */}
       <div className="relative z-10 h-screen flex flex-col items-center justify-center md:flex-row w-full px-4 sm:px-6 md:px-10 py-10 max-w-screen-xl mx-auto">
         {/* Left Section */}
         <div className="w-full md:w-1/2 flex items-center justify-center mt-10 md:mt-0">
           <div className="max-w-xl text-center md:text-left">
             <h1 className="text-[var(--themeColor)] text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
               Next Generation DeFi Platform
             </h1>
             <p className="text-base sm:text-lg md:text-xl text-slate-300 pt-4">
               Trade, earn, and grow your digital assets with lightning-fast
               transactions and the lowest fees in the industry.
             </p>
 
             <div className="flex flex-col sm:flex-row gap-6 mt-8 items-center sm:items-start justify-center sm:justify-start">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-yellow-900/30">
                   <LuCoins className="text-yellow-400 text-2xl sm:text-3xl" />
                 </div>
                 <div>
                   <h3 className="gold-text text-xl text-[var(--themeColor)] sm:text-2xl font-bold">
                     $3.3T+
                   </h3>
                   <p className="text-gray-400 text-sm sm:text-md">
                     Total Value Locked
                   </p>
                 </div>
               </div>
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-yellow-900/30">
                   <FaArrowTrendUp className="text-yellow-400 text-2xl sm:text-3xl" />
                 </div>
                 <div>
                   <h3 className="gold-text text-xl text-[var(--themeColor)] sm:text-2xl font-bold">
                     560M+
                   </h3>
                   <p className="text-gray-400 text-sm sm:text-md">
                     Active Users
                   </p>
                 </div>
               </div>
             </div>
           </div>
         </div>
 
         {/* Right Section */}
         <div className="w-full md:w-1/2 flex justify-center items-center mt-10 md:mt-0">
           <div className="w-full max-w-[320px] sm:max-w-md h-[300px] sm:h-[400px]">
             <GlobeCanvas />
           </div>
         </div>
       </div>
     </AuroraHero>
);