
import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import AgentCard from './components/AgentCard';
import CoPilotChat from './components/CoPilotChat';
import MaturityDashboard from './components/MaturityDashboard';
import { INITIAL_AGENTS, SYSTEM_KPIS } from './constants';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [agents, setAgents] = useState(INITIAL_AGENTS);

  // Simulated chart data
  const historyData = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    yield: 85 + Math.random() * 10,
    demand: 60 + Math.random() * 30,
    temp: 20 + Math.random() * 5
  })), []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {SYSTEM_KPIS.map((kpi) => (
                <div key={kpi.name} className="glass-panel p-5 rounded-xl border-b-2 border-transparent hover:border-emerald-500/50 transition-all">
                  <div className="text-zinc-500 text-xs font-bold uppercase mb-1">{kpi.name}</div>
                  <div className="flex items-baseline space-x-2">
                    <div className="text-3xl font-bold text-white">{kpi.value}{kpi.unit}</div>
                    <div className={`text-xs ${kpi.trend === 'up' ? 'text-emerald-500' : kpi.trend === 'down' ? 'text-rose-500' : 'text-zinc-500'}`}>
                      <i className={`fas fa-caret-${kpi.trend === 'up' ? 'up' : kpi.trend === 'down' ? 'down' : 'right'} mr-1`}></i>
                      {kpi.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 glass-panel p-6 rounded-xl h-[400px]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-white">Yield & Demand Synchronicity</h3>
                  <div className="flex space-x-4">
                    <div className="flex items-center text-xs text-emerald-500">
                      <span className="w-3 h-1 bg-emerald-500 rounded-full mr-2"></span> YIELD
                    </div>
                    <div className="flex items-center text-xs text-blue-400">
                      <span className="w-3 h-1 bg-blue-400 rounded-full mr-2"></span> DEMAND
                    </div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height="80%">
                  <AreaChart data={historyData}>
                    <defs>
                      <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="time" stroke="#52525b" fontSize={10} />
                    <YAxis stroke="#52525b" fontSize={10} />
                    <Tooltip 
                      contentStyle={{backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px'}}
                    />
                    <Area type="monotone" dataKey="yield" stroke="#10b981" fillOpacity={1} fill="url(#colorYield)" />
                    <Area type="monotone" dataKey="demand" stroke="#60a5fa" fillOpacity={1} fill="url(#colorDemand)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="lg:col-span-1">
                <CoPilotChat systemContext={{ kpis: SYSTEM_KPIS, agents: agents.length }} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Critical Agent Nodes</h3>
                <button className="text-xs text-emerald-400 font-bold hover:underline">VIEW TOPOLOGY</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {agents.slice(0, 4).map(agent => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            </div>
          </div>
        );
      case 'agents':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Federated Agent Network</h2>
                <p className="text-zinc-400">Distributed AI intelligence managing localized operations.</p>
              </div>
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center">
                <i className="fas fa-plus mr-2"></i> DEPLOY NEW AGENT
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {agents.map(agent => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
        );
      case 'maturity':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Process Maturity Management</h2>
              <p className="text-zinc-400">Tracking CMMI-aligned maturity stages for AgriFood cycle integrity.</p>
            </div>
            <MaturityDashboard />
          </div>
        );
      case 'supplychain':
        return (
          <div className="glass-panel p-20 rounded-xl text-center flex flex-col items-center justify-center">
            <i className="fas fa-truck-fast text-6xl text-emerald-600/30 mb-6"></i>
            <h2 className="text-2xl font-bold text-white">Supply Chain Physical Intelligence</h2>
            <p className="text-zinc-400 mt-2 max-w-md mx-auto">Real-time pathing and demand sensing. The agentic system is currently optimizing routing for 4 active shipments.</p>
            <div className="mt-8 flex space-x-4">
               <div className="glass-panel px-6 py-4 rounded-lg">
                 <div className="text-xs text-zinc-500">ACTIVE ROUTES</div>
                 <div className="text-2xl font-bold">128</div>
               </div>
               <div className="glass-panel px-6 py-4 rounded-lg">
                 <div className="text-xs text-zinc-500">CARBON OFFSET</div>
                 <div className="text-2xl font-bold text-emerald-400">12.4t</div>
               </div>
               <div className="glass-panel px-6 py-4 rounded-lg">
                 <div className="text-xs text-zinc-500">LATENCY</div>
                 <div className="text-2xl font-bold text-amber-500">4.1m</div>
               </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-96 text-zinc-500">
            <div className="text-center">
              <i className="fas fa-tools text-4xl mb-4"></i>
              <p>Section "{activeTab}" is currently being provisioned by the Agentic Network.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-zinc-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 glass-panel border-b z-50 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-900/20">
            <i className="fas fa-leaf text-white text-xl"></i>
          </div>
          <div>
            <h1 className="font-bold text-white tracking-tight leading-none">AgriFood Physical</h1>
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">AgenticAI System</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-2 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
            <i className="fas fa-globe text-emerald-500 text-xs"></i>
            <span className="text-xs text-zinc-400 font-mono">FEDERATED_NODES: 42</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
              <i className="far fa-bell text-lg"></i>
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-zinc-900"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center overflow-hidden cursor-pointer hover:border-emerald-500 transition-colors">
              <img src="https://picsum.photos/32/32" alt="Avatar" />
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 mt-16 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto pb-20">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
