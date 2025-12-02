# VaiuAI Weather Voice Assistant

A modern weather assistant powered by your voice. Built with Next.js and the Web Speech API, the app lets you ask about the weather in any city and receive natural, spoken responses.

## Features

- **Voice Commands:** Simply speak your question—no typing needed.
- **Live Weather Data:** Real-time weather updates using OpenWeatherMap.
- **Forecasts:** Get both current and next-day forecasts.
- **Conversational Replies:** Human-friendly, voice-based responses.
- **Robust Error Handling:** Handles unknown cities and API errors gracefully.
- **Sleek UI:** Dark-themed, visually-rich weather cards.

## Quick Start

### Prerequisites

- Node.js (v18 or newer)
- Chrome, Edge, or Safari browser
- OpenWeatherMap API key (free tier available)

### Installation

1. **Clone this repository:**
    ```bash
    git clone https://github.com/jayanththalla/vaiuai-task.git
    cd vaiuai-task
    ```

2. **Install dependencies:**
    ```bash
    npm install
    # or
    pnpm install
    ```

3. **Configure environment variable:**
    Create a `.env.local` file in the project root:

    ```
    OPENWEATHERMAP_API_KEY=your_api_key_here
    ```

    [Get your API key here.](https://openweathermap.org/api)

4. **Run the development server:**
    ```bash
    npm run dev
    # or
    pnpm dev
    ```

5. **Access the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Click the **microphone** button.
2. Ask about the weather (Examples: "What's the weather in Mumbai?", "Will it rain in Pune tomorrow?").
3. Receive responses both on-screen and via speech output.

## Getting an OpenWeatherMap API Key

1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Go to your account's "API Keys" section.
3. Copy your key and add it to `.env.local` as shown above.

## License

MIT — Use freely in your own projects.

---

Built with ❤️ during the Vaiu AI Software Developer Internship.
