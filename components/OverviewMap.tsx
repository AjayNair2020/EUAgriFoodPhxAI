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
    northAmerica: "M102,126 L108,110 L128,102 L150,110 L165,130 L180,145 L200,150 L220,135 L240,145 L255,170 L250,200 L230,225 L215,250 L180,265 L150,255 L130,230 L115,190 L105,170 Z M185,85 L200,75 L215,80 L210,95 L195,100 Z",
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
      className={`glass-panel rounded-2xl shadow-xl overflow-hidden relative min-h-[500px] border border-zinc-200 dark:border-zinc-800 transition-all select-none cursor-grab active:cursor-grabbing ${getMapBackground()}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <div className="absolute top-4 left-4 z-40">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 shadow-sm">
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Global Asset Overview</span>
        </div>
      </div>

      <svg 
        className="w-full h-full min-h-[500px] relative z-10 pointer-events-none" 
        viewBox={viewBox} 
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Geographic Data Layer Paths (Landmass) */}
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

        {/* Global Infrastructure Layers (Simulation) */}
        {details.roads && (
          <g opacity="0.05">
            {Array.from({length: 40}).map((_, i) => (
              <React.Fragment key={i}>
                <line x1="-1000" y1={i * 25} x2="1800" y2={i * 25} stroke="#71717a" strokeWidth={0.3/zoom} />
                <line x1={i * 45} y1="-1000" x2={i * 45} y2="1500" stroke="#71717a" strokeWidth={0.3/zoom} />
              </React.Fragment>
            ))}
          </g>
        )}

        {/* Labels & Urban Centers Data Layer */}
        {details.cities && (
          <g>
            {worldCities.map(city => (
              <g key={city.name} transform={`translate(${city.x}, ${city.y})`}>
                <circle r={2 / Math.sqrt(zoom)} fill="#10b981" />
                <text 
                  y={10 / zoom} 
                  textAnchor="middle" 
                  className="fill-zinc-400 dark:fill-zinc-500 font-bold tracking-tight select-none pointer-events-none"
                  style={{ fontSize: `${7 / zoom}px` }}
                >
                  {city.name}
                </text>
              </g>
            ))}
          </g>
        )}
      </svg>

      <div className="absolute bottom-4 right-4 z-40">
        <div className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-md px-2 py-1">
          <span className="text-[8px] font-mono text-zinc-500 uppercase">Interactive Physics Mesh • Zoom: {zoom.toFixed(1)}x</span>
        </div>
      </div>
    </div>
  );
};

export default OverviewMap;