import React, { useState } from 'react';
import SidebarItem from './SidebarItem';
import { useTheme } from '../context/ThemeContext';
import type { AccentColor } from '../context/ThemeContext';
import enttlevoLogo from '../assets/enttlevo_logo_new.png';
import enttlevoIcon from '../assets/enttlevologo1.png';

const Sidebar: React.FC = () => {
  const { isSidebarExpanded, toggleSidebar, isDark, toggleTheme, accentColor, setAccentColor } = useTheme();
  const [openAccordion, setOpenAccordion] = useState<string | null>('sales');
  const [notifOpen, setNotifOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'New Lead Assigned', description: 'Mirrat Company has been assigned to you.', time: '2 mins ago', unread: true, icon: 'person_add', color: 'text-primary-container' },
    { id: 2, title: 'Goal Reached!', description: 'You have reached 80% of your monthly goal.', time: '1 hour ago', unread: true, icon: 'workspace_premium', color: 'text-amber-400' },
    { id: 3, title: 'Contract Updated', description: 'Tesla contract moved to Proposal stage.', time: 'Yesterday', unread: false, icon: 'description', color: 'text-blue-400' },
    { id: 4, title: 'Meeting Reminder', description: 'Demo with Smartlearn in 15 minutes.', time: '2 hours ago', unread: false, icon: 'schedule', color: 'text-emerald-400' },
  ];
  const unreadCount = notifications.filter(n => n.unread).length;

  const handleToggleAccordion = (id: string) => {
    setOpenAccordion(prev => prev === id ? null : id);
  };

  return (
    <aside 
      className={`sidebar fixed left-0 top-0 h-full bg-[#1A171F] flex flex-col py-4 z-[100] transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'expanded w-[280px]' : 'w-16 items-center'}`}
    >
      {/* Logo Section */}
      <div className={`flex items-center mb-10 px-4 ${isSidebarExpanded ? 'justify-between' : 'justify-center w-full'}`}>
        <div className="flex items-center">
          {isSidebarExpanded ? (
            <img 
              src={enttlevoLogo} 
              alt="Enttlevo Logo" 
              className="h-10 w-auto object-contain transition-all duration-300"
            />
          ) : (
            <img 
              src={enttlevoIcon} 
              alt="Enttlevo Icon" 
              className="h-6 w-auto object-contain transition-all duration-300"
            />
          )}
        </div>
        
        {isSidebarExpanded && (
          <button 
            onClick={toggleSidebar}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-white/50 hover:text-white transition-colors">
              menu_open
            </span>
          </button>
        )}
      </div>

      {!isSidebarExpanded && (
        <button 
          onClick={toggleSidebar}
          className="mb-10 w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors group"
        >
          <span className="material-symbols-outlined text-white/50 group-hover:text-white transition-colors">
            menu
          </span>
        </button>
      )}

      {/* Navigation */}
      <nav className={`flex flex-col w-full gap-y-1 ${isSidebarExpanded ? 'overflow-y-auto' : 'overflow-visible'} no-scrollbar flex-1`}>
        <SidebarItem
          id="sales"
          icon="sell"
          label="Sales"
          to="/leads"
          isSidebarExpanded={isSidebarExpanded}
          isAccordionOpen={openAccordion === 'sales'}
          onToggleAccordion={handleToggleAccordion}
          hasFlyout
          flyoutItems={[
            { name: 'Dashboard', to: '/', icon: 'insights' },
            { name: 'All Leads', to: '/leads', icon: 'table_rows' },
            { name: 'All Deals', to: '/deals', icon: 'handshake' },
            { name: 'Tasks', to: '/tasks', icon: 'task_alt' },
            { name: 'Scheduler', to: '/scheduler', icon: 'event' }
          ]}
          active={
            window.location.pathname === '/' ||
            window.location.pathname === '/leads' ||
            window.location.pathname === '/deals' ||
            window.location.pathname === '/tasks' ||
            window.location.pathname === '/scheduler'
          }
        />

        <SidebarItem
          id="onboarding"
          icon="how_to_reg"
          label="Onboarding"
          to="/onboarding"
          isSidebarExpanded={isSidebarExpanded}
          isAccordionOpen={openAccordion === 'onboarding'}
          onToggleAccordion={handleToggleAccordion}
          hasFlyout
          flyoutItems={[
            { name: 'Dashboard', to: '/onboarding/dashboard', icon: 'insights' },
            { name: 'All Accounts', to: '/onboarding/accounts', icon: 'groups' },
            { name: 'Tasks', to: '/onboarding/tasks', icon: 'task_alt' },
            { name: 'Schedular', to: '/onboarding/schedular', icon: 'event' },
            { name: 'Reports', to: '/onboarding/reports', icon: 'assessment' }
          ]}
          active={window.location.pathname.startsWith('/onboarding')}
        />

        <SidebarItem
          id="am"
          icon="manage_accounts"
          label="AM"
          to="/am"
          isSidebarExpanded={isSidebarExpanded}
          isAccordionOpen={openAccordion === 'am'}
          onToggleAccordion={handleToggleAccordion}
          hasFlyout
          flyoutItems={[
            { name: 'Dashboard', to: '/am/dashboard', icon: 'insights' },
            { name: 'All Accounts', to: '/am/accounts', icon: 'groups' },
            { name: 'Tasks', to: '/am/tasks', icon: 'task_alt' },
            { name: 'Schedular', to: '/am/schedular', icon: 'event' },
            { name: 'Reports', to: '/am/reports', icon: 'assessment' },
            { name: 'Payment', to: '/am/payment', icon: 'payments' }
          ]}
          active={window.location.pathname.startsWith('/am')}
        />

        <SidebarItem
          id="email"
          icon="mail"
          label="Email"
          to="/email"
          isSidebarExpanded={isSidebarExpanded}
          isAccordionOpen={openAccordion === 'email'}
          onToggleAccordion={handleToggleAccordion}
          active={window.location.pathname.startsWith('/email')}
        />

        <SidebarItem
          id="notifications"
          icon="notifications"
          label="Notifications"
          to="/notifications/today"
          isSidebarExpanded={isSidebarExpanded}
          isAccordionOpen={openAccordion === 'notifications'}
          onToggleAccordion={handleToggleAccordion}
          hasFlyout
          flyoutItems={[
            { name: "Today's", to: '/notifications/today', icon: 'calendar_today' },
            { name: 'Upcoming', to: '/notifications/upcoming', icon: 'event_repeat' }
          ]}
          active={window.location.pathname.startsWith('/notifications')}
        />

        <SidebarItem
          id="integration"
          icon="extension"
          label="Integration"
          to="/integration/campaign"
          isSidebarExpanded={isSidebarExpanded}
          isAccordionOpen={openAccordion === 'integration'}
          onToggleAccordion={handleToggleAccordion}
          hasFlyout
          flyoutItems={[
            { name: 'Campaign', to: '/integration/campaign', icon: 'campaign' },
            { name: 'Workflows', to: '/integration/workflows', icon: 'schema' },
            { name: 'Workflows Library', to: '/integration/workflows-library', icon: 'library_books' },
            { name: 'Call Hippo', to: '/integration/call-hippo', icon: 'call' },
            { name: 'Audio Transcription', to: '/integration/audio-transcription', icon: 'transcribe' }
          ]}
          active={window.location.pathname.startsWith('/integration')}
        />

        <SidebarItem
          id="settings"
          icon="settings"
          label="Settings"
          to="/settings/profile"
          isSidebarExpanded={isSidebarExpanded}
          isAccordionOpen={openAccordion === 'settings'}
          onToggleAccordion={handleToggleAccordion}
          hasFlyout
          flyoutItems={[
            { name: 'Profile', to: '/settings/profile', icon: 'person' },
            { name: 'Company', to: '/settings/company', icon: 'business' },
            { name: 'User Role Management', to: '/settings/user-role', icon: 'badge' },
            { name: 'Data Rules', to: '/settings/data-rules', icon: 'rule' },
            { name: 'Integration Library', to: '/settings/integrations', icon: 'hub' }
          ]}
          active={window.location.pathname.startsWith('/settings')}
        />

        {/* Log Out Button */}
        <button
          onClick={() => {
            localStorage.setItem('crm_auth', 'false');
            window.location.href = '/';
          }}
          className={`
            flex items-center transition-all duration-200 mt-auto border-t border-white/5 pt-4 mb-2
            ${isSidebarExpanded ? 'w-full h-12 px-4' : 'w-12 h-12 justify-center'}
            text-white/70
          `}
          title="Log Out"
        >
          <span className="material-symbols-outlined">logout</span>
          {isSidebarExpanded && (
            <span className="ml-4 font-medium flex-1 text-left truncate">Log Out</span>
          )}
        </button>
      </nav>

      {/* ── Mobile-only footer (hidden on md+) ── */}
      {isSidebarExpanded && (
        <div className="md:hidden border-t border-white/10 mt-2 pt-4 px-4 pb-4 space-y-4 shrink-0">

          {/* Profile card */}
          <div className="flex items-center gap-3">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXqN59oxtGeBdvgVWGhfxxkdMU9hPcHp7YbPRv2cLzOa4DvV2k6LSubWDWa_Ch9L96Uy7uuzkvZmNjRtWEa7Gip4lQNJq0mg2neS3lkSwDp_jS9TPWeYWxKxAMlSBg0cI0TDBtvvbbI-_UZN9LyYTUyBDxQ9byL5FQa6Wt-lNsWAawJDIQ-W4MDcw0uJAa6W1qw9uZhqaXuKTjrG6NwwDPjVo4aT6BxqXgd7_sCvLcxRqYqj0LWu9yAnps3W-CLK_LhM-jz9KlRDM"
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover border border-white/20 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[0.85rem] font-bold text-white truncate uppercase">Vipul Nagarkar</p>
              <p className="text-[0.7rem] text-white/40 truncate">vipul@architect.io</p>
            </div>
          </div>

          {/* Action row: Notifications + Settings + Theme */}
          <div className="flex items-center justify-between">

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setNotifOpen(!notifOpen); setSettingsOpen(false); }}
                className={`relative flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
                  notifOpen ? 'bg-white/10 text-primary-container' : 'text-white/50 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="material-symbols-outlined !text-[20px]">notifications</span>
                {unreadCount > 0 && (
                  <div className="absolute top-1 right-1 w-2 h-2 bg-primary-container rounded-full border-2 border-[#1A171F]" />
                )}
              </button>

              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-[55]" onClick={() => setNotifOpen(false)} />
                  <div className="absolute left-0 bottom-12 w-72 bg-[#1A171F] border border-white/10 rounded-sm shadow-2xl z-[60] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-3 border-b border-white/10 flex justify-between items-center">
                      <h3 className="text-[0.7rem] font-bold text-white uppercase tracking-widest">Notifications</h3>
                      <button className="text-[0.6rem] font-bold text-primary-container hover:underline uppercase">Mark all read</button>
                    </div>
                    <div className="max-h-[280px] overflow-y-auto no-scrollbar">
                      {notifications.map((n) => (
                        <div key={n.id} className={`p-3 border-b border-white/5 hover:bg-white/[0.03] cursor-pointer ${n.unread ? 'bg-white/[0.01]' : ''}`}>
                          <div className="flex gap-3">
                            <div className={`w-7 h-7 rounded-full bg-white/5 flex items-center justify-center shrink-0 ${n.color}`}>
                              <span className="material-symbols-outlined !text-[16px]">{n.icon}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-0.5">
                                <p className={`text-[0.8rem] font-bold truncate ${n.unread ? 'text-white' : 'text-white/60'}`}>{n.title}</p>
                                <span className="text-[0.6rem] text-white/30 whitespace-nowrap ml-2">{n.time}</span>
                              </div>
                              <p className="text-[0.7rem] text-white/40 line-clamp-1">{n.description}</p>
                            </div>
                            {n.unread && <div className="w-1.5 h-1.5 rounded-full bg-primary-container mt-1 shrink-0" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Settings / Palette */}
            <div className="relative">
              <button
                onClick={() => { setSettingsOpen(!settingsOpen); setNotifOpen(false); }}
                className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
                  settingsOpen ? 'bg-white/10 text-primary-container' : 'text-white/50 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="material-symbols-outlined !text-[20px]">palette</span>
              </button>

              {settingsOpen && (
                <>
                  <div className="fixed inset-0 z-[55]" onClick={() => setSettingsOpen(false)} />
                  <div className="absolute left-0 bottom-12 w-56 bg-[#1A171F] border border-white/10 rounded-sm shadow-2xl z-[60] p-4 animate-in fade-in zoom-in-95 duration-200">
                    <h3 className="text-[0.75rem] font-bold text-white uppercase tracking-widest mb-3">Theme</h3>
                    <div className="flex flex-col gap-3">
                      <div>
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block mb-1">Accent</label>
                        <div className="flex items-center gap-2 bg-white/5 p-2 rounded-sm border border-white/5">
                          {[
                            { name: 'orange', color: '#FF8000' },
                            { name: 'blue', color: '#3b82f6' },
                            { name: 'purple', color: '#8b5cf6' },
                            { name: 'teal', color: '#10b981' }
                          ].map((c) => (
                            <div
                              key={c.name}
                              onClick={() => setAccentColor(c.name as AccentColor)}
                              className={`w-6 h-6 rounded-full cursor-pointer transition-all hover:scale-110 border-2 ${
                                accentColor === c.name ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'
                              }`}
                              style={{ backgroundColor: c.color }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="border-t border-white/5 pt-3">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block mb-2">Appearance</label>
                        <div className="flex justify-center">
                          <div
                            className={`theme-pill-container ${isDark ? 'active' : ''}`}
                            onClick={toggleTheme}
                          >
                            <span className="material-symbols-outlined theme-pill-icon moon-icon ml-1.5" style={{ fontSize: '14px' }}>dark_mode</span>
                            <span className="material-symbols-outlined theme-pill-icon sun-icon mr-1.5" style={{ fontSize: '14px' }}>light_mode</span>
                            <div className="theme-pill-knob">
                              <span className="material-symbols-outlined text-black" style={{ fontSize: '12px' }}>{isDark ? 'nights_stay' : 'sunny'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Theme quick toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-9 h-9 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              title={isDark ? 'Switch to Light' : 'Switch to Dark'}
            >
              <span className="material-symbols-outlined !text-[20px]">{isDark ? 'light_mode' : 'dark_mode'}</span>
            </button>

            {/* Profile & Preferences link */}
            <a
              href="/settings/profile"
              className="flex items-center justify-center w-9 h-9 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              title="Profile & Preferences"
            >
              <span className="material-symbols-outlined !text-[20px]">manage_accounts</span>
            </a>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
