
import React, { useState, useMemo } from 'react';

type MapType = 'standard' | 'satellite' | 'terrain';

const OverviewMap: React.FC = () => {
  const [mapType, setMapType] = useState<MapType>('standard');
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  const data = useMemo(() => ({
    sources: [
      { id: 'F1', name: 'Emerald Valley Farm', type: 'farm', x: 120, y: 180, yield: '94%', moisture: '12%', status: 'Harvesting' },
      { id: 'F2', name: 'Northern Plantation', type: 'farm', x: 220, y: 100, yield: '88%', moisture: '14%', status: 'Growth' },
      { id: 'F3', name: 'Highland Orchards', type: 'farm', x: 100, y: 350, yield: '92%', moisture: '11%', status: 'Dormant' },
    ],
    destinations: [
      { id: 'M1', name: 'Metro Central Market', type: 'market', x: 650, y: 250, demand: 'High', fillRate: '98%', status: 'Open' },
      { id: 'M2', name: 'Coastal Logistics Hub', type: 'market', x: 580, y: 450, demand: 'Stable', fillRate: '94%', status: 'Processing' },
    ],
    routes: [
      { from: { x: 120, y: 180 }, to: { x: 650, y: 250 }, color: '#10b981', label: 'R-77' },
      { from: { x: 220, y: 100 }, to: { x: 650, y: 250 }, color: '#10b981', label: 'R-82' },
      { from: { x: 100, y: 350 }, to: { x: 580, y: 450 }, color: '#3b82f6', label: 'R-14' },
      { from: { x: 650, y: 250 }, to: { x: 580, y: 450 }, color: '#f59e0b', label: 'Inter-Hub' },
    ]
  }), []);

  const getMapBackground = () => {
    switch (mapType) {
      case 'satellite': return 'bg-[#0b0e14]';
      case 'terrain': return 'bg-[#1a1c23]';
      default: return 'bg-[#111827]';
    }
  };

  return (
    <div className="glass-panel rounded-2xl shadow-xl overflow-hidden relative min-h-[450px] border border-zinc-200 dark:border-zinc-800 transition-all">
      {/* Simulated Satellite Overlay */}
      {mapType === 'satellite' && (
        <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-screen" 
             style={{ 
               backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000")', 
               backgroundSize: 'cover',
               backgroundPosition: 'center'
             }}>
        </div>
      )}

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-20 flex flex-col space-y-2">
        <div className="bg-white dark:bg-zinc-900/90 backdrop-blur rounded-lg p-1 border border-zinc-200 dark:border-zinc-700 shadow-xl flex flex-col">
          {(['standard', 'satellite', 'terrain'] as MapType[]).map(type => (
            <button 
              key={type}
              onClick={() => setMapType(type)}
              className={`p-2 rounded flex items-center space-x-2 transition-all ${mapType === type ? 'bg-emerald-600 text-white' : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
            >
              <i className={`fas fa-${type === 'standard' ? 'map' : type === 'satellite' ? 'satellite' : 'mountain'} text-[10px]`}></i>
              <span className="text-[9px] font-bold uppercase tracking-tighter">{type}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search & Location Info (Top Right) */}
      <div className="absolute top-4 right-4 z-20 hidden md:block">
        <div className="bg-white dark:bg-zinc-900/90 backdrop-blur px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-xl flex items-center space-x-3">
          <i className="fas fa-location-dot text-emerald-500 text-xs"></i>
          <div>
            <div className="text-[8px] text-zinc-500 font-bold uppercase leading-none">Global Coverage</div>
            <div className="text-[10px] font-bold text-zinc-900 dark:text-zinc-200">92.4% Active Nodes</div>
          </div>
        </div>
      </div>

      <svg className="w-full h-full min-h-[450px] relative z-10" viewBox="0 0 800 500">
        {/* Routes */}
        <g>
          {data.routes.map((route, i) => (
            <g key={i}>
              <line 
                x1={route.from.x} y1={route.from.y} 
                x2={route.to.x} y2={route.to.y} 
                stroke={route.color} 
                strokeWidth="1.5" 
                strokeDasharray="5 3" 
                strokeOpacity="0.4"
              />
              {/* Moving Pulse for Logistics Flow */}
              <circle r="2" fill={route.color}>
                <animateMotion 
                  dur={`${3 + Math.random() * 2}s`} 
                  repeatCount="indefinite" 
                  path={`M ${route.from.x} ${route.from.y} L ${route.to.x} ${route.to.y}`} 
                />
              </circle>
            </g>
          ))}
        </g>

        {/* Source Farms */}
        <g>
          {data.sources.map(farm => (
            <g 
              key={farm.id} 
              transform={`translate(${farm.x}, ${farm.y})`}
              className="cursor-pointer group"
              onClick={() => setSelectedPoint(farm)}
            >
              <circle r="18" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1" />
              <path d="M0 -8 L4 0 L0 8 L-4 0 Z" fill="#10b981" />
              <text y="-25" textAnchor="middle" className="fill-zinc-400 text-[9px] font-bold uppercase tracking-widest font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                {farm.name}
              </text>
            </g>
          ))}
        </g>

        {/* Destination Markets */}
        <g>
          {data.destinations.map(market => (
            <g 
              key={market.id} 
              transform={`translate(${market.x}, ${market.y})`}
              className="cursor-pointer group"
              onClick={() => setSelectedPoint(market)}
            >
              <circle r="22" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
              <rect x="-6" y="-6" width="12" height="12" rx="2" fill="#3b82f6" />
              <text y="-30" textAnchor="middle" className="fill-zinc-400 text-[9px] font-bold uppercase tracking-widest font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                {market.name}
              </text>
            </g>
          ))}
        </g>
      </svg>

      {/* Floating Info Card */}
      {selectedPoint && (
        <div className="absolute bottom-4 left-4 z-30 w-64 glass-panel p-4 rounded-xl border-t-4 border-emerald-500 shadow-2xl animate-fadeIn">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-[8px] text-zinc-500 uppercase font-bold">{selectedPoint.type === 'farm' ? 'Source Node' : 'Market Hub'}</div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{selectedPoint.name}</h4>
            </div>
            <button onClick={() => setSelectedPoint(null)} className="text-zinc-500 hover:text-rose-500"><i className="fas fa-times"></i></button>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {selectedPoint.type === 'farm' ? (
              <>
                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                  <div className="text-[7px] text-zinc-500 uppercase">Yield</div>
                  <div className="text-xs font-bold text-emerald-500">{selectedPoint.yield}</div>
                </div>
                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                  <div className="text-[7px] text-zinc-500 uppercase">Moisture</div>
                  <div className="text-xs font-bold text-blue-500">{selectedPoint.moisture}</div>
                </div>
              </>
            ) : (
              <>
                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                  <div className="text-[7px] text-zinc-500 uppercase">Demand</div>
                  <div className="text-xs font-bold text-amber-500">{selectedPoint.demand}</div>
                </div>
                <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                  <div className="text-[7px] text-zinc-500 uppercase">Fill Rate</div>
                  <div className="text-xs font-bold text-emerald-500">{selectedPoint.fillRate}</div>
                </div>
              </>
            )}
          </div>
          <div className="mt-3 flex items-center space-x-2">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
             <span className="text-[9px] text-zinc-500 font-bold uppercase">Status: {selectedPoint.status}</span>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-20 glass-panel px-3 py-2 rounded-xl text-[8px] border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50">
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-zinc-600 dark:text-zinc-400 font-bold uppercase">Farms (Sources)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded bg-blue-500"></span>
            <span className="text-zinc-600 dark:text-zinc-400 font-bold uppercase">Markets (Delivery)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-px bg-emerald-500 border-t border-dashed border-emerald-500"></span>
            <span className="text-zinc-600 dark:text-zinc-400 font-bold uppercase">Supply Routes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewMap;
