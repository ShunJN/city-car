"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedFadeInProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  className?: string
  duration?: number
  once?: boolean
}

export default function AnimatedFadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  duration = 0.5,
  once = true,
}: AnimatedFadeInProps) {
  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: 40, x: 0 }
      case "down":
        return { y: -40, x: 0 }
      case "left":
        return { x: 40, y: 0 }
      case "right":
        return { x: -40, y: 0 }
      case "none":
        return { x: 0, y: 0 }
      default:
        return { y: 40, x: 0 }
    }
  }

  const directionOffset = getDirectionOffset()

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay }}
      viewport={{ once }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
