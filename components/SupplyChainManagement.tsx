
import React, { useState } from 'react';
import { SupplyChainSection } from '../types';

interface SCMProps {
  section: string;
}

const SupplyChainManagement: React.FC<SCMProps> = ({ section }) => {
  const [activeSection, setActiveSection] = useState<SupplyChainSection>(
    (section.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') as SupplyChainSection) || 'Raw Produce'
  );

  const sections: SupplyChainSection[] = [
    'Raw Produce', 'Processing Units', 'Packaging', 'Shipping', 
    'Warehouse', 'Transport', 'Last-mile Delivery'
  ];

  const getIcon = (sec: SupplyChainSection) => {
    switch (sec) {
      case 'Raw Produce': return 'fa-seedling';
      case 'Processing Units': return 'fa-industry';
      case 'Packaging': return 'fa-box-open';
      case 'Shipping': return 'fa-ship';
      case 'Warehouse': return 'fa-warehouse';
      case 'Transport': return 'fa-truck-moving';
      case 'Last-mile Delivery': return 'fa-motorcycle';
      default: return 'fa-boxes-stacked';
    }
  };

  const renderSectionMetrics = () => {
    // Stage specific sample metrics
    const metricsMap: Record<SupplyChainSection, any[]> = {
      'Raw Produce': [
        { label: 'Harvest Yield', val: '1,240 t', trend: 'up' },
        { label: 'Quality Score', val: '9.2/10', trend: 'stable' },
        { label: 'Origin Nodes', val: '42 Farms', trend: 'up' }
      ],
      'Processing Units': [
        { label: 'Throughput', val: '850 kg/h', trend: 'up' },
        { label: 'Uptime', val: '98.4%', trend: 'up' },
        { label: 'Defect Rate', val: '0.2%', trend: 'down' }
      ],
      'Packaging': [
        { label: 'Units Packed', val: '42.5k', trend: 'up' },
        { label: 'Material Efficiency', val: '99.1%', trend: 'stable' },
        { label: 'Eco-Compliance', val: '100%', trend: 'stable' }
      ],
      'Shipping': [
        { label: 'Global Shipments', val: '142', trend: 'up' },
        { label: 'Port Delay Avg', val: '2.4h', trend: 'down' },
        { label: 'Fuel Integrity', val: '99.9%', trend: 'stable' }
      ],
      'Warehouse': [
        { label: 'Utilization', val: '84%', trend: 'up' },
        { label: 'Inventory Turnover', val: '4.2x', trend: 'up' },
        { label: 'Spoilage Rate', val: '0.05%', trend: 'down' }
      ],
      'Transport': [
        { label: 'Active Fleet', val: '88', trend: 'up' },
        { label: 'Multi-modal Mix', val: 'L/W/A', trend: 'stable' },
        { label: 'Carbon Index', val: '-12%', trend: 'down' }
      ],
      'Last-mile Delivery': [
        { label: 'Delivery Success', val: '99.8%', trend: 'up' },
        { label: 'Avg Time', val: '14m', trend: 'down' },
        { label: 'Customer Rating', val: '4.9/5', trend: 'up' }
      ]
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metricsMap[activeSection].map((m, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl shadow-xl border-t-2 border-blue-500/30">
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{m.label}</div>
            <div className="flex justify-between items-baseline">
              <div className="text-2xl font-bold text-zinc-900 dark:text-white">{m.val}</div>
              <div className={`text-xs ${m.trend === 'up' ? 'text-emerald-500' : m.trend === 'down' ? 'text-rose-500' : 'text-zinc-400'}`}>
                <i className={`fas fa-caret-${m.trend === 'up' ? 'up' : m.trend === 'down' ? 'down' : 'right'} mr-1`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSectionFlow = () => {
    return (
      <div className="glass-panel rounded-2xl shadow-xl overflow-hidden mt-8">
        <div className="p-4 bg-blue-600/10 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <div className="flex items-center space-x-3">
             <i className={`fas ${getIcon(activeSection)} text-blue-500`}></i>
             <h3 className="font-bold text-zinc-800 dark:text-white uppercase text-xs tracking-widest">{activeSection} Process Flow</h3>
          </div>
          <span className="text-[9px] font-mono text-zinc-500">LIVE_AGENT_PATH_V2</span>
        </div>
        
        <div className="p-8 flex flex-col md:flex-row items-center justify-around space-y-8 md:space-y-0 relative">
          {/* Simulated Flow Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px border-t border-dashed border-zinc-700 -z-0"></div>
          
          {[
            { label: 'Inbound', icon: 'fa-arrow-right-to-bracket', color: 'text-zinc-500' },
            { label: 'Active Process', icon: 'fa-rotate', color: 'text-blue-500', pulse: true },
            { label: 'Quality Check', icon: 'fa-clipboard-check', color: 'text-emerald-500' },
            { label: 'Handoff', icon: 'fa-arrow-right-from-bracket', color: 'text-zinc-500' }
          ].map((step, i) => (
            <div key={i} className="z-10 flex flex-col items-center">
               <div className={`w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center ${step.pulse ? 'ring-4 ring-blue-500/20 animate-pulse border-blue-500/50' : ''}`}>
                 <i className={`fas ${step.icon} text-xl ${step.color}`}></i>
               </div>
               <span className="mt-3 text-[10px] font-bold text-zinc-500 uppercase">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <i className="fas fa-boxes-packing text-white text-2xl"></i>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Supply-Chain Management</h2>
            <div className="flex items-center space-x-2 mt-1">
               <span className="text-zinc-500 dark:text-zinc-400 text-xs">End-to-End AgriFood Lifecycle Solutions</span>
               <span className="text-blue-500 text-[10px] font-bold bg-blue-500/10 px-1.5 rounded uppercase">Verified</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
           <button className="px-4 py-2 text-xs font-bold rounded-lg transition-all bg-blue-600 text-white shadow-lg">DOMAINS</button>
           <button className="px-4 py-2 text-xs font-bold rounded-lg text-zinc-500 hover:text-white">OPERATIONS</button>
        </div>
      </div>

      <div className="flex overflow-x-auto scrollbar-thin pb-2 space-x-2">
        {sections.map((sec) => (
          <button
            key={sec}
            onClick={() => setActiveSection(sec)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl border whitespace-nowrap transition-all ${
              activeSection === sec
                ? 'bg-blue-600/10 border-blue-500/50 text-blue-600 dark:text-blue-400 ring-1 ring-blue-500/20'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-zinc-300 dark:hover:border-zinc-700'
            }`}
          >
            <i className={`fas ${getIcon(sec)} text-sm`}></i>
            <span className="text-xs font-bold uppercase tracking-wide">{sec}</span>
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {renderSectionMetrics()}
        {renderSectionFlow()}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="glass-panel p-6 rounded-2xl shadow-xl">
             <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-widest mb-6 flex items-center">
               <i className="fas fa-microchip mr-2 text-blue-500"></i>
               Stage Intelligence Logs
             </h4>
             <div className="space-y-4">
                {[
                  { t: '12:42:01', m: 'Inbound load verified by agent LogicPlan-Delta.', s: 'OK' },
                  { t: '12:38:44', m: 'Quality variance detected (-2.4%). Triggering processing adjust.', s: 'INFO' },
                  { t: '12:22:15', m: 'OT Master-Gamma synced actuation relays for packaging lines.', s: 'OK' }
                ].map((log, i) => (
                  <div key={i} className="flex justify-between items-start space-x-4 group">
                    <span className="text-[10px] font-mono text-zinc-500 mt-0.5">{log.t}</span>
                    <p className="flex-1 text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors">{log.m}</p>
                    <span className={`text-[9px] font-bold ${log.s === 'OK' ? 'text-emerald-500' : 'text-blue-500'}`}>{log.s}</span>
                  </div>
                ))}
             </div>
             <button className="w-full mt-6 py-2 bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-500 rounded-lg hover:text-blue-500 transition-colors uppercase">
               Expand Operational Log
             </button>
           </div>

           <div className="glass-panel p-6 rounded-2xl shadow-xl bg-gradient-to-br from-blue-600/5 to-transparent flex flex-col">
              <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-widest mb-6">Network Health (Current Stage)</h4>
              <div className="flex-1 flex flex-col justify-center space-y-6">
                 {[
                   { label: 'Sensor Connectivity', val: 99.8 },
                   { label: 'Edge Latency', val: 82.1 },
                   { label: 'Throughput Load', val: 42.4 }
                 ].map(stat => (
                   <div key={stat.label}>
                     <div className="flex justify-between text-[10px] text-zinc-500 mb-1.5 font-bold uppercase">
                       <span>{stat.label}</span>
                       <span className="text-blue-500">{stat.val}%</span>
                     </div>
                     <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" style={{ width: `${stat.val}%` }}></div>
                     </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyChainManagement;
