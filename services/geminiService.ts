
import { GoogleGenAI } from "@google/genai";
import { ALL_ARCHITECTS } from "../data";

// Fix: Created the GoogleGenAI instance inside the function to ensure the API key 
// is fetched from the environment at the moment of the request.
export const getAIRecommendation = async (query: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert architecture consultant for DesignDirectory Pakistan.
      
      User is looking for an architect: "${query}"
      
      Our directory has these professionals (subset): ${JSON.stringify(ALL_ARCHITECTS.slice(0, 20))}
      
      Provide a helpful, polite recommendation based on their location, category, or rating. 
      If they didn't specify a city, mention a few top-rated ones across Pakistan.
      Keep it brief and professional (max 3 sentences).`,
    });

    // Directly access the .text property on the response as per guidelines (not a method).
    return response.text || "I couldn't find specific recommendations right now, but you can browse our city listings below.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Our AI assistant is currently taking a coffee break. Please browse the directory manually!";
  }
};
