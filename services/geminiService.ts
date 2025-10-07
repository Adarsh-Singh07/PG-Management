
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const refineComplaintText = async (originalText: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API key is not configured.");
  }
  
  if (!originalText.trim()) {
    return "";
  }

  const prompt = `You are an expert at writing clear and concise service requests. Refine the following complaint from a tenant living in a PG (Paying Guest accommodation) to be more formal, polite, and clear for the property manager. Do not add any preamble, just return the refined text.

  Original complaint: "${originalText}"
  
  Refined complaint:`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.5,
        maxOutputTokens: 200,
        thinkingConfig: { thinkingBudget: 50 },
      }
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error refining text with Gemini API:", error);
    throw new Error("Failed to refine text. Please try again.");
  }
};
