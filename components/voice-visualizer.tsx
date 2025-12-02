"use client"

import { useEffect, useState } from "react"

interface VoiceVisualizerProps {
  isActive: boolean
}

export function VoiceVisualizer({ isActive }: VoiceVisualizerProps) {
  const [bars, setBars] = useState<number[]>([20, 40, 30, 50, 25, 45, 35, 55, 30])

  useEffect(() => {
    if (!isActive) {
      setBars([20, 20, 20, 20, 20, 20, 20, 20, 20])
      return
    }

    const interval = setInterval(() => {
      setBars(Array.from({ length: 9 }, () => Math.floor(Math.random() * 60) + 20))
    }, 100)

    return () => clearInterval(interval)
  }, [isActive])

  return (
    <div className="flex items-center justify-center gap-1 h-16">
      {bars.map((height, index) => (
        <div
          key={index}
          className={`w-1.5 rounded-full transition-all duration-100 ${isActive ? "bg-primary" : "bg-muted"}`}
          style={{
            height: `${height}%`,
          }}
        />
      ))}
    </div>
  )
}
