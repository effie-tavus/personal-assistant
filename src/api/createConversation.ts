import { IConversation } from "@/types";
import { settingsAtom } from "@/store/settings";
import { getDefaultStore } from "jotai";

export const createConversation = async (
  token: string,
): Promise<IConversation> => {
  // Get settings from localStorage to ensure latest username
  let settings = getDefaultStore().get(settingsAtom);
  const savedSettings = localStorage.getItem('tavus-settings');
  if (savedSettings) {
    settings = { ...settings, ...JSON.parse(savedSettings) };
  }
  
  // Add debug logs
  console.log('Creating conversation with settings:', settings);
  console.log('Greeting value:', settings.greeting);
  console.log('Context value:', settings.context);
  
  // Get current date and time in Pacific Standard Time
  const now = new Date();
  const pstTime = now.toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  
  // Build the context string with current date/time
  let contextString = "";
  if (settings.name) {
    contextString = `You are talking with the user, ${settings.name}. `;
  }
  contextString += `Current date and time: ${pstTime}. `;
  contextString += settings.context || "";
  
  const payload = {
    persona_id: settings.persona || "p72bafe6bb9a",
    custom_greeting:
      settings.greeting !== undefined && settings.greeting !== null
        ? settings.greeting
        : "Hey there! I'm your personal assistant! Let's get started with getting you to be more productive and fulfilled.",
    participant_tags: settings.name ? [settings.name] : ["anonymous"],
    conversational_context: contextString,
    document_ids: ["d0-857249780de7", "de-7fdcb56126b8"],
  };
  
  console.log('Sending payload to API:', payload);
  
  const response = await fetch("https://tavusapi.com/v2/conversations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": token ?? "",
    },
    body: JSON.stringify(payload),
  });

  if (!response?.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
