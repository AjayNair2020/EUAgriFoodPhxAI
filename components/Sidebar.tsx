
import React, { useState } from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }) => {
  const [isFarmingOpen, setIsFarmingOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: 'fa-chart-pie', label: 'Overview' },
    { id: 'agents', icon: 'fa-robot', label: 'Agents' },
    { id: 'supplychain', icon: 'fa-truck-ramp-box', label: 'Planning' },
    { id: 'ot-control', icon: 'fa-industry', label: 'OT Control' },
    { id: 'maturity', icon: 'fa-stairs', label: 'Maturity' },
    { id: 'intelligence', icon: 'fa-brain', label: 'Intelligence' }
  ];

  const farmingSubItems = [
    'Agriculture', 'Plantations', 'Animal Husbandry', 'Psiculture', 
    'Horticulture', 'Floriculture', 'Aviculture', 'Aquaculture', 'Apiculture'
  ];

  const handleFarmingClick = () => {
    if (isCollapsed) setIsCollapsed(false);
    setIsFarmingOpen(!isFarmingOpen);
    setActiveTab('commercial-farming');
  };

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} h-full glass-panel border-r flex flex-col fixed left-0 top-0 pt-20 z-40 transition-all duration-300 ease-in-out`}>
      <div className="flex justify-end px-4 mb-2">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 text-zinc-500 transition-colors"
          title={isCollapsed ? "Expand Menu" : "Collapse Menu"}
        >
          <i className={`fas ${isCollapsed ? 'fa-indent' : 'fa-outdent'}`}></i>
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto scrollbar-thin">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setIsFarmingOpen(false);
            }}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3 px-4'} py-3 rounded-lg transition-all ${
              activeTab === item.id 
                ? 'bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 border border-emerald-600/30' 
                : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white'
            }`}
            title={isCollapsed ? item.label : ""}
          >
            <i className={`fas ${item.icon} w-5 text-center`}></i>
            {!isCollapsed && <span className="font-medium whitespace-nowrap">{item.label}</span>}
          </button>
        ))}

        {/* Commercial Farming Menu Item */}
        <div className="pt-2">
          <button
            onClick={handleFarmingClick}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3 px-4'} py-3 rounded-lg transition-all ${
              activeTab.startsWith('farming-') || activeTab === 'commercial-farming'
                ? 'bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 border border-emerald-600/30' 
                : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white'
            }`}
            title={isCollapsed ? "Commercial Farming" : ""}
          >
            <i className="fas fa-tractor w-5 text-center"></i>
            {!isCollapsed && (
              <div className="flex-1 flex justify-between items-center">
                <span className="font-medium whitespace-nowrap">Commercial Farming</span>
                <i className={`fas fa-chevron-${isFarmingOpen ? 'up' : 'down'} text-[10px]`}></i>
              </div>
            )}
          </button>

          {!isCollapsed && isFarmingOpen && (
            <div className="mt-1 ml-4 space-y-1 border-l border-zinc-200 dark:border-zinc-800 pl-4">
              {farmingSubItems.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveTab(`farming-${sub.toLowerCase().replace(' ', '-')}`)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                    activeTab === `farming-${sub.toLowerCase().replace(' ', '-')}`
                      ? 'text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-600/10'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/30 dark:hover:bg-zinc-800/30'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
      
      {!isCollapsed && (
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="bg-zinc-200/50 dark:bg-zinc-900/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 text-xs text-zinc-500 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>INTEGRITY: 98.4%</span>
            </div>
            <div className="w-full bg-zinc-300 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[98%]"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
