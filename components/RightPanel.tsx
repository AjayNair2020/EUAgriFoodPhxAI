
import React from 'react';

interface RightPanelProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ isCollapsed, setIsCollapsed }) => {
  const alerts = [
    { id: 1, type: 'critical', msg: 'Cold Chain Temp Spike - Hub-04', time: '2m ago' },
    { id: 2, type: 'warning', msg: 'Sync latency high in North Farm', time: '14m ago' },
    { id: 3, type: 'info', msg: 'EcoSense-Alpha recalibrated', time: '1h ago' }
  ];

  return (
    <div className={`${isCollapsed ? 'w-12' : 'w-72'} h-full glass-panel border-l flex flex-col fixed right-0 top-0 pt-20 z-40 transition-all duration-300 ease-in-out`}>
      <div className="flex justify-start px-2 mb-2">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 text-zinc-500 transition-colors"
          title={isCollapsed ? "Expand Panel" : "Collapse Panel"}
        >
          <i className={`fas ${isCollapsed ? 'fa-angle-double-left' : 'fa-angle-double-right'}`}></i>
        </button>
      </div>

      {!isCollapsed ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center justify-between">
              Live Alerts
              <span className="bg-rose-500/10 text-rose-500 px-1.5 rounded text-[10px]">3 New</span>
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {alerts.map(alert => (
              <div key={alert.id} className="p-3 bg-zinc-100 dark:bg-zinc-900/40 rounded-lg border border-zinc-200 dark:border-zinc-800/50">
                <div className="flex justify-between items-start mb-1">
                  <span className={`w-1.5 h-1.5 rounded-full mt-1 ${
                    alert.type === 'critical' ? 'bg-rose-500' : 
                    alert.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                  }`}></span>
                  <span className="text-[9px] text-zinc-400 uppercase font-mono">{alert.time}</span>
                </div>
                <p className="text-xs text-zinc-800 dark:text-zinc-300 leading-tight font-medium">{alert.msg}</p>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
            <h4 className="text-[10px] font-bold text-zinc-400 uppercase mb-3">System Load Nodes</h4>
            <div className="space-y-3">
              {[ {n:'Edge Cluster', v:78}, {n:'Core Logic', v:42}, {n:'Federated DB', v:12} ].map(node => (
                <div key={node.n}>
                  <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
                    <span>{node.n}</span>
                    <span>{node.v}%</span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
                    <div className={`h-full ${node.v > 70 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{width: `${node.v}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center py-4 space-y-6">
          <i className="fas fa-bell text-zinc-400 text-xs"></i>
          <i className="fas fa-microchip text-zinc-400 text-xs"></i>
          <i className="fas fa-database text-zinc-400 text-xs"></i>
        </div>
      )}
    </div>
  );
};

export default RightPanel;
