import React, { useState, useRef, useEffect } from 'react';
import { getCopilotInsights } from '../services/geminiService';
import { User, RACILevel, Agent } from '../types';

interface CoPilotChatProps {
  systemContext: any;
  agents: Agent[];
  onTaskCreated?: (agentId: string, taskDescription: string) => void;
}

const CoPilotChat: React.FC<CoPilotChatProps> = ({ systemContext, agents, onTaskCreated }) => {
  const user = systemContext.user as User;
  const [messages, setMessages] = useState<{role: 'user' | 'ai' | 'system', text: string}[]>([
    { role: 'ai', text: `AgriFood Agentic CoPilot active. Access Level: [${user?.raciLevel || 'I'}]. I have initialized visibility for ${user?.name}. How can I assist with the Federated Mesh?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    // 1. Parse for specific "create task" command
    // Format: create task for <agentName> with description <description>
    const taskRegex = /create task for (.+?) with description (.+)/i;
    const match = userMsg.match(taskRegex);

    if (match) {
      const agentName = match[1].trim();
      const taskDesc = match[2].trim();

      // Verify Authorization (RACI: A or R required)
      if (user?.raciLevel !== RACILevel.ACCOUNTABLE && user?.raciLevel !== RACILevel.RESPONSIBLE) {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: `Authorization Error: Your current RACI level [${user?.raciLevel}] does not permit task delegation. Please consult an Accountable authority.` 
        }]);
        setIsLoading(false);
        return;
      }

      // Find agent
      const targetAgent = agents.find(a => 
        a.name.toLowerCase() === agentName.toLowerCase() || 
        a.id.toLowerCase() === agentName.toLowerCase()
      );

      if (targetAgent && onTaskCreated) {
        onTaskCreated(targetAgent.id, taskDesc);
        setMessages(prev => [...prev, { 
          role: 'system', 
          text: `[SYSTEM COMMAND] Task Assignment Synchronized.\nAgent: ${targetAgent.name}\nTask: "${taskDesc}"\nStatus: DISPATCHED\nHash: 0x${Math.random().toString(16).slice(2, 10).toUpperCase()}` 
        }]);
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: `I have successfully assigned the task to ${targetAgent.name}. The federated mesh is now re-calculating load parameters.` 
        }]);
        setIsLoading(false);
        return;
      } else if (!targetAgent) {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: `Identification Error: I could not find an active agent matching "${agentName}". Please verify the node identity in the Agents tab.` 
        }]);
        setIsLoading(false);
        return;
      }
    }

    // 2. Default to Gemini AI Insights if not a specific command
    const result = await getCopilotInsights(userMsg, { ...systemContext, agents, userRole: user?.raciLevel });
    
    if (typeof result === 'string') {
      setMessages(prev => [...prev, { role: 'ai', text: result }]);
    } else if (result?.functionCalls) {
      for (const fc of result.functionCalls) {
        const agentId = fc.args.agentId;
        const agent = agents.find(a => a.id === agentId || a.name === agentId);
        
        let toolResponse = "Agent not found.";
        if (agent) {
          switch (fc.name) {
            case "getAgentHealth":
              toolResponse = `Health: ${agent.health}%, Status: ${agent.status}`;
              break;
            case "getAgentStatus":
              toolResponse = `Status: ${agent.status}, Last Active: ${agent.lastActive}`;
              break;
            case "getTaskLoad":
              toolResponse = `Load: ${agent.load}%, Active Tasks: ${agent.tasks.join(', ')}`;
              break;
            case "getAgentDiagnostics":
              toolResponse = `Latency: ${agent.diagnostics.latency}, Uptime: ${agent.diagnostics.uptime}, Error Rate: ${agent.diagnostics.errorRate}`;
              break;
          }
        }
        
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: `[SYSTEM TOOL CALL: ${fc.name}] -> Result: ${toolResponse}. \n\nInsight: Authorized for ${user?.raciLevel} access.` 
        }]);
      }
    } else {
      setMessages(prev => [...prev, { role: 'ai', text: "Communication timed out." }]);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="glass-panel rounded-xl flex flex-col h-[500px] overflow-hidden shadow-sm">
      <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <h3 className="font-bold text-emerald-400 uppercase tracking-wider text-xs">Agentic CoPilot</h3>
        </div>
        <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-emerald-500/20">
          LEVEL: {user?.raciLevel}
        </div>
      </div>
      
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-xl text-xs whitespace-pre-wrap ${
              m.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-br-none shadow-lg' 
                : m.role === 'system'
                ? 'bg-zinc-900 text-emerald-500 border border-emerald-500/20 font-mono text-[10px]'
                : 'bg-zinc-800 text-zinc-200 rounded-bl-none border border-zinc-700'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 p-3 rounded-xl rounded-bl-none animate-pulse text-zinc-500 text-[10px] font-bold uppercase">
              Agents Reasoning with {user?.raciLevel} Authority...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-zinc-900/50 border-t border-zinc-800">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ex: create task for EcoSense-Alpha with description Inspect Valve A"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-xs focus:outline-none focus:border-emerald-500 transition-colors text-white"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 top-2 p-1.5 px-3 bg-emerald-600 rounded text-white text-[10px] hover:bg-emerald-500 transition-colors disabled:opacity-50 font-bold"
          >
            SEND
          </button>
        </div>
        <div className="mt-2 text-[8px] text-zinc-500 font-bold uppercase tracking-widest text-center">
          Available Format: create task for [Agent] with description [Details]
        </div>
      </div>
    </div>
  );
};

export default CoPilotChat;