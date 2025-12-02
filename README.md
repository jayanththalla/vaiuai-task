# Vaiu Weather Voice Assistant

A voice-powered weather assistant built with Next.js and the Web Speech API. Ask about the weather in any city using your voice!

## 🎯 Features

- **Voice Input/Output**: Speak your query and hear the response
- **Real-time Weather**: Fetches current weather data from OpenWeatherMap
- **Forecast Support**: Get tomorrow's weather forecast
- **Natural Responses**: Generates conversational weather responses
- **Error Handling**: Graceful handling of unknown cities and API failures
- **Beautiful UI**: Modern, dark-themed interface with weather cards

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A modern browser (Chrome, Edge, or Safari recommended)
- OpenWeatherMap API key (free tier available)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/vaiu-weather-assistant.git
   cd vaiu-weather-assistant
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   pnpm install
   \`\`\`

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   \`\`\`env
   OPENWEATHERMAP_API_KEY=your_api_key_here
   \`\`\`

   > **Note**: Get your free API key at [OpenWeatherMap](https://openweathermap.org/api)

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   pnpm dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎤 How to Use

1. Click the **microphone button** to start listening
2. Speak your weather query, for example:
   - "What's the weather in Mumbai?"
   - "How about Bangalore?"
   - "Will it rain in Pune tomorrow?"
3. The assistant will fetch the weather and respond with voice


## 🔑 Getting an API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. Navigate to "API Keys" in your account
4. Copy your API key
5. Add it to your `.env.local` file

## 📄 License

MIT License - Feel free to use this code for your projects!

---

Built with ❤️ for the Vaiu AI Software Developer Internship
