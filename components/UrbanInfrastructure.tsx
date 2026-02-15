import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const UrbanInfrastructure: React.FC = () => {
  const chartData = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    time: `${i * 2}h`,
    grid: 80 + Math.random() * 15,
    traffic: 60 + Math.random() * 30,
    water: 85 + Math.random() * 10
  })), []);

  const urbanKPIs = [
    { name: 'Grid Stability', val: '99.98', unit: '%', trend: 'stable', icon: 'fa-bolt' },
    { name: 'Traffic Throughput', val: '84.2', unit: '%', trend: 'up', icon: 'fa-car-side' },
    { name: 'Air Quality Index', val: '42', unit: 'AQI', trend: 'down', icon: 'fa-wind' },
    { name: 'Waste Load', val: '68', unit: '%', trend: 'up', icon: 'fa-trash-can' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-zinc-800 text-white rounded-2xl flex items-center justify-center shadow-lg">
            <i className="fas fa-city text-2xl"></i>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight leading-none">Urban Infrastructure</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1 font-medium">Distributed PhysicalAI mesh for smart European cities.</p>
          </div>
        </div>
        <div className="flex space-x-2">
           <div className="glass-panel px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center space-x-3">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Quantum Engine</span>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {urbanKPIs.map(kpi => (
          <div key={kpi.name} className="glass-panel p-5 rounded-2xl border-b-2 border-transparent hover:border-emerald-500 transition-all shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{kpi.name}</span>
              <i className={`fas ${kpi.icon} text-zinc-400 text-xs`}></i>
            </div>
            <div className="flex items-baseline space-x-1">
              <div className="text-3xl font-[900] text-zinc-900 dark:text-white">{kpi.val}</div>
              <div className="text-xs font-bold text-zinc-500">{kpi.unit}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-[32px] shadow-xl h-[450px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Network Dynamics</h3>
            <div className="flex space-x-4 text-[9px] font-black">
              <span className="text-emerald-500">● GRID</span>
              <span className="text-blue-500">● TRAFFIC</span>
              <span className="text-amber-500">● WATER</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.1} />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
              <YAxis hide />
              <Tooltip contentStyle={{backgroundColor: '#091a0f', border: 'none', borderRadius: '16px'}} />
              <Area type="monotone" dataKey="grid" stroke="#10b981" fill="#10b981" fillOpacity={0.05} />
              <Area type="monotone" dataKey="traffic" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.05} />
              <Area type="monotone" dataKey="water" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.05} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel p-6 rounded-[32px] shadow-xl flex flex-col">
          <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tighter">Quantum Compute Nodes</h3>
          <div className="flex-1 space-y-4">
             {[
               { name: 'Traffic Optimizer', load: 42, model: 'Q-Optimus V3' },
               { name: 'Energy Grid Stabilizer', load: 88, model: 'Entangle-X' },
               { name: 'Water Distribution', load: 12, model: 'WaveSolve-4' },
               { name: 'Structural Integrity', load: 24, model: 'Rigid-Q' }
             ].map(q => (
               <div key={q.name} className="p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xs font-bold text-white">{q.name}</div>
                    <span className="text-[9px] font-mono text-blue-500 uppercase">{q.model}</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 animate-pulse" style={{ width: `${q.load}%` }}></div>
                  </div>
               </div>
             ))}
          </div>
          <div className="mt-6 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
             <div className="flex items-center space-x-2 text-emerald-500 mb-1">
               <i className="fas fa-robot text-xs"></i>
               <span className="text-[10px] font-black uppercase tracking-widest">Agentic Insight</span>
             </div>
             <p className="text-[10px] text-zinc-500 leading-tight">Quantum optimization suggested rerouting traffic on Line 4 to offset 12% grid surge.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-[32px] shadow-xl">
           <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tighter">Edge Sensor Network</h3>
           <div className="grid grid-cols-2 gap-4">
             {[
               { n: 'Vibration Sensors', v: '1,421', s: 'Operational' },
               { n: 'Smart Metering', v: '48,202', s: 'Syncing' },
               { n: 'AQI Monitors', v: '840', s: 'Optimal' },
               { n: 'Flow Valves', v: '12,410', s: 'Maintenance' }
             ].map(s => (
               <div key={s.n} className="p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase">{s.n}</div>
                  <div className="text-xl font-black text-zinc-900 dark:text-white">{s.v}</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <span className={`w-1 h-1 rounded-full ${s.s === 'Operational' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                    <span className="text-[8px] font-bold text-zinc-400 uppercase">{s.s}</span>
                  </div>
               </div>
             ))}
           </div>
        </div>
        <div className="glass-panel p-6 rounded-[32px] shadow-xl">
           <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tighter">Infrastructure OT Logic</h3>
           <div className="relative h-48 bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center space-x-12">
                 <div className="w-12 h-12 bg-zinc-900 border border-zinc-700 rounded-xl flex items-center justify-center animate-pulse"><i className="fas fa-microchip text-blue-500"></i></div>
                 <div className="w-24 h-px border-t border-dashed border-zinc-700 relative">
                    <div className="absolute top-[-4px] left-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
                 </div>
                 <div className="w-12 h-12 bg-zinc-900 border border-zinc-700 rounded-xl flex items-center justify-center"><i className="fas fa-gears text-emerald-500"></i></div>
              </div>
              <div className="absolute bottom-4 left-4 text-[9px] font-mono text-zinc-500 uppercase">Loop Locked: 0.12ms Latency</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default UrbanInfrastructure;