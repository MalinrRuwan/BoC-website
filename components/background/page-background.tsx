"use client"

import { GeometricBackground } from "@/components/ui/geometric-background"
import { GradientOverlay } from "@/components/ui/gradient-overlay"

export function PageBackground() {
  return (
    <>
      <div className="fixed inset-0 bg-[#020817] z-0"></div>
      <GeometricBackground />
      <GradientOverlay />
    </>
  )
}
