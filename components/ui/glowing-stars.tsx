"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export function GlowingStarsBackgroundCard({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; opacity: number }>>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      const newStars = []
      const starCount = 20

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.7 + 0.3,
        })
      }

      setStars(newStars)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-xl border border-blue-900/20 bg-black/20 backdrop-blur-sm p-6",
        className,
      )}
    >
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-blue-400"
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animation: `twinkle ${Math.random() * 5 + 3}s infinite ${Math.random() * 5}s`,
          }}
        />
      ))}
      <div className="relative z-10">{children}</div>
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
