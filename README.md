# Tavus Vibecode Quickstart

## 🚀 Introduction

The fastest way to get started vibecoding with Tavus CVI. This React quickstart template provides everything you need to create interactive video experiences powered by Tavus's Conversational Video Interface technology.

> ⚠️ **Important Note**: This is a development template only. For production use, you must:
> - Never expose your Tavus API keys in the frontend
> - Implement a secure backend service to handle API calls
> - Use environment variables and proper key management
> - Follow security best practices for handling sensitive credentials

<br></br>
## 🛠️ Tech Stack
- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
<br></br>
## 🧑‍💻 Try it Live
Spin up this template in under a minute with StackBlitz:

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/Tavus-Engineering/tavus-vibecode-quickstart?file=src%2FApp.tsx)

<br></br>
## ⚡ Quick Start

1. **Set up environment variables:**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and add your Tavus API key
   # Replace 'your_tavus_api_key_here' with your actual API key
   ```

2. **Run the template:**
   ```bash
   npm install
   npm run dev
   ``` 

## 🔐 Environment Variables

The following environment variables are used in this project:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_TAVUS_API_KEY` | Your Tavus API key | `your_tavus_api_key_here` |

### Getting Your Tavus API Key

1. Create an account on [Tavus Platform](https://platform.tavus.io/api-keys)
2. Navigate to the API Keys section
3. Generate a new API key
4. Copy the key and paste it in your `.env` file

> ⚠️ **Security**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

<br></br>
## 📚 Resources

- [Tavus Documentation](https://docs.tavus.io/)
- [API Reference](https://docs.tavus.io/api-reference/)
- [Tavus Platform](https://platform.tavus.io/)
- [Daily React Reference](https://docs.daily.co/reference/daily-react)
