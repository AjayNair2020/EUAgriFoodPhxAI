
import React, { useState } from 'react';

const OTControl: React.FC = () => {
  const [isManualOverride, setIsManualOverride] = useState(false);

  const otKpis = [
    { label: 'PLC Uptime', val: '99.98%', icon: 'fa-clock', color: 'text-emerald-500' },
    { label: 'Actuator Latency', val: '42ms', icon: 'fa-bolt', color: 'text-blue-500' },
    { label: 'System Pressure', val: '4.2 bar', icon: 'fa-gauge', color: 'text-cyan-500' },
    { label: 'Energy Load', val: '12.4 kW', icon: 'fa-plug-circle-bolt', color: 'text-amber-500' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center space-x-3">
            <span className="bg-emerald-600 text-white p-2 rounded-xl shadow-lg shadow-emerald-900/20">
              <i className="fas fa-industry"></i>
            </span>
            <span>Operational Technology Control</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Industrial control systems and edge actuation management.</p>
        </div>
        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700">
          <button 
            onClick={() => setIsManualOverride(false)}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${!isManualOverride ? 'bg-emerald-600 text-white shadow-lg' : 'text-zinc-500'}`}
          >
            AGENTIC AUTO
          </button>
          <button 
            onClick={() => setIsManualOverride(true)}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${isManualOverride ? 'bg-rose-600 text-white shadow-lg' : 'text-zinc-500'}`}
          >
            MANUAL OVERRIDE
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {otKpis.map(kpi => (
          <div key={kpi.label} className="glass-panel p-5 rounded-2xl shadow-sm border-l-4 border-transparent hover:border-emerald-500 transition-all">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{kpi.label}</span>
              <i className={`fas ${kpi.icon} ${kpi.color} text-xs`}></i>
            </div>
            <div className="text-2xl font-bold text-zinc-900 dark:text-white">{kpi.val}</div>
            <div className="flex items-center space-x-1 mt-1 text-[9px] text-emerald-500">
              <i className="fas fa-caret-up"></i>
              <span>Optimal Range</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-8 rounded-2xl shadow-xl min-h-[400px]">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-8 flex items-center">
            <i className="fas fa-diagram-project mr-3 text-emerald-500"></i>
            Active Control Loop: Climate Regulation
          </h3>
          
          <div className="relative flex flex-col md:flex-row items-center justify-around h-64">
            {/* Sensing Node */}
            <div className="z-10 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-cyan-600/20 border-2 border-cyan-500 flex items-center justify-center animate-pulse">
                <i className="fas fa-satellite-dish text-2xl text-cyan-500"></i>
              </div>
              <span className="mt-3 text-xs font-bold text-cyan-500">SENSING</span>
              <span className="text-[9px] text-zinc-500">Telemetry Stream</span>
            </div>

            {/* Connection Arrow */}
            <div className="hidden md:block absolute left-1/4 top-1/2 w-1/4 h-px border-t-2 border-dashed border-zinc-700"></div>

            {/* Logic Node */}
            <div className="z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-2xl bg-purple-600/20 border-2 border-purple-500 flex items-center justify-center rotate-45 group">
                <i className="fas fa-microchip text-3xl text-purple-500 -rotate-45 group-hover:scale-110 transition-transform"></i>
              </div>
              <span className="mt-6 text-xs font-bold text-purple-500">AGENTIC LOGIC</span>
              <span className="text-[9px] text-zinc-500">PID / LLM Analysis</span>
            </div>

            {/* Connection Arrow */}
            <div className="hidden md:block absolute right-1/4 top-1/2 w-1/4 h-px border-t-2 border-dashed border-zinc-700"></div>

            {/* Actuation Node */}
            <div className="z-10 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-emerald-600/20 border-2 border-emerald-500 flex items-center justify-center">
                <i className="fas fa-fan text-2xl text-emerald-500 animate-spin-slow"></i>
              </div>
              <span className="mt-3 text-xs font-bold text-emerald-500">ACTUATION</span>
              <span className="text-[9px] text-zinc-500">Relay / VFD Toggle</span>
            </div>
          </div>

          <div className="mt-12 p-4 bg-zinc-100 dark:bg-zinc-900/50 rounded-xl border border-dashed border-zinc-700">
            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
              <span>TX: 12.4ms</span>
              <span className="text-emerald-500">LOOP STATUS: LOCKED</span>
              <span>RX: 8.1ms</span>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl shadow-xl">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">Device Inventory</h3>
          <div className="space-y-4">
            {[
              { id: 'PLC-77-A', name: 'Master Controller', status: 'Online', health: 100 },
              { id: 'VFD-04-B', name: 'Ventilation Drive', status: 'Active', health: 94 },
              { id: 'SEN-Moist-01', name: 'Capacitance Sensor', status: 'Warning', health: 62 },
              { id: 'HUB-Gate-12', name: 'MQTT Gateway', status: 'Online', health: 99 }
            ].map(dev => (
              <div key={dev.id} className="p-3 bg-zinc-50 dark:bg-zinc-900/40 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-[10px] font-mono text-zinc-500">{dev.id}</div>
                    <div className="text-sm font-bold text-zinc-900 dark:text-zinc-200">{dev.name}</div>
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    dev.status === 'Online' || dev.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {dev.status.toUpperCase()}
                  </span>
                </div>
                <div className="mt-3 w-full bg-zinc-200 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
                  <div className={`h-full ${dev.health > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${dev.health}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-bold rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
            SCAN NETWORK
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTControl;
