
import React from 'react';
import { User, RACILevel } from '../types';

interface AdminPanelProps {
  currentUser: User;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ currentUser }) => {
  const users: User[] = [
    { email: 'ajaybinduarti@gmail.com', name: 'Ajay Bindu Arti', role: 'System Architect', raciLevel: RACILevel.ACCOUNTABLE, isSuperAdmin: true },
    { email: 'operator.01@agrifood.io', name: 'Mark Wilson', role: 'Edge Operator', raciLevel: RACILevel.RESPONSIBLE, isSuperAdmin: false },
    { email: 'analyst.global@agrifood.io', name: 'Sarah Chen', role: 'Agri-Analyst', raciLevel: RACILevel.CONSULTED, isSuperAdmin: false },
    { email: 'viewer.hq@agrifood.io', name: 'John Doe', role: 'Executive Viewer', raciLevel: RACILevel.INFORMED, isSuperAdmin: false },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">System Administration</h2>
          <p className="text-zinc-500 text-sm mt-1">RACI RBAC Management & Federated Governance Control.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-900/20">
          INVITE PROCESS OWNER
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-2xl shadow-xl overflow-hidden border border-zinc-800">
          <div className="p-5 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/30">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">User Access Matrix</h3>
            <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">4 TOTAL IDENTITY NODES</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">
                  <th className="px-6 py-4">Identity</th>
                  <th className="px-6 py-4">Current Role</th>
                  <th className="px-6 py-4 text-center">RACI Level</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {users.map(u => (
                  <tr key={u.email} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-600/20 border border-emerald-500/20 flex items-center justify-center text-[10px] text-emerald-500 font-bold">
                          {u.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{u.name}</div>
                          <div className="text-[10px] text-zinc-500 font-mono">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase">{u.role}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded text-[10px] font-black ${
                        u.raciLevel === 'A' ? 'bg-rose-500/20 text-rose-500' : 
                        u.raciLevel === 'R' ? 'bg-emerald-500/20 text-emerald-500' :
                        u.raciLevel === 'C' ? 'bg-blue-500/20 text-blue-500' : 'bg-zinc-500/20 text-zinc-500'
                      }`}>
                        {u.raciLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-zinc-500 hover:text-emerald-400 transition-colors" disabled={u.isSuperAdmin}>
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl shadow-xl border border-zinc-800 bg-gradient-to-br from-emerald-600/5 to-transparent">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">Security Audit Log</h3>
          <div className="space-y-4">
            {[
              { t: '12:44:02', m: 'ajaybinduarti@gmail.com triggered global handoff.', s: 'CRITICAL' },
              { t: '11:20:15', m: 'Sarah Chen updated risk parameters (C Level).', s: 'AUDIT' },
              { t: '09:05:44', m: 'System wide re-sync authorized by Super Admin.', s: 'INFO' },
              { t: '08:12:00', m: 'Failed login attempt from IP 192.168.1.1', s: 'WARNING' }
            ].map((log, i) => (
              <div key={i} className="flex space-x-3 border-l-2 border-zinc-800 pl-3 py-1 hover:border-emerald-500 transition-all cursor-default">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] font-mono text-zinc-500">{log.t}</span>
                    <span className={`text-[8px] font-bold px-1 rounded ${
                      log.s === 'CRITICAL' ? 'bg-rose-500/10 text-rose-500' :
                      log.s === 'WARNING' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
                    }`}>{log.s}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-tight">{log.m}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all">
            EXPORT AUDIT MESH
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
