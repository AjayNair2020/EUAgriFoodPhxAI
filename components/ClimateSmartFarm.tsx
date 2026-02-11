
import React, { useState, useMemo } from 'react';
import { ClimateSmartSection } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface ClimateSmartFarmProps {
  section: string;
}

const ClimateSmartFarm: React.FC<ClimateSmartFarmProps> = ({ section }) => {
  const [activeSection, setActiveSection] = useState<ClimateSmartSection>(
    (section.replace(/-/g, ' ').replace('and', '&').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') as ClimateSmartSection) || 'Data Collection'
  );

  const sections: ClimateSmartSection[] = [
    'Data Collection', 'Analytics', 'Forecast', 'Mitigation', 
    'Resilience', 'Finance & Insurance', 'Diversification'
  ];

  const getIcon = (sec: ClimateSmartSection) => {
    switch (sec) {
      case 'Data Collection': return 'fa-satellite-dish';
      case 'Analytics': return 'fa-chart-area';
      case 'Forecast': return 'fa-cloud-sun-rain';
      case 'Mitigation': return 'fa-leaf';
      case 'Resilience': return 'fa-shield-halved';
      case 'Finance & Insurance': return 'fa-umbrella';
      case 'Diversification': return 'fa-shuffle';
      default: return 'fa-circle';
    }
  };

  const weatherData = useMemo(() => Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    temp: 22 + Math.random() * 8,
    humidity: 40 + Math.random() * 30,
    rainfall: Math.random() < 0.3 ? Math.random() * 15 : 0
  })), []);

  const renderSectionContent = () => {
    return (
      <div className="animate-fadeIn space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Live Weather Metrics */}
          <div className="lg:col-span-2 glass-panel p-6 rounded-2xl shadow-xl border-t-4 border-cyan-500">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-zinc-800 dark:text-zinc-100 uppercase text-xs tracking-widest flex items-center">
                <i className="fas fa-temperature-half mr-2 text-cyan-500"></i>
                Climatic Trend Analysis
              </h4>
              <div className="flex space-x-4 text-[10px] font-bold">
                <span className="text-cyan-500">● TEMPERATURE</span>
                <span className="text-blue-500">● HUMIDITY</span>
              </div>
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weatherData}>
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.1} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#71717a'}} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px'}}
                  />
                  <Area type="monotone" dataKey="temp" stroke="#06b6d4" fillOpacity={1} fill="url(#colorTemp)" />
                  <Area type="monotone" dataKey="humidity" stroke="#3b82f6" fillOpacity={1} fill="url(#colorHum)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Card 2: Risk Profile */}
          <div className="glass-panel p-6 rounded-2xl shadow-xl">
            <h4 className="font-bold text-zinc-800 dark:text-zinc-100 uppercase text-xs tracking-widest mb-4">Risk Mitigation Status</h4>
            <div className="space-y-6">
               {[
                 { label: 'Frost Alert Probability', val: 12, color: 'bg-blue-500' },
                 { label: 'Drought Resilience', val: 88, color: 'bg-emerald-500' },
                 { label: 'Flash Flood Readiness', val: 42, color: 'bg-amber-500' },
                 { label: 'Pest Migration Risk', val: 65, color: 'bg-rose-500' }
               ].map(risk => (
                 <div key={risk.label} className="space-y-1.5">
                   <div className="flex justify-between text-[10px] font-bold">
                     <span className="text-zinc-500 uppercase">{risk.label}</span>
                     <span className="text-zinc-800 dark:text-white">{risk.val}%</span>
                   </div>
                   <div className="w-full bg-zinc-100 dark:bg-zinc-800/50 h-1.5 rounded-full overflow-hidden">
                     <div className={`h-full ${risk.color}`} style={{ width: `${risk.val}%` }}></div>
                   </div>
                 </div>
               ))}
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <button className="w-full py-2 bg-cyan-600/10 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold rounded-lg hover:bg-cyan-600 hover:text-white transition-all">
                ACTIVATE SMART-RESPONSE
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Detail Panel for Climate Section */}
        <div className="glass-panel rounded-2xl shadow-xl overflow-hidden">
           <div className="p-4 bg-gradient-to-r from-cyan-600/10 to-transparent border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
             <div className="flex items-center space-x-3">
               <div className="p-2 bg-cyan-600 rounded-lg shadow-lg">
                 <i className={`fas ${getIcon(activeSection)} text-white text-sm`}></i>
               </div>
               <div>
                 <h3 className="font-bold text-zinc-800 dark:text-white tracking-tight leading-none">{activeSection}</h3>
                 <span className="text-[10px] text-cyan-600 font-mono mt-1 block">CS-FARM_MODULE_V4.2</span>
               </div>
             </div>
             <div className="flex space-x-2">
                <button className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500"><i className="fas fa-download"></i></button>
                <button className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500"><i className="fas fa-share-nodes"></i></button>
             </div>
           </div>
           
           <div className="p-6">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               <div className="md:col-span-1 border-r border-zinc-200 dark:border-zinc-800 pr-6 space-y-4">
                 <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Section Overview</h5>
                 <p className="text-xs text-zinc-500 leading-relaxed">
                   Comprehensive {activeSection.toLowerCase()} leveraging satellite telemetry and federated edge sensors to ensure agricultural continuity against volatile climatic shifts.
                 </p>
                 <div className="pt-4 space-y-2">
                   <div className="flex items-center space-x-2 text-[10px] text-zinc-600 dark:text-zinc-400">
                     <i className="fas fa-check-circle text-emerald-500"></i>
                     <span>SATELLITE SYNC ACTIVE</span>
                   </div>
                   <div className="flex items-center space-x-2 text-[10px] text-zinc-600 dark:text-zinc-400">
                     <i className="fas fa-check-circle text-emerald-500"></i>
                     <span>TERRESTRIAL SENSORS: 48</span>
                   </div>
                 </div>
               </div>
               
               <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {[
                   { title: 'Data Pipeline', val: 'Optimized', desc: 'Real-time telemetry streams from 12 orbital nodes.' },
                   { title: 'Model Accuracy', val: '94.2%', desc: 'Recursive neural network validation on historical sets.' },
                   { title: 'Mitigation Cost', val: '-12.4%', desc: 'Reduction in preventative expenditure via predictive AI.' },
                   { title: 'Insurance Index', val: 'Tier 1', desc: 'Validated climate markers for automated payout triggers.' }
                 ].map(metric => (
                   <div key={metric.title} className="p-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-cyan-500/50 transition-colors group cursor-default">
                     <div className="flex justify-between items-start mb-2">
                       <h6 className="text-[10px] font-bold text-zinc-500 uppercase">{metric.title}</h6>
                       <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">{metric.val}</span>
                     </div>
                     <p className="text-[10px] text-zinc-400 group-hover:text-zinc-300 transition-colors">{metric.desc}</p>
                   </div>
                 ))}
               </div>
             </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-900/20">
            <i className="fas fa-cloud-sun-rain text-white text-2xl"></i>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Climate-Smart Operations</h2>
            <div className="flex items-center space-x-2 mt-1">
               <span className="text-zinc-500 dark:text-zinc-400 text-xs">Environment Adaptive Intelligence System</span>
               <span className="text-cyan-500 text-[10px] font-bold bg-cyan-500/10 px-1.5 rounded">V4.0</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-3">
           <div className="glass-panel px-4 py-2 rounded-xl flex items-center space-x-3">
             <div className="text-right">
               <div className="text-[10px] text-zinc-500 font-bold uppercase leading-none">Local Temp</div>
               <div className="text-lg font-bold text-zinc-900 dark:text-white">24.5°C</div>
             </div>
             <i className="fas fa-sun text-amber-500 text-xl"></i>
           </div>
        </div>
      </div>

      {/* Section Selection Tabs */}
      <div className="flex overflow-x-auto scrollbar-thin pb-2 space-x-2">
        {sections.map((sec) => (
          <button
            key={sec}
            onClick={() => setActiveSection(sec)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl border whitespace-nowrap transition-all ${
              activeSection === sec
                ? 'bg-cyan-600/10 border-cyan-500/50 text-cyan-600 dark:text-cyan-400 ring-1 ring-cyan-500/20'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-zinc-300 dark:hover:border-zinc-700'
            }`}
          >
            <i className={`fas ${getIcon(sec)} text-sm`}></i>
            <span className="text-xs font-bold uppercase tracking-wide">{sec}</span>
          </button>
        ))}
      </div>

      {renderSectionContent()}
    </div>
  );
};

export default ClimateSmartFarm;
