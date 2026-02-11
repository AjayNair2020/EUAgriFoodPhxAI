
import React, { useState } from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }) => {
  const [isFarmingOpen, setIsFarmingOpen] = useState(false);
  const [isClimateOpen, setIsClimateOpen] = useState(false);
  const [isSCMOpen, setIsSCMOpen] = useState(false);
  const [isGovernanceOpen, setIsGovernanceOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: 'fa-chart-pie', label: 'Overview' },
    { id: 'agents', icon: 'fa-robot', label: 'Agents' },
    { id: 'supplychain', icon: 'fa-truck-ramp-box', label: 'Planning' },
    { id: 'ot-control', icon: 'fa-industry', label: 'OT Control' },
  ];

  const farmingSubItems = [
    'Agriculture', 'Plantations', 'Animal Husbandry', 'Psiculture', 
    'Horticulture', 'Floriculture', 'Aviculture', 'Aquaculture', 'Apiculture'
  ];

  const climateSubItems = [
    'Data Collection', 'Analytics', 'Forecast', 'Mitigation', 
    'Resilience', 'Finance & Insurance', 'Diversification'
  ];

  const scmSubItems = [
    'Raw Produce', 'Processing Units', 'Packaging', 'Shipping', 
    'Warehouse', 'Transport', 'Last-mile Delivery'
  ];

  const handleFarmingClick = () => {
    if (isCollapsed) setIsCollapsed(false);
    setIsFarmingOpen(!isFarmingOpen);
    setIsClimateOpen(false);
    setIsSCMOpen(false);
    setIsGovernanceOpen(false);
    setActiveTab('commercial-farming');
  };

  const handleClimateClick = () => {
    if (isCollapsed) setIsCollapsed(false);
    setIsClimateOpen(!isClimateOpen);
    setIsFarmingOpen(false);
    setIsSCMOpen(false);
    setIsGovernanceOpen(false);
    setActiveTab('climate-smart');
  };

  const handleSCMClick = () => {
    if (isCollapsed) setIsCollapsed(false);
    setIsSCMOpen(!isSCMOpen);
    setIsFarmingOpen(false);
    setIsClimateOpen(false);
    setIsGovernanceOpen(false);
    setActiveTab('supply-chain-mgmt');
  };

  const handleGovernanceClick = () => {
    if (isCollapsed) setIsCollapsed(false);
    setIsGovernanceOpen(!isGovernanceOpen);
    setIsFarmingOpen(false);
    setIsClimateOpen(false);
    setIsSCMOpen(false);
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
              setIsClimateOpen(false);
              setIsSCMOpen(false);
              setIsGovernanceOpen(false);
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

        {/* SCM Menu Item */}
        <div className="pt-2">
          <button
            onClick={handleSCMClick}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3 px-4'} py-3 rounded-lg transition-all ${
              activeTab.startsWith('scm-') || activeTab === 'supply-chain-mgmt'
                ? 'bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-600/30' 
                : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white'
            }`}
            title={isCollapsed ? "Supply-Chain Mgmt" : ""}
          >
            <i className="fas fa-boxes-packing w-5 text-center"></i>
            {!isCollapsed && (
              <div className="flex-1 flex justify-between items-center">
                <span className="font-medium whitespace-nowrap">Supply-Chain Mgmt</span>
                <i className={`fas fa-chevron-${isSCMOpen ? 'up' : 'down'} text-[10px]`}></i>
              </div>
            )}
          </button>

          {!isCollapsed && isSCMOpen && (
            <div className="mt-1 ml-4 space-y-1 border-l border-zinc-200 dark:border-zinc-800 pl-4">
              {scmSubItems.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveTab(`scm-${sub.toLowerCase().replace(' ', '-')}`)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                    activeTab === `scm-${sub.toLowerCase().replace(' ', '-')}`
                      ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-600/10'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/30 dark:hover:bg-zinc-800/30'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>

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

        {/* Climate-Smart Farm Menu Item */}
        <div className="pt-2">
          <button
            onClick={handleClimateClick}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3 px-4'} py-3 rounded-lg transition-all ${
              activeTab.startsWith('climate-') || activeTab === 'climate-smart'
                ? 'bg-cyan-600/20 text-cyan-600 dark:text-cyan-400 border border-cyan-600/30' 
                : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white'
            }`}
            title={isCollapsed ? "Climate-Smart Farm" : ""}
          >
            <i className="fas fa-cloud-sun-rain w-5 text-center"></i>
            {!isCollapsed && (
              <div className="flex-1 flex justify-between items-center">
                <span className="font-medium whitespace-nowrap">Climate-Smart Farm</span>
                <i className={`fas fa-chevron-${isClimateOpen ? 'up' : 'down'} text-[10px]`}></i>
              </div>
            )}
          </button>

          {!isCollapsed && isClimateOpen && (
            <div className="mt-1 ml-4 space-y-1 border-l border-zinc-200 dark:border-zinc-800 pl-4">
              {climateSubItems.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setActiveTab(`climate-${sub.toLowerCase().replace(' ', '-').replace('&', 'and')}`)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                    activeTab === `climate-${sub.toLowerCase().replace(' ', '-').replace('&', 'and')}`
                      ? 'text-cyan-600 dark:text-cyan-400 font-bold bg-cyan-600/10'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/30 dark:hover:bg-zinc-800/30'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* AgriFood Governance Menu Item */}
        <div className="pt-2">
          <button
            onClick={handleGovernanceClick}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3 px-4'} py-3 rounded-lg transition-all ${
              activeTab === 'maturity' || activeTab === 'intelligence'
                ? 'bg-purple-600/20 text-purple-600 dark:text-purple-400 border border-purple-600/30' 
                : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white'
            }`}
            title={isCollapsed ? "AgriFood Governance" : ""}
          >
            <i className="fas fa-shield-halved w-5 text-center"></i>
            {!isCollapsed && (
              <div className="flex-1 flex justify-between items-center">
                <span className="font-medium whitespace-nowrap">AgriFood Governance</span>
                <i className={`fas fa-chevron-${isGovernanceOpen ? 'up' : 'down'} text-[10px]`}></i>
              </div>
            )}
          </button>

          {!isCollapsed && isGovernanceOpen && (
            <div className="mt-1 ml-4 space-y-1 border-l border-zinc-200 dark:border-zinc-800 pl-4">
              <button
                onClick={() => setActiveTab('maturity')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                  activeTab === 'maturity'
                    ? 'text-purple-600 dark:text-purple-400 font-bold bg-purple-600/10'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/30 dark:hover:bg-zinc-800/30'
                }`}
              >
                Maturity
              </button>
              <button
                onClick={() => setActiveTab('intelligence')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                  activeTab === 'intelligence'
                    ? 'text-purple-600 dark:text-purple-400 font-bold bg-purple-600/10'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/30 dark:hover:bg-zinc-800/30'
                }`}
              >
                Intelligence
              </button>
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
