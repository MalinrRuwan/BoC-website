"use client";

import { useEffect, useRef } from "react";

export function GeometricBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions for proper parallax effect
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 3; // Much taller than viewport for parallax effect
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight * 3}px`;
      drawGeometricPattern(ctx, canvas.width, canvas.height);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const drawGeometricPattern = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    ctx.clearRect(0, 0, width, height);

    // Set line style - lowered opacity as requested
    ctx.strokeStyle = "rgba(59, 130, 246, 0.1)"; // Reduced opacity from 0.6 to 0.25
    ctx.lineWidth = 1.5; // Slightly thinner lines

    // Draw circles of various sizes
    const circles = [
      // Corners with larger radius to ensure they're visible
      { x: 0, y: 0, radius: Math.min(width, height) * 0.4 }, // Top-left
      { x: width, y: 0, radius: Math.min(width, height) * 0.4 }, // Top-right
      { x: 0, y: height, radius: Math.min(width, height) * 0.4 }, // Bottom-left
      { x: width, y: height, radius: Math.min(width, height) * 0.4 }, // Bottom-right

      // Additional circles throughout the page

    ];

    // Draw circles
    circles.forEach((circle) => {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Draw intersecting lines
    const lines = [
      // Horizontal lines
      { x1: 0, y1: height * 0.15, x2: width, y2: height * 0.15 },
      { x1: 0, y1: height * 0.45, x2: width, y2: height * 0.45 },
      { x1: 0, y1: height * 0.75, x2: width, y2: height * 0.75 },

      // Diagonal lines
      { x1: 0, y1: 0, x2: width, y2: height * 0.7 },
      { x1: 0, y1: height * 0.3, x2: width, y2: height },
      // { x1: width, y1: 0, x2: 0, y2: height * 0.6 },

      // Vertical lines
      { x1: width * 0.25, y1: 0, x2: width * 0.25, y2: height },
      { x1: width * 0.75, y1: 0, x2: width * 0.75, y2: height },
    ];

    lines.forEach((line) => {
      ctx.beginPath();
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
      ctx.stroke();
    });
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    />
  );
}
