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
import AdminPanel from './components/AdminPanel';
import LandingPage from './components/LandingPage';
import GovernanceDashboard from './components/GovernanceDashboard';
import UrbanInfrastructure from './components/UrbanInfrastructure';
import CoastalManagement from './components/CoastalManagement';
import { INITIAL_AGENTS, SYSTEM_KPIS } from './constants';
import { RACILevel, User, AgentStatus } from './types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [agents, setAgents] = useState(INITIAL_AGENTS);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Collapsible Panel States
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);

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

  const handleLogin = (email: string) => {
    const isSuper = email.toLowerCase() === 'ajaybinduarti@gmail.com';
    const user: User = {
      email,
      name: isSuper ? 'Ajay Bindu Arti' : 'EU Process Operator',
      role: isSuper ? 'Principal System Architect' : 'Regional Process Lead',
      raciLevel: isSuper ? RACILevel.ACCOUNTABLE : RACILevel.RESPONSIBLE,
      isSuperAdmin: isSuper,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  const handleTaskCreated = (agentId: string, taskDescription: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { 
            ...agent, 
            tasks: [...agent.tasks, taskDescription],
            status: AgentStatus.PROCESSING,
            load: Math.min(agent.load + 15, 100)
          } 
        : agent
    ));
  };

  // Simulated chart data
  const historyData = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    yield: 85 + Math.random() * 10,
    demand: 60 + Math.random() * 30,
    temp: 20 + Math.random() * 5
  })), []);

  const renderContent = () => {
    if (activeTab === 'admin' && !currentUser?.isSuperAdmin) {
      setActiveTab('dashboard');
      return null;
    }

    if (activeTab.startsWith('farming-')) {
      const domainSlug = activeTab.replace('farming-', '');
      const domainName = domainSlug.charAt(0).toUpperCase() + domainSlug.slice(1).replace(/-/g, ' ');
      let finalName = domainName;
      if (domainName === 'Psiculture') finalName = 'Psiculture';
      if (domainName === 'Animal husbandry') finalName = 'Animal Husbandry';
      return <CommercialFarming domain={finalName} />;
    }

    if (activeTab.startsWith('climate-')) {
      const sectionSlug = activeTab.replace('climate-', '');
      return <ClimateSmartFarm section={sectionSlug} />;
    }

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
                  <div className="text-zinc-500 dark:text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-1">{kpi.name}</div>
                  <div className="flex items-baseline space-x-2">
                    <div className="text-3xl font-bold text-zinc-900 dark:text-white">{kpi.value}{kpi.unit}</div>
                    <div className={`text-xs ${kpi.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {kpi.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <OverviewMap />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 glass-panel p-6 rounded-xl h-[400px] shadow-sm">
                <ResponsiveContainer width="100%" height="90%">
                  <AreaChart data={historyData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="time" fontSize={10} />
                    <YAxis fontSize={10} />
                    <Tooltip contentStyle={{backgroundColor: '#091a0f', border: 'none', borderRadius: '8px'}} />
                    <Area type="monotone" dataKey="yield" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="lg:col-span-1">
                <CoPilotChat 
                  systemContext={{ kpis: SYSTEM_KPIS, user: currentUser }} 
                  agents={agents} 
                  onTaskCreated={handleTaskCreated}
                />
              </div>
            </div>
          </div>
        );
      case 'urban': return <UrbanInfrastructure />;
      case 'coastal': return <CoastalManagement />;
      case 'agents': return <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">{agents.map(a => <AgentCard key={a.id} agent={a} />)}</div>;
      case 'intelligence': return <Intelligence />;
      case 'governance': return <GovernanceDashboard />;
      case 'maturity': return <MaturityDashboard />;
      case 'ot-control': return <OTControl />;
      case 'supplychain': return <SupplyChainPlanning />;
      case 'admin': return <AdminPanel currentUser={currentUser!} />;
      default: return <div className="text-center p-20 text-zinc-500">Feature provisioned in next federated update.</div>;
    }
  };

  if (!isLoggedIn) {
    return <LandingPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 glass-panel border-b z-50 px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
            <i className="fas fa-leaf text-white text-xl"></i>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-zinc-900 dark:text-white leading-none text-sm tracking-tight">EU AgriFood</h1>
            <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">PhysicalAI Federated Mesh</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {currentUser?.isSuperAdmin && (
            <div className="hidden md:flex items-center space-x-2 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
              <i className="fas fa-shield-halved text-rose-500 text-[10px]"></i>
              <span className="text-[10px] text-rose-500 font-bold uppercase tracking-widest">Super Admin Mode</span>
            </div>
          )}
          
          <button onClick={toggleTheme} className="p-2 w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center">
            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>

          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 p-1 pl-3 pr-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm"
            >
              <div className="text-right hidden lg:block">
                <div className="text-[10px] font-bold text-zinc-900 dark:text-white leading-none">{currentUser?.name}</div>
                <div className="text-[8px] text-zinc-400 uppercase tracking-widest mt-0.5">{currentUser?.role} [{currentUser?.raciLevel}]</div>
              </div>
              <div className="w-8 h-8 rounded-full border border-emerald-500 overflow-hidden">
                <img src={currentUser?.avatar} alt="User" />
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 glass-panel rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden z-[100]">
                <div className="p-3 border-b border-zinc-200 dark:border-zinc-800">
                  <p className="text-[10px] text-zinc-400 uppercase font-bold">Identity Context</p>
                  <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">{currentUser?.email}</p>
                </div>
                <div className="p-2 space-y-1">
                  {currentUser?.isSuperAdmin && (
                    <button onClick={() => { setActiveTab('admin'); setShowProfileMenu(false); }} className="w-full text-left px-3 py-2 text-xs text-rose-500 hover:bg-rose-500/10 rounded-lg flex items-center space-x-2 font-bold">
                      <i className="fas fa-user-shield w-4"></i>
                      <span>Admin Settings</span>
                    </button>
                  )}
                  <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-xs text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg flex items-center space-x-2">
                    <i className="fas fa-sign-out-alt w-4"></i>
                    <span>System Logout</span>
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
        currentUser={currentUser}
      />

      {/* Main Content Area */}
      <main className={`flex-1 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} ${isRightPanelCollapsed ? 'mr-12' : 'mr-72'} mt-16 p-8 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto pb-20">
          {renderContent()}
        </div>
      </main>

      {/* Right Panel */}
      <RightPanel 
        isCollapsed={isRightPanelCollapsed}
        setIsCollapsed={setIsRightPanelCollapsed}
        raciLevel={currentUser?.raciLevel}
      />
    </div>
  );
};

export default App;