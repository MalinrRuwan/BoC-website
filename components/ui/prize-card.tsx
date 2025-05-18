"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import SpotlightCard from "./spotlight-card";
import { HTMLProps } from "react";
import { AuroraBackground } from "./aurora-background";

interface PrizeCardProps {
  position: number;
  amount: string;
  color: string;
  className?: HTMLProps<HTMLElement>["className"];
  cardClassName?: HTMLProps<HTMLElement>["className"];
}

export function PrizeCard({
  position,
  amount,
  color,
  className,
  cardClassName
}: PrizeCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={cn("relative p-8 rounded-xl overflow-hidden", className)}
    >
      {/* Content */}
      <SpotlightCard
        className={cn(
          `border-2  sm:p-12  ${className}`,
          cardClassName
        )}
        spotlightColor={color}
      >
        <div className="relative z-10 text-center">
          <motion.div
            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: color }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <span className="text-black font-bold text-xl">{position}</span>
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-2">
            {position === 1
              ? "1st place"
              : position === 2
              ? "2nd place"
              : "3rd place"}
          </h3>
          <p className="text-2xl font-bold" style={{ color }}>
            {amount}
          </p>
          <p> +</p>
          <p>Digital Certificates</p>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
