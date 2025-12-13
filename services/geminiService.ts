import { GoogleGenAI } from "@google/genai";
import { CountryData } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateEmailDraft = async (
  country: CountryData,
  currentLocalTime: string,
  userContext: string
): Promise<string> => {
  try {
    const ai = getClient();
    
    const prompt = `
      You are an expert international business communication consultant.
      
      Task: Draft a professional business email or message intro.
      Target Audience: A business partner in ${country.name} (${country.region}).
      Current Context: It is currently ${currentLocalTime} in their local time.
      User's Intent: ${userContext}
      
      Requirements:
      1. Consider the local time. If it's late/early, acknowledge that I'm sending this for them to read later, or apologize for the timing if urgent.
      2. Use culturally appropriate greetings and tone for ${country.name}.
      3. Keep it concise (under 150 words).
      4. Return ONLY the message content, no markdown formatting blocks around it.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Unable to generate draft.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI assistant. Please ensure you have a valid API Key.";
  }
};

export const getCountryEtiquette = async (country: CountryData): Promise<string> => {
    try {
      const ai = getClient();
      const prompt = `Give me 3 bullet points on business communication etiquette for ${country.name}. Keep it extremely brief.`;
  
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
  
      return response.text || "No specific tips available.";
    } catch (error) {
      return "Could not load etiquette tips.";
    }
  };