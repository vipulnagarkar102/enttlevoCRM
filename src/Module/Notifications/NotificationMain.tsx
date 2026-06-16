import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import enttlevoIcon from '../../assets/enttlevologo1.png';
import TodayNotifications from '../../components/Notifications/TodayNotifications';
import UpcomingNotifications from '../../components/Notifications/UpcomingNotifications';
import type { Notification } from '../../components/Notifications/types';

const NotificationMain: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'email',
      title: 'New Email from Fred',
      message: 'Your meeting recap for Auris/Carex is ready for review.',
      time: 'Just Now',
      read: false,
      category: 'today'
    },
    {
      id: 2,
      type: 'success',
      title: 'Task Completed',
      message: 'The Q4 Partnership Proposal has been successfully finalized and sent to the client.',
      time: '2 hours ago',
      read: false,
      category: 'today'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Credit Balance Low',
      message: 'Your account balance for E2E Networks is below the $500 threshold.',
      time: '5 hours ago',
      read: true,
      category: 'today'
    },
    {
      id: 7,
      type: 'error',
      title: 'Payment Failed',
      message: 'The subscription renewal for Adobe Creative Cloud has failed due to card expiry.',
      time: '6 hours ago',
      read: false,
      category: 'today'
    },
    {
      id: 8,
      type: 'info',
      title: 'New Lead Assigned',
      message: 'A new high-priority lead from "Tech Solutions Inc" has been assigned to you.',
      time: '8 hours ago',
      read: true,
      category: 'today'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Product Sync Call',
      message: 'Weekly sync with the design team regarding the new icons and theme tokens.',
      time: 'Tomorrow, 10:00 AM',
      read: false,
      category: 'upcoming'
    },
    {
      id: 5,
      type: 'reminder',
      title: 'Client Review: Auris',
      message: 'Final document review with the stakeholders from Auris Corp.',
      time: 'Apr 16, 02:00 PM',
      read: false,
      category: 'upcoming'
    },
    {
      id: 9,
      type: 'reminder',
      title: 'Marketing Strategy Pitch',
      message: 'Internal review of the Q3 marketing strategy before the board meeting.',
      time: 'Apr 17, 11:30 AM',
      read: true,
      category: 'upcoming'
    },
    {
      id: 6,
      type: 'system',
      title: 'Scheduled Maintenance',
      message: 'The CRM will undergo scheduled maintenance this Sunday for backend optimization.',
      time: 'Sunday, 12:00 AM',
      read: true,
      category: 'upcoming'
    },
    {
      id: 10,
      type: 'reminder',
      title: 'Team Luncheon',
      message: 'Monthly team-building luncheon at the downtown bistro.',
      time: 'Next Monday, 01:00 PM',
      read: false,
      category: 'upcoming'
    },
    {
      id: 11,
      type: 'success',
      title: 'New Deal Closed',
      message: 'Congratulations! The "Global Expansion" deal with Apex Corp has been officially closed.',
      time: '10 hours ago',
      read: true,
      category: 'today'
    },
    {
      id: 12,
      type: 'error',
      title: 'Security Alert',
      message: 'An unusual login attempt was detected from a new device in London, UK.',
      time: '12 hours ago',
      read: false,
      category: 'today'
    },
    {
      id: 13,
      type: 'info',
      title: 'Team Update',
      message: 'Sarah Jenkins has joined the Account Management team as a Senior Partner.',
      time: '14 hours ago',
      read: true,
      category: 'today'
    },
    {
      id: 14,
      type: 'warning',
      title: 'SLA Breach Warning',
      message: 'Account "Vertex Group" is approaching its 24-hour response SLA threshold.',
      time: '16 hours ago',
      read: false,
      category: 'today'
    },
    {
      id: 15,
      type: 'reminder',
      title: 'Quarterly OKR Review',
      message: 'Main conference room. Please bring your updated performance metrics.',
      time: 'Next Tuesday, 09:00 AM',
      read: false,
      category: 'upcoming'
    },
    {
      id: 16,
      type: 'reminder',
      title: 'Design Handover',
      message: 'Final hand-off of the mobile app assets to the development team.',
      time: 'Next Wednesday, 03:00 PM',
      read: false,
      category: 'upcoming'
    },
    {
      id: 17,
      type: 'system',
      title: 'Database Backup Complete',
      message: 'The monthly archival backup of all CRM records has been successfully verified.',
      time: 'Next Thursday, 02:00 AM',
      read: true,
      category: 'upcoming'
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const path = window.location.pathname;
  const isTodayOnly = path === '/notifications/today';
  const isUpcomingOnly = path === '/notifications/upcoming';

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleDismiss = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifs = notifications.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const todayNotifs = filteredNotifs.filter(n => n.category === 'today');
  const upcomingNotifs = filteredNotifs.filter(n => n.category === 'upcoming');

  return (
    <div className="bg-surface text-on-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchPlaceholder="Search notifications..." />

        <main className="main-content flex-1 flex flex-col p-4 sm:p-6 lg:p-8 pb-4 overflow-hidden" style={{ height: 'calc(100vh - 40px)', marginTop: '40px' }}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-4 sm:mb-8">
            <div className="text-left">
              <h1 className="text-[1.75rem] font-medium tracking-tight text-on-surface leading-tight font-headline uppercase">
                {isTodayOnly ? "Today's Alerts" : isUpcomingOnly ? "Upcoming Reminders" : "Notification Center"}
              </h1>
              <p className="text-on-surface-variant text-[0.9rem] mt-0.5 font-body">
                {isTodayOnly ? "Focus on your immediate tasks and communications" :
                  isUpcomingOnly ? "Prepare for your scheduled meetings and maintenance" :
                    "Manage your daily alerts and upcoming work reminders"}
              </p>
            </div>

            <button
              className="px-4 py-1.5 border border-outline/10 rounded-sm text-[0.8rem] font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors uppercase tracking-wider w-full sm:w-auto"
              onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
            >
              Mark all as read
            </button>
          </div>

          <div className="flex-1 flex flex-col min-h-0 bg-surface-container-low/30 rounded-sm border border-outline/5 overflow-hidden">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center gap-6 transition-all duration-300">
                <div className="relative">
                  <img
                    src={enttlevoIcon}
                    alt="Loading..."
                    className="w-16 h-16 grayscale opacity-40 animate-pulse transition-all duration-700"
                  />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <h4 className="text-[0.75rem] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] animate-pulse">Syncing Notifications</h4>
                  <p className="text-[0.65rem] text-on-surface-variant/20 italic font-medium tracking-tight">Accessing Enttlevo CRM Core...</p>
                </div>
              </div>
            ) : (
              <div className={`flex-1 overflow-y-auto lg:overflow-hidden flex ${isTodayOnly || isUpcomingOnly ? 'flex-col' : 'flex-col lg:flex-row gap-4 sm:gap-6 p-1'}`}>
                {(!isUpcomingOnly) && (
                  <div className={`${isTodayOnly ? 'w-full h-full' : 'w-full lg:flex-1 min-h-[400px] lg:h-full'} overflow-hidden flex flex-col`}>
                    <TodayNotifications
                      notifications={todayNotifs}
                      onMarkAsRead={handleMarkAsRead}
                      onDismiss={handleDismiss}
                    />
                  </div>
                )}
                {(!isTodayOnly) && (
                  <div className={`${isUpcomingOnly ? 'w-full h-full' : 'w-full lg:flex-1 min-h-[400px] lg:h-full'} overflow-hidden flex flex-col`}>
                    <UpcomingNotifications
                      notifications={upcomingNotifs}
                      onMarkAsRead={handleMarkAsRead}
                      onDismiss={handleDismiss}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(var(--color-outline), 0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default NotificationMain;
