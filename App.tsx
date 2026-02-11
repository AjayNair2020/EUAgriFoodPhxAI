
import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import RightPanel from './components/RightPanel';
import AgentCard from './components/AgentCard';
import CoPilotChat from './components/CoPilotChat';
import MaturityDashboard from './components/MaturityDashboard';
import CommercialFarming from './components/CommercialFarming';
import CommercialFarmingDashboard from './components/CommercialFarmingDashboard';
import ClimateSmartFarm from './components/ClimateSmartFarm';
import OTControl from './components/OTControl';
import Intelligence from './components/Intelligence';
import TopologyMap from './components/TopologyMap';
import SupplyChainManagement from './components/SupplyChainManagement';
import SupplyChainPlanning from './components/SupplyChainPlanning';
import OverviewMap from './components/OverviewMap';
import { INITIAL_AGENTS, SYSTEM_KPIS } from './constants';
import { analyzeSupplyChainRisk } from './services/geminiService';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [agents] = useState(INITIAL_AGENTS);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // Collapsible Panel States
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);

  // Supply Chain States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [riskReport, setRiskReport] = useState<{risks: any[]} | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleRunRiskAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const data = {
        nodes: agents.map(a => ({ name: a.name, load: a.load, status: a.status })),
        kpis: SYSTEM_KPIS
      };
      const result = await analyzeSupplyChainRisk(data);
      setRiskReport(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Simulated chart data
  const historyData = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    yield: 85 + Math.random() * 10,
    demand: 60 + Math.random() * 30,
    temp: 20 + Math.random() * 5
  })), []);

  const renderContent = () => {
    // Handle Farming Domains
    if (activeTab.startsWith('farming-')) {
      const domainSlug = activeTab.replace('farming-', '');
      const domainName = domainSlug.charAt(0).toUpperCase() + domainSlug.slice(1).replace(/-/g, ' ');
      // Correct casing for specific words
      let finalName = domainName;
      if (domainName === 'Psiculture') finalName = 'Psiculture';
      if (domainName === 'Animal husbandry') finalName = 'Animal Husbandry';
      
      return <CommercialFarming domain={finalName} />;
    }

    // Handle Climate Sections
    if (activeTab.startsWith('climate-')) {
      const sectionSlug = activeTab.replace('climate-', '');
      return <ClimateSmartFarm section={sectionSlug} />;
    }

    // Handle SCM Sections
    if (activeTab.startsWith('scm-')) {
      const sectionSlug = activeTab.replace('scm-', '');
      return <SupplyChainManagement section={sectionSlug} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {SYSTEM_KPIS.map((kpi) => (
                <div key={kpi.name} className="glass-panel p-5 rounded-xl border-b-2 border-transparent hover:border-emerald-500 transition-all shadow-sm">
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase">{kpi.name}</div>
                    <i className={`fas ${kpi.name === 'Process CMM' ? 'fa-stairs' : kpi.name === 'Yield Efficiency' ? 'fa-seedling' : 'fa-chart-line'} text-[10px] text-emerald-500/50`}></i>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <div className="text-3xl font-bold text-zinc-900 dark:text-white">{kpi.value}{kpi.unit}</div>
                    <div className={`text-xs ${kpi.trend === 'up' ? 'text-emerald-500' : kpi.trend === 'down' ? 'text-rose-500' : 'text-zinc-400'}`}>
                      <i className={`fas fa-caret-${kpi.trend === 'up' ? 'up' : kpi.trend === 'down' ? 'down' : 'right'} mr-1`}></i>
                      {kpi.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Strategic Overview Map */}
            <div className="space-y-4">
               <div className="flex justify-between items-center px-1">
                 <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center">
                   <i className="fas fa-map-location-dot mr-2 text-emerald-600"></i>
                   AgriFood Operational Mesh
                 </h3>
                 <span className="text-[10px] text-zinc-500 font-mono">Source-to-Shelf Visualization</span>
               </div>
               <OverviewMap />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 glass-panel p-6 rounded-xl h-[400px] shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Yield & Demand Synchronicity</h3>
                  <div className="flex space-x-4">
                    <div className="flex items-center text-xs text-emerald-500">
                      <span className="w-3 h-1 bg-emerald-500 rounded-full mr-2"></span> YIELD
                    </div>
                    <div className="flex items-center text-xs text-blue-500 dark:text-blue-400">
                      <span className="w-3 h-1 bg-blue-500 dark:bg-blue-400 rounded-full mr-2"></span> DEMAND
                    </div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height="80%">
                  <AreaChart data={historyData}>
                    <defs>
                      <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#2d553c' : '#e2e8f0'} vertical={false} opacity={0.3} />
                    <XAxis dataKey="time" stroke={theme === 'dark' ? '#527a5e' : '#94a3b8'} fontSize={10} />
                    <YAxis stroke={theme === 'dark' ? '#527a5e' : '#94a3b8'} fontSize={10} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: theme === 'dark' ? '#0f2a1a' : '#ffffff', 
                        border: theme === 'dark' ? '1px solid #2d553c' : '1px solid #e2e8f0', 
                        borderRadius: '8px',
                        color: theme === 'dark' ? '#fff' : '#000'
                      }}
                    />
                    <Area type="monotone" dataKey="yield" stroke="#10b981" fillOpacity={1} fill="url(#colorYield)" />
                    <Area type="monotone" dataKey="demand" stroke="#3b82f6" fillOpacity={1} fill="url(#colorDemand)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="lg:col-span-1">
                <CoPilotChat systemContext={{ kpis: SYSTEM_KPIS }} agents={agents} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Critical Agent Nodes</h3>
                <button 
                  onClick={() => setActiveTab('topology')}
                  className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                >
                  VIEW TOPOLOGY
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {agents.slice(0, 4).map(agent => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            </div>
          </div>
        );
      case 'agents':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Federated Agent Network</h2>
                <p className="text-zinc-500 dark:text-zinc-400">Distributed AI intelligence managing localized operations.</p>
              </div>
              <div className="flex space-x-2">
                 <button className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-4 py-2 rounded-lg text-sm font-bold border border-zinc-200 dark:border-zinc-700">
                    LIFE-CYCLE LOGS
                 </button>
                 <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-emerald-900/10 flex items-center transition-all">
                   <i className="fas fa-plus mr-2"></i> DEPLOY AGENT
                 </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {agents.map(agent => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
        );
      case 'supplychain':
        return <SupplyChainPlanning />;
      case 'ot-control':
        return <OTControl />;
      case 'intelligence':
        return <Intelligence />;
      case 'topology':
        return <TopologyMap />;
      case 'supply-chain-mgmt':
        return <SupplyChainManagement section="raw-produce" />;
      case 'maturity':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Process Maturity Management</h2>
              <p className="text-zinc-500 dark:text-zinc-400">Tracking CMMI-aligned maturity stages for AgriFood cycle integrity.</p>
            </div>
            <MaturityDashboard />
          </div>
        );
      case 'commercial-farming':
        return <CommercialFarmingDashboard />;
      case 'climate-smart':
        return (
          <div className="flex items-center justify-center h-96 text-zinc-500">
            <div className="text-center">
              <i className="fas fa-cloud-sun-rain text-5xl mb-4 text-cyan-600/50"></i>
              <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-200">Climate-Smart Command</h2>
              <p className="mt-2">Select a climate-focused module from the sub-menu to view adaptive analytics.</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-96 text-zinc-500">
            <div className="text-center">
              <i className="fas fa-tools text-4xl mb-4 text-emerald-600/50"></i>
              <p>Section "{activeTab}" is currently being provisioned.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 glass-panel border-b z-50 px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-900/20">
            <i className="fas fa-leaf text-white text-xl"></i>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-zinc-900 dark:text-white tracking-tight leading-none text-sm md:text-base">AgriFood Physical</h1>
            <span className="text-[9px] md:text-[10px] font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">AgenticAI System</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-2 w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center shadow-sm"
            title="Toggle Light/Dark Theme"
          >
            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>

          <div className="hidden md:flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-inner">
            <i className="fas fa-globe text-emerald-600 dark:text-emerald-500 text-[10px]"></i>
            <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-mono font-bold">NODES: 42</span>
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 p-1 pl-3 pr-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-emerald-500 transition-all shadow-sm"
            >
              <div className="text-right mr-1 hidden lg:block">
                <div className="text-[10px] font-bold text-zinc-900 dark:text-white leading-none">
                  {isLoggedIn ? 'Agent Smith' : 'Guest System'}
                </div>
                <div className="text-[8px] text-zinc-400 uppercase tracking-widest mt-0.5">
                  {isLoggedIn ? 'Operator' : 'Read Only'}
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-700 border border-emerald-500 flex items-center justify-center overflow-hidden">
                <img src={isLoggedIn ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" : "https://api.dicebear.com/7.x/initials/svg?seed=GS"} alt="Avatar" />
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 glass-panel rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden z-[100]">
                <div className="p-3 border-b border-zinc-200 dark:border-zinc-800">
                  <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-tighter">Account Status</p>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white mt-1">
                    {isLoggedIn ? 'Authorized' : 'Unauthorized'}
                  </p>
                </div>
                <div className="p-2 space-y-1">
                  <button className="w-full text-left px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg flex items-center space-x-2 transition-colors">
                    <i className="fas fa-user-cog w-4"></i>
                    <span>Profile Settings</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg flex items-center space-x-2 transition-colors">
                    <i className="fas fa-shield-halved w-4"></i>
                    <span>Security Key</span>
                  </button>
                  <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-1 mx-2"></div>
                  <button 
                    onClick={() => { setIsLoggedIn(!isLoggedIn); setShowProfileMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg flex items-center space-x-2 transition-colors ${
                      isLoggedIn ? 'text-rose-500 hover:bg-rose-500/10' : 'text-emerald-500 hover:bg-emerald-500/10'
                    }`}
                  >
                    <i className={`fas fa-sign-${isLoggedIn ? 'out' : 'in'}-alt w-4`}></i>
                    <span>{isLoggedIn ? 'Log Out' : 'Log In System'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main Content Area */}
      <main className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} ${isRightPanelCollapsed ? 'mr-12' : 'mr-72'} mt-16 p-6 md:p-8 overflow-y-auto transition-all duration-300 ease-in-out`}>
        <div className="max-w-7xl mx-auto pb-20">
          {renderContent()}
        </div>
      </main>

      {/* Right Panel */}
      <RightPanel 
        isCollapsed={isRightPanelCollapsed}
        setIsCollapsed={setIsRightPanelCollapsed}
      />
    </div>
  );
};

export default App;
