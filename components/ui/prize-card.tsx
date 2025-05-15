"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PrizeCardProps {
  position: number
  amount: string
  color: string
  className?: string
}

export function PrizeCard({ position, amount, color, className }: PrizeCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className={cn("relative p-8 rounded-xl overflow-hidden", className)}
    >
      {/* Background with gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur-sm border-2 rounded-xl"
        style={{ borderColor: color }}
      />

      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-20 rounded-xl"
        style={{ backgroundColor: color, filter: "blur(20px)" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center">
        <motion.div
          className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: color }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <span className="text-black font-bold text-xl">{position}</span>
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {position === 1 ? "1st place" : position === 2 ? "2nd place" : "3rd place"}
        </h3>
        <p className="text-xl font-bold" style={{ color }}>
          {amount}
        </p>
      </div>
    </motion.div>
  )
}
