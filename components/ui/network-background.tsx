"use client"

import { useEffect, useRef, useState } from "react"

interface Node {
  x: number
  y: number
  radius: number
  vx: number
  vy: number
  connected: boolean
}

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const nodesRef = useRef<Node[]>([])
  const animationRef = useRef<number>()

  // Initialize nodes and canvas
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== "undefined") {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight * 3, // Make it taller to cover the whole page
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Create nodes when dimensions change
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const nodeCount = Math.floor((dimensions.width * dimensions.height) / 25000) // Adjust density here
    const nodes: Node[] = []

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        connected: false,
      })
    }

    nodesRef.current = nodes
  }, [dimensions])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Draw connections
      ctx.strokeStyle = "rgba(14, 165, 233, 0.15)"
      ctx.lineWidth = 0.5

      const nodes = nodesRef.current
      const connectionDistance = Math.min(dimensions.width, dimensions.height) * 0.07

      // Reset connected status
      nodes.forEach((node) => {
        node.connected = false
      })

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i]

        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j]
          const dx = nodeA.x - nodeB.x
          const dy = nodeA.y - nodeB.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            // Opacity based on distance
            const opacity = 1 - distance / connectionDistance
            ctx.strokeStyle = `rgba(14, 165, 233, ${opacity * 0.15})`

            ctx.beginPath()
            ctx.moveTo(nodeA.x, nodeA.y)
            ctx.lineTo(nodeB.x, nodeB.y)
            ctx.stroke()

            nodeA.connected = true
            nodeB.connected = true
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        // Update position
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > dimensions.width) node.vx = -node.vx
        if (node.y < 0 || node.y > dimensions.height) node.vy = -node.vy

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)

        // Connected nodes are brighter
        if (node.connected) {
          ctx.fillStyle = "rgba(14, 165, 233, 0.6)"
        } else {
          ctx.fillStyle = "rgba(14, 165, 233, 0.3)"
        }

        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions])

  if (dimensions.width === 0 || dimensions.height === 0) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="absolute top-0 left-0 w-full h-[300vh] pointer-events-none z-0 opacity-70"
    />
  )
}
