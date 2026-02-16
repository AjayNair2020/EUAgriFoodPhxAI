import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface UrbanInfraDetailProps {
  category: string;
}

const UrbanInfraDetail: React.FC<UrbanInfraDetailProps> = ({ category }) => {
  const title = category.replace(/-/g, ' ').toUpperCase();

  // Vertical-specific KPI definitions
  const verticalConfig: Record<string, any> = {
    'transportation': {
      icon: 'fa-bus',
      color: 'blue',
      kpis: [
        { label: 'Network Flow', val: '84%', unit: 'Cap', trend: 'up' },
        { label: 'Public Uptime', val: '99.4%', unit: 'Time', trend: 'stable' },
        { label: 'Congestion IDX', val: '1.2', unit: 'Pts', trend: 'down' },
        { label: 'Modal Split', val: '64/36', unit: 'P/M', trend: 'up' }
      ]
    },
    'water-supply': {
      icon: 'fa-droplet',
      color: 'cyan',
      kpis: [
        { label: 'Pipe Pressure', val: '4.2', unit: 'Bar', trend: 'stable' },
        { label: 'Purity Level', val: '99.9', unit: '%', trend: 'up' },
        { label: 'Leakage Rate', val: '2.1', unit: '%', trend: 'down' },
        { label: 'Daily Flow', val: '1.4M', unit: 'm3', trend: 'up' }
      ]
    },
    'energy': {
      icon: 'fa-bolt',
      color: 'amber',
      kpis: [
        { label: 'Grid Load', val: '72.4', unit: 'GW', trend: 'up' },
        { label: 'Renewable Mix', val: '42.1', unit: '%', trend: 'up' },
        { label: 'Grid Loss', val: '3.8', unit: '%', trend: 'down' },
        { label: 'Reserve Cap', val: '12.4', unit: '%', trend: 'stable' }
      ]
    },
    'healthcare': {
      icon: 'fa-hospital',
      color: 'rose',
      kpis: [
        { label: 'Bed Capacity', val: '88.2', unit: '%', trend: 'up' },
        { label: 'ER Resp Time', val: '8.4', unit: 'min', trend: 'down' },
        { label: 'Med Stock', val: '94.0', unit: '%', trend: 'stable' },
        { label: 'Telemed Hubs', val: '142', unit: 'Nodes', trend: 'up' }
      ]
    }
    // Default fallback for others...
  };

  const config = verticalConfig[category] || {
    icon: 'fa-city',
    color: 'emerald',
    kpis: [
      { label: 'Operational Index', val: '92.4', unit: '%', trend: 'up' },
      { label: 'System Uptime', val: '99.9', unit: '%', trend: 'stable' },
      { label: 'Edge Latency', val: '12', unit: 'ms', trend: 'down' },
      { label: 'Data Fidelity', val: '99.2', unit: '%', trend: 'up' }
    ]
  };

  const chartData = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    primary: 50 + Math.random() * 40,
    secondary: 30 + Math.random() * 30
  })), []);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className={`w-14 h-14 bg-zinc-800 text-white rounded-2xl flex items-center justify-center shadow-lg border border-zinc-700`}>
            <i className={`fas ${config.icon} text-2xl`}></i>
          </div>
          <div>
            <h2 className="text-3xl font-[900] text-forest-dark dark:text-white tracking-tighter leading-none">{title}</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1 font-bold text-xs uppercase tracking-widest">PhysicalAI Federated Infrastructure Node</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <div className="glass-panel px-4 py-2 rounded-xl flex items-center space-x-3">
            <div className="text-right">
              <div className="text-[10px] text-zinc-500 font-bold uppercase leading-none">Node Status</div>
              <div className="text-xs font-black text-emerald-500 uppercase mt-0.5">SYNCHRONIZED</div>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* KPI Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {config.kpis.map((kpi: any) => (
          <div key={kpi.label} className="glass-panel p-5 rounded-2xl border-b-2 border-transparent hover:border-emerald-500 transition-all shadow-sm">
            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">{kpi.label}</div>
            <div className="flex items-baseline space-x-2">
              <div className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">{kpi.val}</div>
              <div className="text-xs font-bold text-zinc-400">{kpi.unit}</div>
              <div className={`text-[10px] font-black ml-auto px-1.5 py-0.5 rounded ${
                kpi.trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 
                kpi.trend === 'down' ? 'bg-rose-500/10 text-rose-500' : 'bg-zinc-500/10 text-zinc-500'
              }`}>
                {kpi.trend === 'up' ? '↑' : kpi.trend === 'down' ? '↓' : '→'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Primary Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-[32px] shadow-xl min-h-[450px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Physics-Based Multi-Variable Trend</h3>
            <div className="flex space-x-4 text-[9px] font-black uppercase tracking-widest">
              <span className="text-emerald-500">● PRIMARY METRIC</span>
              <span className="text-blue-500">● SECONDARY METRIC</span>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.1} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#71717a'}} />
                <Tooltip contentStyle={{backgroundColor: '#091a0f', border: 'none', borderRadius: '16px', color: '#fff'}} />
                <Area type="monotone" dataKey="primary" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPrim)" />
                <Area type="monotone" dataKey="secondary" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSec)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data Ingest & AI Observability Column */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-[32px] shadow-xl flex flex-col h-[210px] bg-zinc-900/40">
            <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-4">Edge Telemetry Ingest</h3>
            <div className="flex-1 space-y-3 overflow-y-auto pr-2 scrollbar-thin font-mono text-[9px] text-zinc-500">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="flex justify-between border-b border-zinc-800 pb-2">
                    <span className="text-emerald-500">0x{Math.random().toString(16).slice(2,8).toUpperCase()}</span>
                    <span>PKT_TYPE: INFRA_NODE</span>
                    <span className="text-zinc-300">VAL: {(Math.random() * 100).toFixed(2)}</span>
                 </div>
               ))}
            </div>
            <div className="mt-3 flex items-center justify-between text-[8px] font-black text-emerald-500/60 uppercase">
              <span>Bitrate: 1.4 Mb/s</span>
              <span>Jitter: 0.12ms</span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-[32px] shadow-xl flex flex-col h-[215px] border-l-4 border-blue-500">
            <div className="flex items-center space-x-2 text-blue-500 mb-4">
              <i className="fas fa-brain-circuit text-sm"></i>
              <span className="text-[10px] font-black uppercase tracking-widest">AI Observability Logic</span>
            </div>
            <div className="space-y-3 text-[10px] text-zinc-400 font-medium leading-snug">
              <p className="border-l border-zinc-700 pl-3">
                <span className="text-zinc-300 font-black">SENSE:</span> Anomalous gradient detected in Sector 0x4.
              </p>
              <p className="border-l border-zinc-700 pl-3">
                <span className="text-zinc-300 font-black">IDENTIFY:</span> Pattern matches 84% "Peak Surge" profile.
              </p>
              <p className="border-l border-zinc-700 pl-3">
                <span className="text-zinc-300 font-black">PLAN:</span> Re-balancing edge load to secondary compute clusters.
              </p>
            </div>
            <button className="mt-auto w-full py-2 bg-blue-600/10 text-blue-500 text-[9px] font-black rounded-xl border border-blue-500/20 hover:bg-blue-600 hover:text-white transition-all">
              VIEW REASONING HASH
            </button>
          </div>
        </div>
      </div>

      {/* Resource Inventory */}
      <div className="glass-panel p-6 rounded-[32px] shadow-xl">
         <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Infrastructure Asset Inventory</h3>
            <button className="text-[10px] font-black text-zinc-400 hover:text-emerald-500 uppercase tracking-widest">View All Assets</button>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { n: 'Edge Sensors', v: '1,421', s: 'Operational' },
              { n: 'PLC Units', v: '84', s: 'Synced' },
              { n: 'Compute Nodes', v: '12', s: 'Optimized' },
              { n: 'Active Gates', v: '4', s: 'Secure' }
            ].map(s => (
               <div key={s.n} className="p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                  <div className="text-[9px] font-bold text-zinc-500 uppercase mb-1">{s.n}</div>
                  <div className="text-xl font-black text-zinc-900 dark:text-white">{s.v}</div>
                  <div className="flex items-center space-x-1.5 mt-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                    <span className="text-[8px] font-black text-zinc-400 uppercase tracking-tight">{s.s}</span>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default UrbanInfraDetail;