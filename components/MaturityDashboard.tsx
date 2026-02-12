
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MATURITY_DATA } from '../constants';

const MaturityDashboard: React.FC = () => {
  const COLORS = ['#d1d5db', '#9ca3af', '#10b981', '#059669', '#047857'];

  const processAreas = [
    { name: 'Edge Sensing & IoT', score: 85, level: 3 },
    { name: 'AI Federated Learning', score: 62, level: 2 },
    { name: 'Supply-Chain Planning', score: 45, level: 2 },
    { name: 'Physical OT Actuation', score: 92, level: 4 },
    { name: 'Governance & RBAC', score: 100, level: 5 }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-forest-dark text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-forest-dark/10">
            <i className="fas fa-stairs text-2xl"></i>
          </div>
          <div>
            <h2 className="text-3xl font-[900] text-forest-dark dark:text-white tracking-tighter">Process Maturity</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1 font-medium italic">Capability Maturity Model (CMM) Federated Index.</p>
          </div>
        </div>
        <div className="glass-panel px-6 py-3 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-xl flex items-center space-x-5">
           <div className="text-right">
             <div className="text-[10px] text-zinc-400 uppercase font-black tracking-widest">Aggregate Rating</div>
             <div className="text-2xl font-[900] text-forest-dark dark:text-white leading-none">Level 3.8</div>
           </div>
           <div className="w-12 h-12 rounded-2xl bg-leaf-green text-white flex items-center justify-center shadow-lg shadow-leaf-green/30">
             <i className="fas fa-award text-xl"></i>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-[32px] shadow-xl border border-zinc-100 dark:border-zinc-800">
          <h3 className="text-xl font-black text-forest-dark dark:text-white mb-8 tracking-tight">CMM Progression Matrix</h3>
          <div className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MATURITY_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" dark:stroke="#27272a" horizontal={false} opacity={1} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{fill: '#64748b', fontSize: 11, fontWeight: '800'}} 
                  width={110}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{fill: 'rgba(16, 185, 129, 0.03)'}}
                  contentStyle={{backgroundColor: '#fff', border: 'none', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                  itemStyle={{color: '#10b981', fontWeight: 'bold'}}
                />
                <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={32}>
                  {MATURITY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4 flex flex-col justify-between">
          <h3 className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">Core Process Maturity Areas</h3>
          <div className="flex-1 space-y-5">
            {processAreas.map((pa) => (
              <div key={pa.name} className="glass-panel p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 transition-all hover:translate-x-1 group">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-black text-forest-dark dark:text-zinc-300 uppercase tracking-tight group-hover:text-leaf-green transition-colors">{pa.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[9px] font-black text-zinc-400 uppercase">Stage</span>
                    <span className="text-[11px] text-white font-black bg-forest-dark dark:bg-zinc-800 px-2 py-0.5 rounded-lg">L{pa.level}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 w-full bg-zinc-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-leaf-green transition-all duration-1500 ease-out shadow-[0_0_10px_rgba(16,185,129,0.2)]" style={{ width: `${pa.score}%` }}></div>
                  </div>
                  <span className="text-sm font-[900] text-forest-dark dark:text-zinc-200">{pa.score}%</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-sage-green/40 dark:bg-zinc-900/40 rounded-[28px] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
             <div className="flex items-center space-x-3 mb-4">
               <i className="fas fa-file-shield text-leaf-green text-lg"></i>
               <h5 className="text-xs font-black text-forest-dark dark:text-zinc-200 uppercase tracking-widest">Federated Audit Module</h5>
             </div>
             <div className="flex space-x-3">
               <button className="flex-1 py-3 bg-white dark:bg-zinc-800 text-forest-dark dark:text-zinc-400 text-[10px] font-black rounded-2xl border border-zinc-100 dark:border-zinc-700 hover:text-leaf-green transition-all shadow-sm">SELF ASSESSMENT</button>
               <button className="flex-1 py-3 bg-leaf-green text-white text-[10px] font-black rounded-2xl hover:bg-[#0da372] transition-all shadow-lg shadow-leaf-green/20">TRIGGER SYSTEM AUDIT</button>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-4">
        {MATURITY_DATA.map((level) => (
          <div key={level.stage} className={`glass-panel p-6 rounded-[32px] flex flex-col items-center text-center border-t-8 transition-all ${level.score >= 60 ? 'border-leaf-green bg-white shadow-xl scale-[1.02]' : 'border-zinc-200 bg-white/50 opacity-60'}`}>
            <span className="text-3xl font-black text-forest-dark mb-1">{level.stage}</span>
            <h4 className="text-[10px] font-black text-leaf-green uppercase mb-3 tracking-widest">{level.name}</h4>
            <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">{level.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaturityDashboard;
