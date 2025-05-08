"use client"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export const BackgroundBeams = ({
  className,
  ...props
}: {
  className?: string
}) => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasDimensions, setCanvasDimensions] = useState<{
    width: number
    height: number
  }>({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const updateCanvasDimensions = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        setCanvasDimensions({
          width: rect.width,
          height: rect.height,
        })
      }
    }

    // Update dimensions initially and on resize
    updateCanvasDimensions()
    window.addEventListener("resize", updateCanvasDimensions)

    return () => {
      window.removeEventListener("resize", updateCanvasDimensions)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    // Clear the canvas
    context.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height)

    // Draw beams emanating from mouse position
    const numBeams = 12
    const beamLength = Math.max(canvasDimensions.width, canvasDimensions.height) * 1.5

    for (let i = 0; i < numBeams; i++) {
      const angle = (i * Math.PI * 2) / numBeams
      const startX = mousePosition.x
      const startY = mousePosition.y
      const endX = startX + Math.cos(angle) * beamLength
      const endY = startY + Math.sin(angle) * beamLength

      // Create gradient
      const gradient = context.createLinearGradient(startX, startY, endX, endY)
      gradient.addColorStop(0, "rgba(14, 165, 233, 0.5)") // Blue at center
      gradient.addColorStop(1, "rgba(14, 165, 233, 0)") // Transparent at edges

      context.beginPath()
      context.moveTo(startX, startY)
      context.lineTo(endX, endY)
      context.strokeStyle = gradient
      context.lineWidth = 2
      context.stroke()
    }
  }, [mousePosition, canvasDimensions])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 z-0", className)}
      width={canvasDimensions.width}
      height={canvasDimensions.height}
      {...props}
    />
  )
}
