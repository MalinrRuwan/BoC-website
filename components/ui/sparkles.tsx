"use client"
import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export type ParticlesProps = {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  refresh?: boolean
  color?: string
  particleColor?: string
  particleDensity?: number
  speed?: number
  direction?: "top" | "left" | "bottom" | "right" | "none"
  minSize?: number
  maxSize?: number
  minOpacity?: number
  maxOpacity?: number
  id?: string
  background?: string
}

export const SparklesCore = ({
  id,
  className,
  background,
  minSize = 0.4,
  maxSize = 1,
  speed = 1,
  particleColor = "#fff",
  particleDensity = 100,
  minOpacity = 0.1,
  maxOpacity = 1,
  ...props
}: ParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [particles, setParticles] = useState<any[]>([])
  const [animationId, setAnimationId] = useState<number | null>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      setContext(ctx)
    }

    return () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  useEffect(() => {
    if (context && canvasRef.current) {
      initializeParticles()
      animateParticles()
    }

    function initializeParticles() {
      const canvas = canvasRef.current!
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const particlesArray = []
      const particleCount = Math.floor((canvas.width * canvas.height) / (10000 / particleDensity))

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * (maxSize - minSize) + minSize
        const x = Math.random() * (canvas.width - size * 2)
        const y = Math.random() * (canvas.height - size * 2)
        const directionX = (Math.random() * 2 - 1) * speed * 0.1
        const directionY = (Math.random() * 2 - 1) * speed * 0.1
        const opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity

        particlesArray.push({
          x,
          y,
          size,
          directionX,
          directionY,
          opacity,
        })
      }

      setParticles(particlesArray)
    }

    function animateParticles() {
      if (!context || !canvasRef.current) return

      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

      particles.forEach((particle, index) => {
        // Update particle position
        particle.x += particle.directionX
        particle.y += particle.directionY

        // Boundary check
        if (particle.x < 0 || particle.x > canvasRef.current!.width) {
          particle.directionX = -particle.directionX
        }
        if (particle.y < 0 || particle.y > canvasRef.current!.height) {
          particle.directionY = -particle.directionY
        }

        // Draw particle
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fillStyle = `rgba(${hexToRgb(particleColor)}, ${particle.opacity})`
        context.fill()
      })

      const id = requestAnimationFrame(animateParticles)
      setAnimationId(id)
    }

    function hexToRgb(hex: string) {
      // Remove # if present
      hex = hex.replace(/^#/, "")

      // Parse hex values
      const bigint = Number.parseInt(hex, 16)
      const r = (bigint >> 16) & 255
      const g = (bigint >> 8) & 255
      const b = bigint & 255

      return `${r}, ${g}, ${b}`
    }

    window.addEventListener("resize", initializeParticles)

    return () => {
      window.removeEventListener("resize", initializeParticles)
      if (animationId !== null) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [context, particleColor, particleDensity, maxSize, minSize, speed, maxOpacity, minOpacity])

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={cn("absolute inset-0", className)}
      style={{
        background: background || "transparent",
      }}
    />
  )
}
