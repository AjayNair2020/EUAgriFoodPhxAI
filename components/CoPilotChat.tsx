
import React, { useState, useRef, useEffect } from 'react';
import { getCopilotInsights } from '../services/geminiService';

const CoPilotChat: React.FC<{ systemContext: any }> = ({ systemContext }) => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'AgriFood Agentic CoPilot active. How can I assist with your supply chain or OT operations today?' }
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

    const aiResponse = await getCopilotInsights(userMsg, systemContext);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse || "Communication timed out." }]);
    setIsLoading(false);
  };

  return (
    <div className="glass-panel rounded-xl flex flex-col h-[500px] overflow-hidden">
      <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <h3 className="font-bold text-emerald-400 uppercase tracking-wider text-sm">Agentic Intelligence CoPilot</h3>
        </div>
        <div className="text-[10px] text-zinc-500">MODEL: GEMINI-3-FLASH</div>
      </div>
      
      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-zinc-800">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-xl text-sm ${
              m.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-br-none' 
                : 'bg-zinc-800 text-zinc-200 rounded-bl-none border border-zinc-700'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 p-3 rounded-xl rounded-bl-none animate-pulse text-zinc-500 text-xs">
              Federated agents reasoning...
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
            placeholder="Ask about yield optimization or supply path..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 top-2 p-1.5 px-3 bg-emerald-600 rounded text-white text-xs hover:bg-emerald-500 transition-colors disabled:opacity-50"
          >
            <i className="fas fa-paper-plane mr-1"></i> SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoPilotChat;
