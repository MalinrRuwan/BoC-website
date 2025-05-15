"use client"

import { useEffect, useRef } from "react"

interface CloudNode {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  connections: number[]
}

export function CloudNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<CloudNode[]>([])
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3 // Make it taller to cover the whole page

      // Create nodes
      const nodeCount = Math.floor((canvas.width * canvas.height) / 30000)
      const nodes: CloudNode[] = []

      for (let i = 0; i < nodeCount; i++) {
        const node: CloudNode = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.1,
          speed: Math.random() * 0.2 + 0.1,
          connections: [],
        }

        // Find connections (closest nodes)
        const connectionCount = Math.floor(Math.random() * 3) + 1
        nodes.push(node)
      }

      // Calculate connections for each node
      nodes.forEach((node, index) => {
        const distances: { index: number; distance: number }[] = []

        nodes.forEach((otherNode, otherIndex) => {
          if (index !== otherIndex) {
            const dx = node.x - otherNode.x
            const dy = node.y - otherNode.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            distances.push({ index: otherIndex, distance })
          }
        })

        // Sort by distance and take the closest few
        distances.sort((a, b) => a.distance - b.distance)
        const connectionCount = Math.floor(Math.random() * 3) + 1
        node.connections = distances.slice(0, connectionCount).map((d) => d.index)
      })

      nodesRef.current = nodes
    }

    updateSize()
    window.addEventListener("resize", updateSize)

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY + window.scrollY, // Adjust for scroll
        active: true,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections first (lines behind nodes)
      ctx.lineWidth = 0.5

      nodesRef.current.forEach((node, index) => {
        // Update position - gentle floating motion
        node.y -= node.speed
        if (node.y < -10) node.y = canvas.height + 10

        // Draw connections
        node.connections.forEach((connIndex) => {
          const connectedNode = nodesRef.current[connIndex]
          const dx = node.x - connectedNode.x
          const dy = node.y - connectedNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Only draw if within reasonable distance
          if (distance < canvas.width * 0.15) {
            const opacity = Math.max(0.05, 0.2 - distance / (canvas.width * 0.15))
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`

            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(connectedNode.x, connectedNode.y)
            ctx.stroke()
          }
        })
      })

      // Draw nodes
      nodesRef.current.forEach((node) => {
        // Check if mouse is near
        let glowEffect = 0
        if (mouseRef.current.active) {
          const dx = node.x - mouseRef.current.x
          const dy = node.y - mouseRef.current.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            glowEffect = 1 - distance / 150
          }
        }

        // Draw glow if mouse is near
        if (glowEffect > 0) {
          ctx.beginPath()
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 10)
          gradient.addColorStop(0, `rgba(59, 130, 246, ${0.5 * glowEffect})`)
          gradient.addColorStop(1, "rgba(59, 130, 246, 0)")
          ctx.fillStyle = gradient
          ctx.arc(node.x, node.y, node.size * 10, 0, Math.PI * 2)
          ctx.fill()
        }

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${node.opacity + glowEffect * 0.5})`
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateSize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-[300vh] pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
