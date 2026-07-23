"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface AnimatedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  delay?: number
  duration?: number
  once?: boolean
}

export default function AnimatedImage({
  src,
  alt,
  width,
  height,
  className = "",
  delay = 0,
  duration = 0.7,
  once = true,
}: AnimatedImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay }}
      viewport={{ once }}
      className={`overflow-hidden ${className}`}
    >
      {width && height ? (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      ) : (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      )}
    </motion.div>
  )
}
