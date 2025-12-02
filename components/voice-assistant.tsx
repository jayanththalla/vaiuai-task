"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Mic, MicOff, Volume2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConversationHistory } from "@/components/conversation-history"
import { VoiceVisualizer } from "@/components/voice-visualizer"
import { extractCityFromQuery, getWeatherData, type WeatherData } from "@/lib/weather"
import type { SpeechRecognition, SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from "web-speech-api"
import Image from "next/image"

// Message type for conversation
export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  weather?: WeatherData
}

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [transcript, setTranscript] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSupported, setIsSupported] = useState(true)

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  // Text-to-speech function
  const speak = useCallback((text: string) => {
    if (!synthRef.current) return

    // Cancel any ongoing speech
    synthRef.current.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1
    utterance.pitch = 1
    utterance.volume = 1

    // Try to use a natural sounding voice
    const voices = synthRef.current.getVoices()
    const preferredVoice = voices.find((voice) => voice.name.includes("Google") || voice.name.includes("Natural"))
    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    synthRef.current.speak(utterance)
  }, [])

  // Generate natural language response
  const generateWeatherResponse = useCallback((weather: WeatherData, query: string): string => {
    const isTomorrow = query.toLowerCase().includes("tomorrow")
    const isRainQuery = query.toLowerCase().includes("rain")

    if (isTomorrow && weather.forecast) {
      const forecast = weather.forecast
      if (isRainQuery) {
        return `Tomorrow in ${weather.city}, there's a ${forecast.rainChance}% chance of rain with temperatures around ${forecast.temp}°C. ${forecast.rainChance > 50 ? "You might want to carry an umbrella!" : "Looks like it should be mostly dry."}`
      }
      return `Tomorrow in ${weather.city}, expect ${forecast.description} with temperatures around ${forecast.temp}°C. ${forecast.rainChance > 0 ? `There's a ${forecast.rainChance}% chance of rain.` : ""}`
    }

    const tempComment =
      weather.temp > 30
        ? "It's quite hot out there!"
        : weather.temp > 20
          ? "It's a nice comfortable temperature."
          : weather.temp > 10
            ? "It's a bit cool, you might want a jacket."
            : "It's quite cold, bundle up!"

    return `The weather in ${weather.city} is currently ${weather.temp}°C and ${weather.description}. ${tempComment} The humidity is at ${weather.humidity}% with winds at ${weather.windSpeed} km/h.`
  }, [])

  // Handle user's voice query
  const handleUserQuery = useCallback(
    async (query: string) => {
      setIsProcessing(true)
      setError(null)
      setTranscript("")

      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: query,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMessage])

      try {
        // Extract city from the query
        const city = extractCityFromQuery(query)

        if (!city) {
          const errorResponse =
            "I couldn't identify a city in your request. Please try asking something like 'What's the weather in Mumbai?' or 'How's the weather in New York?'"

          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: errorResponse,
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, assistantMessage])
          speak(errorResponse)
          setIsProcessing(false)
          return
        }

        // Fetch weather data
        const weatherData = await getWeatherData(city)

        // Generate natural response
        const response = generateWeatherResponse(weatherData, query)

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
          timestamp: new Date(),
          weather: weatherData,
        }

        setMessages((prev) => [...prev, assistantMessage])
        speak(response)
      } catch (err) {
        console.error("Error processing query:", err)
        const errorMessage =
          err instanceof Error ? err.message : "Sorry, I couldn't fetch the weather data. Please try again."

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: errorMessage,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
        speak(errorMessage)
      } finally {
        setIsProcessing(false)
      }
    },
    [speak, generateWeatherResponse],
  )

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check for browser support
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

      if (!SpeechRecognitionAPI) {
        setIsSupported(false)
        setError("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.")
        return
      }

      const recognition = new SpeechRecognitionAPI()
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const current = event.resultIndex
        const result = event.results[current]
        const transcriptText = result[0].transcript
        setTranscript(transcriptText)

        if (result.isFinal) {
          handleUserQuery(transcriptText)
        }
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error)
        setIsListening(false)

        if (event.error === "no-speech") {
          setError("No speech detected. Please try again.")
        } else if (event.error === "audio-capture") {
          setError("No microphone found. Please check your microphone.")
        } else if (event.error === "not-allowed") {
          setError("Microphone access denied. Please allow microphone access.")
        } else {
          setError(`Error: ${event.error}`)
        }
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
      synthRef.current = window.speechSynthesis
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [handleUserQuery])

  // Toggle listening
  const toggleListening = () => {
    if (!recognitionRef.current || !isSupported) return

    if (isListening) {
      recognitionRef.current.abort()
      setIsListening(false)
      setTranscript("")
    } else {
      setError(null)
      setTranscript("")
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch (err) {
        console.error("Error starting recognition:", err)
        setError("Failed to start listening. Please try again.")
      }
    }
  }

  // Stop speaking
  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <Image src="/images/hero-bg.jpg" alt="" fill className="object-cover opacity-20" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>

      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-primary/20">
              <Image
                src="/images/weather-logo.jpg"
                alt="Vaiu Weather Assistant Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Vaiu Weather Assistant</h1>
              <p className="text-xs text-muted-foreground">Voice-powered weather updates</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isSpeaking && (
              <Button variant="ghost" size="sm" onClick={stopSpeaking} className="text-muted-foreground">
                <Volume2 className="w-4 h-4 mr-2 animate-pulse" />
                Speaking...
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-6 flex flex-col relative z-10">
        {/* Conversation History */}
        <div className="flex-1 overflow-y-auto mb-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="relative w-32 h-32 mb-6">
                <Image
                  src="/images/weather-illustration.jpg"
                  alt="Weather Illustration"
                  width={128}
                  height={128}
                  className="rounded-full ring-4 ring-primary/20 object-cover"
                />
                <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full overflow-hidden ring-2 ring-background">
                  <Image src="/images/mic-icon.jpg" alt="Microphone" width={48} height={48} className="object-cover" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Voice Weather Assistant</h2>
              <p className="text-muted-foreground max-w-md mb-8">
                Click the microphone button and ask about the weather in any city. Try saying: &quot;What&apos;s the
                weather in Mumbai?&quot;
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full">
                {[
                  { query: "What's the weather in Mumbai?", city: "Mumbai", image: "/images/cities/mumbai.jpg" },
                  { query: "How about Bangalore?", city: "Bangalore", image: "/images/cities/bangalore.jpg" },
                  { query: "Will it rain in Pune tomorrow?", city: "Pune", image: "/images/cities/pune.jpg" },
                ].map((example, i) => (
                  <button
                    key={i}
                    onClick={() => handleUserQuery(example.query)}
                    className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10"
                  >
                    <div className="absolute inset-0">
                      <Image
                        src={example.image || "/placeholder.svg"}
                        alt={example.city}
                        fill
                        className="object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
                    </div>
                    <div className="relative p-4 text-left">
                      <p className="text-xs text-primary font-medium mb-1">{example.city}</p>
                      <p className="text-sm text-foreground">&quot;{example.query}&quot;</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <ConversationHistory messages={messages} />
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}

        {/* Voice Input Section */}
        <div className="border-t border-border pt-6 bg-background/50 backdrop-blur-sm rounded-t-2xl">
          {/* Transcript Preview */}
          {transcript && (
            <div className="mb-4 p-4 rounded-xl bg-card border border-border">
              <p className="text-sm text-muted-foreground mb-1">Listening...</p>
              <p className="text-foreground">{transcript}</p>
            </div>
          )}

          {/* Voice Visualizer */}
          <VoiceVisualizer isActive={isListening} />

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              onClick={toggleListening}
              disabled={!isSupported || isProcessing}
              size="lg"
              className={`w-16 h-16 rounded-full transition-all duration-300 ${
                isListening ? "bg-destructive hover:bg-destructive/90 scale-110" : "bg-primary hover:bg-primary/90"
              }`}
            >
              {isProcessing ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : isListening ? (
                <MicOff className="w-6 h-6" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-4">
            {isListening
              ? "Listening... Speak now"
              : isProcessing
                ? "Processing your request..."
                : "Click to start speaking"}
          </p>
        </div>
      </div>

      <footer className="relative z-10 border-t border-border bg-card/50 backdrop-blur-sm py-4">
        <div className="container mx-auto px-4 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex justify-center items-center gap-2">
            <Image src="/images/weather-logo.jpg" alt="Vaiu" width={20} height={20} className="rounded" />
            <span>Vaiu Weather Assistant</span>
          </div>
          <div className="flex justify-center items-center gap-2 w-full">
            <p>&copy; {new Date().getFullYear()} Vaiu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
