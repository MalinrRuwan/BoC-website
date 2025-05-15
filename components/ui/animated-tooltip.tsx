"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Image from "next/image"

export const AnimatedTooltip = ({
  items,
  className,
}: {
  items: {
    id: number
    name: string
    designation: string
    image: string
  }[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn("flex flex-wrap justify-center gap-4", className)}>
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-blue-500/50">
            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
          </div>
          {hoveredIndex === idx && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center"
            >
              <div className="px-4 py-2 bg-black/80 backdrop-blur-sm rounded-lg text-center">
                <p className="text-white font-medium">{item.name}</p>
                <p className="text-blue-300 text-xs">{item.designation}</p>
              </div>
              <div className="w-4 h-4 bg-black/80 backdrop-blur-sm rotate-45 -mt-2" />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  )
}
