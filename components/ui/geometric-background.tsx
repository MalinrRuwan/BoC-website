"use client"

import { useEffect, useRef } from "react"

export function GeometricBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3 // Make it taller to cover the whole page
      drawGeometricPattern(ctx, canvas.width, canvas.height)
    }

    updateSize()
    window.addEventListener("resize", updateSize)

    return () => {
      window.removeEventListener("resize", updateSize)
    }
  }, [])

  const drawGeometricPattern = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Clear canvas with transparent background
    ctx.clearRect(0, 0, width, height)

    // Set line style - brighter and more visible
    ctx.strokeStyle = "rgba(59, 130, 246, 0.25)" // Increased opacity from 0.12 to 0.25
    ctx.lineWidth = 1.5 // Increased from 1 to 1.5

    // Draw circles of various sizes
    const circles = [
      // Large circles
      { x: width * 0.2, y: height * 0.2, radius: width * 0.3 },
      { x: width * 0.8, y: height * 0.7, radius: width * 0.25 },
      // Medium circles
      { x: width * 0.7, y: height * 0.3, radius: width * 0.15 },
      { x: width * 0.3, y: height * 0.6, radius: width * 0.18 },
      // Small circles
      { x: width * 0.5, y: height * 0.1, radius: width * 0.08 },
      { x: width * 0.1, y: height * 0.4, radius: width * 0.1 },
      { x: width * 0.9, y: height * 0.9, radius: width * 0.12 },
      { x: width * 0.4, y: height * 0.85, radius: width * 0.07 },
    ]

    // Draw circles
    circles.forEach((circle) => {
      ctx.beginPath()
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
      ctx.stroke()
    })

    // Draw intersecting lines
    const lines = [
      // Horizontal lines
      { x1: 0, y1: height * 0.15, x2: width, y2: height * 0.15 },
      { x1: 0, y1: height * 0.45, x2: width, y2: height * 0.45 },
      { x1: 0, y1: height * 0.75, x2: width, y2: height * 0.75 },

      // Diagonal lines
      { x1: 0, y1: 0, x2: width, y2: height * 0.7 },
      { x1: 0, y1: height * 0.3, x2: width, y2: height },
      { x1: width, y1: 0, x2: 0, y2: height * 0.6 },

      // Vertical lines
      { x1: width * 0.25, y1: 0, x2: width * 0.25, y2: height },
      { x1: width * 0.75, y1: 0, x2: width * 0.75, y2: height },
    ]

    lines.forEach((line) => {
      ctx.beginPath()
      ctx.moveTo(line.x1, line.y1)
      ctx.lineTo(line.x2, line.y2)
      ctx.stroke()
    })

    // Draw some dots at intersections - brighter
    const dots = [
      { x: width * 0.25, y: height * 0.15, radius: 4 }, // Increased radius from 3 to 4
      { x: width * 0.75, y: height * 0.15, radius: 4 },
      { x: width * 0.25, y: height * 0.45, radius: 4 },
      { x: width * 0.75, y: height * 0.45, radius: 4 },
      { x: width * 0.25, y: height * 0.75, radius: 4 },
      { x: width * 0.75, y: height * 0.75, radius: 4 },
    ]

    dots.forEach((dot) => {
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(59, 130, 246, 0.5)" // Increased opacity from 0.3 to 0.5
      ctx.fill()
    })
  }

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-[300vh] pointer-events-none z-0" />
}
