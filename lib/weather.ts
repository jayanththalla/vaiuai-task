/**
 * Weather API Integration Module
 *
 * This module handles:
 * 1. Extracting city names from user queries
 * 2. Fetching weather data from OpenWeatherMap API
 * 3. Error handling for API failures and unknown cities
 */

// Weather data interface
export interface WeatherData {
  city: string
  temp: number
  feelsLike?: number
  description: string
  humidity: number
  windSpeed: number
  visibility?: number
  pressure?: number
  icon?: string
  forecast?: {
    temp: number
    description: string
    rainChance: number
  }
}

// Common city name patterns and variations
const CITY_PATTERNS = [
  // Direct question patterns
  /weather (?:in|at|for) ([a-zA-Z\s]+?)(?:\?|$|today|tomorrow|now)/i,
  /(?:how's|hows|how is) (?:the weather )?(?:in|at) ([a-zA-Z\s]+?)(?:\?|$)/i,
  /(?:what's|whats|what is) (?:the weather )?(?:in|at|like in) ([a-zA-Z\s]+?)(?:\?|$)/i,

  // Forecast patterns
  /(?:will it|is it going to) rain (?:in|at) ([a-zA-Z\s]+?)(?:\?|$|today|tomorrow)/i,
  /forecast (?:for|in) ([a-zA-Z\s]+?)(?:\?|$)/i,
  /tomorrow (?:in|at) ([a-zA-Z\s]+?)(?:\?|$)/i,

  // Simple patterns
  /(?:how about|what about) ([a-zA-Z\s]+?)(?:\?|$)/i,
  /tell me (?:about )?(?:the weather )?(?:in|at) ([a-zA-Z\s]+?)(?:\?|$)/i,

  // Fallback: Last capitalized word(s) that might be a city
  /([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*)$/,
]

// Common Indian cities for better matching
const KNOWN_CITIES = [
  "mumbai",
  "delhi",
  "bangalore",
  "bengaluru",
  "chennai",
  "kolkata",
  "hyderabad",
  "pune",
  "ahmedabad",
  "jaipur",
  "lucknow",
  "kanpur",
  "nagpur",
  "indore",
  "bhopal",
  "visakhapatnam",
  "patna",
  "vadodara",
  "ghaziabad",
  "ludhiana",
  "agra",
  "nashik",
  "faridabad",
  "meerut",
  "rajkot",
  "varanasi",
  "srinagar",
  "aurangabad",
  "dhanbad",
  "amritsar",
  "new york",
  "london",
  "tokyo",
  "paris",
  "sydney",
  "singapore",
  "dubai",
  "hong kong",
  "los angeles",
  "chicago",
  "san francisco",
]

/**
 * Extract city name from user's voice query
 * Uses pattern matching and known city database
 */
export function extractCityFromQuery(query: string): string | null {
  const normalizedQuery = query.trim()

  // Try each pattern
  for (const pattern of CITY_PATTERNS) {
    const match = normalizedQuery.match(pattern)
    if (match && match[1]) {
      const city = match[1].trim().replace(/[?.!,]$/g, "")
      if (city.length > 1) {
        return city
      }
    }
  }

  // Check if any known city is mentioned in the query
  const lowerQuery = normalizedQuery.toLowerCase()
  for (const city of KNOWN_CITIES) {
    if (lowerQuery.includes(city)) {
      return city.charAt(0).toUpperCase() + city.slice(1)
    }
  }

  return null
}

/**
 * Fetch weather data from OpenWeatherMap API
 * Includes current weather and tomorrow's forecast
 */
export async function getWeatherData(city: string): Promise<WeatherData> {
  // Use the API route to fetch weather data
  const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || `Failed to fetch weather for ${city}`)
  }

  return response.json()
}

/**
 * Format temperature with proper rounding
 */
export function formatTemperature(temp: number): string {
  return `${Math.round(temp)}°C`
}

/**
 * Get weather condition category for icons
 */
export function getWeatherCategory(description: string): string {
  const lower = description.toLowerCase()

  if (lower.includes("thunder") || lower.includes("storm")) return "storm"
  if (lower.includes("rain") || lower.includes("drizzle")) return "rain"
  if (lower.includes("snow") || lower.includes("sleet")) return "snow"
  if (lower.includes("cloud") || lower.includes("overcast")) return "cloudy"
  if (lower.includes("clear") || lower.includes("sunny")) return "clear"
  if (lower.includes("fog") || lower.includes("mist") || lower.includes("haze")) return "fog"

  return "cloudy"
}
