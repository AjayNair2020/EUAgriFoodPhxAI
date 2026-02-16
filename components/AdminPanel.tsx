
import React, { useState } from 'react';
import { User, RACILevel, MenuPermissions } from '../types';

interface AdminPanelProps {
  currentUser: User;
  users: User[];
  onUpdateRaci: (email: string, level: RACILevel) => void;
  menuPermissions: MenuPermissions;
  onUpdateMenuPermission: (menuId: string, level: RACILevel, allowed: boolean) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  currentUser, 
  users, 
  onUpdateRaci, 
  menuPermissions, 
  onUpdateMenuPermission 
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'users' | 'rbac'>('users');

  const menuDisplayNames: Record<string, string> = {
    dashboard: 'System Overview',
    urban: 'Urban Infrastructure',
    coastal: 'Coastal Zone Management',
    'ot-control': 'OT Control Systems',
    supplychain: 'Supply-Chain Planning',
    governance: 'AI Governance Group',
    farming: 'Farming Operations Group',
    climate: 'Climate-Smart Group',
    scm: 'Supply Chain Operations Group'
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">System Administration</h2>
          <p className="text-zinc-500 text-sm mt-1">Federated QAN Governance & RACI Framework Management.</p>
        </div>
        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700">
          <button 
            onClick={() => setActiveAdminTab('users')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeAdminTab === 'users' ? 'bg-emerald-600 text-white shadow-lg' : 'text-zinc-500'}`}
          >
            IDENTITY NODES
          </button>
          <button 
            onClick={() => setActiveAdminTab('rbac')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeAdminTab === 'rbac' ? 'bg-emerald-600 text-white shadow-lg' : 'text-zinc-500'}`}
          >
            RBAC MATRIX
          </button>
        </div>
      </div>

      {activeAdminTab === 'users' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-panel rounded-2xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/30">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Identity Access Matrix</h3>
              <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">{users.length} TOTAL NODES</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">
                    <th className="px-6 py-4">Identity</th>
                    <th className="px-6 py-4">Current Role</th>
                    <th className="px-6 py-4 text-center">RACI Authority</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {users.map(u => (
                    <tr key={u.email} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-emerald-500/20">
                            <img src={u.avatar} alt={u.name} />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-zinc-900 dark:text-white">{u.name}</div>
                            <div className="text-[10px] text-zinc-500 font-mono">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">{u.role}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center space-x-1">
                          {[RACILevel.ACCOUNTABLE, RACILevel.RESPONSIBLE, RACILevel.CONSULTED, RACILevel.INFORMED].map(level => (
                            <button
                              key={level}
                              onClick={() => !u.isSuperAdmin && onUpdateRaci(u.email, level)}
                              disabled={u.isSuperAdmin}
                              className={`w-7 h-7 rounded-lg text-[10px] font-black flex items-center justify-center transition-all ${
                                u.raciLevel === level
                                  ? level === 'A' ? 'bg-rose-500 text-white shadow-lg' :
                                    level === 'R' ? 'bg-emerald-500 text-white shadow-lg' :
                                    level === 'C' ? 'bg-blue-500 text-white shadow-lg' : 'bg-zinc-500 text-white shadow-lg'
                                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-zinc-400 hover:text-rose-500 transition-colors" disabled={u.isSuperAdmin}>
                          <i className="fas fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-emerald-600/5 to-transparent">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">Access Security Context</h3>
              <div className="space-y-4">
                {[
                  { t: 'Just Now', m: 'RBAC Policy Update for SCM Hub.', s: 'INFO' },
                  { t: '12m ago', m: 'Identity Node sarah@agrifood.io re-synced.', s: 'SYNC' },
                  { t: '1h ago', m: 'Unauthenticated attempt blocked (Node 0x14).', s: 'SECURITY' }
                ].map((log, i) => (
                  <div key={i} className="flex space-x-3 border-l-2 border-emerald-500/20 pl-3 py-1">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] font-mono text-zinc-400">{log.t}</span>
                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${
                          log.s === 'SECURITY' ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'
                        }`}>{log.s}</span>
                      </div>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-tight font-medium">{log.m}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800">
               <div className="flex items-center space-x-3 text-rose-500 mb-4">
                  <i className="fas fa-shield-halved"></i>
                  <span className="text-[10px] font-black uppercase tracking-widest">Super Admin Override</span>
               </div>
               <p className="text-[10px] text-zinc-500 leading-relaxed mb-4">
                 Physical AgenticAI systems require high-integrity RACI definitions. Changes to Accountable (A) levels trigger a mesh-wide audit re-sync.
               </p>
               <button className="w-full py-3 bg-zinc-800 text-white text-xs font-bold rounded-xl hover:bg-rose-600 transition-all uppercase tracking-widest">
                 Audit Global Permissions
               </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-panel rounded-3xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">RACI Permission Matrix</h3>
            <p className="text-xs text-zinc-500 mt-1 uppercase tracking-tight font-bold">Configure which RACI roles can access specific system modules.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-500 uppercase font-black">
                  <th className="px-8 py-6">System Module</th>
                  <th className="px-6 py-6 text-center">Accountable (A)</th>
                  <th className="px-6 py-6 text-center">Responsible (R)</th>
                  <th className="px-6 py-6 text-center">Consulted (C)</th>
                  <th className="px-6 py-6 text-center">Informed (I)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {Object.keys(menuDisplayNames).map(menuId => (
                  <tr key={menuId} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                    <td className="px-8 py-5">
                      <div className="text-sm font-black text-zinc-800 dark:text-zinc-200">{menuDisplayNames[menuId]}</div>
                      <div className="text-[10px] text-zinc-500 font-mono mt-1 uppercase">{menuId}</div>
                    </td>
                    {[RACILevel.ACCOUNTABLE, RACILevel.RESPONSIBLE, RACILevel.CONSULTED, RACILevel.INFORMED].map(level => {
                      const isAllowed = menuPermissions[menuId]?.includes(level);
                      return (
                        <td key={level} className="px-6 py-5 text-center">
                          <button
                            onClick={() => onUpdateMenuPermission(menuId, level, !isAllowed)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto transition-all ${
                              isAllowed 
                                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-inner' 
                                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-300 dark:text-zinc-700'
                            }`}
                          >
                            <i className={`fas ${isAllowed ? 'fa-check' : 'fa-xmark'} text-sm`}></i>
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-8 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex justify-between items-center">
             <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                   <i className="fas fa-floppy-disk text-xl"></i>
                </div>
                <div>
                   <div className="text-sm font-bold text-zinc-900 dark:text-white leading-none">Automatic Mesh Persistence</div>
                   <div className="text-[10px] text-zinc-500 mt-1 uppercase font-bold tracking-widest">Live Updates Enabled</div>
                </div>
             </div>
             <button className="px-8 py-4 bg-emerald-600 text-white rounded-2xl text-xs font-black shadow-2xl shadow-emerald-600/30 hover:bg-emerald-500 transition-all uppercase tracking-widest">
               Commit RBAC Snapshot
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
