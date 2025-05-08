"use client"
import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export const HoverBorderGradient = ({
  children,
  containerClassName,
  className,
  as: Tag = "div",
  ...props
}: {
  children: React.ReactNode
  containerClassName?: string
  className?: string
  as?: React.ElementType
  [key: string]: any
}) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={cn("relative rounded-lg p-[1px] overflow-hidden", containerClassName)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          maskImage: "radial-gradient(circle at center, transparent 50%, black 75%)",
          WebkitMaskImage: "radial-gradient(circle at center, transparent 50%, black 75%)",
        }}
      />
      <Tag className={cn("relative z-10", className)} {...props}>
        {children}
      </Tag>
    </div>
  )
}
