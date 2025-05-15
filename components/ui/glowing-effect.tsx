"use client"

import { useEffect, useRef, useState } from "react"

interface GlowingEffectProps {
  spread?: number
  glow?: boolean
  disabled?: boolean
  proximity?: number
  inactiveZone?: number
  className?: string
}

export function GlowingEffect({
  spread = 40,
  glow = true,
  disabled = false,
  proximity = 64,
  inactiveZone = 0.01,
  className,
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const [size, setSize] = useState(0)

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current || disabled) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if mouse is within the element
    const isWithinElement = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height

    if (isWithinElement) {
      // Calculate distance from center
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const distanceFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))
      const maxDistance = Math.sqrt(Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2))

      // Normalize distance (0 to 1)
      const normalizedDistance = distanceFromCenter / maxDistance

      // If within active zone
      if (normalizedDistance > inactiveZone) {
        setPosition({ x, y })
        setOpacity(1)
        setSize(spread)
      } else {
        setOpacity(0)
      }
    } else {
      setOpacity(0)
    }
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  useEffect(() => {
    const element = containerRef.current
    if (!element || disabled) return

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [disabled])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <div
        className={`pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400 ${
          glow ? "blur-xl" : ""
        }`}
        style={{
          left: position.x,
          top: position.y,
          width: size,
          height: size,
          opacity: opacity * 0.5,
          transition: "opacity 0.15s ease, width 0.15s ease, height 0.15s ease",
        }}
      />
    </div>
  )
}
