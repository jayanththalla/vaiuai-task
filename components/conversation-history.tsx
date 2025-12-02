"use client"

import { useEffect, useRef } from "react"
import type { Message } from "@/components/voice-assistant"
import { WeatherCard } from "@/components/weather-card"
import Image from "next/image"

interface ConversationHistoryProps {
  messages: Message[]
}

export function ConversationHistory({ messages }: ConversationHistoryProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div ref={containerRef} className="space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
          {message.role === "assistant" && (
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/20">
              <Image
                src="/images/assistant-avatar.jpg"
                alt="Assistant"
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          <div className={`max-w-[80%] ${message.role === "user" ? "order-first" : ""}`}>
            <div
              className={`rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-card border border-border rounded-bl-md"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>

            {/* Weather Card for assistant messages with weather data */}
            {message.role === "assistant" && message.weather && (
              <div className="mt-3">
                <WeatherCard weather={message.weather} />
              </div>
            )}

            <p className={`text-xs text-muted-foreground mt-1 ${message.role === "user" ? "text-right" : ""}`}>
              {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {message.role === "user" && (
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-secondary">
              <Image
                src="/images/user-avatar.jpg"
                alt="You"
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
