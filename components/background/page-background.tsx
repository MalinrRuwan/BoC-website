"use client";

import { useEffect, useRef, useState } from "react";
import { GeometricBackground } from "@/components/ui/geometric-background";
import { AuroraBackground } from "../ui/aurora-background";

export function PageBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);
  
  // Set the height after component mounts
  useEffect(() => {
    setHeight(window.outerHeight);
  }, []);

  // Implement our own parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      // Calculate the parallax offset based on scroll position
      const scrollY = window.scrollY;
      const offset = scrollY * 0.2; // Lower number = slower parallax

      // Apply the transform
      containerRef.current.style.transform = `translateY(-${offset}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#020817]">
      {/* Geometric background with manual parallax */}
      <div
        ref={containerRef}
        className="absolute inset-0"        style={{
          zIndex: 5,
          height: height || "100vh", // Use state value, fallback to 100vh
        }}
      >
        <GeometricBackground />
      </div>

      {/* Aurora effect with reduced opacity */}
      <AuroraBackground
        className="absolute inset-0 opacity-10 pointer-events-none"
        showRadialGradient={true}
        style={{ zIndex: 10 }}
      >
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-transparent to-black/80" />
      </AuroraBackground>
    </div>
  );
}
