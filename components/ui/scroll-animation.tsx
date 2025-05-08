"use client"

import React from "react"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

export function ScrollAnimation({
  children,
  direction = "up",
  delay = 0,
  className,
  ...props
}: {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  className?: string
  [key: string]: any
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const directionValues = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: directionValues[direction].y,
        x: directionValues[direction].x,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              x: 0,
              transition: {
                duration: 0.8,
                ease: "easeOut",
                delay,
              },
            }
          : {}
      }
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function ParallaxScroll({
  children,
  speed = 0.5,
  className,
  ...props
}: {
  children: React.ReactNode
  speed?: number
  className?: string
  [key: string]: any
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])

  return (
    <motion.div ref={ref} style={{ y }} className={className} {...props}>
      {children}
    </motion.div>
  )
}

export function ScaleOnScroll({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
  [key: string]: any
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1])

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className} {...props}>
      {children}
    </motion.div>
  )
}

export function StaggeredList({
  children,
  staggerAmount = 0.1,
  className,
  ...props
}: {
  children: React.ReactNode
  staggerAmount?: number
  className?: string
  [key: string]: any
}) {
  return (
    <motion.div
      className={className}
      {...props}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: staggerAmount,
          },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
