
import React from 'react';
import { Agent, AgentStatus } from '../types';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const getStatusColor = (status: AgentStatus) => {
    switch (status) {
      case AgentStatus.ONLINE: return 'text-emerald-500';
      case AgentStatus.PROCESSING: return 'text-blue-400';
      case AgentStatus.WARNING: return 'text-amber-500';
      case AgentStatus.OFFLINE: return 'text-rose-500';
      default: return 'text-zinc-500';
    }
  };

  return (
    <div className="glass-panel p-5 rounded-xl hover:border-emerald-500/50 transition-all group cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-zinc-800/80 rounded-lg group-hover:bg-emerald-600/10 transition-colors">
          <i className={`fas ${agent.status === AgentStatus.PROCESSING ? 'fa-cog fa-spin' : 'fa-robot'} text-xl text-emerald-400`}></i>
        </div>
        <div className="text-right">
          <div className={`text-xs font-bold uppercase ${getStatusColor(agent.status)}`}>
            {agent.status}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1">LOAD: {agent.load}%</div>
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-white mb-1">{agent.name}</h3>
      <p className="text-zinc-400 text-sm mb-4 line-clamp-2 h-10">{agent.description}</p>
      
      <div className="space-y-2 border-t border-zinc-800 pt-3">
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500">TYPE</span>
          <span className="text-zinc-300 font-mono">{agent.type}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500">LOCATION</span>
          <span className="text-zinc-300">{agent.location}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500">LAST SYNC</span>
          <span className="text-zinc-300 italic">{agent.lastActive}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-zinc-800 flex space-x-2">
        <button className="flex-1 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded transition-colors">DIAGNOSTICS</button>
        <button className="flex-1 py-1.5 text-xs bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded transition-colors">HANDOFF</button>
      </div>
    </div>
  );
};

export default AgentCard;
