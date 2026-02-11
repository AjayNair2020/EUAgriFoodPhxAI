
import React, { useState, useRef, useEffect } from 'react';
import { getCopilotInsights } from '../services/geminiService';

const CoPilotChat: React.FC<{ systemContext: any, agents: any[] }> = ({ systemContext, agents }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'AgriFood Agentic CoPilot active. I have full visibility into Federated Agent health and diagnostics. How can I assist?' }
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
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const result = await getCopilotInsights(userMsg, { ...systemContext, agents });
    
    if (typeof result === 'string') {
      setMessages(prev => [...prev, { role: 'ai', text: result }]);
    } else if (result?.functionCalls) {
      // Simple simulation: Handle the function calls by looking up agent data
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
        
        // In a real app, you'd send this back to Gemini. Here we just show the "reasoning"
        setMessages(prev => [...prev, { 
          role: 'ai', 
          text: `[SYSTEM TOOL CALL: ${fc.name}] -> Result: ${toolResponse}. \n\nBased on this, ${agent ? agent.name : 'the agent'} appears to be ${agent?.health && agent.health > 80 ? 'functioning optimally' : 'requiring attention'}.` 
        }]);
      }
    } else {
      setMessages(prev => [...prev, { role: 'ai', text: "Communication timed out." }]);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="glass-panel rounded-xl flex flex-col h-[500px] overflow-hidden shadow-sm">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <h3 className="font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider text-sm">Agentic CoPilot</h3>
        </div>
        <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">GEN-3 AGENTIC</div>
      </div>
      
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-800">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-xl text-sm whitespace-pre-wrap ${
              m.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-br-none shadow-md shadow-emerald-900/10' 
                : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-bl-none border border-zinc-200 dark:border-zinc-700 shadow-sm'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-xl rounded-bl-none animate-pulse text-zinc-400 dark:text-zinc-500 text-xs">
              Federated agents reasoning...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="e.g. 'How is EcoSense-Alpha performing?'"
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors dark:text-white"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 top-2 p-1.5 px-3 bg-emerald-600 rounded text-white text-xs hover:bg-emerald-500 transition-colors disabled:opacity-50 font-bold shadow-sm"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoPilotChat;
