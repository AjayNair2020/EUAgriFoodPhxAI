import React, { useState, useEffect } from 'react';

interface LandingPageProps {
  onLogin: (email: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [isHoveringRaci, setIsHoveringRaci] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState('');

  const keyFeatures = [
    { title: 'Physical Sense', icon: 'fa-satellite-dish', kpi: '99.8%', label: 'Connectivity', desc: 'Real-time telemetry from 1,242 edge nodes.', color: 'text-leaf-green' },
    { title: 'Agentic Identify', icon: 'fa-brain-circuit', kpi: '96.4%', label: 'Accuracy', desc: 'Federated reasoning for crop identification.', color: 'text-leaf-green' },
    { title: 'Sovereign Plan', icon: 'fa-truck-ramp-box', kpi: '94.2%', label: 'Yield Gain', desc: 'OT-integrated supply chain optimization.', color: 'text-leaf-green' },
    { title: 'Governance Hub', icon: 'fa-scale-balanced', kpi: '100%', label: 'GDPR Compliant', desc: 'Sovereign RACI-based decision audit mesh.', color: 'text-leaf-green' },
  ];

  const raciData = [
    { level: 'A', title: 'Accountable', desc: 'Executive Authority & Final Sign-off', color: 'text-rose-600', bg: 'bg-rose-100' },
    { level: 'R', title: 'Responsible', desc: 'Operational Execution & Implementation', color: 'text-leaf-green', bg: 'bg-green-100' },
    { level: 'C', title: 'Consulted', desc: 'Expert Input & Bi-directional Feedback', color: 'text-blue-600', bg: 'bg-blue-100' },
    { level: 'I', title: 'Informed', desc: 'One-way Status & Progress Visibility', color: 'text-zinc-600', bg: 'bg-zinc-100' },
  ];

  const simulateHandshake = async (targetEmail: string) => {
    setIsVerifying(true);
    const steps = [
      'Initializing QAN Handshake...',
      'Verifying Federated Identity...',
      'Redirecting to Auth Provider...',
      'Authenticating Public/Ent Session...',
      'Syncing RACI Permissions...',
      'Access Granted. Tunneling...'
    ];

    for (const step of steps) {
      setVerificationStep(step);
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    onLogin(targetEmail);
  };

  const handleOAuth = (provider: string) => {
    let targetEmail = email;
    
    // Simulate provider-specific email mappings
    const providerDefaults: Record<string, string> = {
      google: 'public.user@gmail.com',
      apple: 'public.user@apple.com',
      linkedin: 'professional.user@linkedin.com',
      facebook: 'social.user@facebook.com',
      microsoft: 'corporate.user@outlook.com',
      sso: 'ajaybinduarti@gmail.com'
    };

    targetEmail = email || providerDefaults[provider] || 'guest.node@agrifood.io';

    simulateHandshake(targetEmail);
  };

  return (
    <div className="min-h-screen bg-light-leaf flex flex-col lg:flex-row relative overflow-hidden font-inter selection:bg-leaf-green/30">
      {/* Verification Overlay */}
      {isVerifying && (
        <div className="fixed inset-0 z-[100] bg-dark-leaf flex items-center justify-center animate-fadeIn">
          <div className="text-center space-y-8 max-w-sm px-6">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-leaf-green/20 rounded-full mx-auto animate-spin-slow"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fas fa-atom text-leaf-green text-3xl animate-pulse"></i>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-black text-xl tracking-tight">{verificationStep}</h3>
              <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden max-w-[200px] mx-auto">
                <div className="h-full bg-leaf-green animate-progress-flow"></div>
              </div>
            </div>
            <p className="text-zinc-500 text-[10px] uppercase font-black tracking-[0.3em]">Identity Protocol: SECURE-QAN-TLS v1.3</p>
          </div>
        </div>
      )}

      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-100/60 blur-[120px] rounded-full animate-float"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-green-100/60 blur-[140px] rounded-full animate-pulse-slow"></div>
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#10b981 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>

      {/* Left Section: Branding & Features */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-24 py-12 z-10 relative overflow-y-auto scrollbar-thin">
        <div className="mb-10">
          <div className="flex items-center space-x-3 mb-6 animate-fadeIn">
            <div className="w-14 h-14 bg-leaf-green rounded-2xl flex items-center justify-center shadow-lg shadow-leaf-green/30">
              <i className="fas fa-atom text-white text-2xl animate-spin-slow"></i>
            </div>
            <div className="w-px h-10 bg-zinc-200"></div>
            <div>
              <div className="flex items-center space-x-1 text-leaf-green font-black text-xs tracking-[0.2em] uppercase">
                <i className="fas fa-microchip text-[8px] mr-1"></i>
                <span>EU Federated</span>
              </div>
              <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">Quantum Agentic Network</div>
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-[900] text-forest-dark tracking-tighter leading-[0.85] mb-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            EU QAN <br />
            <span className="text-leaf-green drop-shadow-sm">MultiPhysicsAI</span>
          </h1>
          <p className="text-zinc-600 text-lg max-w-xl leading-relaxed font-medium animate-fadeIn mb-10" style={{ animationDelay: '0.2s' }}>
            The sovereign QAN backbone for European precision agriculture, Urban Infrastructure and Coastal zones. 
            Public and Enterprise gateway for physical AgenticAI orchestration.
          </p>
        </div>

        {/* Feature & KPI Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          {keyFeatures.map((f, i) => (
            <div key={i} className="bg-emerald-50/60 backdrop-blur-md p-5 rounded-[28px] border border-leaf-green/20 shadow-sm flex items-start space-x-4 hover:shadow-lg hover:border-leaf-green/40 transition-all group">
              <div className={`w-12 h-12 rounded-2xl bg-white ${f.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                <i className={`fas ${f.icon} text-lg`}></i>
              </div>
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="text-forest-dark font-black text-[11px] uppercase tracking-wider">{f.title}</h3>
                  <div className={`text-xs font-black ${f.color}`}>{f.kpi}</div>
                </div>
                <div className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mb-1">{f.label}</div>
                <p className="text-[10px] text-zinc-500 leading-tight font-medium">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-4 pl-1">Governance Architecture</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            {raciData.map((item) => (
              <div 
                key={item.level}
                onMouseEnter={() => setIsHoveringRaci(item.level)}
                onMouseLeave={() => setIsHoveringRaci(null)}
                className={`p-4 rounded-[24px] border transition-all duration-500 shadow-sm ${
                  isHoveringRaci === item.level 
                    ? 'border-leaf-green bg-white scale-[1.05] z-10 shadow-lg' 
                    : 'border-zinc-100 bg-white/40'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-[10px] shadow-inner ${item.bg} ${item.color}`}>
                    {item.level}
                  </span>
                  <h3 className="text-forest-dark font-black text-[9px] uppercase tracking-tighter">{item.title}</h3>
                </div>
                <p className="text-[8px] text-zinc-500 font-bold leading-tight uppercase opacity-60">{item.desc.split(' & ')[0]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section: Multi-OAuth Gateway */}
      <div className="lg:w-[580px] flex flex-col justify-center items-center px-8 py-12 z-20 relative">
        <div className="w-full max-sm bg-white/90 backdrop-blur-3xl p-10 rounded-[56px] border border-white shadow-[0_32px_64px_-16px_rgba(16,185,129,0.15)] ring-1 ring-leaf-green/5 overflow-y-auto scrollbar-thin max-h-full">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 border border-leaf-green/20 text-[10px] font-black text-leaf-green mb-4 uppercase tracking-[0.25em]">
              Sovereign Entry
            </div>
            <h2 className="text-3xl font-[900] text-forest-dark mb-2 tracking-tight">Access Hub</h2>
            <p className="text-xs text-zinc-400 font-bold uppercase tracking-[0.1em]">Identity Federation Gateway</p>
          </div>

          {/* Core OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <button 
              onClick={() => handleOAuth('google')}
              className="group w-full py-3.5 px-6 bg-white hover:bg-zinc-50 text-zinc-700 rounded-2xl font-extrabold text-xs flex items-center justify-between transition-all border border-zinc-100 shadow-sm active:scale-[0.98]"
            >
              <div className="flex items-center space-x-4">
                <i className="fab fa-google text-lg text-[#4285F4]"></i>
                <span>Continue with Google</span>
              </div>
              <i className="fas fa-chevron-right text-[10px] opacity-20 group-hover:opacity-100 transition-opacity"></i>
            </button>
            <button 
              onClick={() => handleOAuth('apple')}
              className="group w-full py-3.5 px-6 bg-zinc-900 hover:bg-black text-white rounded-2xl font-extrabold text-xs flex items-center justify-between transition-all border border-zinc-800 shadow-sm active:scale-[0.98]"
            >
              <div className="flex items-center space-x-4">
                <i className="fab fa-apple text-xl"></i>
                <span>Sign in with Apple</span>
              </div>
              <i className="fas fa-chevron-right text-[10px] opacity-20 group-hover:opacity-100 transition-opacity"></i>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-100"></div>
            </div>
            <div className="relative flex justify-center text-[8px] uppercase font-black text-zinc-300 bg-transparent px-2 tracking-[0.3em]">
              <span className="bg-white px-3">Professional Hubs</span>
            </div>
          </div>

          {/* Secondary OAuth Grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <button 
              onClick={() => handleOAuth('linkedin')}
              className="flex items-center justify-center space-x-2 py-3 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-xl font-bold text-[11px] transition-all shadow-sm active:scale-[0.97]"
            >
              <i className="fab fa-linkedin-in"></i>
              <span>LinkedIn</span>
            </button>
            <button 
              onClick={() => handleOAuth('facebook')}
              className="flex items-center justify-center space-x-2 py-3 bg-[#1877F2] hover:bg-[#0d65d9] text-white rounded-xl font-bold text-[11px] transition-all shadow-sm active:scale-[0.97]"
            >
              <i className="fab fa-facebook-f"></i>
              <span>Facebook</span>
            </button>
            <button 
              onClick={() => handleOAuth('microsoft')}
              className="flex items-center justify-center space-x-2 py-3 bg-white hover:bg-zinc-50 text-zinc-700 rounded-xl font-bold text-[11px] border border-zinc-100 transition-all shadow-sm active:scale-[0.97]"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" className="w-4 h-4" alt="MS" />
              <span>Microsoft</span>
            </button>
            <button 
              onClick={() => handleOAuth('sso')}
              className="flex items-center justify-center space-x-2 py-3 bg-leaf-green/5 hover:bg-leaf-green/10 text-leaf-green rounded-xl font-black text-[10px] border border-leaf-green/20 transition-all shadow-sm active:scale-[0.97] uppercase tracking-wider"
            >
              <i className="fas fa-key"></i>
              <span>Corp SSO</span>
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-100"></div>
            </div>
            <div className="relative flex justify-center text-[8px] uppercase font-black text-zinc-300 bg-transparent px-2 tracking-[0.4em]">
              <span className="bg-white px-4">Manual Entry</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="group">
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-leaf-green transition-colors">
                  <i className="fas fa-envelope"></i>
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full bg-zinc-50 border border-zinc-100 rounded-[24px] pl-12 pr-6 py-4 text-zinc-900 focus:bg-white focus:border-leaf-green/50 focus:ring-4 focus:ring-leaf-green/5 outline-none transition-all placeholder:text-zinc-300 font-bold text-sm"
                />
              </div>
            </div>
            
            <button 
              onClick={() => handleOAuth('email')}
              className="w-full py-4.5 bg-leaf-green hover:bg-[#0da372] text-white font-black rounded-[24px] shadow-xl shadow-leaf-green/20 transition-all active:scale-[0.97] flex items-center justify-center space-x-3 text-sm uppercase tracking-widest"
            >
              <span>Initialize Node Entry</span>
              <i className="fas fa-arrow-right text-xs"></i>
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-zinc-50 flex items-center justify-center space-x-8">
            <div className="flex flex-col items-center group cursor-help">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mb-2 group-hover:bg-emerald-100 transition-colors">
                <i className="fas fa-lock text-leaf-green text-[10px]"></i>
              </div>
              <span className="text-[7px] text-zinc-400 font-black uppercase tracking-[0.2em]">TLS 1.3</span>
            </div>
            <div className="flex flex-col items-center group cursor-help">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mb-2 group-hover:bg-emerald-100 transition-colors">
                <i className="fas fa-shield text-leaf-green text-[10px]"></i>
              </div>
              <span className="text-[7px] text-zinc-400 font-black uppercase tracking-[0.2em]">RACI-G</span>
            </div>
            <div className="flex flex-col items-center group cursor-help">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center mb-2 group-hover:bg-emerald-100 transition-colors">
                <i className="fas fa-globe-europe text-leaf-green text-[10px]"></i>
              </div>
              <span className="text-[7px] text-zinc-400 font-black uppercase tracking-[0.2em]">EU-FED</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center px-4 max-w-xs">
          <p className="text-[9px] text-zinc-400 leading-relaxed uppercase tracking-[0.2em] font-bold">
            Authorized by <span className="text-forest-dark">EU-QAN Oversight</span>.<br />
            Federated Physics-Node Integrity Guaranteed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
