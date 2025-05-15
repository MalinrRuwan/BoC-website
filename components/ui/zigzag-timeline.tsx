"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface TimelineEvent {
  id: number
  date: string
  title: string
  description?: string
}

export function ZigzagTimeline({ events }: { events: TimelineEvent[] }) {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number; id: number | null }>({
    x: 0,
    y: 0,
    id: null,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id,
    })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0, id: null })
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Center line - dashed */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0 border-l-2 border-dashed border-blue-500/40 transform -translate-x-1/2" />

      {events.map((event, index) => {
        const isEven = index % 2 === 0
        return (
          <div
            key={event.id}
            className={cn("relative flex items-center mb-16", isEven ? "flex-row" : "flex-row-reverse")}
          >
            {/* Connecting line with moving gradient */}
            <div className="flex-1 relative">
              <div
                className={cn(
                  "absolute top-1/2 h-0.5 bg-gradient-to-r from-blue-500/30 to-blue-300/30 transform -translate-y-1/2",
                  isEven ? "right-0 left-4" : "left-0 right-4",
                )}
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent",
                    isEven ? "animate-move-right" : "animate-move-left",
                  )}
                  style={{ width: "50%", opacity: 0.6 }}
                />
              </div>
            </div>

            {/* Center dot */}
            <div className="relative z-10 flex-shrink-0 w-8 h-8">
              <div className="absolute w-8 h-8 bg-blue-900 rounded-full opacity-20" />
              <motion.div
                className="absolute w-4 h-4 bg-blue-500 rounded-full left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  duration: 1.5,
                }}
              />
            </div>

            {/* Event box with cursor spotlight effect */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "mx-4 p-6 bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm rounded-lg border border-blue-500/20 shadow-lg shadow-blue-500/5 relative overflow-hidden",
                  isEven ? "text-left" : "text-right",
                )}
                onMouseMove={(e) => handleMouseMove(e, event.id)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Cursor spotlight effect */}
                {mousePosition.id === event.id && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: mousePosition.x,
                      top: mousePosition.y,
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                      transform: "translate(-50%, -50%)",
                      background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0) 70%)",
                      mixBlendMode: "screen",
                    }}
                  />
                )}
                <div className="relative z-10">
                  <div className="text-blue-300 text-sm mb-1">{event.date}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                  {event.description && <p className="text-blue-100/80">{event.description}</p>}
                </div>
              </motion.div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
