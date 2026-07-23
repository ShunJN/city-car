"use client"

import { useEffect, useRef } from "react"

interface QRCodeProps {
  value: string
  size?: number
  className?: string
}

export default function QRCode({ value, size = 100, className = "" }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = size
    canvas.height = size

    // Clear canvas
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, size, size)

    // Draw QR code pattern (simplified)
    ctx.fillStyle = "#000000"
    const moduleSize = size / 25

    // Draw finder patterns (corners)
    const drawFinderPattern = (x: number, y: number) => {
      // Outer square
      ctx.fillRect(x * moduleSize, y * moduleSize, 7 * moduleSize, 7 * moduleSize)
      ctx.fillStyle = "#ffffff"
      ctx.fillRect((x + 1) * moduleSize, (y + 1) * moduleSize, 5 * moduleSize, 5 * moduleSize)
      ctx.fillStyle = "#000000"
      ctx.fillRect((x + 2) * moduleSize, (y + 2) * moduleSize, 3 * moduleSize, 3 * moduleSize)
    }

    drawFinderPattern(0, 0) // Top-left
    drawFinderPattern(18, 0) // Top-right
    drawFinderPattern(0, 18) // Bottom-left

    // Draw some data modules (random pattern for visual effect)
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        // Skip finder patterns
        if ((i < 9 && j < 9) || (i < 9 && j > 15) || (i > 15 && j < 9) || (i > 15 && j > 15 && i < 21 && j < 21)) {
          continue
        }

        // Random pattern for demonstration
        if (Math.random() > 0.5) {
          ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize)
        }
      }
    }

    // Draw timing patterns
    for (let i = 8; i < 17; i++) {
      if (i % 2 === 0) {
        ctx.fillRect(i * moduleSize, 6 * moduleSize, moduleSize, moduleSize)
        ctx.fillRect(6 * moduleSize, i * moduleSize, moduleSize, moduleSize)
      }
    }
  }, [value, size])

  return <canvas ref={canvasRef} className={className} />
}
