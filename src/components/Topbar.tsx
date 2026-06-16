import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import type { AccentColor } from '../context/ThemeContext';

interface TopbarProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  searchPlaceholder?: string;
}

const Topbar: React.FC<TopbarProps> = ({ searchQuery = '', setSearchQuery, searchPlaceholder = 'Global Search...' }) => {
  const { toggleSidebar, isDark, toggleTheme, accentColor, setAccentColor } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'New Lead Assigned', description: 'Mirrat Company has been assigned to you.', time: '2 mins ago', unread: true, icon: 'person_add', color: 'text-primary-container' },
    { id: 2, title: 'Goal Reached!', description: 'You have reached 80% of your monthly goal.', time: '1 hour ago', unread: true, icon: 'workspace_premium', color: 'text-amber-400' },
    { id: 3, title: 'Contract Updated', description: 'Tesla contract moved to Proposal stage.', time: 'Yesterday', unread: false, icon: 'description', color: 'text-blue-400' },
    { id: 4, title: 'Meeting Reminder', description: 'Demo with Smartlearn in 15 minutes.', time: '2 hours ago', unread: false, icon: 'schedule', color: 'text-emerald-400' },
  ];

  return (
    <header
      className="topbar fixed top-0 right-0 h-10 bg-[#1A171F] flex justify-between items-center px-4 z-50 transition-all duration-300 ease-in-out"
      style={{ left: 'var(--sidebar-width)' }}
    >
      <div className="flex items-center gap-2 flex-1">
        {/* Mobile Menu Toggle - only shows on md:hidden */}
        <button
          onClick={toggleSidebar}
          className="md:hidden flex items-center justify-center w-8 h-8 text-white/50 hover:text-white transition-colors mr-2"
        >
          <span className="material-symbols-outlined !text-[20px]">menu</span>
        </button>

        <div className="relative w-32 sm:w-72 uppercase tracking-tight">
          <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 !text-sm">search</span>
          <input
            className="w-full bg-white/5 border border-white/10 rounded-sm py-1 pl-8 pr-3 text-[0.8rem] text-white focus:outline-none focus:border-primary-container/50 transition-all placeholder:text-white/30"
            placeholder={searchPlaceholder}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setNotificationsOpen(!notificationsOpen);
              setSettingsOpen(false);
              setProfileOpen(false);
            }}
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors relative z-[60] ${notificationsOpen ? 'text-primary-container bg-white/10' : 'text-slate-400 hover:text-primary-container'}`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>notifications</span>
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-container rounded-full border-2 border-[#1A171F]"></div>
          </button>

          {notificationsOpen && (
            <>
              <div className="fixed inset-0 z-[55]" onClick={() => setNotificationsOpen(false)} />
              <div className="absolute right-0 top-9 w-80 bg-[#1A171F] border border-white/10 rounded-sm shadow-2xl z-[60] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                  <h3 className="text-[0.75rem] font-bold text-white uppercase tracking-widest">Notifications</h3>
                  <button className="text-[0.65rem] font-bold text-primary-container hover:underline uppercase tracking-tighter">Mark all as read</button>
                </div>
                <div className="max-h-[320px] overflow-y-auto no-scrollbar">
                  {notifications.map((n) => (
                    <div key={n.id} className={`p-4 border-b border-white/5 hover:bg-white/[0.03] transition-colors cursor-pointer group/notif ${n.unread ? 'bg-white/[0.01]' : ''}`}>
                      <div className="flex gap-3">
                        <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 ${n.color}`}>
                          <span className="material-symbols-outlined !text-[18px]">{n.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-0.5">
                            <p className={`text-[0.85rem] font-bold truncate ${n.unread ? 'text-white' : 'text-white/60'}`}>{n.title}</p>
                            <span className="text-[0.6rem] text-white/30 whitespace-nowrap mt-0.5">{n.time}</span>
                          </div>
                          <p className="text-[0.75rem] text-white/40 leading-relaxed line-clamp-2">{n.description}</p>
                        </div>
                        {n.unread && (
                          <div className="w-1.5 h-1.5 rounded-full bg-primary-container mt-1.5 shrink-0"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-white/[0.02] text-center border-t border-white/5">
                  <button className="text-[0.7rem] font-bold text-white/40 hover:text-white uppercase tracking-widest transition-colors">See all activity</button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Settings Toggle & Dropdown */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSettingsOpen(!settingsOpen);
              setProfileOpen(false);
              setNotificationsOpen(false);
            }}
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors relative z-[60] ${settingsOpen ? 'text-primary-container bg-white/10' : 'text-slate-400 hover:text-primary-container'}`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>palette</span>
          </button>

          {settingsOpen && (
            <>
              {/* Overlay Backdrop - Clicking this closes the menu */}
              <div
                className="fixed inset-0 z-[55] cursor-default"
                onClick={() => setSettingsOpen(false)}
              />

              <div className="absolute right-0 top-9 w-64 bg-[#1A171F] border border-white/10 rounded-sm shadow-2xl z-[60] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-4">
                  <h3 className="text-[0.8rem] font-bold text-white uppercase tracking-widest mb-4">Theme Configuration</h3>

                  {/* Accent Color Palette */}
                  <div className="flex flex-col gap-2 mb-4">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Accent Color</label>
                    <div className="flex items-center gap-2 justify-between bg-white/5 p-2 rounded-sm border border-white/5">
                      {[
                        { name: 'orange', color: '#FF8000' },
                        { name: 'blue', color: '#3b82f6' },
                        { name: 'purple', color: '#8b5cf6' },
                        { name: 'teal', color: '#10b981' }
                      ].map((c) => (
                        <div
                          key={c.name}
                          className={`w-6 h-6 rounded-full cursor-pointer transition-all hover:scale-110 border-2 ${accentColor === c.name ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'}`}
                          style={{ backgroundColor: c.color }}
                          onClick={() => { setAccentColor(c.name as AccentColor); }}
                          title={`${c.name.charAt(0).toUpperCase() + c.name.slice(1)}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Appearance Selection */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Appearance</label>
                    <div className="flex justify-center py-1">
                      <div
                        className={`theme-pill-container ${isDark ? 'active' : ''}`}
                        onClick={() => { toggleTheme(); }}
                        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                      >
                        <span className="material-symbols-outlined theme-pill-icon moon-icon ml-1.5" style={{ fontSize: '14px' }}>dark_mode</span>
                        <span className="material-symbols-outlined theme-pill-icon sun-icon mr-1.5" style={{ fontSize: '14px' }}>light_mode</span>
                        <div className="theme-pill-knob">
                          <span className="material-symbols-outlined text-black" style={{ fontSize: '12px' }}>
                            {isDark ? 'nights_stay' : 'sunny'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile Button with Dropdown */}
        <div className="relative group/profile">
          <button
            className="flex items-center gap-2 h-7 rounded-full overflow-hidden border border-white/10 hover:border-primary-container/50 transition-all pr-1"
            onClick={() => { setProfileOpen(!profileOpen); setSettingsOpen(false); setNotificationsOpen(false); }}
          >
            <img alt="User profile" className="w-7 h-7 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXqN59oxtGeBdvgVWGhfxxkdMU9hPcHp7YbPRv2cLzOa4DvV2k6LSubWDWa_Ch9L96Uy7uuzkvZmNjRtWEa7Gip4lQNJq0mg2neS3lkSwDp_jS9TPWeYWxKxAMlSBg0cI0TDBtvvbbI-_UZN9LyYTUyBDxQ9byL5FQa6Wt-lNsWAawJDIQ-W4MDcw0uJAa6W1qw9uZhqaXuKTjrG6NwwDPjVo4aT6BxqXgd7_sCvLcxRqYqj0LWu9yAnps3W-CLK_LhM-jz9KlRDM" />
            <span className="material-symbols-outlined text-slate-400 !text-sm ml-0.5 mr-1 group-hover/profile:text-primary-container transition-colors">expand_more</span>
          </button>

          <div className={`absolute right-0 top-9 w-64 bg-[#1A171F] border border-white/10 rounded-sm dropdown-shadow ${profileOpen ? 'block' : 'hidden'} group-hover/profile:block overflow-hidden z-[100]`}>
            <div className="p-4 border-b border-white/10 flex items-start gap-3 text-left">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5 flex-shrink-0">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXqN59oxtGeBdvgVWGhfxxkdMU9hPcHp7YbPRv2cLzOa4DvV2k6LSubWDWa_Ch9L96Uy7uuzkvZmNjRtWEa7Gip4lQNJq0mg2neS3lkSwDp_jS9TPWeYWxKxAMlSBg0cI0TDBtvvbbI-_UZN9LyYTUyBDxQ9byL5FQa6Wt-lNsWAawJDIQ-W4MDcw0uJAa6W1qw9uZhqaXuKTjrG6NwwDPjVo4aT6BxqXgd7_sCvLcxRqYqj0LWu9yAnps3W-CLK_LhM-jz9KlRDM" />
              </div>
              <div className="flex-1 min-w-0 font-headline">
                <p className="text-[0.95rem] font-semibold text-white truncate uppercase">Vipul Nagarkar</p>
                <p className="text-[0.8rem] text-white/50 truncate mb-2 whitespace-nowrap">vipul@architect.io</p>
                <a className="text-[0.85rem] font-semibold text-primary-container hover:underline whitespace-nowrap" href="#">Profile &amp; Preferences</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
