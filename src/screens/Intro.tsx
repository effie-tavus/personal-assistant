import { AnimatedWrapper } from "@/components/DialogWrapper";
import React, { useState } from "react";
import { useAtom } from "jotai";
import { screenAtom } from "@/store/screens";
import { Unlock, User, Lock } from "lucide-react";
import AudioButton from "@/components/AudioButton";
import { apiTokenAtom } from "@/store/tokens";
import { Input } from "@/components/ui/input";
import gloriaVideo from "@/assets/video/gloria.mp4";
import { settingsAtom } from "@/store/settings";

export const Intro: React.FC = () => {
  const [, setScreenState] = useAtom(screenAtom);
  const [, setToken] = useAtom(apiTokenAtom);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setSettings] = useAtom(settingsAtom);

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Only require the correct password, allow any username
    const requiredPassword = "personal-assistant-1985";
    if (password === requiredPassword) {
      // Use the API key from environment variables
      const apiKey = import.meta.env.VITE_TAVUS_API_KEY;
      if (!apiKey || apiKey === "your_tavus_api_key_here") {
        setError("API key not configured. Please set VITE_TAVUS_API_KEY in your .env file.");
        setIsLoading(false);
        return;
      }
      setToken(apiKey);
      localStorage.setItem('tavus-token', apiKey);
      // Save username to settingsAtom for later use as participant_ids
      setSettings((prev: any) => {
        const updated = { ...prev, name: username };
        localStorage.setItem('tavus-settings', JSON.stringify(updated));
        return updated;
      });
      setScreenState({ currentScreen: "instructions" });
    } else {
      setError("Invalid password");
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <AnimatedWrapper>
      <div className="flex size-full flex-col items-center justify-center">
        <video
          src={gloriaVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary-overlay backdrop-blur-sm" />
        <div className="relative z-10 flex flex-col items-center gap-4 py-6 px-6 rounded-xl border border-[rgba(255,255,255,0.2)]" 
          style={{ 
            fontFamily: 'Inter, sans-serif',
            background: 'rgba(0,0,0,0.3)',
            minWidth: '320px'
          }}>
          <h1 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Source Code Pro, monospace' }}>Talk to Hudson</h1>

          <div className="flex flex-col gap-3 items-center w-full">
            <div className="relative w-full">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Username"
                className="w-full bg-[rgba(255,255,255,0.1)] text-white rounded-3xl border border-[rgba(255,255,255,0.3)] pl-10 pr-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                style={{ 
                  color: 'white', 
                  fontFamily: 'Source Code Pro, monospace',
                }}
              />
            </div>

            <div className="relative w-full">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Password"
                className="w-full bg-[rgba(255,255,255,0.1)] text-white rounded-3xl border border-[rgba(255,255,255,0.3)] pl-10 pr-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                style={{ 
                  color: 'white', 
                  fontFamily: 'Source Code Pro, monospace',
                }}
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center w-full">
                {error}
              </p>
            )}

            {/* Removed demo credentials hint for security */}
          </div>

          <AudioButton 
            onClick={handleLogin}
            className="relative z-20 flex items-center justify-center gap-2 rounded-3xl border border-[rgba(255,255,255,0.3)] px-6 py-3 text-sm text-white transition-all duration-200 hover:text-primary mt-2 disabled:opacity-50"
            disabled={!username || !password || isLoading}
            style={{
              height: '48px',
              transition: 'all 0.2s ease-in-out',
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 15px rgba(34, 197, 254, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Unlock className="size-4" />
            {isLoading ? "Logging in..." : "Login"}
          </AudioButton>
        </div>
      </div>
    </AnimatedWrapper>
  );
};
