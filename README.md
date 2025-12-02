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

## 📁 Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   └── weather/
│   │       └── route.ts      # Weather API endpoint
│   ├── globals.css           # Global styles with design tokens
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── components/
│   ├── conversation-history.tsx  # Chat message display
│   ├── voice-assistant.tsx       # Main voice assistant logic
│   ├── voice-visualizer.tsx      # Audio visualization
│   └── weather-card.tsx          # Weather display card
├── lib/
│   └── weather.ts            # Weather utilities & city extraction
├── types/
│   └── speech-recognition.d.ts   # TypeScript definitions
└── README.md
\`\`\`

## 🔧 Technical Implementation

### Voice Recognition (Web Speech API)

The app uses the browser's built-in `SpeechRecognition` API for voice input:

\`\`\`typescript
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.interimResults = true;
recognition.lang = "en-US";
\`\`\`

### Text-to-Speech (Speech Synthesis)

Responses are spoken using the `SpeechSynthesis` API:

\`\`\`typescript
const utterance = new SpeechSynthesisUtterance(text);
speechSynthesis.speak(utterance);
\`\`\`

### City Extraction

The app uses regex patterns to extract city names from natural language:

\`\`\`typescript
const patterns = [
  /weather (?:in|at|for) ([a-zA-Z\s]+?)(?:\?|$)/i,
  /(?:how's|hows) (?:the weather )?(?:in|at) ([a-zA-Z\s]+?)(?:\?|$)/i,
  // ... more patterns
];
\`\`\`

### Weather API Integration

Weather data is fetched from OpenWeatherMap:

\`\`\`typescript
// Current weather
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

// Forecast (for tomorrow's weather)
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
\`\`\`

## 🛡️ Error Handling

The app handles various error scenarios:

- **City not found**: Shows helpful message to check spelling
- **API failures**: Graceful fallback with error message
- **No speech detected**: Prompts user to try again
- **Microphone access denied**: Instructions to enable access
- **Browser not supported**: Warning message with alternatives

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Full |
| Edge    | ✅ Full |
| Safari  | ✅ Full |
| Firefox | ⚠️ Limited (Speech Recognition not supported) |

## 🎥 Demo Video

Record a 2-3 minute screen recording showing:
1. Starting the app
2. Asking "What's the weather in Mumbai?"
3. The voice response and weather card display
4. Asking a follow-up question
5. Demonstrating error handling (optional)

## 📝 Assignment Checklist

- [x] Voice Input/Output (Web Speech API)
- [x] Weather API Integration (OpenWeatherMap)
- [x] City extraction from speech
- [x] Natural language responses
- [x] Error handling (city not found, API failures, unclear speech)
- [x] Clean code with comments
- [x] README with setup instructions
- [ ] Screen recording (you need to record this)

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
