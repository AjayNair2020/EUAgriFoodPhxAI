
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'fa-chart-pie', label: 'System Overview' },
    { id: 'agents', icon: 'fa-robot', label: 'Federated Agents' },
    { id: 'supplychain', icon: 'fa-truck-ramp-box', label: 'Supply Chain Planning' },
    { id: 'ot-control', icon: 'fa-industry', label: 'OT Control Center' },
    { id: 'maturity', icon: 'fa-stairs', label: 'Process Maturity' },
    { id: 'intelligence', icon: 'fa-brain', label: 'Agentic Intelligence' }
  ];

  return (
    <div className="w-64 h-full glass-panel border-r flex flex-col fixed left-0 top-0 pt-20">
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === item.id 
                ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30' 
                : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
            }`}
          >
            <i className={`fas ${item.icon} w-5 text-center`}></i>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-zinc-800">
        <div className="bg-zinc-900/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 text-xs text-zinc-500 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>SYSTEM INTEGRITY: 98.4%</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[98%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
