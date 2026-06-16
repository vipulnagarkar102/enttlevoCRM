import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('admin@enttlevo.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex bg-[#FCFAFE] text-on-surface relative">
      
      {/* Mobile background image (hidden on desktop) */}
      <div className="fixed inset-0 lg:hidden z-0">
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
          alt="Mobile Background"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay so form remains perfectly readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#100e14]/75 via-[#1A171F]/90 to-[#100e14]/98" />
      </div>

      {/* Left Side - Login Form (Fills screen on mobile, 45% on desktop) */}
      <div className="w-full lg:w-[45%] flex flex-col items-center justify-center px-6 py-14 sm:px-12 lg:p-20 xl:p-24 animate-in slide-in-from-left-8 duration-500 relative z-10">
        
        {/* Form Card (Glassmorphic card on mobile, transparent on desktop) */}
        <div className="w-full max-w-[420px] flex flex-col p-8 sm:p-10 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md bg-[#16131B]/85 lg:p-0 lg:rounded-none lg:border-none lg:shadow-none lg:backdrop-blur-none lg:bg-transparent">
          <div className="w-full flex flex-col">
            {/* Welcome Text */}
            <h1 className="text-[2rem] font-bold tracking-tight text-white lg:text-on-surface mb-2">
              Welcome back
            </h1>
            <p className="text-[0.95rem] text-white/60 lg:text-on-surface-variant/80 mb-10">
              Please enter your details to access the CRM platform.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="space-y-2">
                <label className="text-[0.85rem] font-bold text-white/70 lg:text-[#1F1A24] flex items-center gap-2">
                  <span className="material-symbols-outlined !text-[16px]">mail</span>
                  Email Address
                </label>
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg lg:rounded-sm text-[0.9rem] text-white lg:text-on-surface bg-white/5 lg:bg-surface-container-low border border-white/10 lg:border-outline/10 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 transition-all placeholder:text-white/20 lg:placeholder:text-on-surface-variant/30"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[0.85rem] font-bold text-white/70 lg:text-[#1F1A24] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined !text-[16px]">lock</span>
                    Password
                  </div>
                  <a href="#" className="text-[0.75rem] font-bold text-primary-container/90 lg:text-primary-container hover:underline">
                    Forgot password?
                  </a>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg lg:rounded-sm text-[0.9rem] text-white lg:text-on-surface bg-white/5 lg:bg-surface-container-low border border-white/10 lg:border-outline/10 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container/20 transition-all placeholder:text-white/20 lg:placeholder:text-on-surface-variant/30"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 mt-4 bg-primary text-on-primary rounded-sm text-[0.9rem] font-bold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-widest disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined !text-[20px] animate-spin">progress_activity</span>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-12 text-center">
              <p className="text-[0.85rem] text-white/50 lg:text-on-surface-variant/60">
                Don't have an account?{' '}
                <a href="#" className="font-bold text-primary-container/90 lg:text-primary-container hover:underline">
                  Contact your administrator
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Dark Mode Dashboard Preview (Desktop Only) */}
      <div className="hidden lg:flex w-[55%] bg-[#1A171F] relative overflow-hidden flex-col items-center justify-center p-8 animate-in fade-in duration-700 z-10">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-container/5 via-transparent to-tertiary/5" />

        {/* Dashboard mockup window */}
        <div className="relative z-10 w-full max-w-2xl rounded-xl border border-white/10 overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]" style={{ background: '#100e14' }}>

          {/* Window chrome bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5" style={{ background: '#1A171F' }}>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex-1 mx-4 h-5 rounded-sm bg-white/5 border border-white/5 flex items-center px-2 gap-1.5">
              <span className="material-symbols-outlined !text-[10px] text-white/20">lock</span>
              <span className="text-[0.6rem] text-white/20 font-mono">app.enttlevo.com/dashboard</span>
            </div>
          </div>

          {/* App layout */}
          <div className="flex h-[400px]">
            {/* Mini Sidebar */}
            <div className="w-12 flex flex-col items-center py-4 gap-4 border-r border-white/5 shrink-0" style={{ background: '#1A171F' }}>
              <div className="w-6 h-6 rounded-sm bg-primary-container/80 flex items-center justify-center">
                <span className="material-symbols-outlined !text-[12px] text-white">trending_up</span>
              </div>
              {['groups', 'task_alt', 'mail', 'settings'].map((icon, i) => (
                <div key={i} className="w-6 h-6 flex items-center justify-center opacity-30">
                  <span className="material-symbols-outlined !text-[14px] text-white">{icon}</span>
                </div>
              ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden p-4 gap-3" style={{ background: '#100e14' }}>
              {/* Topbar */}
              <div className="flex items-center justify-between mb-1">
                <div>
                  <div className="text-[0.7rem] font-bold text-white/80 uppercase tracking-widest">Sales Dashboard</div>
                  <div className="text-[0.55rem] text-white/30 font-medium mt-0.5">FY 2024 · Q4 Overview</div>
                </div>
                <div className="flex gap-2">
                  {['#E8DEF8', '#D0BCFF'].map((c, i) => (
                    <div key={i} className="w-5 h-5 rounded-full border border-white/10" style={{ background: `${c}22` }} />
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'Revenue', value: '₹2.4M', icon: 'payments', color: '#D0BCFF', change: '+12%' },
                  { label: 'Leads', value: '1,284', icon: 'person_add', color: '#A8C7FA', change: '+8%' },
                  { label: 'Deals', value: '342', icon: 'handshake', color: '#CFF0C8', change: '+5%' },
                  { label: 'Tasks', value: '89', icon: 'task_alt', color: '#F9DEDC', change: '-2%' },
                ].map((stat, i) => (
                  <div key={i} className="rounded-lg p-2.5 border border-white/5" style={{ background: '#1A171F' }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="material-symbols-outlined !text-[12px]" style={{ color: stat.color }}>{stat.icon}</span>
                      <span className="text-[0.5rem] font-bold" style={{ color: i === 3 ? '#F9DEDC' : '#CFF0C8' }}>{stat.change}</span>
                    </div>
                    <div className="text-[0.75rem] font-bold text-white">{stat.value}</div>
                    <div className="text-[0.5rem] text-white/30 font-medium mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Chart area */}
              <div className="flex gap-2 flex-1 min-h-0">
                {/* Bar chart mock */}
                <div className="flex-[2] rounded-lg border border-white/5 p-3 flex flex-col" style={{ background: '#1A171F' }}>
                  <div className="text-[0.55rem] font-bold text-white/40 uppercase tracking-widest mb-2">Monthly Revenue</div>
                  <div className="flex-1 flex items-end gap-1 pb-1">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i === 10 ? '#D0BCFF' : `rgba(208,188,255,${0.15 + i * 0.02})` }} />
                    ))}
                  </div>
                </div>
                {/* Leads list mock */}
                <div className="flex-1 rounded-lg border border-white/5 p-3 flex flex-col gap-2" style={{ background: '#1A171F' }}>
                  <div className="text-[0.55rem] font-bold text-white/40 uppercase tracking-widest">Top Leads</div>
                  {['Mirrat Corp', 'TechAxis', 'Reliance IT', 'SmartLearn'].map((name, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm flex items-center justify-center text-[0.45rem] font-black text-white shrink-0" style={{ background: ['#D0BCFF33', '#A8C7FA33', '#CFF0C833', '#F9DEDC33'][i] }}>
                        {name[0]}
                      </div>
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                        <div className="h-full rounded-full" style={{ width: `${[85, 70, 55, 40][i]}%`, background: ['#D0BCFF', '#A8C7FA', '#CFF0C8', '#F9DEDC'][i] }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Caption below mockup */}
        <div className="relative z-10 mt-6 text-center">
          <p className="text-[0.8rem] font-bold text-white/50 uppercase tracking-widest">Enttlevo CRM Platform</p>
          <p className="text-[0.7rem] text-white/25 mt-1">Unified Sales · Onboarding · Account Management</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
