
import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, ComposedChart, Line } from 'recharts';

const SupplyChainPlanning: React.FC = () => {
  const [activeView, setActiveView] = useState<'planning' | 'monitoring' | 'risk'>('planning');

  // Simulated Capacity & Demand Data (Physics-based Logistics)
  const capacityData = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    time: `${i * 2}h`,
    available: 100 - (Math.random() * 20),
    used: 40 + (Math.random() * 40),
    shelfLifeDecay: 100 - (i * 4) - (Math.random() * 5),
    tempStability: 98 + Math.random() * 2
  })), []);

  const logisticsKPIs = [
    { name: 'OTIF Rate', val: '98.2%', trend: 'up', change: '1.4%', icon: 'fa-calendar-check' },
    { name: 'Spoilage Index', val: '0.04%', trend: 'down', change: '0.02%', icon: 'fa-biohazard' },
    { name: 'Capacity Util', val: '84.1%', trend: 'stable', change: '0.5%', icon: 'fa-truck-loading' },
    { name: 'Cost/Ton-Km', val: '$0.42', trend: 'down', change: '4.2%', icon: 'fa-file-invoice-dollar' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
            <i className="fas fa-truck-ramp-box text-white text-2xl"></i>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Supply-Chain Planning</h2>
            <div className="flex items-center space-x-2 mt-1">
               <span className="text-zinc-500 dark:text-zinc-400 text-xs font-medium">Physics-based Logistics & Capacity Optimization</span>
               <span className="text-emerald-500 text-[10px] font-bold bg-emerald-500/10 px-1.5 rounded uppercase">Real-Time</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-inner">
           <button 
             onClick={() => setActiveView('planning')}
             className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeView === 'planning' ? 'bg-emerald-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
           >
             CAPACITY
           </button>
           <button 
             onClick={() => setActiveView('monitoring')}
             className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeView === 'monitoring' ? 'bg-emerald-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
           >
             M&E
           </button>
           <button 
             onClick={() => setActiveView('risk')}
             className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeView === 'risk' ? 'bg-emerald-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
           >
             RISK
           </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {logisticsKPIs.map((kpi) => (
          <div key={kpi.name} className="glass-panel p-5 rounded-2xl border-b-2 border-transparent hover:border-emerald-500 transition-all shadow-xl group">
            <div className="flex justify-between items-start mb-2">
              <div className="text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-widest">{kpi.name}</div>
              <i className={`fas ${kpi.icon} text-emerald-500/40 group-hover:text-emerald-500 transition-colors`}></i>
            </div>
            <div className="flex items-baseline space-x-2">
              <div className="text-2xl font-bold text-zinc-900 dark:text-white">{kpi.val}</div>
              <div className={`text-[10px] font-bold ${kpi.trend === 'up' ? 'text-emerald-500' : kpi.trend === 'down' ? 'text-rose-500' : 'text-zinc-400'}`}>
                <i className={`fas fa-caret-${kpi.trend === 'up' ? 'up' : kpi.trend === 'down' ? 'down' : 'right'} mr-1`}></i>
                {kpi.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Visual Trends */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl shadow-xl h-[450px]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Logistics Physics Engine</h3>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-tighter">Capacity Load vs shelf-life decay (24h Forecast)</p>
              </div>
              <div className="flex space-x-4 text-[10px] font-bold">
                <span className="text-emerald-500 flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span> LOAD</span>
                <span className="text-rose-500 flex items-center"><span className="w-2 h-2 rounded-full bg-rose-500 mr-2"></span> DECAY</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="80%">
              <ComposedChart data={capacityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.1} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#71717a'}} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{backgroundColor: '#0f2a1a', border: '1px solid #2d553c', borderRadius: '12px'}}
                  itemStyle={{fontSize: '10px', fontWeight: 'bold'}}
                />
                <Area type="monotone" dataKey="used" fill="#10b981" fillOpacity={0.1} stroke="#10b981" strokeWidth={2} />
                <Bar dataKey="available" barSize={20} fill="#1e293b" radius={[4, 4, 0, 0]} opacity={0.3} />
                <Line type="step" dataKey="shelfLifeDecay" stroke="#f43f5e" strokeWidth={2} dot={false} strokeDasharray="5 5" />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="mt-4 flex justify-around p-3 bg-zinc-900/30 rounded-xl border border-zinc-800">
               <div className="text-center">
                 <div className="text-[9px] text-zinc-500 uppercase font-bold">Predicted Bottlenecks</div>
                 <div className="text-sm font-bold text-rose-500">None Detected</div>
               </div>
               <div className="w-px bg-zinc-800"></div>
               <div className="text-center">
                 <div className="text-[9px] text-zinc-500 uppercase font-bold">Optimal Speed</div>
                 <div className="text-sm font-bold text-emerald-500">62 km/h</div>
               </div>
               <div className="w-px bg-zinc-800"></div>
               <div className="text-center">
                 <div className="text-[9px] text-zinc-500 uppercase font-bold">Energy Cost Impact</div>
                 <div className="text-sm font-bold text-blue-500">Low</div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl shadow-xl">
              <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-widest mb-4 flex items-center">
                <i className="fas fa-microscope mr-2 text-emerald-500"></i>
                Monitoring & Evaluation (M&E)
              </h4>
              <div className="space-y-4">
                 {[
                   { label: 'Data Accuracy', val: 99.8, status: 'Optimal' },
                   { label: 'Feedback Loop Latency', val: 124, status: 'Stable', unit: 'ms' },
                   { label: 'Evaluation Coverage', val: 92.4, status: 'Expanding' }
                 ].map(me => (
                   <div key={me.label}>
                     <div className="flex justify-between text-[10px] font-bold mb-1">
                       <span className="text-zinc-500 uppercase">{me.label}</span>
                       <span className="text-emerald-500">{me.val}{me.unit || '%'}</span>
                     </div>
                     <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500" style={{ width: `${me.val > 100 ? 100 : me.val}%` }}></div>
                     </div>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-6 py-2 bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded-lg border border-emerald-500/20 hover:bg-emerald-600 hover:text-white transition-all">
                DOWNLOAD FULL AUDIT LOG
              </button>
            </div>

            <div className="glass-panel p-6 rounded-2xl shadow-xl flex flex-col">
              <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-widest mb-4">Physics Constraints</h4>
              <div className="flex-1 space-y-3">
                 <div className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-800 flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400 uppercase font-bold">Max Temp Variance</span>
                    <span className="text-xs font-mono font-bold text-blue-500">±0.2°C</span>
                 </div>
                 <div className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-800 flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400 uppercase font-bold">Vibration Threshold</span>
                    <span className="text-xs font-mono font-bold text-amber-500">0.4 G</span>
                 </div>
                 <div className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-800 flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400 uppercase font-bold">Humidity Lock</span>
                    <span className="text-xs font-mono font-bold text-emerald-500">88.2%</span>
                 </div>
              </div>
              <p className="mt-4 text-[9px] text-zinc-500 italic">"Logistics planning is constrained by real-time physics telemetry from OT-Master-Gamma."</p>
            </div>
          </div>
        </div>

        {/* Right Column: Risk & Action Intelligence */}
        <div className="lg:col-span-1 space-y-6 flex flex-col">
          <div className="glass-panel p-6 rounded-2xl shadow-xl flex-1 flex flex-col">
            <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-widest mb-6 flex items-center justify-between">
              <span>Risk Management</span>
              <span className="bg-rose-500/10 text-rose-500 px-2 py-0.5 rounded text-[9px]">2 Critical</span>
            </h4>
            
            <div className="space-y-4 flex-1 overflow-y-auto pr-2 scrollbar-thin">
               <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl space-y-2 animate-pulse">
                  <div className="flex items-center text-rose-500 text-[10px] font-bold uppercase">
                    <i className="fas fa-triangle-exclamation mr-2"></i>
                    Thermal Breach Path C4
                  </div>
                  <p className="text-[10px] text-zinc-300">Hub-04 sensor reporting 4°C deviation. Shelf-life at risk. Handoff recommended.</p>
                  <button className="w-full py-1.5 bg-rose-600 text-white text-[9px] font-bold rounded-lg shadow-lg">MITIGATE NOW</button>
               </div>

               <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2">
                  <div className="flex items-center text-amber-500 text-[10px] font-bold uppercase">
                    <i className="fas fa-cloud-bolt mr-2"></i>
                    Weather Bottleneck
                  </div>
                  <p className="text-[10px] text-zinc-300">Extreme rainfall expected in Sector 7. Planning agent rerouting 12 active fleets.</p>
                  <button className="w-full py-1.5 bg-amber-600 text-white text-[9px] font-bold rounded-lg">APPROVE REROUTE</button>
               </div>

               <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl space-y-2">
                  <div className="flex items-center text-blue-500 text-[10px] font-bold uppercase">
                    <i className="fas fa-info-circle mr-2"></i>
                    Capacity Threshold
                  </div>
                  <p className="text-[10px] text-zinc-300">Fleet utilization at 92%. Buffer diminishing for next harvest cycle.</p>
               </div>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-800">
               <h5 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Resource Inventory</h5>
               <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-zinc-900 rounded-xl text-center border border-zinc-800">
                     <div className="text-xl font-bold text-white">42</div>
                     <div className="text-[9px] text-zinc-500 font-bold uppercase">Active Fleets</div>
                  </div>
                  <div className="p-3 bg-zinc-900 rounded-xl text-center border border-zinc-800">
                     <div className="text-xl font-bold text-white">08</div>
                     <div className="text-[9px] text-zinc-500 font-bold uppercase">Cold Hubs</div>
                  </div>
               </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl shadow-xl bg-gradient-to-br from-emerald-600/10 to-transparent">
             <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Planning Agent Action</h4>
             <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center">
                   <i className="fas fa-robot text-emerald-500"></i>
                </div>
                <div className="flex-1">
                   <div className="text-xs font-bold text-zinc-200">LogiPlan-Delta Insight</div>
                   <p className="text-[10px] text-zinc-500">Optimizing multi-modal paths for 2,400t harvest payload.</p>
                </div>
             </div>
             <div className="mt-4 flex space-x-2">
                <div className="h-1.5 flex-1 bg-emerald-500 rounded-full animate-pulse"></div>
                <div className="h-1.5 flex-1 bg-zinc-800 rounded-full"></div>
                <div className="h-1.5 flex-1 bg-zinc-800 rounded-full"></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyChainPlanning;
