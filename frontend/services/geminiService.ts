import { GoogleGenAI } from "@google/genai";

// Ensure we don't crash when apiKey is undefined, we will only check and use it when necessary
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "dummy_key_to_prevent_crash_at_build_time" });

export const refineComplaintText = async (originalText: string): Promise<string> => {
  if (!process.env.API_KEY || process.env.API_KEY === "dummy_key_to_prevent_crash_at_build_time") {
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
