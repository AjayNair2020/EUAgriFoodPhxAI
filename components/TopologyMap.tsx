
import React, { useState, useMemo } from 'react';
import { Agent, AgentType } from '../types';
import { INITIAL_AGENTS } from '../constants';

const TopologyMap: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<Agent | null>(null);

  // Simulated node positions for the topology map
  const nodes = useMemo(() => {
    return INITIAL_AGENTS.map((agent, i) => {
      // Create a distributed layout based on index for simulation
      const angle = (i / INITIAL_AGENTS.length) * Math.PI * 2;
      const radius = 180;
      return {
        ...agent,
        x: 400 + Math.cos(angle) * radius,
        y: 300 + Math.sin(angle) * radius,
      };
    });
  }, []);

  const getAgentColor = (type: AgentType) => {
    switch (type) {
      case AgentType.SENSING: return '#06b6d4'; // Cyan
      case AgentType.IDENTIFY: return '#3b82f6'; // Blue
      case AgentType.PLANNING: return '#10b981'; // Emerald
      case AgentType.OT_CONTROL: return '#f59e0b'; // Amber
      case AgentType.MATURITY: return '#a855f7'; // Purple
      default: return '#71717a';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center space-x-3">
            <span className="bg-emerald-600 text-white p-2 rounded-xl shadow-lg shadow-emerald-900/20">
              <i className="fas fa-project-diagram"></i>
            </span>
            <span>Network Topology & Lineage</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Global agentic node distribution and federated data flow pathways.</p>
        </div>
        <div className="flex items-center space-x-2">
           <div className="glass-panel px-4 py-2 rounded-xl flex items-center space-x-2">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
             <span className="text-[10px] font-bold text-zinc-500 uppercase">Mesh Synchronized</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map View */}
        <div className="lg:col-span-3 glass-panel rounded-2xl shadow-xl overflow-hidden relative bg-zinc-950 min-h-[600px] border border-zinc-800">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          
          <svg className="w-full h-full min-h-[600px]" viewBox="0 0 800 600">
            {/* Links/Lineage Simulation */}
            <g opacity="0.4">
              {nodes.map((node, i) => (
                nodes.slice(i + 1).map((target, j) => (
                  <line 
                    key={`link-${i}-${j}`}
                    x1={node.x} y1={node.y} 
                    x2={target.x} y2={target.y} 
                    stroke="#10b981" 
                    strokeWidth="0.5" 
                    strokeDasharray="4 4"
                    className="animate-pulse"
                  />
                ))
              ))}
              {/* Primary Data Paths */}
              <path d="M 400 300 L 220 200 M 400 300 L 580 200 M 400 300 L 400 480" stroke="#10b981" strokeWidth="1" fill="none" />
            </g>

            {/* Nodes */}
            {nodes.map((node) => (
              <g 
                key={node.id} 
                className="cursor-pointer transition-transform duration-300 hover:scale-110"
                onClick={() => setSelectedNode(node)}
              >
                <circle 
                  cx={node.x} cy={node.y} r="25" 
                  fill={getAgentColor(node.type)} 
                  fillOpacity="0.1" 
                  stroke={getAgentColor(node.type)} 
                  strokeWidth="2" 
                />
                <circle 
                  cx={node.x} cy={node.y} r="8" 
                  fill={getAgentColor(node.type)} 
                  className={node.status === 'ONLINE' ? 'animate-pulse' : ''}
                />
                <text 
                  x={node.x} y={node.y + 40} 
                  textAnchor="middle" 
                  className="fill-zinc-400 text-[10px] font-bold uppercase tracking-wider font-mono"
                >
                  {node.name}
                </text>
              </g>
            ))}

            {/* Central Intelligence Node */}
            <g transform="translate(400, 300)">
              <rect x="-30" y="-30" width="60" height="60" rx="12" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2" />
              <i className="fas fa-brain text-white" style={{ fontSize: '24px' }}></i>
              <text y="50" textAnchor="middle" className="fill-emerald-500 text-[11px] font-bold">CORE_LOGIC</text>
            </g>
          </svg>

          {/* Map Controls Overlay */}
          <div className="absolute bottom-6 left-6 flex space-x-2">
            <button className="p-3 bg-zinc-900/80 border border-zinc-700 rounded-lg text-white hover:bg-emerald-600 transition-colors"><i className="fas fa-plus"></i></button>
            <button className="p-3 bg-zinc-900/80 border border-zinc-700 rounded-lg text-white hover:bg-emerald-600 transition-colors"><i className="fas fa-minus"></i></button>
            <button className="p-3 bg-zinc-900/80 border border-zinc-700 rounded-lg text-white hover:bg-emerald-600 transition-colors"><i className="fas fa-crosshairs"></i></button>
          </div>

          <div className="absolute top-6 right-6 glass-panel p-4 rounded-xl border border-zinc-800">
            <h4 className="text-[10px] font-bold text-zinc-500 uppercase mb-3">Clustering Legend</h4>
            <div className="space-y-2">
              {[
                { label: 'Sensing Layer', color: 'bg-cyan-500' },
                { label: 'Intelligence', color: 'bg-blue-500' },
                { label: 'Planning', color: 'bg-emerald-500' },
                { label: 'OT Control', color: 'bg-amber-500' },
                { label: 'Maturity', color: 'bg-purple-500' }
              ].map(item => (
                <div key={item.label} className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                  <span className="text-[10px] text-zinc-400 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Node Detail Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 rounded-2xl shadow-xl min-h-full flex flex-col h-full">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">Node Inspector</h3>
            
            {selectedNode ? (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800 border-t-4" style={{ borderColor: getAgentColor(selectedNode.type) }}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-mono text-zinc-500">{selectedNode.id}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[9px] font-bold">{selectedNode.status}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">{selectedNode.name}</h4>
                  <p className="text-xs text-zinc-400 mt-2">{selectedNode.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
                    <div className="text-[9px] text-zinc-500 uppercase font-bold mb-1">Health</div>
                    <div className="text-lg font-bold text-white">{selectedNode.health}%</div>
                  </div>
                  <div className="p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
                    <div className="text-[9px] text-zinc-500 uppercase font-bold mb-1">Load</div>
                    <div className="text-lg font-bold text-white">{selectedNode.load}%</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="text-[10px] font-bold text-zinc-500 uppercase border-b border-zinc-800 pb-2">Active Lineage</h5>
                  <div className="relative pl-6 space-y-4">
                    <div className="absolute left-2.5 top-0 bottom-0 w-px bg-zinc-800"></div>
                    {[
                      { t: 'Inbound', d: 'Telemetry Stream #442' },
                      { t: 'Process', d: 'Edge Neural Inference' },
                      { t: 'Outbound', d: 'OT Command Dispatch' }
                    ].map((step, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-[19px] top-1 w-3 h-3 rounded-full bg-zinc-800 border-2 border-zinc-950 z-10"></div>
                        <div className="text-[10px] font-bold text-emerald-500">{step.t}</div>
                        <div className="text-[11px] text-zinc-300">{step.d}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-900/20">
                  RE-SYNC NODE
                </button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-zinc-800 rounded-2xl">
                <i className="fas fa-hand-pointer text-4xl text-zinc-800 mb-4 animate-bounce"></i>
                <p className="text-sm text-zinc-500">Select a node from the topology mesh to inspect its real-time operational state.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopologyMap;
