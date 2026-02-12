
import React, { useState, useMemo, useRef } from 'react';

type MapType = 'standard' | 'satellite' | 'terrain';

interface MapDetails {
  roads: boolean;
  land: boolean;
  countries: boolean;
  cities: boolean;
  traffic: boolean;
  transit: boolean;
  bicycling: boolean;
}

const OverviewMap: React.FC = () => {
  const [mapType, setMapType] = useState<MapType>('standard');
  const [showLayerMenu, setShowLayerMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Navigation State
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const mapRef = useRef<HTMLDivElement>(null);

  // Default World Map Configuration
  const [details, setDetails] = useState<MapDetails>({
    roads: true,
    land: true,
    countries: true,
    cities: true,
    traffic: false,
    transit: false,
    bicycling: false
  });

  // Geographic Data Layer Paths (High-Fidelity Representative Outlines)
  const geographicLayers = useMemo(() => ({
    northAmerica: "M102,126 L108,110 L128,102 L150,110 L165,130 L180,145 L200,150 L220,135 L240,145 L255,170 L250,200 L230,225 L215,250 L180,265 L150,255 L130,230 L115,190 L105,170 Z M185,85 L200,75 L215,80 L210,95 L195,100 Z", // Includes Greenland
    southAmerica: "M235,280 L260,270 L285,280 L310,310 L315,350 L295,430 L275,470 L255,475 L240,430 L230,350 L225,300 Z",
    africa: "M380,185 L410,165 L445,160 L480,175 L505,210 L515,250 L510,300 L490,360 L470,410 L445,445 L425,440 L400,400 L385,340 L370,280 L365,220 Z",
    europe: "M350,100 L370,85 L410,80 L440,90 L455,110 L440,145 L415,160 L390,165 L370,155 L355,135 Z",
    asia: "M460,110 L520,80 L620,70 L730,85 L760,120 L775,180 L760,240 L735,285 L690,310 L640,315 L580,290 L530,275 L500,240 L480,180 Z",
    oceania: "M680,380 L720,365 L760,375 L775,410 L765,450 L725,465 L685,440 Z M765,470 L775,465 L780,485 L770,490 Z",
    antarctica: "M100,490 L700,490 L720,495 L700,500 L100,500 L80,495 Z"
  }), []);

  const worldCities = useMemo(() => [
    { name: 'San Francisco', x: 120, y: 180 },
    { name: 'New York', x: 200, y: 160 },
    { name: 'London', x: 380, y: 120 },
    { name: 'Paris', x: 395, y: 145 },
    { name: 'Cairo', x: 450, y: 200 },
    { name: 'Mumbai', x: 580, y: 240 },
    { name: 'Tokyo', x: 720, y: 180 },
    { name: 'Sydney', x: 730, y: 400 },
    { name: 'São Paulo', x: 260, y: 380 },
    { name: 'Cape Town', x: 440, y: 430 }
  ], []);

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

  // --- Interaction Handlers ---
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.min(Math.max(prev * delta, 0.5), 10));
  };

  const zoomIn = () => setZoom(prev => Math.min(prev * 1.2, 10));
  const zoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.5));
  const resetMap = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const viewBox = useMemo(() => {
    const w = 800 / zoom;
    const h = 500 / zoom;
    const x = (800 - w) / 2 - offset.x / zoom;
    const y = (500 - h) / 2 - offset.y / zoom;
    return `${x} ${y} ${w} ${h}`;
  }, [zoom, offset]);

  return (
    <div 
      ref={mapRef}
      className={`glass-panel rounded-2xl shadow-2xl overflow-hidden relative min-h-[550px] border border-zinc-200 dark:border-zinc-800 transition-all select-none cursor-grab active:cursor-grabbing ${getMapBackground()}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <svg 
        className="w-full h-full min-h-[550px] relative z-10 pointer-events-none" 
        viewBox={viewBox} 
        preserveAspectRatio="xMidYMid slice"
      >
        {/* 1. High-Fidelity World Geographic Data Layers (Landmass) */}
        {details.land && (
          <g className={`transition-all duration-700 ${mapType === 'terrain' ? 'opacity-40' : 'opacity-100'}`}>
            <path d={geographicLayers.northAmerica} fill="#cbd5e1" className="dark:fill-zinc-700 stroke-zinc-400 dark:stroke-zinc-600" strokeWidth={0.5/zoom} />
            <path d={geographicLayers.southAmerica} fill="#cbd5e1" className="dark:fill-zinc-700 stroke-zinc-400 dark:stroke-zinc-600" strokeWidth={0.5/zoom} />
            <path d={geographicLayers.europe} fill="#cbd5e1" className="dark:fill-zinc-700 stroke-zinc-400 dark:stroke-zinc-600" strokeWidth={0.5/zoom} />
            <path d={geographicLayers.africa} fill="#cbd5e1" className="dark:fill-zinc-700 stroke-zinc-400 dark:stroke-zinc-600" strokeWidth={0.5/zoom} />
            <path d={geographicLayers.asia} fill="#cbd5e1" className="dark:fill-zinc-700 stroke-zinc-400 dark:stroke-zinc-600" strokeWidth={0.5/zoom} />
            <path d={geographicLayers.oceania} fill="#cbd5e1" className="dark:fill-zinc-700 stroke-zinc-400 dark:stroke-zinc-600" strokeWidth={0.5/zoom} />
            <path d={geographicLayers.antarctica} fill="#f1f5f9" className="dark:fill-zinc-800 stroke-zinc-300 dark:stroke-zinc-700" strokeWidth={0.5/zoom} />
          </g>
        )}

        {/* 2. Global Infrastructure Layers (Simulation) */}
        {details.roads && (
          <g opacity="0.1">
            {Array.from({length: 40}).map((_, i) => (
              <React.Fragment key={i}>
                <line x1="-1000" y1={i * 25} x2="1800" y2={i * 25} stroke="#71717a" strokeWidth={0.3/zoom} />
                <line x1={i * 45} y1="-1000" x2={i * 45} y2="1500" stroke="#71717a" strokeWidth={0.3/zoom} />
              </React.Fragment>
            ))}
          </g>
        )}

        {/* 3. Political/Borders Data Layer */}
        {details.countries && (
          <g opacity="0.3">
            <path d="M 300 -500 L 300 1500" stroke="#71717a" strokeWidth={0.5 / zoom} strokeDasharray="4 2" fill="none" />
            <path d="M 500 -500 L 500 1500" stroke="#71717a" strokeWidth={0.5 / zoom} strokeDasharray="4 2" fill="none" />
            <path d="M -500 250 L 1500 250" stroke="#71717a" strokeWidth={0.5 / zoom} strokeDasharray="4 2" fill="none" />
          </g>
        )}

        {/* 4. Labels & Urban Centers Data Layer */}
        {details.cities && (
          <g>
            {worldCities.map(city => (
              <g key={city.name} transform={`translate(${city.x}, ${city.y})`}>
                <circle r={2.5 / Math.sqrt(zoom)} fill="#ffffff" stroke="#71717a" strokeWidth={0.8 / zoom} />
                <text 
                  y={12 / zoom} 
                  textAnchor="middle" 
                  className="fill-zinc-600 dark:fill-zinc-300 font-bold tracking-tight select-none pointer-events-none"
                  style={{ fontSize: `${9 / zoom}px`, textShadow: '0 1px 1px rgba(255,255,255,0.7)' }}
                >
                  {city.name}
                </text>
              </g>
            ))}
          </g>
        )}
      </svg>

      {/* TOP LEFT: Search Suite */}
      <div className="absolute top-4 left-4 z-40 w-full max-w-[380px] flex flex-col space-y-2 pointer-events-auto">
        <div className="bg-white dark:bg-zinc-900 shadow-2xl rounded-lg border border-zinc-200 dark:border-zinc-700 p-1 flex items-center h-12">
          <button className="p-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
            <i className="fas fa-bars"></i>
          </button>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Geographic Data" 
            className="flex-1 bg-transparent border-none outline-none text-sm text-zinc-800 dark:text-zinc-100 px-2 placeholder:text-zinc-400"
          />
          <div className="flex items-center pr-1 border-l border-zinc-200 dark:border-zinc-800 ml-2">
             <button className="p-3 text-blue-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg">
                <i className="fas fa-search"></i>
             </button>
             <div className="w-[1px] h-6 bg-zinc-200 dark:bg-zinc-800"></div>
             <button className="p-3 text-blue-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg">
                <i className="fas fa-directions"></i>
             </button>
          </div>
        </div>
      </div>

      {/* BOTTOM LEFT: Layer Switching Engine */}
      <div className="absolute bottom-6 left-6 z-40 flex items-end space-x-4 pointer-events-auto">
        <div className="relative group">
          <button 
            onClick={() => setMapType(mapType === 'satellite' ? 'standard' : 'satellite')}
            className="w-16 h-16 rounded-xl border-2 border-white dark:border-zinc-800 shadow-2xl overflow-hidden transition-transform group-hover:scale-105 active:scale-95"
          >
            <div className="w-full h-full relative">
              <div className={`w-full h-full bg-cover bg-center ${mapType === 'satellite' ? 'grayscale-0' : 'grayscale'}`} style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=40&w=120")' }}></div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white text-[8px] font-bold uppercase">
                {mapType === 'satellite' ? 'MAP' : 'SATELLITE'}
              </div>
            </div>
          </button>
          
          <button 
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="absolute -top-3 -right-3 w-8 h-8 bg-white dark:bg-zinc-800 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-blue-500 transition-colors"
          >
            <i className="fas fa-layer-group text-xs"></i>
          </button>

          {showLayerMenu && (
            <div className="absolute bottom-20 left-0 w-72 bg-white dark:bg-zinc-950 shadow-2xl rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 animate-fadeIn">
              <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Data Layers</h4>
              <div className="grid grid-cols-2 gap-3">
                 {[
                   { key: 'traffic', icon: 'fa-traffic-light', label: 'Traffic' },
                   { key: 'transit', icon: 'fa-bus', label: 'Transit' },
                   { key: 'bicycling', icon: 'fa-bicycle', label: 'Bicycling' },
                   { key: 'terrain', icon: 'fa-mountain', label: 'Terrain' }
                 ].map(item => (
                   <button 
                     key={item.key}
                     onClick={() => item.key === 'terrain' ? setMapType('terrain') : toggleDetail(item.key as keyof MapDetails)}
                     className={`flex items-center space-x-3 p-3 rounded-xl border transition-all ${details[item.key as keyof MapDetails] || (item.key === 'terrain' && mapType === 'terrain') ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'border-zinc-100 dark:border-zinc-800 text-zinc-500'}`}
                   >
                     <i className={`fas ${item.icon} text-sm`}></i>
                     <span className="text-[11px] font-bold uppercase tracking-tight">{item.label}</span>
                   </button>
                 ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-start opacity-80 pointer-events-none pb-1">
          <div className="flex space-x-0.5 text-lg font-sans font-bold select-none tracking-tighter">
            <span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span>
          </div>
          <span className="text-[9px] text-zinc-400 dark:text-zinc-600 font-sans font-medium">Map data ©2025</span>
        </div>
      </div>

      {/* BOTTOM RIGHT: Global Navigation Tools */}
      <div className="absolute bottom-6 right-6 flex flex-col items-end space-y-4 z-40 pointer-events-auto">
        <button onClick={resetMap} className="w-11 h-11 bg-white dark:bg-zinc-900 rounded-full shadow-2xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group">
          <div className="relative w-6 h-6 border-2 border-zinc-200 dark:border-zinc-800 rounded-full flex items-center justify-center transition-transform">
            <div className="w-1 h-3 bg-red-500 rounded-full absolute top-0 shadow-sm"></div>
            <div className="w-1 h-3 bg-zinc-300 dark:bg-zinc-600 rounded-full absolute bottom-0 shadow-sm"></div>
          </div>
        </button>

        <div className="flex flex-col items-end space-y-2">
          <div className="bg-white/90 dark:bg-zinc-900/90 px-3 py-1.5 rounded-md shadow-lg flex items-center space-x-3 border border-zinc-200 dark:border-zinc-800 select-none">
            <span className="text-[10px] font-bold text-zinc-500">{(1000 / zoom).toFixed(0)} km</span>
            <div className="w-16 h-[2.5px] bg-zinc-400 relative">
               <div className="absolute left-0 top-[-4px] w-[1px] h-[10px] bg-zinc-600"></div>
               <div className="absolute right-0 top-[-4px] w-[1px] h-[10px] bg-zinc-600"></div>
            </div>
          </div>

          <div className="flex flex-col bg-white dark:bg-zinc-900 shadow-2xl rounded-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            <button 
              onClick={(e) => { e.stopPropagation(); zoomIn(); }}
              className="w-12 h-12 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-center transition-colors active:bg-zinc-200"
            >
              <i className="fas fa-plus text-sm"></i>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); zoomOut(); }}
              className="w-12 h-12 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors active:bg-zinc-200"
            >
              <i className="fas fa-minus text-sm"></i>
            </button>
          </div>

          <div className="flex space-x-2">
            <button className="w-12 h-12 bg-white dark:bg-zinc-900 shadow-2xl rounded-xl border border-zinc-200 dark:border-zinc-700 text-amber-500 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all active:scale-95">
              <i className="fas fa-person-walking text-2xl drop-shadow-sm"></i>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); resetMap(); }}
              className="w-12 h-12 bg-white dark:bg-zinc-900 shadow-2xl rounded-xl border border-zinc-200 dark:border-zinc-700 text-blue-500 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all group active:scale-95"
            >
              <i className="fas fa-location-crosshairs text-xl group-hover:scale-110 transition-transform"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10">
        <div className="w-12 h-12 border border-zinc-400 dark:border-zinc-600 rounded-full flex items-center justify-center">
          <div className="w-px h-6 bg-zinc-400 dark:bg-zinc-600"></div>
          <div className="absolute w-6 h-px bg-zinc-400 dark:bg-zinc-600"></div>
        </div>
      </div>
    </div>
  );
};

export default OverviewMap;
