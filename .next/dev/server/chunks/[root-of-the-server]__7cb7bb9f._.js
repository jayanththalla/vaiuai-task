module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Desktop/tasks/vaiuai/app/api/weather/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

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
 */ __turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tasks$2f$vaiuai$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/tasks/vaiuai/node_modules/.pnpm/next@16.0.3_@babel+core@7.28.5_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/server.js [app-route] (ecmascript)");
;
// OpenWeatherMap API base URL
const WEATHER_API_BASE = "https://api.openweathermap.org/data/2.5";
async function GET(request) {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get("city");
    // Validate city parameter
    if (!city) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tasks$2f$vaiuai$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "City parameter is required"
        }, {
            status: 400
        });
    }
    // Get API key from environment variables
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    // If no API key is configured, return mock data for demo purposes
    if (!apiKey) {
        console.log("[v0] No API key found, using mock data for demo");
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tasks$2f$vaiuai$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(getMockWeatherData(city));
    }
    try {
        // Fetch current weather
        const currentWeatherUrl = `${WEATHER_API_BASE}/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
        const currentResponse = await fetch(currentWeatherUrl);
        if (!currentResponse.ok) {
            if (currentResponse.status === 404) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tasks$2f$vaiuai$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: `City "${city}" not found. Please check the spelling and try again.`
                }, {
                    status: 404
                });
            }
            if (currentResponse.status === 401) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tasks$2f$vaiuai$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "Invalid API key. Please check your OpenWeatherMap API key."
                }, {
                    status: 401
                });
            }
            throw new Error(`Weather API error: ${currentResponse.status}`);
        }
        const currentData = await currentResponse.json();
        // Fetch 5-day forecast for tomorrow's data
        const forecastUrl = `${WEATHER_API_BASE}/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
        let forecastData = null;
        if (forecastResponse.ok) {
            const forecast = await forecastResponse.json();
            // Get tomorrow's forecast (around 24 hours from now)
            const tomorrow = forecast.list.find((item)=>{
                const itemDate = new Date(item.dt * 1000);
                const now = new Date();
                const hoursDiff = (itemDate.getTime() - now.getTime()) / (1000 * 60 * 60);
                return hoursDiff >= 20 && hoursDiff <= 28;
            });
            if (tomorrow) {
                forecastData = {
                    temp: Math.round(tomorrow.main.temp),
                    description: tomorrow.weather[0].description,
                    rainChance: Math.round((tomorrow.pop || 0) * 100)
                };
            }
        }
        // Format and return weather data
        const weatherData = {
            city: currentData.name,
            temp: Math.round(currentData.main.temp),
            feelsLike: Math.round(currentData.main.feels_like),
            description: currentData.weather[0].description,
            humidity: currentData.main.humidity,
            windSpeed: Math.round(currentData.wind.speed * 3.6),
            visibility: currentData.visibility ? Math.round(currentData.visibility / 1000) : undefined,
            pressure: currentData.main.pressure,
            icon: currentData.weather[0].icon,
            forecast: forecastData
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tasks$2f$vaiuai$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(weatherData);
    } catch (error) {
        console.error("[v0] Weather API error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$tasks$2f$vaiuai$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$3_$40$babel$2b$core$40$7$2e$28$2e$5_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch weather data. Please try again later."
        }, {
            status: 500
        });
    }
}
/**
 * Generate mock weather data for demonstration
 * This is used when no API key is configured
 */ function getMockWeatherData(city) {
    // Generate somewhat realistic mock data based on city name
    const hash = city.split("").reduce((acc, char)=>acc + char.charCodeAt(0), 0);
    const conditions = [
        {
            description: "sunny",
            temp: 28 + hash % 10
        },
        {
            description: "partly cloudy",
            temp: 24 + hash % 8
        },
        {
            description: "cloudy",
            temp: 22 + hash % 6
        },
        {
            description: "light rain",
            temp: 20 + hash % 5
        },
        {
            description: "clear sky",
            temp: 26 + hash % 9
        }
    ];
    const condition = conditions[hash % conditions.length];
    return {
        city: city.charAt(0).toUpperCase() + city.slice(1).toLowerCase(),
        temp: condition.temp,
        feelsLike: condition.temp + hash % 3 - 1,
        description: condition.description,
        humidity: 45 + hash % 40,
        windSpeed: 5 + hash % 20,
        visibility: 8 + hash % 7,
        pressure: 1010 + hash % 20,
        forecast: {
            temp: condition.temp + hash % 4 - 2,
            description: conditions[(hash + 1) % conditions.length].description,
            rainChance: hash % 80
        }
    };
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7cb7bb9f._.js.map