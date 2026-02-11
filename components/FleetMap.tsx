
import React, { useState, useMemo } from 'react';

type MapType = 'standard' | 'satellite' | 'terrain';

const FleetMap: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [mapType, setMapType] = useState<MapType>('standard');
  const [showLabels, setShowLabels] = useState(true);

  // Tactical map coordinates and elements
  const mapData = useMemo(() => ({
    stops: [
      { id: 'C1', label: 'Collection Hub A', x: 150, y: 150, type: 'collection' },
      { id: 'C2', label: 'Collection Hub B', x: 600, y: 100, type: 'collection' },
      { id: 'D1', label: 'Processing Plant', x: 400, y: 300, type: 'delivery' },
      { id: 'D2', label: 'Distribution Port', x: 650, y: 500, type: 'delivery' },
    ],
    assets: [
      { id: 'TR-9001', name: 'John Deere Tractor', type: 'Tractor', x: 220, y: 180, status: 'Active', battery: 82, route: 'C1 → D1' },
      { id: 'DR-4420', name: 'Precision Drone', type: 'Drone', x: 500, y: 200, status: 'In-Flight', battery: 45, route: 'C2 → D1' },
      { id: 'HV-7700', name: 'Claas Harvester', type: 'Harvester', x: 100, y: 450, status: 'Idle', battery: 12, route: 'N/A' },
      { id: 'DR-4421', name: 'Survey Drone', type: 'Drone', x: 400, y: 150, status: 'Scanning', battery: 98, route: 'Area B' }
    ],
    routes: [
      { id: 'R1', from: { x: 150, y: 150 }, to: { x: 400, y: 300 }, color: '#10b981' },
      { id: 'R2', from: { x: 600, y: 100 }, to: { x: 400, y: 300 }, color: '#3b82f6' },
      { id: 'R3', from: { x: 400, y: 300 }, to: { x: 650, y: 500 }, color: '#f59e0b' },
    ]
  }), []);

  const getMapBackground = () => {
    switch (mapType) {
      case 'satellite':
        return 'bg-[#0b0e14]';
      case 'terrain':
        return 'bg-[#1a1c23]';
      default:
        return 'bg-[#111827]';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fadeIn">
      {/* Map Control Panel */}
      <div className={`lg:col-span-3 glass-panel rounded-2xl shadow-xl overflow-hidden relative min-h-[550px] border border-zinc-800 transition-colors duration-500 ${getMapBackground()}`}>
        
        {/* Layer Content */}
        {mapType === 'satellite' && (
          <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-overlay" 
               style={{ 
                 backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000")', 
                 backgroundSize: 'cover',
                 backgroundPosition: 'center'
               }}>
          </div>
        )}

        {mapType === 'terrain' && (
          <div className="absolute inset-0 opacity-20 pointer-events-none"
               style={{ 
                 backgroundImage: 'radial-gradient(circle at 2px 2px, #4b5563 1px, transparent 0)', 
                 backgroundSize: '40px 40px' 
               }}>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
               <path d="M0 100 Q 200 80 400 120 T 800 100" stroke="#374151" fill="none" strokeWidth="0.5" />
               <path d="M0 250 Q 250 200 500 280 T 800 240" stroke="#374151" fill="none" strokeWidth="0.5" />
               <path d="M0 450 Q 300 480 600 420 T 800 460" stroke="#374151" fill="none" strokeWidth="0.5" />
            </svg>
          </div>
        )}

        {/* Default Grid Layer */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
        
        {/* Layer Picker (Top Left - Google Maps Style) */}
        <div className="absolute top-4 left-4 z-30 flex flex-col space-y-2">
          <div className="bg-white dark:bg-zinc-900/95 backdrop-blur shadow-2xl rounded-lg p-1 border border-zinc-200 dark:border-zinc-700 flex flex-col">
            <button 
              onClick={() => setMapType('standard')}
              className={`p-2 rounded-md flex items-center space-x-3 transition-all ${mapType === 'standard' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            >
              <i className="fas fa-map text-xs"></i>
              <span className="text-[10px] font-bold uppercase tracking-tight pr-2">Standard</span>
            </button>
            <button 
              onClick={() => setMapType('satellite')}
              className={`p-2 rounded-md flex items-center space-x-3 transition-all ${mapType === 'satellite' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            >
              <i className="fas fa-satellite text-xs"></i>
              <span className="text-[10px] font-bold uppercase tracking-tight pr-2">Satellite</span>
            </button>
            <button 
              onClick={() => setMapType('terrain')}
              className={`p-2 rounded-md flex items-center space-x-3 transition-all ${mapType === 'terrain' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            >
              <i className="fas fa-mountain text-xs"></i>
              <span className="text-[10px] font-bold uppercase tracking-tight pr-2">Terrain</span>
            </button>
          </div>

          <button 
            onClick={() => setShowLabels(!showLabels)}
            className={`bg-white dark:bg-zinc-900/95 shadow-lg rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-700 text-[10px] font-bold uppercase transition-all flex items-center space-x-2 ${showLabels ? 'text-blue-500' : 'text-zinc-400'}`}
          >
            <i className={`fas fa-${showLabels ? 'check-square' : 'square'}`}></i>
            <span>Labels</span>
          </button>
        </div>

        {/* Search Bar (Top Middle) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 w-full max-w-xs px-4">
           <div className="bg-white dark:bg-zinc-900/95 shadow-2xl rounded-full border border-zinc-200 dark:border-zinc-700 px-4 py-2 flex items-center space-x-3">
             <i className="fas fa-search text-zinc-400 text-xs"></i>
             <input type="text" placeholder="Search coordinates or hubs..." className="bg-transparent border-none focus:outline-none text-xs text-zinc-900 dark:text-zinc-200 w-full" />
             <div className="h-4 w-px bg-zinc-700 mx-2"></div>
             <i className="fas fa-microphone text-zinc-400 text-xs cursor-pointer hover:text-blue-500 transition-colors"></i>
           </div>
        </div>

        <svg className="w-full h-full min-h-[550px] relative z-10" viewBox="0 0 800 600">
          {/* Tactical Routes */}
          <g>
            {mapData.routes.map(route => (
              <line 
                key={route.id}
                x1={route.from.x} y1={route.from.y} 
                x2={route.to.x} y2={route.to.y} 
                stroke={route.color} 
                strokeWidth="2.5" 
                strokeDasharray="8 4" 
                strokeOpacity={mapType === 'satellite' ? '0.7' : '0.4'}
                className="animate-pulse"
              />
            ))}
          </g>

          {/* Stops / Points of Interest */}
          <g>
            {mapData.stops.map(stop => (
              <g key={stop.id} className="cursor-pointer group">
                <circle cx={stop.x} cy={stop.y} r="22" fill={stop.type === 'collection' ? '#10b981' : '#3b82f6'} fillOpacity="0.15" stroke={stop.type === 'collection' ? '#10b981' : '#3b82f6'} strokeWidth="1" />
                <circle cx={stop.x} cy={stop.y} r="8" fill="#ffffff" />
                <circle cx={stop.x} cy={stop.y} r="5" fill={stop.type === 'collection' ? '#10b981' : '#3b82f6'} />
                {showLabels && (
                  <text x={stop.x} y={stop.y - 30} textAnchor="middle" className="fill-white text-[11px] font-bold uppercase tracking-widest font-mono drop-shadow-md">
                    {stop.label}
                  </text>
                )}
              </g>
            ))}
          </g>

          {/* Assets / Fleet Nodes */}
          <g>
            {mapData.assets.map(asset => (
              <g 
                key={asset.id} 
                transform={`translate(${asset.x}, ${asset.y})`} 
                className="cursor-pointer transition-transform duration-300 hover:scale-125"
                onClick={() => setSelectedAsset(asset)}
              >
                {/* Visual Marker (Google Maps Style Pin) */}
                <path 
                  d="M0 0 L-10 -25 A12 12 0 1 1 10 -25 Z" 
                  fill={asset.battery < 20 ? '#ef4444' : '#ffffff'} 
                  fillOpacity={mapType === 'satellite' ? '0.9' : '0.8'} 
                  stroke="#1f2937" 
                  strokeWidth="1.5"
                  className={asset.status === 'In-Flight' ? 'animate-bounce' : ''}
                />
                <circle cy="-25" r="4" fill={asset.status === 'Active' ? '#10b981' : '#71717a'} />
                
                {/* ID Tag */}
                <rect x="15" y="-35" width="60" height="20" rx="4" fill="#18181b" fillOpacity="0.95" stroke="#3f3f46" strokeWidth="1" />
                <text x="45" y="-21" textAnchor="middle" className="fill-zinc-300 text-[10px] font-mono font-bold tracking-tighter">{asset.id}</text>
              </g>
            ))}
          </g>
        </svg>

        {/* Legend (Bottom Right) */}
        <div className="absolute bottom-6 left-6 glass-panel p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white/95 dark:bg-zinc-900/95 shadow-2xl z-30">
          <h4 className="text-[10px] font-bold text-zinc-500 uppercase mb-3 tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-2">Fleet Legend</h4>
          <div className="space-y-2.5">
            <div className="flex items-center space-x-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
              <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-bold uppercase">Harvest Points</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></span>
              <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-bold uppercase">Processing Hubs</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-white border border-zinc-400 rounded-sm"></div>
              <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-bold uppercase">Autonomous Units</span>
            </div>
          </div>
        </div>

        {/* Zoom & Location Controls (Bottom Right - Google Maps Style) */}
        <div className="absolute bottom-6 right-6 flex flex-col space-y-2 z-30">
          <div className="flex flex-col bg-white dark:bg-zinc-900/95 shadow-2xl rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            <button className="w-10 h-10 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
              <i className="fas fa-plus text-xs"></i>
            </button>
            <button className="w-10 h-10 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center">
              <i className="fas fa-minus text-xs"></i>
            </button>
          </div>
          <button className="w-10 h-10 bg-white dark:bg-zinc-900/95 shadow-2xl rounded-lg border border-zinc-200 dark:border-zinc-700 text-blue-500 hover:text-blue-400 transition-colors flex items-center justify-center">
            <i className="fas fa-location-arrow text-xs"></i>
          </button>
          <button className="w-10 h-10 bg-white dark:bg-zinc-900/95 shadow-2xl rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-blue-500 transition-colors flex items-center justify-center">
            <i className="fas fa-street-view text-sm"></i>
          </button>
        </div>
      </div>

      {/* Asset Inspector Sidebar */}
      <div className="lg:col-span-1 glass-panel rounded-2xl shadow-xl flex flex-col border border-zinc-800 overflow-hidden bg-zinc-900/40">
        <div className="p-4 bg-zinc-950/80 border-b border-zinc-800 flex justify-between items-center">
          <h3 className="font-bold text-zinc-100 uppercase text-xs tracking-widest">Fleet Inspector</h3>
          <i className="fas fa-info-circle text-zinc-500 text-xs"></i>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {selectedAsset ? (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">Node UID: {selectedAsset.id}</div>
                <h4 className="text-xl font-bold text-white tracking-tight leading-tight">{selectedAsset.name}</h4>
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${selectedAsset.status === 'Active' || selectedAsset.status === 'In-Flight' ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30' : 'bg-zinc-800 text-zinc-400'}`}>
                    {selectedAsset.status}
                  </span>
                  <div className="flex items-center space-x-1 text-[9px] text-zinc-500 font-mono">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>GPS FIXED</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-950/40 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all">
                  <div className="text-[9px] text-zinc-500 uppercase font-bold mb-2">Battery / Fuel</div>
                  <div className={`text-xl font-bold ${selectedAsset.battery < 20 ? 'text-rose-500' : 'text-emerald-500'}`}>{selectedAsset.battery}%</div>
                  <div className="w-full bg-zinc-800 h-1 mt-2 rounded-full">
                    <div className={`h-full rounded-full ${selectedAsset.battery < 20 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${selectedAsset.battery}%` }}></div>
                  </div>
                </div>
                <div className="p-4 bg-zinc-950/40 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all">
                  <div className="text-[9px] text-zinc-500 uppercase font-bold mb-2">Signal Strength</div>
                  <div className="text-xl font-bold text-blue-500">98%</div>
                  <div className="flex space-x-0.5 items-end h-3 mt-1.5">
                    {[3, 6, 9, 12].map(h => <div key={h} className={`w-1.5 rounded-t-sm ${h < 12 ? 'bg-blue-500' : 'bg-blue-500/30'}`} style={{ height: `${h}px` }}></div>)}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase border-b border-zinc-800 pb-2 tracking-widest">
                  <span>Mission Path</span>
                  <i className="fas fa-route text-emerald-500"></i>
                </div>
                <div className="p-4 bg-zinc-950/60 rounded-xl border border-emerald-600/20 border-l-4">
                  <div className="text-sm font-bold text-white mb-2">{selectedAsset.route}</div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">Dynamic route generated by <span className="text-emerald-500 font-bold">LogicPlan-Delta</span> based on current harvest moisture telemetry.</p>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                 <button className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xl shadow-emerald-900/30 flex items-center justify-center space-x-2">
                   <i className="fas fa-paper-plane"></i>
                   <span>SEND COMMAND</span>
                 </button>
                 <button className="w-full py-3.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2">
                   <i className="fas fa-map-marked-alt"></i>
                   <span>RE-ROUTE PATH</span>
                 </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-zinc-800 rounded-2xl h-[400px]">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 ring-8 ring-zinc-900/40">
                <i className="fas fa-crosshairs text-3xl text-zinc-700 animate-pulse"></i>
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed uppercase font-bold tracking-widest max-w-[200px]">
                Select an active node from the map to inspect real-time telemetry
              </p>
            </div>
          )}
        </div>

        <div className="p-5 border-t border-zinc-800 bg-zinc-950/90">
           <div className="flex justify-between items-center text-[10px] text-zinc-500 font-bold uppercase mb-3 tracking-widest">
             <span>Mesh Efficiency</span>
             <span className="text-emerald-500 font-mono">94.2%</span>
           </div>
           <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-800">
             <div className="h-full bg-emerald-500 shadow-[0_0_12px_#10b981]" style={{ width: '94%' }}></div>
           </div>
           <div className="mt-4 flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-[9px] text-zinc-500 uppercase font-bold">Encrypted</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-[9px] text-zinc-500 uppercase font-bold">Sync: 12ms</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FleetMap;
