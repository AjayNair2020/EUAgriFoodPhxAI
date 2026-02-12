
import React, { useState, useMemo } from 'react';

type MapType = 'standard' | 'satellite' | 'terrain';

interface MapDetails {
  traffic: boolean;
  transit: boolean;
  bicycling: boolean;
  streetView: boolean;
  roads: boolean;
  land: boolean;
  countries: boolean;
  cities: boolean;
}

const FleetMap: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [mapType, setMapType] = useState<MapType>('standard');
  const [showLabels, setShowLabels] = useState(true);
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  
  // Default layers as requested: Roads, Land, Countries, Cities are TRUE. Others are FALSE.
  const [details, setDetails] = useState<MapDetails>({
    traffic: false,
    transit: false,
    bicycling: false,
    streetView: false,
    roads: true,
    land: true,
    countries: true,
    cities: true
  });

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
    ],
    simCities: [
      { name: 'Oakhaven', x: 50, y: 50 },
      { name: 'Riverbend', x: 750, y: 300 },
      { name: 'Ironforge', x: 300, y: 550 },
      { name: 'Starfall', x: 600, y: 50 }
    ]
  }), []);

  const getMapBackground = () => {
    switch (mapType) {
      case 'satellite': return 'bg-[#0b0e14]';
      case 'terrain': return 'bg-[#e4e2da] dark:bg-[#1a1c23]';
      default: return 'bg-[#f0f2f5] dark:bg-[#111827]';
    }
  };

  const toggleDetail = (key: keyof MapDetails) => {
    setDetails(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fadeIn">
      {/* Map Control Panel */}
      <div className={`lg:col-span-3 glass-panel rounded-2xl shadow-xl overflow-hidden relative min-h-[650px] border border-zinc-300 dark:border-zinc-800 transition-colors duration-500 ${getMapBackground()}`}>
        
        {/* Layer: Land Texture */}
        {details.land && (
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-gradient-to-br from-emerald-900/20 to-transparent"></div>
        )}

        {/* Layer: Satellite Image */}
        {mapType === 'satellite' && (
          <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-overlay" 
               style={{ 
                 backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000")', 
                 backgroundSize: 'cover',
                 backgroundPosition: 'center'
               }}>
          </div>
        )}

        {/* Layer: Country Boundaries */}
        {details.countries && (
          <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
             <svg width="100%" height="100%">
                <path d="M 0 100 Q 200 50 400 100 T 800 50" stroke="#71717a" strokeWidth="2" strokeDasharray="10 5" fill="none" />
                <path d="M 150 0 Q 100 300 150 600" stroke="#71717a" strokeWidth="2" strokeDasharray="10 5" fill="none" />
             </svg>
          </div>
        )}

        {/* Layer: Terrain Gradients */}
        {mapType === 'terrain' && (
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
               <path d="M0 100 Q 200 80 400 120 T 800 100" stroke="#374151" fill="none" strokeWidth="1" />
               <path d="M0 250 Q 250 200 500 280 T 800 240" stroke="#374151" fill="none" strokeWidth="1" />
               <path d="M0 450 Q 300 480 600 420 T 800 460" stroke="#374151" fill="none" strokeWidth="1" />
            </svg>
          </div>
        )}

        {/* Layer: Roads (World Network) */}
        {details.roads && (
          <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
             <svg width="100%" height="100%">
               {Array.from({length: 10}).map((_, i) => (
                 <React.Fragment key={i}>
                   <line x1="0" y1={i * 60} x2="800" y2={i * 60} stroke="#3f3f46" strokeWidth="1" />
                   <line x1={i * 80} y1="0" x2={i * 80} y2="600" stroke="#3f3f46" strokeWidth="1" />
                 </React.Fragment>
               ))}
             </svg>
          </div>
        )}

        {/* Layer: Traffic (Live Overlay) */}
        {details.traffic && (
          <div className="absolute inset-0 pointer-events-none z-10">
            <svg className="w-full h-full" viewBox="0 0 800 600">
               <path d="M 50 50 L 750 50 M 50 550 L 750 550 M 50 50 L 50 550 M 750 50 L 750 550" stroke="#ef4444" strokeWidth="2" opacity="0.6" />
               <path d="M 100 200 L 700 200" stroke="#f59e0b" strokeWidth="2" opacity="0.8" />
               <path d="M 400 0 L 400 600" stroke="#10b981" strokeWidth="2" opacity="0.8" />
            </svg>
          </div>
        )}

        {/* Default Grid Layer */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
        
        {/* Google Maps Styled Layer Menu (Bottom Left) */}
        <div className="absolute bottom-6 left-6 z-30 flex items-end space-x-3">
          <div className="relative">
            <button 
              onClick={() => setShowLayerMenu(!showLayerMenu)}
              className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all overflow-hidden group"
            >
              <i className="fas fa-layer-group text-zinc-600 dark:text-zinc-400 group-hover:text-blue-500 transition-colors"></i>
            </button>
            
            {showLayerMenu && (
              <div className="absolute bottom-14 left-0 w-80 bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl border border-zinc-200 dark:border-zinc-700 p-4 animate-fadeIn max-h-[450px] overflow-y-auto scrollbar-thin">
                <div className="mb-4">
                  <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Map Type</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {(['standard', 'satellite', 'terrain'] as MapType[]).map(type => (
                      <button 
                        key={type}
                        onClick={() => setMapType(type)}
                        className={`flex flex-col items-center space-y-1 p-2 rounded-lg border-2 transition-all ${mapType === type ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10' : 'border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                      >
                        <div className={`w-10 h-10 rounded border border-zinc-200 dark:border-zinc-700 ${type === 'satellite' ? 'bg-zinc-800' : 'bg-zinc-200'}`}></div>
                        <span className="text-[9px] font-bold uppercase text-zinc-600 dark:text-zinc-400">{type}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">Map Details</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { key: 'traffic', icon: 'fa-traffic-light', label: 'Traffic' },
                      { key: 'transit', icon: 'fa-bus', label: 'Transit' },
                      { key: 'bicycling', icon: 'fa-bicycle', label: 'Bicycling' },
                      { key: 'streetView', icon: 'fa-street-view', label: 'Street View' },
                      { key: 'roads', icon: 'fa-road', label: 'Roads' },
                      { key: 'land', icon: 'fa-earth-americas', label: 'Land' },
                      { key: 'countries', icon: 'fa-flag', label: 'Countries' },
                      { key: 'cities', icon: 'fa-city', label: 'Cities' }
                    ].map(item => (
                      <button 
                        key={item.key}
                        onClick={() => toggleDetail(item.key as keyof MapDetails)}
                        className={`flex flex-col items-center space-y-1 p-1 rounded-lg transition-all ${details[item.key as keyof MapDetails] ? 'text-blue-500' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'}`}
                      >
                        <i className={`fas ${item.icon} text-sm`}></i>
                        <span className="text-[8px] font-bold uppercase">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 mt-3">
                  <button 
                    onClick={() => setShowLabels(!showLabels)}
                    className={`w-full flex justify-between items-center px-2 py-1.5 rounded-lg text-[10px] font-bold uppercase ${showLabels ? 'text-blue-500' : 'text-zinc-500'}`}
                  >
                    <span>Labels</span>
                    <i className={`fas fa-toggle-${showLabels ? 'on' : 'off'} text-sm`}></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar (Top Middle) */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 w-full max-w-sm px-4">
           <div className="bg-white dark:bg-zinc-900 shadow-2xl rounded-lg border border-zinc-200 dark:border-zinc-700 px-4 py-3 flex items-center space-x-3">
             <i className="fas fa-search text-zinc-400 text-sm"></i>
             <input type="text" placeholder="Search operational hubs..." className="bg-transparent border-none focus:outline-none text-sm text-zinc-900 dark:text-zinc-200 w-full" />
             <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-700 mx-1"></div>
             <i className="fas fa-location-crosshairs text-zinc-400 text-sm cursor-pointer hover:text-blue-500 transition-colors"></i>
           </div>
        </div>

        <svg className="w-full h-full min-h-[650px] relative z-10" viewBox="0 0 800 600">
          {/* Layer: Simulated Cities */}
          {details.cities && (
            <g opacity="0.3">
               {mapData.simCities.map(city => (
                 <g key={city.name} transform={`translate(${city.x}, ${city.y})`}>
                    <circle r="2" fill="#71717a" />
                    <text y="10" textAnchor="middle" className="fill-zinc-400 text-[8px] font-bold uppercase">{city.name}</text>
                 </g>
               ))}
            </g>
          )}

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
                  <text x={stop.x} y={stop.y - 30} textAnchor="middle" className="fill-zinc-900 dark:fill-white text-[11px] font-bold uppercase tracking-widest font-mono drop-shadow-sm">
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

        {/* Zoom & Navigation Controls (Bottom Right - Google Maps Style) */}
        <div className="absolute bottom-6 right-6 flex flex-col space-y-2 z-30">
          <div className="flex flex-col bg-white dark:bg-zinc-900 shadow-2xl rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            <button className="w-10 h-10 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-center">
              <i className="fas fa-plus text-xs"></i>
            </button>
            <button className="w-10 h-10 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center">
              <i className="fas fa-minus text-xs"></i>
            </button>
          </div>
          <button className="w-10 h-10 bg-white dark:bg-zinc-900 shadow-2xl rounded-lg border border-zinc-200 dark:border-zinc-700 text-blue-500 hover:text-blue-400 transition-colors flex items-center justify-center">
            <i className="fas fa-location-arrow text-xs"></i>
          </button>
        </div>
      </div>

      {/* Asset Inspector Sidebar */}
      <div className="lg:col-span-1 glass-panel rounded-2xl shadow-xl flex flex-col border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white/50 dark:bg-zinc-900/40">
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <h3 className="font-bold text-zinc-900 dark:text-zinc-100 uppercase text-xs tracking-widest">Fleet Inspector</h3>
          <i className="fas fa-info-circle text-zinc-500 text-xs"></i>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {selectedAsset ? (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">Node UID: {selectedAsset.id}</div>
                <h4 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight">{selectedAsset.name}</h4>
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${selectedAsset.status === 'Active' || selectedAsset.status === 'In-Flight' ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'}`}>
                    {selectedAsset.status}
                  </span>
                  <div className="flex items-center space-x-1 text-[9px] text-zinc-500 font-mono">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>GPS FIXED</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                  <div className="text-[9px] text-zinc-500 uppercase font-bold mb-2">Battery / Fuel</div>
                  <div className={`text-xl font-bold ${selectedAsset.battery < 20 ? 'text-rose-500' : 'text-emerald-500'}`}>{selectedAsset.battery}%</div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1 mt-2 rounded-full">
                    <div className={`h-full rounded-full ${selectedAsset.battery < 20 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${selectedAsset.battery}%` }}></div>
                  </div>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                  <div className="text-[9px] text-zinc-500 uppercase font-bold mb-2">Signal Strength</div>
                  <div className="text-xl font-bold text-blue-500">98%</div>
                  <div className="flex space-x-0.5 items-end h-3 mt-1.5">
                    {[3, 6, 9, 12].map(h => <div key={h} className={`w-1.5 rounded-t-sm ${h < 12 ? 'bg-blue-500' : 'bg-blue-300 dark:bg-blue-500/30'}`} style={{ height: `${h}px` }}></div>)}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 uppercase border-b border-zinc-100 dark:border-zinc-800 pb-2 tracking-widest">
                  <span>Mission Path</span>
                  <i className="fas fa-route text-emerald-500"></i>
                </div>
                <div className="p-4 bg-zinc-100/50 dark:bg-zinc-950/60 rounded-xl border border-emerald-600/20 border-l-4 shadow-sm">
                  <div className="text-sm font-bold text-zinc-900 dark:text-white mb-2">{selectedAsset.route}</div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">Dynamic route generated by <span className="text-emerald-600 dark:text-emerald-500 font-bold">LogiPlan-Delta</span> based on real-time physics telemetry.</p>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                 <button className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-xl shadow-emerald-900/10 flex items-center justify-center space-x-2">
                   <i className="fas fa-paper-plane"></i>
                   <span>SEND COMMAND</span>
                 </button>
                 <button className="w-full py-3.5 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2">
                   <i className="fas fa-map-marked-alt"></i>
                   <span>RE-ROUTE PATH</span>
                 </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl h-[400px]">
              <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4 ring-8 ring-zinc-50/50 dark:ring-zinc-900/40">
                <i className="fas fa-crosshairs text-3xl text-zinc-300 dark:text-zinc-700 animate-pulse"></i>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed uppercase font-bold tracking-widest max-w-[200px]">
                Select an active node from the map to inspect real-time telemetry
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FleetMap;
