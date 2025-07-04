"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const AnimatedTestimonials = ({ testimonials, autoplay = false }) => {
  const [active, setActive] = useState(0);
  const [autoplayStarted, setAutoplayStarted] = useState(false);
  const intervalRef = useRef(null);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  useEffect(() => {
    if (autoplay && autoplayStarted) {
      intervalRef.current = setInterval(handleNext, 3000);
      return () => clearInterval(intervalRef.current);
    }
  }, [autoplayStarted]);

  return (
    <div className="w-full max-w-5xl h-auto min-h-screen flex justify-center items-center mx-auto py-8 sm:py-16">
      <div className="flex gap-4 sm:gap-6 w-10/12 sm:w-2/5">
        {testimonials.map((testimonial, index) => {
          const isActive = index === active;

          return (
            <motion.div
              key={testimonial.src}
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: isActive ? 1 : 0.95,
                y: isActive ? [0, -10, 0] : 0,
              }}
              whileHover={{
                scale: 1.05,
                rotate: 1.5,
                boxShadow: "0px 15px 30px rgba(0,0,0,0.2)",
                zIndex: 50,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onMouseEnter={() => setAutoplakStarted(true)}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center text-center p-3 sm:p-4 bg-[#9f833f] dark:bg-neutral-900 rounded-xl sm:rounded-2xl shadow-md w-full"
            >
              <div className="relative w-full h-40 sm:h-60 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={testimonial.src}
                  alt={testimonial.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="mt-3 text-lg sm:text-xl md:text-2xl font-bold text-black dark:text-white">
                {testimonial.name}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-dark dark:text-neutral-400">
                {testimonial.designation}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};