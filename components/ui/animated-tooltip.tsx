"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";

export const AnimatedTooltip = ({
  items,
  className = "",
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-10, 10]),
    springConfig,
  );
  
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-10, 10]),
    springConfig,
  );
  
  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };
  return (
    <div className={`inline-flex flex-wrap -space-x-2 lg:-space-x-3 ${className}`}>
      {items.map((item, idx) => (
        <div
          className="group relative hover:z-30"
          key={item.id}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >          {/* Tooltip container - positioned with proper containment */}
          <div className="absolute bottom-[100%] left-1/2 -translate-x-1/2 mb-2 z-40 w-max max-w-[150px] pointer-events-none" style={{maxWidth: "calc(100vw - 32px)"}}>
            <AnimatePresence>
              {hoveredIndex === item.id && (                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 10,
                    },
                  }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  style={{
                    translateX: translateX,
                    rotate: rotate,
                    transformOrigin: "bottom center",
                    willChange: "transform"
                  }}
                  className="flex flex-col items-center justify-center rounded-md bg-slate-800/95 backdrop-blur-sm border border-slate-600/50 px-4 py-2 text-xs shadow-xl"
                >
                  <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                  <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                  <div className="absolute left-1/2 -bottom-2 z-30 h-4 w-4 -translate-x-1/2 rotate-45 bg-slate-800/95 border-r border-b border-slate-600/50"></div>
                  <div className="relative z-30 text-sm font-bold text-white truncate w-full text-center">
                    {item.name}
                  </div>
                  <div className={`text-xs truncate w-full text-center ${
                    item.designation.includes("Head") ? "text-blue-400" : "text-slate-300"
                  }`}>
                    {item.designation}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            {item.designation.includes("Head") && (
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur opacity-60"></div>
            )}
            <Image
              onMouseMove={handleMouseMove}
              height={item.designation.includes("Head") ? 80 : 64}
              width={item.designation.includes("Head") ? 80 : 64}
              src={item.image}
              alt={item.name}
              priority={item.designation.includes("Head")}
              placeholder="blur"
              blurDataURL={item.image}
              className={`relative rounded-full object-cover object-top transition duration-500 group-hover:z-30 group-hover:scale-110 ${
                item.designation.includes("Head")
                  ? "h-20 w-20 lg:h-18 lg:w-18 border-2 border-blue-400 shadow-lg shadow-blue-400/30"
                  : "h-16 w-16 lg:h-14 lg:w-14 border-2 border-white/30 hover:border-slate-300"
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
