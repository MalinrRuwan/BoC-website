"use client"
import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
}: {
  text?: string
  revealText?: string
  children?: React.ReactNode
  className?: string
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-blue-900/20 bg-black/20 backdrop-blur-sm p-6",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10">{children}</div>
      <div
        className="absolute inset-0 z-0 bg-gradient-to-br from-blue-500/20 to-blue-900/20"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
    </div>
  )
}

export const TextRevealCardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <h3 className={cn("text-xl font-bold text-white mb-2", className)}>{children}</h3>
}

export const TextRevealCardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <p className={cn("text-sm text-blue-200", className)}>{children}</p>
}
