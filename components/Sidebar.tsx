
import React, { useState } from 'react';
import { RACILevel, User } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  currentUser: User | null;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isCollapsed, setIsCollapsed, currentUser }) => {
  const [openSub, setOpenSub] = useState<string | null>(null);

  const toggleSub = (sub: string) => {
    if (isCollapsed) setIsCollapsed(false);
    setOpenSub(openSub === sub ? null : sub);
  };

  const menuItems = [
    { id: 'dashboard', icon: 'fa-chart-pie', label: 'Overview', level: [RACILevel.ACCOUNTABLE, RACILevel.RESPONSIBLE, RACILevel.CONSULTED, RACILevel.INFORMED] },
    { id: 'agents', icon: 'fa-robot', label: 'Agents', level: [RACILevel.ACCOUNTABLE, RACILevel.RESPONSIBLE, RACILevel.CONSULTED] },
    { id: 'intelligence', icon: 'fa-brain-circuit', label: 'Agentic Intelligence', level: [RACILevel.ACCOUNTABLE, RACILevel.RESPONSIBLE, RACILevel.CONSULTED] },
    { id: 'governance', icon: 'fa-scale-balanced', label: 'AgriFood Governance', level: [RACILevel.ACCOUNTABLE, RACILevel.CONSULTED] },
    { id: 'maturity', icon: 'fa-stairs', label: 'Maturity', level: [RACILevel.ACCOUNTABLE, RACILevel.RESPONSIBLE, RACILevel.CONSULTED] },
    { id: 'ot-control', icon: 'fa-industry', label: 'OT Control', level: [RACILevel.ACCOUNTABLE, RACILevel.RESPONSIBLE] },
    { id: 'supplychain', icon: 'fa-truck-ramp-box', label: 'Planning', level: [RACILevel.ACCOUNTABLE, RACILevel.RESPONSIBLE, RACILevel.CONSULTED] },
  ];

  const subMenus = [
    { id: 'farming', icon: 'fa-tractor', label: 'Farming', items: ['Agriculture', 'Plantations', 'Horticulture'], level: [RACILevel.ACCOUNTABLE, RACILevel.RESPONSIBLE] },
    { id: 'climate', icon: 'fa-cloud-sun-rain', label: 'Climate-Smart', items: ['Data Collection', 'Analytics', 'Forecast'], level: [RACILevel.ACCOUNTABLE, RACILevel.RESPONSIBLE, RACILevel.CONSULTED] },
    { id: 'scm', icon: 'fa-boxes-packing', label: 'Supply Chain', items: ['Raw Produce', 'Processing Units', 'Warehouse'], level: [RACILevel.ACCOUNTABLE, RACILevel.RESPONSIBLE, RACILevel.CONSULTED] },
  ];

  const checkAccess = (levels: RACILevel[]) => {
    if (!currentUser) return false;
    return levels.includes(currentUser.raciLevel);
  };

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} h-full glass-panel border-r border-zinc-200 dark:border-zinc-800 flex flex-col fixed left-0 top-0 pt-20 z-40 transition-all duration-300`}>
      <div className="flex justify-end px-4 mb-2">
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 rounded-lg hover:bg-leaf-green/10 text-zinc-500 transition-colors">
          <i className={`fas ${isCollapsed ? 'fa-indent' : 'fa-outdent'}`}></i>
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto scrollbar-thin">
        {menuItems.filter(item => checkAccess(item.level)).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3 px-4'} py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-leaf-green text-white shadow-lg shadow-leaf-green/20' 
                : 'text-zinc-500 hover:bg-leaf-green/5 hover:text-leaf-green'
            }`}
          >
            <i className={`fas ${item.icon} w-5 text-center`}></i>
            {!isCollapsed && <span className="font-extrabold text-[10px] uppercase tracking-widest">{item.label}</span>}
          </button>
        ))}

        <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-4"></div>

        {subMenus.filter(sub => checkAccess(sub.level)).map((sub) => (
          <div key={sub.id}>
            <button
              onClick={() => toggleSub(sub.id)}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3 px-4'} py-3 rounded-xl text-zinc-500 hover:bg-leaf-green/5 hover:text-leaf-green transition-all`}
            >
              <i className={`fas ${sub.icon} w-5 text-center`}></i>
              {!isCollapsed && (
                <div className="flex-1 flex justify-between items-center">
                  <span className="font-extrabold text-[10px] uppercase tracking-widest">{sub.label}</span>
                  <i className={`fas fa-chevron-${openSub === sub.id ? 'up' : 'down'} text-[8px]`}></i>
                </div>
              )}
            </button>
            {!isCollapsed && openSub === sub.id && (
              <div className="ml-5 pl-4 border-l-2 border-leaf-green/20 space-y-1 mt-1">
                {sub.items.map(item => (
                  <button 
                    key={item}
                    onClick={() => setActiveTab(`${sub.id}-${item.toLowerCase().replace(' ', '-')}`)}
                    className="w-full text-left py-2 text-[10px] text-zinc-500 hover:text-leaf-green font-bold uppercase tracking-tight transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {currentUser?.isSuperAdmin && (
          <div className="pt-4 mt-4 border-t border-rose-500/20">
            <button
              onClick={() => setActiveTab('admin')}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3 px-4'} py-3 rounded-xl transition-all ${
                activeTab === 'admin' 
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-900/20' 
                  : 'text-rose-500/60 hover:bg-rose-500/5 hover:text-rose-500'
              }`}
            >
              <i className="fas fa-user-shield w-5 text-center"></i>
              {!isCollapsed && <span className="font-extrabold text-[10px] uppercase tracking-widest">Admin Hub</span>}
            </button>
          </div>
        )}
      </nav>
      
      {!isCollapsed && (
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="bg-sage-green/50 dark:bg-emerald-500/5 rounded-2xl p-4 border border-leaf-green/10">
            <div className="flex items-center justify-between text-[10px] mb-2">
              <span className="text-zinc-500 font-black">RACI CONTEXT</span>
              <span className="text-leaf-green font-black bg-white dark:bg-zinc-900 px-2 py-0.5 rounded-lg shadow-sm">{currentUser?.raciLevel}</span>
            </div>
            <div className="text-[10px] text-forest-dark dark:text-zinc-400 font-bold leading-tight">
              {currentUser?.raciLevel === RACILevel.ACCOUNTABLE ? 'Full Authority' : 
               currentUser?.raciLevel === RACILevel.RESPONSIBLE ? 'Task Execution' : 'Consultative Access'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
