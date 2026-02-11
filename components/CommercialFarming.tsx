
import React, { useState } from 'react';
import { FarmingDomain, FarmingOperation } from '../types';

interface CommercialFarmingProps {
  domain: string;
}

const CommercialFarming: React.FC<CommercialFarmingProps> = ({ domain }) => {
  const [activeOperation, setActiveOperation] = useState<FarmingOperation>('Planning');

  const operations: FarmingOperation[] = [
    'Planning', 'Equipments/Robotics', 'Storage WMS', 'Manpower', 
    'Supply-chain', 'Delivery Models', 'Mobility Fleet'
  ];

  const getIcon = (op: FarmingOperation) => {
    switch (op) {
      case 'Planning': return 'fa-calendar-check';
      case 'Equipments/Robotics': return 'fa-robot';
      case 'Storage WMS': return 'fa-warehouse';
      case 'Manpower': return 'fa-users-gear';
      case 'Supply-chain': return 'fa-route';
      case 'Delivery Models': return 'fa-truck-fast';
      case 'Mobility Fleet': return 'fa-car-side';
      default: return 'fa-circle';
    }
  };

  const renderOperationContent = () => {
    return (
      <div className="animate-fadeIn space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Status & Config */}
          <div className="glass-panel p-6 rounded-2xl border-t-4 border-emerald-500 shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-zinc-800 dark:text-zinc-100 uppercase text-xs tracking-widest">Operation Status</h4>
              <span className="px-2 py-1 bg-emerald-500/20 text-emerald-500 text-[10px] font-bold rounded">ACTIVE</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-500">Efficiency</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-white">92.4%</span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[92.4%]"></div>
              </div>
              <div className="pt-2">
                <button className="w-full py-2 bg-zinc-100 dark:bg-zinc-800 text-xs font-bold rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                  RECONFIGURE {activeOperation.toUpperCase()}
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Robotics/Asset Monitoring */}
          <div className="glass-panel p-6 rounded-2xl shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-zinc-800 dark:text-zinc-100 uppercase text-xs tracking-widest">Asset Allocation</h4>
              <i className="fas fa-microchip text-zinc-400"></i>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Active Nodes', val: '14' },
                { name: 'Autonomous Units', val: '08' },
                { name: 'Health Index', val: '99.1%' }
              ].map(item => (
                <div key={item.name} className="flex justify-between items-center p-2 bg-zinc-50 dark:bg-zinc-900/40 rounded-lg">
                  <span className="text-xs text-zinc-500">{item.name}</span>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Supply-Chain/Mobility */}
          <div className="glass-panel p-6 rounded-2xl shadow-xl">
             <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-zinc-800 dark:text-zinc-100 uppercase text-xs tracking-widest">Network Throughput</h4>
              <i className="fas fa-network-wired text-zinc-400"></i>
            </div>
            <div className="h-24 flex items-end justify-between space-x-1">
               {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                 <div key={i} className="flex-1 bg-emerald-500/20 hover:bg-emerald-500 transition-all rounded-t-sm" style={{ height: `${h}%` }}></div>
               ))}
            </div>
            <div className="flex justify-between mt-2 text-[8px] text-zinc-500 font-mono">
              <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
            </div>
          </div>
        </div>

        {/* Dynamic Detail Panel */}
        <div className="glass-panel rounded-2xl shadow-xl overflow-hidden">
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-600 rounded-lg shadow-lg">
                <i className={`fas ${getIcon(activeOperation)} text-white text-sm`}></i>
              </div>
              <h3 className="font-bold text-zinc-800 dark:text-white tracking-tight">{domain} - {activeOperation}</h3>
            </div>
            <div className="flex space-x-2">
               <button className="px-3 py-1.5 bg-emerald-600 text-white text-[10px] font-bold rounded-lg shadow-lg hover:bg-emerald-500 transition-all">GENERATE REPORT</button>
               <button className="px-3 py-1.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] font-bold rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-all">SYSTEM LOGS</button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1 space-y-4">
                <h5 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-800 pb-2">Config Parameters</h5>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-zinc-500 block mb-1">AUTOMATION LEVEL</label>
                    <select className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-emerald-500">
                      <option>Full Autonomy</option>
                      <option>Human-in-the-loop</option>
                      <option>Supervised</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500 block mb-1">OPTIMIZATION GOAL</label>
                    <div className="flex flex-col space-y-2">
                       {['Yield', 'Cost', 'Sustainability'].map(goal => (
                         <label key={goal} className="flex items-center space-x-2 cursor-pointer group">
                           <input type="radio" name="goal" className="accent-emerald-500" defaultChecked={goal === 'Yield'} />
                           <span className="text-xs text-zinc-600 dark:text-zinc-400 group-hover:text-emerald-500 transition-colors">{goal}</span>
                         </label>
                       ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3 space-y-6">
                <div className="p-6 bg-zinc-100/50 dark:bg-zinc-950/30 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                  <h5 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-4">Live Operational Matrix</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-zinc-400 text-left border-b border-zinc-200 dark:border-zinc-800">
                          <th className="pb-3 font-medium">UNIT ID</th>
                          <th className="pb-3 font-medium">TASK</th>
                          <th className="pb-3 font-medium">COMPLETION</th>
                          <th className="pb-3 font-medium">STATUS</th>
                          <th className="pb-3 font-medium">ACTION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                        {[1, 2, 3, 4].map(idx => (
                          <tr key={idx} className="hover:bg-zinc-100 dark:hover:bg-zinc-800/30 transition-colors">
                            <td className="py-4 font-mono text-emerald-600 dark:text-emerald-400">#CF-77{idx}</td>
                            <td className="py-4 text-zinc-600 dark:text-zinc-300">Cycle {activeOperation} Phase {idx}</td>
                            <td className="py-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-zinc-200 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
                                  <div className="bg-emerald-500 h-full" style={{ width: `${30 + idx * 15}%` }}></div>
                                </div>
                                <span className="text-[10px]">{30 + idx * 15}%</span>
                              </div>
                            </td>
                            <td className="py-4">
                              <span className="flex items-center space-x-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                <span className="text-zinc-500">OPERATIONAL</span>
                              </span>
                            </td>
                            <td className="py-4">
                              <button className="p-1 hover:text-emerald-500 transition-colors"><i className="fas fa-ellipsis-h"></i></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
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
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center space-x-3">
            <span className="bg-emerald-600 text-white p-2 rounded-xl shadow-lg"><i className="fas fa-tractor"></i></span>
            <span>{domain} Life-cycle</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Enterprise management for commercial {domain.toLowerCase()} operations.</p>
        </div>
        
        <div className="flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
          {['Overview', 'Configuration', 'Management'].map(tab => (
            <button key={tab} className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${tab === 'Overview' ? 'bg-emerald-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}>
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Operation Tabs */}
      <div className="flex overflow-x-auto scrollbar-thin pb-2 space-x-2">
        {operations.map((op) => (
          <button
            key={op}
            onClick={() => setActiveOperation(op)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl border whitespace-nowrap transition-all ${
              activeOperation === op
                ? 'bg-emerald-600/10 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-zinc-300 dark:hover:border-zinc-700'
            }`}
          >
            <i className={`fas ${getIcon(op)} text-sm`}></i>
            <span className="text-xs font-bold uppercase tracking-wide">{op}</span>
          </button>
        ))}
      </div>

      {renderOperationContent()}
    </div>
  );
};

export default CommercialFarming;
