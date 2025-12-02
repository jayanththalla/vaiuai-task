/**
 * Weather API Route Handler
 *
 * This endpoint fetches weather data from OpenWeatherMap API
 * and returns formatted weather information.
 *
 * Environment Variables Required:
 * - OPENWEATHERMAP_API_KEY: Your OpenWeatherMap API key
 *
 * To get an API key:
 * 1. Go to https://openweathermap.org/api
 * 2. Sign up for a free account
 * 3. Get your API key from the dashboard
 */

import { type NextRequest, NextResponse } from "next/server"

// OpenWeatherMap API base URL
const WEATHER_API_BASE = "https://api.openweathermap.org/data/2.5"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get("city")

  // Validate city parameter
  if (!city) {
    return NextResponse.json({ error: "City parameter is required" }, { status: 400 })
  }

  // Get API key from environment variables
  const apiKey = process.env.OPENWEATHERMAP_API_KEY

  // If no API key is configured, return mock data for demo purposes
  if (!apiKey) {
    console.log("[v0] No API key found, using mock data for demo")
    return NextResponse.json(getMockWeatherData(city))
  }

  try {
    // Fetch current weather
    const currentWeatherUrl = `${WEATHER_API_BASE}/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    const currentResponse = await fetch(currentWeatherUrl)

    if (!currentResponse.ok) {
      if (currentResponse.status === 404) {
        return NextResponse.json(
          { error: `City "${city}" not found. Please check the spelling and try again.` },
          { status: 404 },
        )
      }
      if (currentResponse.status === 401) {
        return NextResponse.json(
          { error: "Invalid API key. Please check your OpenWeatherMap API key." },
          { status: 401 },
        )
      }
      throw new Error(`Weather API error: ${currentResponse.status}`)
    }

    const currentData = await currentResponse.json()

    // Fetch 5-day forecast for tomorrow's data
    const forecastUrl = `${WEATHER_API_BASE}/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    const forecastResponse = await fetch(forecastUrl)
    let forecastData = null

    if (forecastResponse.ok) {
      const forecast = await forecastResponse.json()
      // Get tomorrow's forecast (around 24 hours from now)
      const tomorrow = forecast.list.find((item: { dt: number }) => {
        const itemDate = new Date(item.dt * 1000)
        const now = new Date()
        const hoursDiff = (itemDate.getTime() - now.getTime()) / (1000 * 60 * 60)
        return hoursDiff >= 20 && hoursDiff <= 28
      })

      if (tomorrow) {
        forecastData = {
          temp: Math.round(tomorrow.main.temp),
          description: tomorrow.weather[0].description,
          rainChance: Math.round((tomorrow.pop || 0) * 100),
        }
      }
    }

    // Format and return weather data
    const weatherData = {
      city: currentData.name,
      temp: Math.round(currentData.main.temp),
      feelsLike: Math.round(currentData.main.feels_like),
      description: currentData.weather[0].description,
      humidity: currentData.main.humidity,
      windSpeed: Math.round(currentData.wind.speed * 3.6), // Convert m/s to km/h
      visibility: currentData.visibility ? Math.round(currentData.visibility / 1000) : undefined,
      pressure: currentData.main.pressure,
      icon: currentData.weather[0].icon,
      forecast: forecastData,
    }

    return NextResponse.json(weatherData)
  } catch (error) {
    console.error("[v0] Weather API error:", error)
    return NextResponse.json({ error: "Failed to fetch weather data. Please try again later." }, { status: 500 })
  }
}

/**
 * Generate mock weather data for demonstration
 * This is used when no API key is configured
 */
function getMockWeatherData(city: string) {
  // Generate somewhat realistic mock data based on city name
  const hash = city.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

  const conditions = [
    { description: "sunny", temp: 28 + (hash % 10) },
    { description: "partly cloudy", temp: 24 + (hash % 8) },
    { description: "cloudy", temp: 22 + (hash % 6) },
    { description: "light rain", temp: 20 + (hash % 5) },
    { description: "clear sky", temp: 26 + (hash % 9) },
  ]

  const condition = conditions[hash % conditions.length]

  return {
    city: city.charAt(0).toUpperCase() + city.slice(1).toLowerCase(),
    temp: condition.temp,
    feelsLike: condition.temp + (hash % 3) - 1,
    description: condition.description,
    humidity: 45 + (hash % 40),
    windSpeed: 5 + (hash % 20),
    visibility: 8 + (hash % 7),
    pressure: 1010 + (hash % 20),
    forecast: {
      temp: condition.temp + (hash % 4) - 2,
      description: conditions[(hash + 1) % conditions.length].description,
      rainChance: hash % 80,
    },
  }
}
