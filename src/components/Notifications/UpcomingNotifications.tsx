import React from 'react';
import type { Notification } from './types';

interface UpcomingNotificationsProps {
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onDismiss: (id: number) => void;
}

const UpcomingNotifications: React.FC<UpcomingNotificationsProps> = ({ 
  notifications, 
  onMarkAsRead, 
  onDismiss 
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Consistent Section Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-surface-container-low/50 border-b border-outline/10 flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
        <span className="material-symbols-outlined text-primary-container !text-[20px]">event_repeat</span>
        <h3 className="text-[0.75rem] font-bold text-on-surface-variant uppercase tracking-[0.2em] break-words">Upcoming Reminders</h3>
        <div className="ml-auto bg-primary-container/10 text-primary-container text-[0.65rem] font-bold px-2 py-0.5 rounded-sm border border-primary-container/20">
          {notifications.length}
        </div>
      </div>
      
      <div className="divide-y divide-outline/5 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-10 text-center opacity-20">
            <p className="text-[0.85rem] font-medium italic">No upcoming reminders</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div 
              key={n.id} 
              className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-4 sm:px-6 min-h-[52px] py-3 sm:py-2 hover:bg-primary-container/[0.04] transition-all cursor-pointer group relative ${!n.read ? 'bg-primary-container/[0.02]' : ''}`}
            >
              {/* Branded Status Indicator */}
              {!n.read && (
                <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-primary-container"></div>
              )}
              
              <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                <div className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 shadow-sm border border-outline/10 ${
                  n.type === 'reminder' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                  'bg-primary-container/10 text-primary-container border-primary-container/20'
                }`}>
                  <span className="material-symbols-outlined !text-[18px]">
                    {n.type === 'reminder' ? 'alarm' : 'event_note'}
                  </span>
                </div>
                
                <h4 className={`sm:hidden flex-1 text-[0.85rem] ${!n.read ? 'font-bold' : 'font-semibold'} text-on-surface group-hover:text-primary-container transition-colors tracking-tight truncate uppercase`}>
                  {n.title}
                </h4>
              </div>
              
              <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-8 pl-11 sm:pl-0">
                <h4 className={`hidden sm:block w-[200px] shrink-0 text-[0.85rem] ${!n.read ? 'font-bold' : 'font-semibold'} text-on-surface group-hover:text-primary-container transition-colors tracking-tight truncate uppercase`}>
                  {n.title}
                </h4>
                <p className="w-full sm:flex-1 text-[0.85rem] text-on-surface-variant/60 truncate font-medium">
                  {n.message}
                </p>
              </div>

              <div className="shrink-0 w-full sm:w-auto sm:min-w-[150px] text-right relative flex items-center justify-end pl-11 sm:pl-0 mt-2 sm:mt-0">
                <div className="flex items-center gap-2 px-2 py-0.5 bg-primary-container/5 rounded-sm border border-primary-container/10 sm:group-hover:opacity-0 transition-all hidden sm:flex">
                   <span className="material-symbols-outlined !text-[12px] text-primary-container">schedule</span>
                   <span className="text-[0.65rem] text-primary-container font-bold uppercase tracking-wider">{n.time}</span>
                </div>
                <div className="sm:absolute sm:right-0 flex gap-2 w-full sm:w-auto sm:opacity-0 sm:group-hover:opacity-100 transition-all">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onMarkAsRead(n.id); }}
                    className="px-3 py-1.5 sm:py-1 bg-primary-container/10 text-primary-container rounded-sm text-[0.75rem] sm:text-[0.7rem] font-bold hover:bg-primary-container/20"
                  >
                    Add
                  </button>
                  <button 
                     onClick={(e) => { e.stopPropagation(); onDismiss(n.id); }}
                     className="px-3 py-1.5 sm:py-1 bg-on-surface-variant/5 text-on-surface-variant rounded-sm text-[0.75rem] sm:text-[0.7rem] font-bold hover:bg-on-surface-variant/10"
                  >
                    Snooze
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingNotifications;
