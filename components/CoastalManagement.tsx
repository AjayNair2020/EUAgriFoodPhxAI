import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';

const CoastalManagement: React.FC = () => {
  const seaLevelData = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    time: `Oct ${i + 1}`,
    level: 0.2 + Math.random() * 0.4,
    salinity: 34 + Math.random() * 2,
    biodiversity: 88 + Math.random() * 5
  })), []);

  const coastalKPIs = [
    { name: 'Sea Level Delta', val: '+0.12', unit: 'cm', trend: 'up', icon: 'fa-water-rise' },
    { name: 'Marine Biodiversity', val: '92.4', unit: 'IDX', trend: 'up', icon: 'fa-fish' },
    { name: 'Coastline Erosion', val: '0.4', unit: 'm/yr', trend: 'down', icon: 'fa-mountain-sun' },
    { name: 'Sequestration Rate', val: '4.2', unit: 't/ha', trend: 'up', icon: 'fa-leaf' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
            <i className="fas fa-water text-2xl"></i>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight leading-none">Coastal Zone Management</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1 font-medium">Federated PhysicalAI for European marine & coastline integrity.</p>
          </div>
        </div>
        <div className="flex space-x-3">
           <div className="glass-panel px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center space-x-3">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Physics Mesh</span>
              <span className="flex space-x-1">
                 <div className="w-1 h-3 bg-emerald-500"></div>
                 <div className="w-1 h-2 bg-emerald-500/50"></div>
                 <div className="w-1 h-4 bg-emerald-500"></div>
              </span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {coastalKPIs.map(kpi => (
          <div key={kpi.name} className="glass-panel p-5 rounded-2xl border-b-2 border-transparent hover:border-blue-500 transition-all shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{kpi.name}</span>
              <i className={`fas ${kpi.icon} text-blue-500 text-xs`}></i>
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
            <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Marine Telemetry Baseline</h3>
            <div className="flex space-x-4 text-[9px] font-black">
              <span className="text-blue-500">● SEA LEVEL</span>
              <span className="text-cyan-500">● SALINITY</span>
              <span className="text-emerald-500">● BIODIVERSITY</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={seaLevelData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.1} />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
              <YAxis hide />
              <Tooltip contentStyle={{backgroundColor: '#091a0f', border: 'none', borderRadius: '16px'}} />
              <Area type="monotone" dataKey="level" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.05} />
              <Area type="monotone" dataKey="salinity" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.05} />
              <Area type="monotone" dataKey="biodiversity" stroke="#10b981" fill="#10b981" fillOpacity={0.05} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel p-6 rounded-[32px] shadow-xl flex flex-col">
          <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tighter">Marine Logistics Fleet</h3>
          <div className="flex-1 space-y-4">
             {[
               { id: 'BUOY-42', name: 'Deep Sea Buoy', status: 'Streaming', health: 98 },
               { id: 'ROV-A1', name: 'Coral Survey ROV', status: 'Mission', health: 84 },
               { id: 'DRONE-S2', name: 'Surface Cleanup', status: 'Charging', health: 92 },
               { id: 'VES-88', name: 'Patrol Vessel', status: 'Idle', health: 100 }
             ].map(f => (
               <div key={f.id} className="p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-blue-500">{f.id}</div>
                    <div className="text-xs font-bold text-white">{f.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] font-black text-emerald-500 uppercase">{f.status}</div>
                    <div className="text-[10px] text-zinc-500">{f.health}%</div>
                  </div>
               </div>
             ))}
          </div>
          <button className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-2xl shadow-lg transition-all">
            DEPLOY MARINE MISSION
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-[32px] shadow-xl">
           <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tighter">Coastal Sensor Array</h3>
           <div className="flex items-center justify-center h-48 bg-zinc-950 rounded-2xl border border-zinc-800 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
              <div className="z-10 flex space-x-8">
                 <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-full border border-blue-500 flex items-center justify-center animate-pulse"><i className="fas fa-satellite-dish text-blue-500"></i></div>
                    <span className="text-[8px] font-black text-zinc-500 mt-2 uppercase">Acoustic Array</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-cyan-600/20 rounded-full border border-cyan-500 flex items-center justify-center"><i className="fas fa-droplet text-cyan-500"></i></div>
                    <span className="text-[8px] font-black text-zinc-500 mt-2 uppercase">Tidal Gauge</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-emerald-600/20 rounded-full border border-emerald-500 flex items-center justify-center"><i className="fas fa-dna text-emerald-500"></i></div>
                    <span className="text-[8px] font-black text-zinc-500 mt-2 uppercase">eDNA Sampler</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="glass-panel p-6 rounded-[32px] shadow-xl flex flex-col justify-between">
           <div>
             <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-4 uppercase tracking-tighter">Coastal AgenticAI</h3>
             <p className="text-xs text-zinc-500 leading-relaxed">
               "Surrogate quantum models indicate a 4.2% increase in erosion probability for Zone 14. 
               Agentic Identify has marked 'Mangrove Restoration' as the optimal mitigation plan."
             </p>
           </div>
           <div className="pt-6 space-y-3">
              {[
                { label: 'Ecosystem Health', val: 94 },
                { label: 'Flood Risk Index', val: 12 },
                { label: 'Pollution Marker', val: 0.02 }
              ].map(stat => (
                <div key={stat.label}>
                   <div className="flex justify-between text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">
                      <span>{stat.label}</span>
                      <span>{stat.val}%</span>
                   </div>
                   <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${stat.val}%` }}></div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default CoastalManagement;