
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Intelligence: React.FC = () => {
  const driftData = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    time: `T-${14 - i}`,
    accuracy: 94 + Math.random() * 4,
    drift: 0.1 + Math.random() * 0.5,
    reasoningDepth: 12 + Math.random() * 8,
    tokens: 400 + Math.random() * 200
  })), []);

  const agentKPIs = [
    { label: 'Reasoning Depth', val: '18 layers', icon: 'fa-brain-circuit', color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Federated Rounds', val: '4,210', icon: 'fa-rotate-right', color: 'text-leaf-green', bg: 'bg-green-50' },
    { label: 'Token Efficiency', val: '92%', icon: 'fa-microchip', color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Model Confidence', val: '0.94', icon: 'fa-bullseye', color: 'text-cyan-500', bg: 'bg-cyan-50' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-[900] text-forest-dark dark:text-white flex items-center space-x-3 tracking-tighter">
            <span className="bg-leaf-green text-white p-2.5 rounded-2xl shadow-xl shadow-leaf-green/20">
              <i className="fas fa-brain-circuit"></i>
            </span>
            <span>Agentic Intelligence Hub</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1 font-medium">Distributed AI model performance and federated learning orchestration.</p>
        </div>
        <div className="flex space-x-3">
          <div className="glass-panel px-5 py-2.5 rounded-2xl border-l-4 border-leaf-green shadow-sm flex flex-col justify-center">
            <div className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">Global Accuracy</div>
            <div className="text-xl font-black text-forest-dark dark:text-white leading-none mt-1">96.4% <span className="text-[10px] text-leaf-green font-bold">OPTIMAL</span></div>
          </div>
          <button className="bg-leaf-green text-white px-6 py-2.5 rounded-2xl text-xs font-black shadow-xl shadow-leaf-green/20 hover:bg-[#0da372] transition-all flex items-center">
            <i className="fas fa-rotate mr-2"></i> RETRAIN GLOBAL
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agentKPIs.map(kpi => (
          <div key={kpi.label} className="glass-panel p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 hover:border-leaf-green transition-all shadow-sm group">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{kpi.label}</span>
              <div className={`w-8 h-8 rounded-xl ${kpi.bg} dark:bg-zinc-800 flex items-center justify-center`}>
                <i className={`fas ${kpi.icon} ${kpi.color} text-sm`}></i>
              </div>
            </div>
            <div className="text-3xl font-[900] text-forest-dark dark:text-white tracking-tight">{kpi.val}</div>
            <div className="flex items-center space-x-2 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-leaf-green animate-pulse"></span>
              <span className="text-[9px] text-zinc-400 font-black uppercase tracking-widest">Live Telemetry</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-8 rounded-[32px] shadow-xl border border-zinc-100 dark:border-zinc-800 h-[450px]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h3 className="text-xl font-black text-forest-dark dark:text-white tracking-tight">Inference & Reasoning Baseline</h3>
                <p className="text-xs text-zinc-400 font-bold mt-1">Cross-correlating model accuracy with reasoning recursion.</p>
              </div>
              <div className="flex space-x-6 text-[10px] font-black tracking-widest">
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-leaf-green mr-2"></span> ACCURACY</div>
                <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span> DEPTH</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="75%">
              <AreaChart data={driftData}>
                <defs>
                  <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDepth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" dark:stroke="#3f3f46" opacity={0.5} />
                <XAxis dataKey="time" hide />
                <YAxis hide domain={[0, 100]} />
                <Tooltip contentStyle={{backgroundColor: '#fff', border: 'none', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="accuracy" stroke="#10b981" fill="url(#colorAcc)" strokeWidth={4} />
                <Area type="monotone" dataKey="reasoningDepth" stroke="#a855f7" fill="url(#colorDepth)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-8 rounded-[32px] shadow-xl border border-zinc-100 dark:border-zinc-800">
              <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-6 flex items-center">
                <i className="fas fa-microscope mr-2 text-leaf-green"></i>
                Reasoning Logic Inspector
              </h4>
              <div className="space-y-5">
                {[
                  { step: 'Sense', msg: 'Cold Room 4 thermal gradient shift detected via edge node.', status: 'COMPLETED' },
                  { step: 'Identify', msg: 'Pattern matches "Compressor Stall" profile. Confidence 0.92.', status: 'COMPLETED' },
                  { step: 'Plan', msg: 'Rerouting harvest delivery to alternate Cold Room 7.', status: 'ACTIVE' },
                  { step: 'Actuate', msg: 'Dispatching maintenance agent for immediate reset.', status: 'PENDING' }
                ].map((log, i) => (
                  <div key={i} className="flex space-x-4 group">
                    <div className="relative">
                      <div className={`mt-1.5 w-3 h-3 rounded-full ${log.status === 'COMPLETED' ? 'bg-leaf-green' : log.status === 'ACTIVE' ? 'bg-blue-500 animate-pulse' : 'bg-zinc-200'} z-10 relative`}></div>
                      {i < 3 && <div className="absolute top-4.5 left-1.5 w-0.5 h-full bg-zinc-100 dark:bg-zinc-800"></div>}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-black text-forest-dark dark:text-zinc-200 uppercase">{log.step}</span>
                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${log.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{log.status}</span>
                      </div>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-snug">{log.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-8 rounded-[32px] shadow-xl border border-zinc-100 dark:border-zinc-800 bg-gradient-to-br from-leaf-green/5 to-transparent flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-6">Federated Mesh Rounds</h4>
                <div className="relative h-44 flex items-center justify-center mb-6">
                   <div className="absolute w-36 h-36 border-4 border-leaf-green/20 rounded-full animate-spin-slow"></div>
                   <div className="absolute w-24 h-24 border-4 border-dashed border-leaf-green/40 rounded-full animate-reverse-spin"></div>
                   <div className="z-10 w-16 h-16 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl flex items-center justify-center shadow-2xl">
                      <i className="fas fa-dna text-leaf-green text-xl"></i>
                   </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                  <span>12 Peer Nodes</span>
                  <span className="text-leaf-green">Synced</span>
                </div>
                <button className="w-full py-3.5 bg-forest-dark text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
                  MANUAL MESH SYNC
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-[32px] shadow-xl flex flex-col h-full border border-zinc-100 dark:border-zinc-800">
           <h3 className="text-xl font-[900] text-forest-dark dark:text-white mb-8 tracking-tight">Agentic AI KPIs</h3>
           <div className="flex-1 space-y-8">
              {[
                { name: 'Edge Vision (Sensing)', ver: 'v4.1', status: 'Optimal', usage: 98, color: 'bg-leaf-green' },
                { name: 'SupplyChain (Planning)', ver: 'v2.8', status: 'Processing', usage: 45, color: 'bg-blue-500' },
                { name: 'PID Neural (Control)', ver: 'v1.12', status: 'Optimal', usage: 100, color: 'bg-leaf-green' },
                { name: 'Process (Maturity)', ver: 'v0.9', status: 'Beta', usage: 12, color: 'bg-purple-500' }
              ].map(model => (
                <div key={model.name} className="space-y-3">
                   <div className="flex justify-between items-start">
                      <div>
                        <div className="text-[13px] font-black text-forest-dark dark:text-zinc-200 leading-none">{model.name}</div>
                        <div className="text-[10px] text-zinc-400 font-bold mt-1 uppercase tracking-tighter">Model {model.ver} • {model.status}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-black text-forest-dark dark:text-white">{model.usage}%</div>
                        <div className="text-[8px] text-zinc-400 uppercase font-black">Load</div>
                      </div>
                   </div>
                   <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                      <div className={`h-full ${model.color} transition-all duration-1000 shadow-[0_0_10px_rgba(0,0,0,0.05)]`} style={{ width: `${model.usage}%` }}></div>
                   </div>
                </div>
              ))}
           </div>
           <div className="mt-10 p-5 bg-sage-green/50 dark:bg-emerald-500/5 rounded-2xl border border-leaf-green/10">
              <div className="flex items-center space-x-3 text-leaf-green mb-2">
                <i className="fas fa-bolt-lightning"></i>
                <span className="text-[11px] font-black uppercase tracking-widest">Global Dispatch</span>
              </div>
              <p className="text-[11px] text-forest-dark dark:text-zinc-400 font-medium leading-relaxed">
                "Agentic reasoning identified a 4% margin gain by prioritizing cold-chain throughput for horticulture exports."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Intelligence;
