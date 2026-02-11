
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Function Declarations for Agentic Tools
export const agentHealthTool: FunctionDeclaration = {
  name: "getAgentHealth",
  parameters: {
    type: Type.OBJECT,
    description: "Get the current health score (0-100) and status of a specific agent.",
    properties: {
      agentId: { type: Type.STRING, description: "The unique ID of the agent." }
    },
    required: ["agentId"]
  }
};

export const agentStatusTool: FunctionDeclaration = {
  name: "getAgentStatus",
  parameters: {
    type: Type.OBJECT,
    description: "Get the current online status and last active timestamp of an agent.",
    properties: {
      agentId: { type: Type.STRING, description: "The unique ID of the agent." }
    },
    required: ["agentId"]
  }
};

export const taskLoadTool: FunctionDeclaration = {
  name: "getTaskLoad",
  parameters: {
    type: Type.OBJECT,
    description: "Get the current percentage load and active task list for an agent.",
    properties: {
      agentId: { type: Type.STRING, description: "The unique ID of the agent." }
    },
    required: ["agentId"]
  }
};

export const agentDiagnosticsTool: FunctionDeclaration = {
  name: "getAgentDiagnostics",
  parameters: {
    type: Type.OBJECT,
    description: "Get deep diagnostic data including latency, uptime, and error rates for an agent.",
    properties: {
      agentId: { type: Type.STRING, description: "The unique ID of the agent." }
    },
    required: ["agentId"]
  }
};

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
        You can call tools to get specific agent data if needed.
      `,
      config: {
        temperature: 0.7,
        topP: 0.95,
        tools: [{
          functionDeclarations: [
            agentHealthTool, 
            agentStatusTool, 
            taskLoadTool, 
            agentDiagnosticsTool
          ]
        }]
      },
    });

    if (response.functionCalls) {
      return response; // Return full response if there are function calls
    }
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
  return JSON.parse(response.text || '{}');
};
