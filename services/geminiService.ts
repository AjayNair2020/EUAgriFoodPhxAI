
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCopilotInsights = async (query: string, systemContext: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Context: You are the CoPilot for an AgriFood Physical AgenticAI System. 
        Current System State: ${JSON.stringify(systemContext)}
        User Query: ${query}
        
        Task: Provide a concise, actionable insight or plan for the system. 
        Focus on: Sense, Identify, Plan Supply-chain, OT Control, and Process Maturity.
      `,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini CoPilot Error:", error);
    return "I'm experiencing a connectivity issue with my core logic. Please standby while the federated agents re-synch.";
  }
};

export const analyzeSupplyChainRisk = async (data: any) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this supply chain data for bottlenecks and risks: ${JSON.stringify(data)}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          risks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                severity: { type: Type.STRING },
                recommendation: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });
  return JSON.parse(response.text);
};
