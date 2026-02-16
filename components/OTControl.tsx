
import React, { useState, useMemo } from 'react';

type OTDomain = 'AgriFood' | 'Urban Infra' | 'Maritime';

interface OTControlProps {}

const OTControl: React.FC<OTControlProps> = () => {
  const [activeDomain, setActiveDomain] = useState<OTDomain>('AgriFood');
  const [isManualOverride, setIsManualOverride] = useState(false);
  const [isOrchestrating, setIsOrchestrating] = useState(false);

  const domains: { id: OTDomain; icon: string; label: string }[] = [
    { id: 'AgriFood', icon: 'fa-wheat-awn', label: 'AgriFood Production' },
    { id: 'Urban Infra', icon: 'fa-building-shield', label: 'Urban Infra' },
    { id: 'Maritime', icon: 'fa-ship', label: 'Maritime Port' },
  ];

  const domainData = useMemo(() => {
    const data: Record<OTDomain, any> = {
      'AgriFood': {
        kpis: [
          { label: 'Harvest Speed', val: '42 t/h', trend: 'up', icon: 'fa-tractor' },
          { label: 'WMS Fill Rate', val: '84.2%', trend: 'stable', icon: 'fa-warehouse' },
          { label: 'Cold Chain', val: '-18.2°C', trend: 'stable', icon: 'fa-snowflake' },
          { label: 'Fleet Sync', val: '12 Units', trend: 'up', icon: 'fa-truck-fast' }
        ],
        orchestration: [
          { name: 'Production Sync', status: 'Optimal', load: 45 },
          { name: 'WMS Allocation', status: 'Balanced', load: 72 },
          { name: 'Transport Dispatch', status: 'Active', load: 15 }
        ]
      },
      'Urban Infra': {
        kpis: [
          { label: 'Grid Stability', val: '50.02 Hz', trend: 'stable', icon: 'fa-bolt' },
          { label: 'Waste Sorting', val: '92 t/d', trend: 'up', icon: 'fa-recycle' },
          { label: 'Water Pressure', val: '4.2 Bar', trend: 'down', icon: 'fa-droplet' },
          { label: 'Transit Flow', val: '1.2k p/h', trend: 'up', icon: 'fa-bus' }
        ],
        orchestration: [
          { name: 'Grid Re-balancing', status: 'Locked', load: 88 },
          { name: 'Traffic Divert', status: 'Standby', load: 12 },
          { name: 'Water Flow PID', status: 'Optimal', load: 34 }
        ]
      },
      'Maritime': {
        kpis: [
          { label: 'Berth Uptime', val: '96.4%', trend: 'up', icon: 'fa-anchor' },
          { label: 'Vessel Latency', val: '14m', trend: 'down', icon: 'fa-clock' },
          { label: 'Tide Delta', val: '+2.1m', trend: 'up', icon: 'fa-water' },
          { label: 'Port WMS', val: '12k TEU', trend: 'stable', icon: 'fa-boxes-stacked' }
        ],
        orchestration: [
          { name: 'Berth Scheduling', status: 'Active', load: 65 },
          { name: 'Buoy Telemetry', status: 'Synced', load: 8 },
          { name: 'Crane Automation', status: 'Processing', load: 91 }
        ]
      }
    };
    return data[activeDomain];
  }, [activeDomain]);

  const handleOrchestrate = () => {
    setIsOrchestrating(true);
    setTimeout(() => setIsOrchestrating(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Domain Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-zinc-800 text-white rounded-2xl flex items-center justify-center shadow-lg border border-zinc-700">
            <i className={`fas ${domains.find(d => d.id === activeDomain)?.icon} text-2xl text-leaf-green`}></i>
          </div>
          <div>
            <h2 className="text-3xl font-[900] text-forest-dark dark:text-white tracking-tighter leading-none">OT Control Center</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1 font-bold text-xs uppercase tracking-widest">PhysicalAI Actuation & Orchestration Hub</p>
          </div>
        </div>

        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800/50 p-1 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          {domains.map(d => (
            <button
              key={d.id}
              onClick={() => setActiveDomain(d.id)}
              className={`px-4 py-2.5 text-[10px] font-black rounded-xl transition-all uppercase tracking-widest ${
                activeDomain === d.id ? 'bg-leaf-green text-white shadow-lg' : 'text-zinc-500 hover:text-leaf-green'
              }`}
            >
              <i className={`fas ${d.icon} mr-2`}></i>
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Domain KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {domainData.kpis.map((kpi: any) => (
          <div key={kpi.label} className="glass-panel p-5 rounded-[28px] border border-zinc-100 dark:border-zinc-800 shadow-sm hover:border-leaf-green transition-all group">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em]">{kpi.label}</span>
              <i className={`fas ${kpi.icon} text-zinc-400 dark:text-zinc-600 group-hover:text-leaf-green transition-colors`}></i>
            </div>
            <div className="flex items-baseline space-x-2">
              <div className="text-2xl font-[900] text-zinc-900 dark:text-white tracking-tight">{kpi.val}</div>
              <div className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                kpi.trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 
                kpi.trend === 'down' ? 'bg-rose-500/10 text-rose-500' : 'bg-zinc-500/10 text-zinc-500'
              }`}>
                {kpi.trend === 'up' ? '↑' : kpi.trend === 'down' ? '↓' : '→'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Orchestration Loop Visual */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-[32px] shadow-xl min-h-[450px] relative overflow-hidden flex flex-col">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#10b981 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
          
          <div className="flex justify-between items-start mb-10 z-10">
            <div>
              <h3 className="text-xl font-black text-forest-dark dark:text-white uppercase tracking-tighter">Physics-Real-Time Orchestration</h3>
              <p className="text-xs text-zinc-500 font-bold mt-1 uppercase tracking-widest">Cross-Domain Deterministic Control Loop</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2"></span>
                <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Core Synced</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col md:flex-row items-center justify-around relative">
            {/* Logic Connection Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20">
              <path d="M 150 200 Q 400 150 650 200" stroke="#10b981" strokeWidth="2" strokeDasharray="8 4" fill="none" className="animate-pulse" />
              <path d="M 150 200 Q 400 250 650 200" stroke="#10b981" strokeWidth="2" strokeDasharray="8 4" fill="none" className="animate-pulse" />
            </svg>

            <div className="z-10 flex flex-col items-center group">
              <div className="w-24 h-24 rounded-[32px] bg-emerald-600/10 border-2 border-leaf-green/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                <i className="fas fa-satellite-dish text-3xl text-leaf-green"></i>
              </div>
              <span className="mt-4 text-[10px] font-black text-forest-dark dark:text-zinc-300 uppercase tracking-[0.2em]">SENSE</span>
              <div className="mt-1 text-[8px] text-zinc-500 font-bold uppercase">Uplink: 12.4ms</div>
            </div>

            <div className="z-10 flex flex-col items-center">
              <div className={`w-32 h-32 rounded-[40px] ${isOrchestrating ? 'bg-leaf-green' : 'bg-zinc-900'} border-4 border-leaf-green/20 flex items-center justify-center transition-all duration-500 shadow-2xl relative`}>
                <i className={`fas fa-atom text-4xl ${isOrchestrating ? 'text-white animate-spin' : 'text-leaf-green animate-spin-slow'}`}></i>
                {isOrchestrating && <div className="absolute -inset-4 border-2 border-leaf-green rounded-[48px] animate-ping opacity-30"></div>}
              </div>
              <span className="mt-6 text-[11px] font-black text-leaf-green uppercase tracking-[0.3em]">ORCHESTRATE</span>
            </div>

            <div className="z-10 flex flex-col items-center group">
              <div className="w-24 h-24 rounded-[32px] bg-blue-600/10 border-2 border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                <i className="fas fa-bolt text-3xl text-blue-500"></i>
              </div>
              <span className="mt-4 text-[10px] font-black text-forest-dark dark:text-zinc-300 uppercase tracking-[0.2em]">ACTUATE</span>
              <div className="mt-1 text-[8px] text-zinc-500 font-bold uppercase">Latency: 2ms</div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 z-10">
            {['Production', 'Supply-chain', 'WMS', 'Transportation'].map(k => (
              <div key={k} className="p-4 bg-zinc-900/40 rounded-2xl border border-zinc-800 hover:border-leaf-green transition-all">
                <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">{k}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-zinc-200">OPTIMAL</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side Controls & Orchestration List */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-[32px] shadow-xl flex flex-col border border-zinc-100 dark:border-zinc-800">
            <h3 className="text-sm font-black text-zinc-800 dark:text-zinc-200 uppercase tracking-widest mb-6">Orchestration Logic</h3>
            <div className="space-y-4">
              {domainData.orchestration.map((o: any) => (
                <div key={o.name} className="p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-leaf-green transition-all group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-widest group-hover:text-leaf-green transition-colors">{o.name}</span>
                    <span className="text-[9px] font-black text-leaf-green bg-leaf-green/10 px-2 py-0.5 rounded-lg uppercase">{o.status}</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-leaf-green shadow-[0_0_8px_#10b981]" style={{ width: `${o.load}%` }}></div>
                  </div>
                  <div className="mt-2 text-[8px] font-black text-zinc-500 uppercase flex justify-between">
                    <span>Active Load</span>
                    <span>{o.load}%</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={handleOrchestrate}
              disabled={isOrchestrating}
              className="w-full mt-6 py-4 bg-leaf-green hover:bg-[#0da372] text-white text-[10px] font-black rounded-2xl shadow-xl shadow-leaf-green/20 transition-all active:scale-[0.97] uppercase tracking-[0.2em] disabled:opacity-50"
            >
              {isOrchestrating ? 'Orchestrating...' : 'Trigger Auto-Orchestration'}
            </button>
          </div>

          <div className="glass-panel p-6 rounded-[32px] shadow-xl bg-zinc-900 border border-zinc-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest">Safety Protocols</h3>
              <div className="flex items-center bg-zinc-800 p-1 rounded-xl border border-zinc-700">
                <button 
                  onClick={() => setIsManualOverride(!isManualOverride)}
                  className={`px-3 py-1.5 text-[8px] font-black rounded-lg transition-all ${isManualOverride ? 'bg-rose-600 text-white' : 'text-zinc-500'}`}
                >
                  MANUAL
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-zinc-800/50 rounded-xl border border-zinc-700">
                <i className="fas fa-shield-halved text-rose-500"></i>
                <div className="flex-1">
                  <div className="text-[10px] font-black text-zinc-200">E-STOP Readiness</div>
                  <div className="text-[8px] text-zinc-500 uppercase font-black">Linked to Physical Actuators</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-zinc-800/50 rounded-xl border border-zinc-200/5">
                <i className="fas fa-lock text-leaf-green"></i>
                <div className="flex-1">
                  <div className="text-[10px] font-black text-zinc-200">Secure Vault Sync</div>
                  <div className="text-[8px] text-zinc-500 uppercase font-black">RACI Signature Validated</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Specific Insight Panel */}
      <div className="glass-panel p-6 rounded-[32px] shadow-xl bg-gradient-to-r from-leaf-green/10 to-transparent">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl flex items-center justify-center">
            <i className="fas fa-lightbulb text-leaf-green"></i>
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-black text-forest-dark dark:text-zinc-200 uppercase tracking-widest mb-1">Domain Orchestration Insight</div>
            <p className="text-[12px] text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              {activeDomain === 'AgriFood' ? 
                "Agentic logic identified a potential bottleneck in Packaging Line B. Re-routing raw produce to Processing Unit 04 to balance load and maintain OT throughput." :
                activeDomain === 'Urban Infra' ?
                "Grid stability fluctuations detected in Sector 0x9. Orchestrating renewable mix injection from solar arrays to offset 50Hz frequency drop." :
                "Vessel arrivals synced. Orchestrating crane automation schedule to reduce TEU turnover latency by 12% in the current tidal window."
              }
            </p>
          </div>
          <button className="px-4 py-2 text-[9px] font-black text-leaf-green border border-leaf-green/20 rounded-xl hover:bg-leaf-green hover:text-white transition-all uppercase tracking-widest">
            Acknowledge Insight
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTControl;
