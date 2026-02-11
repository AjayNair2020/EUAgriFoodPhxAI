
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

const CommercialFarmingDashboard: React.FC = () => {
  const chartData = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    time: `${i * 2}h`,
    ai: 80 + Math.random() * 15,
    ot: 70 + Math.random() * 25,
    manual: 60 + Math.random() * 20
  })), []);

  const performanceMetrics = [
    {
      category: 'AgenticAI Intelligence',
      icon: 'fa-brain',
      color: 'text-purple-500',
      metrics: [
        { label: 'Autonomous Success', val: '94.8%', change: '+1.2%' },
        { label: 'Decision Latency', val: '124ms', change: '-8ms' },
        { label: 'Federated Sync', val: '99.9%', change: 'Stable' }
      ]
    },
    {
      category: 'Operational Technology',
      icon: 'fa-microchip',
      color: 'text-emerald-500',
      metrics: [
        { label: 'Robotics Uptime', val: '99.2%', change: '+0.4%' },
        { label: 'Sensor Integrity', val: '98.7%', change: '-0.1%' },
        { label: 'Edge Throughput', val: '1.4GB/s', change: '+200MB' }
      ]
    },
    {
      category: 'Manual Operations',
      icon: 'fa-hands-holding-child',
      color: 'text-amber-500',
      metrics: [
        { label: 'Labor Efficiency', val: '86.4%', change: '+2.1%' },
        { label: 'Safety Index', val: '100%', change: 'Optimal' },
        { label: 'Task Adherence', val: '91.2%', change: '+0.5%' }
      ]
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center space-x-3">
            <span className="bg-emerald-600 text-white p-2 rounded-xl shadow-lg shadow-emerald-900/20">
              <i className="fas fa-gauge-high"></i>
            </span>
            <span>Commercial Farming KPI Dashboard</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Unified performance metrics for Agentic AI, OT Control, and Human Workforce.</p>
        </div>
        <div className="flex space-x-2">
           <button className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-lg text-xs font-bold border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all">
             <i className="fas fa-filter mr-2"></i> ALL DOMAINS
           </button>
           <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-lg shadow-emerald-900/20 hover:bg-emerald-500 transition-all">
             <i className="fas fa-file-export mr-2"></i> EXPORT REPORT
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {performanceMetrics.map((group) => (
          <div key={group.category} className="glass-panel p-6 rounded-2xl shadow-xl border-t-2 border-transparent hover:border-emerald-500/30 transition-all">
            <div className="flex items-center space-x-3 mb-6">
              <div className={`p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 ${group.color}`}>
                <i className={`fas ${group.icon}`}></i>
              </div>
              <h3 className="font-bold text-sm text-zinc-800 dark:text-zinc-200 uppercase tracking-widest">{group.category}</h3>
            </div>
            <div className="space-y-4">
              {group.metrics.map((m) => (
                <div key={m.label} className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] text-zinc-500 font-bold uppercase">{m.label}</div>
                    <div className="text-2xl font-bold text-zinc-900 dark:text-white">{m.val}</div>
                  </div>
                  <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    m.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 
                    m.change.startsWith('-') ? 'bg-rose-500/10 text-rose-500' : 'bg-zinc-500/10 text-zinc-500'
                  }`}>
                    {m.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl shadow-xl h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Unified Performance Baseline</h3>
            <div className="flex space-x-4 text-[10px] font-bold">
              <span className="text-purple-500">● AI</span>
              <span className="text-emerald-500">● OT</span>
              <span className="text-amber-500">● MANUAL</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorOT" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorManual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.1} />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#71717a'}} />
              <YAxis hide />
              <Tooltip contentStyle={{backgroundColor: '#18181b', border: 'none', borderRadius: '12px'}} />
              <Area type="monotone" dataKey="ai" stroke="#a855f7" fill="url(#colorAI)" strokeWidth={2} />
              <Area type="monotone" dataKey="ot" stroke="#10b981" fill="url(#colorOT)" strokeWidth={2} />
              <Area type="monotone" dataKey="manual" stroke="#f59e0b" fill="url(#colorManual)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel p-6 rounded-2xl shadow-xl overflow-hidden">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">Optimization Impact by Unit</h3>
          <div className="space-y-4">
            {[
              { unit: 'Autonomous Harvesters', impact: 85, color: 'bg-purple-500' },
              { unit: 'Cold Chain Hubs', impact: 92, color: 'bg-cyan-500' },
              { unit: 'Irrigation Sensors', impact: 74, color: 'bg-emerald-500' },
              { unit: 'Human Sorting Teams', impact: 68, color: 'bg-amber-500' }
            ].map((item) => (
              <div key={item.unit} className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">{item.unit}</span>
                  <span className="font-bold text-zinc-900 dark:text-white">{item.impact}% Efficiency</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800">
                  <div className={`h-full ${item.color} transition-all duration-1000`} style={{ width: `${item.impact}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-emerald-600/10 rounded-xl border border-emerald-500/20">
            <div className="flex items-start space-x-3">
              <i className="fas fa-lightbulb text-emerald-500 mt-0.5"></i>
              <div>
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Agentic Insight</div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">Cross-correlating AI Harvester speed with Manual Sorting availability could yield a 12% improvement in daily throughput.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialFarmingDashboard;
