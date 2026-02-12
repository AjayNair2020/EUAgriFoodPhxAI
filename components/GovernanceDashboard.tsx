
import React from 'react';
import { RACILevel } from '../types';

const GovernanceDashboard: React.FC = () => {
  const policies = [
    { name: 'GDPR Federated Compliance', status: 'Compliant', score: 98, color: 'bg-leaf-green' },
    { name: 'EU AI Act Sovereignty Alignment', status: 'Evaluating', score: 72, color: 'bg-amber-500' },
    { name: 'Farm-to-Fork Traceability Node', status: 'Compliant', score: 100, color: 'bg-leaf-green' },
    { name: 'Edge Data Privacy Protocol V2', status: 'Partial', score: 85, color: 'bg-blue-500' }
  ];

  const raciStats = [
    { level: RACILevel.ACCOUNTABLE, count: 2, label: 'Final Decision Nodes', color: 'bg-rose-500' },
    { level: RACILevel.RESPONSIBLE, count: 14, label: 'Operational Task Owners', color: 'bg-leaf-green' },
    { level: RACILevel.CONSULTED, count: 8, label: 'SME Domain Contributors', color: 'bg-blue-500' },
    { level: RACILevel.INFORMED, count: 32, label: 'Stakeholder Observability', color: 'bg-zinc-500' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-eu-blue text-white rounded-2xl flex items-center justify-center shadow-xl shadow-eu-blue/20">
            <i className="fas fa-scale-balanced text-2xl"></i>
          </div>
          <div>
            <h2 className="text-3xl font-[900] text-forest-dark dark:text-white tracking-tighter">AgriFood Governance Mesh</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1 font-medium">Sovereign policy enforcement and RACI framework orchestration.</p>
          </div>
        </div>
        <button className="bg-eu-blue text-white px-6 py-3 rounded-2xl text-xs font-black shadow-xl shadow-eu-blue/20 hover:bg-blue-700 transition-all flex items-center">
          <i className="fas fa-file-shield mr-3"></i> GENERATE AUDIT REPORT
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {raciStats.map((stat) => (
          <div key={stat.level} className="glass-panel p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm border-l-8" style={{ borderColor: 'var(--tw-border-opacity)' }}>
            <div className="flex justify-between items-center mb-3">
              <span className={`w-10 h-10 rounded-xl ${stat.color} text-white flex items-center justify-center font-black text-sm shadow-lg`}>{stat.level}</span>
              <span className="text-3xl font-[900] text-forest-dark dark:text-white">{stat.count}</span>
            </div>
            <p className="text-[10px] text-zinc-400 uppercase font-black tracking-widest leading-none">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel p-8 rounded-[32px] shadow-xl border border-zinc-100 dark:border-zinc-800">
          <h3 className="text-xl font-black text-forest-dark dark:text-white mb-8 flex items-center tracking-tight">
            <i className="fas fa-clipboard-check mr-3 text-eu-blue"></i>
            Policy Compliance Matrix
          </h3>
          <div className="space-y-8">
            {policies.map((policy) => (
              <div key={policy.name} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-sm font-black text-forest-dark dark:text-zinc-200">{policy.name}</span>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg border ${policy.status === 'Compliant' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                        {policy.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-[900] text-forest-dark dark:text-white">{policy.score}%</span>
                    <div className="text-[8px] text-zinc-400 font-black uppercase">Fidelity</div>
                  </div>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className={`h-full transition-all duration-1500 ${policy.color} shadow-sm`} 
                    style={{ width: `${policy.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-8 rounded-[32px] shadow-xl border border-zinc-100 dark:border-zinc-800 flex flex-col bg-zinc-50/30 dark:bg-transparent">
          <h3 className="text-xl font-black text-forest-dark dark:text-white mb-8 tracking-tight">Governance Audit Trail</h3>
          <div className="flex-1 space-y-6 overflow-y-auto pr-2 scrollbar-thin">
            {[
              { t: 'Oct 24, 2023', m: 'GDPR Edge Privacy Audit Passed across all nodes.', s: 'SUCCESS', icon: 'fa-circle-check' },
              { t: 'Oct 20, 2023', m: 'New RACI assignment for SCM Phase 2 (Accountable).', s: 'UPDATE', icon: 'fa-user-pen' },
              { t: 'Oct 15, 2023', m: 'EU AI Act policy gap detected in "Drift-Logic".', s: 'WARNING', icon: 'fa-triangle-exclamation' },
              { t: 'Oct 10, 2023', m: 'Annual Sovereign Data Review finalized.', s: 'INFO', icon: 'fa-circle-info' }
            ].map((event, i) => (
              <div key={i} className="flex space-x-4 group">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm ${
                  event.s === 'SUCCESS' ? 'text-leaf-green' : event.s === 'WARNING' ? 'text-amber-500' : 'text-eu-blue'
                }`}>
                  <i className={`fas ${event.icon} text-sm`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black text-zinc-400">{event.t}</span>
                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-md ${
                      event.s === 'SUCCESS' ? 'bg-green-100 text-green-700' : event.s === 'WARNING' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                    }`}>{event.s}</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium leading-tight">{event.m}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-4 bg-white dark:bg-zinc-800 text-[10px] font-black text-zinc-500 rounded-2xl border border-zinc-100 dark:border-zinc-800 hover:text-eu-blue hover:border-eu-blue transition-all uppercase tracking-widest shadow-sm">
            VIEW GLOBAL GOVERNANCE LOGS
          </button>
        </div>
      </div>
    </div>
  );
};

export default GovernanceDashboard;
