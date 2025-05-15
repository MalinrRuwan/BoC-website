"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string
    link: string
  }[]
  className?: string
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [activeItem, setActiveItem] = useState("")
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Hide navbar on scroll down, show on scroll up
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY <= 0 || currentScrollY < lastScrollY)
      setLastScrollY(currentScrollY)

      // Update active section based on scroll position
      const sections = document.querySelectorAll("section")
      let currentSection = ""

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
          currentSection = section.id
        }
      })

      setActiveItem(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 inset-x-0 z-50 flex justify-center"
        >
          <div
            className={cn(
              "px-6 py-3 rounded-full bg-gradient-to-r from-blue-900/40 to-blue-600/40 backdrop-blur-md border border-blue-500/20 shadow-lg shadow-blue-500/10",
              className,
            )}
          >
            <nav className="flex items-center justify-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  className={cn(
                    "text-sm font-medium px-3 py-2 rounded-md transition-colors relative",
                    activeItem === item.link.replace("#", "") ? "text-white" : "text-blue-100 hover:text-white",
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    const targetId = item.link.replace("#", "")
                    const targetElement = document.getElementById(targetId)
                    if (targetElement) {
                      window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: "smooth",
                      })
                    }
                  }}
                >
                  {item.name}
                  {activeItem === item.link.replace("#", "") && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
