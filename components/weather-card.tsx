"use client"

import { Droplets, Wind, Thermometer, Eye, CloudRain } from "lucide-react"
import type { WeatherData } from "@/lib/weather"
import Image from "next/image"

interface WeatherCardProps {
  weather: WeatherData
}

function getWeatherImage(condition: string): string {
  const lowerCondition = condition.toLowerCase()

  if (lowerCondition.includes("thunder") || lowerCondition.includes("storm")) {
    return "/images/weather/thunderstorm.jpg"
  }
  if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle")) {
    return "/images/weather/rainy.jpg"
  }
  if (lowerCondition.includes("snow")) {
    return "/images/weather/snow.jpg"
  }
  if (lowerCondition.includes("cloud") || lowerCondition.includes("overcast")) {
    return "/images/weather/cloudy.jpg"
  }
  if (lowerCondition.includes("clear") || lowerCondition.includes("sunny")) {
    return "/images/weather/sunny.jpg"
  }

  return "/images/weather/cloudy.jpg"
}

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden">
      <div className="relative h-32">
        <Image
          src={getWeatherImage(weather.description) || "/placeholder.svg"}
          alt={weather.description}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Current Weather</p>
        </div>
      </div>

      {/* Main Weather Info */}
      <div className="p-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">{weather.city}</h3>
          <p className="text-muted-foreground capitalize">{weather.description}</p>
          <p className="text-4xl font-bold text-foreground mt-2">{weather.temp}°C</p>
          {weather.feelsLike && <p className="text-sm text-muted-foreground">Feels like {weather.feelsLike}°C</p>}
        </div>
        <div className="w-16 h-16 rounded-xl overflow-hidden ring-2 ring-border">
          <Image
            src={getWeatherImage(weather.description) || "/placeholder.svg"}
            alt={weather.description}
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-secondary/30 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Droplets className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Humidity</p>
            <p className="text-sm font-medium text-foreground">{weather.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Wind className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Wind</p>
            <p className="text-sm font-medium text-foreground">{weather.windSpeed} km/h</p>
          </div>
        </div>

        {weather.visibility && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Eye className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Visibility</p>
              <p className="text-sm font-medium text-foreground">{weather.visibility} km</p>
            </div>
          </div>
        )}

        {weather.pressure && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Thermometer className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pressure</p>
              <p className="text-sm font-medium text-foreground">{weather.pressure} hPa</p>
            </div>
          </div>
        )}
      </div>

      {/* Forecast Section (if available) */}
      {weather.forecast && (
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-3">Tomorrow&apos;s Forecast</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden ring-1 ring-border">
                <Image
                  src={getWeatherImage(weather.forecast.description) || "/placeholder.svg"}
                  alt={weather.forecast.description}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground capitalize">{weather.forecast.description}</p>
                <p className="text-lg font-bold text-foreground">{weather.forecast.temp}°C</p>
              </div>
            </div>
            {weather.forecast.rainChance > 0 && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10">
                <CloudRain className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">{weather.forecast.rainChance}% rain</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
