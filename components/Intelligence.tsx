
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Intelligence: React.FC = () => {
  const driftData = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    time: `T-${14 - i}`,
    accuracy: 94 + Math.random() * 4,
    drift: 0.1 + Math.random() * 0.5
  })), []);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center space-x-3">
            <span className="bg-purple-600 text-white p-2 rounded-xl shadow-lg shadow-purple-900/20">
              <i className="fas fa-brain"></i>
            </span>
            <span>Federated Intelligence Hub</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">Distributed AI models, federated learning rounds, and reasoning transparency.</p>
        </div>
        <div className="flex space-x-3">
          <div className="glass-panel px-4 py-2 rounded-xl border-l-4 border-purple-500 shadow-sm">
            <div className="text-[10px] text-zinc-500 uppercase font-bold">Inference Speed</div>
            <div className="text-lg font-bold text-zinc-900 dark:text-white">142ms <span className="text-[10px] text-emerald-500">AVG</span></div>
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-purple-900/20 hover:bg-purple-500 transition-all flex items-center">
            <i className="fas fa-rotate mr-2"></i> RETRAIN GLOBAL
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl shadow-xl h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Model Drift & Accuracy Validation</h3>
              <div className="flex space-x-4 text-[10px] font-bold">
                <span className="text-purple-500">● ACCURACY</span>
                <span className="text-rose-500">● DRIFT index</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={driftData}>
                <defs>
                  <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" opacity={0.1} />
                <XAxis dataKey="time" hide />
                <YAxis hide domain={[90, 100]} />
                <Tooltip contentStyle={{backgroundColor: '#18181b', border: 'none', borderRadius: '12px'}} />
                <Area type="monotone" dataKey="accuracy" stroke="#a855f7" fill="url(#colorAcc)" strokeWidth={3} />
                <Area type="monotone" dataKey="drift" stroke="#f43f5e" fill="transparent" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-2xl shadow-xl">
              <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-widest mb-4">Reasoning Step Explorer</h4>
              <div className="space-y-4">
                {[
                  { step: 'Observation', msg: 'Detected temperature delta > 2°C in Cold Room 4.' },
                  { step: 'Hypothesis', msg: 'Compressor cycle mismatch or sensor calibration error.' },
                  { step: 'Validation', msg: 'Cross-referencing PLC energy draw; load is steady.' },
                  { step: 'Action Plan', msg: 'Trigger sensor recalibration; flag maintenance.' }
                ].map((log, i) => (
                  <div key={i} className="flex space-x-3 group">
                    <div className="mt-1 w-2 h-2 rounded-full bg-purple-500 ring-4 ring-purple-500/10 group-hover:scale-125 transition-all"></div>
                    <div>
                      <div className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase">{log.step}</div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{log.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl shadow-xl bg-gradient-to-br from-purple-600/5 to-transparent">
              <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-widest mb-4">Federated Mesh Status</h4>
              <div className="relative h-48 flex items-center justify-center">
                 <div className="absolute w-32 h-32 border border-purple-500/30 rounded-full animate-spin-slow"></div>
                 <div className="absolute w-20 h-20 border-2 border-dashed border-purple-500/50 rounded-full animate-reverse-spin"></div>
                 <div className="z-10 w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center shadow-2xl shadow-purple-900/50">
                    <i className="fas fa-project-diagram text-white"></i>
                 </div>
                 {/* Simulated edge nodes */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-zinc-950 shadow-[0_0_10px_#10b981]"></div>
                 <div className="absolute bottom-4 left-10 w-3 h-3 bg-emerald-500 rounded-full border-2 border-zinc-950 shadow-[0_0_10px_#10b981]"></div>
                 <div className="absolute top-1/2 right-4 w-3 h-3 bg-amber-500 rounded-full border-2 border-zinc-950 shadow-[0_0_10px_#f59e0b]"></div>
              </div>
              <div className="mt-4 flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
                <span>12 Active Nodes</span>
                <span>4.2k Daily Training Rounds</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl shadow-xl flex flex-col h-full">
           <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">Model Distribution</h3>
           <div className="flex-1 space-y-6">
              {[
                { name: 'Sensing: Edge-Vision', ver: 'v4.1.2', status: 'Stable', usage: 92 },
                { name: 'Planning: SupplyChain-Opt', ver: 'v2.8.0', status: 'Updating', usage: 45 },
                { name: 'Control: PID-Neural', ver: 'v1.12.4', status: 'Stable', usage: 100 },
                { name: 'Maturity: Audit-Gen', ver: 'v0.9.1', status: 'Beta', usage: 12 }
              ].map(model => (
                <div key={model.name} className="space-y-2">
                   <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{model.name}</div>
                        <div className="text-[10px] text-zinc-500 font-mono">{model.ver} • {model.status}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-purple-600 dark:text-purple-400">{model.usage}%</div>
                        <div className="text-[9px] text-zinc-500 uppercase">Distribution</div>
                      </div>
                   </div>
                   <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 transition-all duration-1000" style={{ width: `${model.usage}%` }}></div>
                   </div>
                </div>
              ))}
           </div>
           <div className="mt-8 p-4 bg-purple-600/10 rounded-xl border border-purple-500/20">
              <p className="text-[10px] text-purple-800 dark:text-purple-300 italic">
                "Global model synchronization scheduled in 42 minutes across all federated clusters."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Intelligence;
