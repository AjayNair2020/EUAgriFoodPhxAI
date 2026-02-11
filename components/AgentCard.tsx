
import React, { useState } from 'react';
import { Agent, AgentStatus } from '../types';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  const getStatusColor = (status: AgentStatus) => {
    switch (status) {
      case AgentStatus.ONLINE: return 'text-emerald-500';
      case AgentStatus.PROCESSING: return 'text-blue-500 dark:text-blue-400';
      case AgentStatus.WARNING: return 'text-amber-500';
      case AgentStatus.OFFLINE: return 'text-rose-500';
      default: return 'text-zinc-500';
    }
  };

  const getHealthColor = (health: number) => {
    if (health > 90) return 'bg-emerald-500';
    if (health > 70) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="glass-panel p-5 rounded-xl hover:border-emerald-500/50 transition-all group cursor-pointer shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-zinc-100 dark:bg-zinc-800/80 rounded-lg group-hover:bg-emerald-600/10 transition-colors">
          <i className={`fas ${agent.status === AgentStatus.PROCESSING ? 'fa-cog fa-spin' : 'fa-robot'} text-xl text-emerald-600 dark:text-emerald-400`}></i>
        </div>
        <div className="text-right">
          <div className={`text-xs font-bold uppercase ${getStatusColor(agent.status)}`}>
            {agent.status}
          </div>
          <div className="text-[10px] text-zinc-500 mt-1">ID: {agent.id}</div>
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">{agent.name}</h3>
      <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-4 line-clamp-2 h-8">{agent.description}</p>
      
      {/* Health & Load Visualization */}
      <div className="space-y-3 mb-4">
        <div>
          <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
            <span className="font-bold">AGENT HEALTH</span>
            <span>{agent.health}%</span>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
            <div className={`h-full ${getHealthColor(agent.health)} transition-all`} style={{ width: `${agent.health}%` }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
            <span className="font-bold">TASK LOAD</span>
            <span>{agent.load}%</span>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
            <div className={`h-full ${agent.load > 80 ? 'bg-rose-500' : 'bg-blue-500'} transition-all`} style={{ width: `${agent.load}%` }}></div>
          </div>
        </div>
      </div>

      <div className="space-y-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
        <div className="flex justify-between text-xs">
          <span className="text-zinc-400 dark:text-zinc-500">TASKS</span>
          <div className="flex flex-wrap justify-end gap-1">
            {agent.tasks.slice(0, 2).map(task => (
              <span key={task} className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded text-[9px] text-zinc-600 dark:text-zinc-400">{task}</span>
            ))}
          </div>
        </div>
      </div>

      {showDiagnostics && (
        <div className="mt-3 p-2 bg-zinc-50 dark:bg-zinc-950/50 rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="flex justify-between"><span className="text-zinc-500 uppercase">Latency</span><span className="text-zinc-300">{agent.diagnostics.latency}</span></div>
            <div className="flex justify-between"><span className="text-zinc-500 uppercase">Uptime</span><span className="text-zinc-300">{agent.diagnostics.uptime}</span></div>
            <div className="flex justify-between"><span className="text-zinc-500 uppercase">Errors</span><span className="text-rose-500">{agent.diagnostics.errorRate}</span></div>
            <div className="flex justify-between"><span className="text-zinc-500 uppercase">FW</span><span className="text-zinc-300">{agent.diagnostics.firmware}</span></div>
          </div>
        </div>
      )}
      
      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex space-x-2">
        <button 
          onClick={(e) => { e.stopPropagation(); setShowDiagnostics(!showDiagnostics); }}
          className={`flex-1 py-1.5 text-xs rounded transition-colors ${showDiagnostics ? 'bg-emerald-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
        >
          {showDiagnostics ? 'CLOSE DIAGS' : 'DIAGNOSTICS'}
        </button>
        <button className="flex-1 py-1.5 text-xs bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600 text-emerald-700 dark:text-emerald-400 hover:text-white rounded transition-colors font-medium">HANDOFF</button>
      </div>
    </div>
  );
};

export default AgentCard;
