import React from 'react';
import type { Notification } from './types';

interface NotificationListProps {
  notifications: Notification[];
  isLoading: boolean;
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications, isLoading }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {isLoading ? (
        <div className="h-full flex flex-col items-center justify-center gap-6">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-primary-container/20 border-t-primary-container rounded-full animate-spin"></div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h4 className="text-[0.75rem] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] animate-pulse">Syncing Notifications</h4>
          </div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center opacity-20">
          <span className="material-symbols-outlined !text-[48px] mb-4">notifications_off</span>
          <p className="text-[0.95rem] font-bold uppercase tracking-[0.15em]">No new notifications</p>
        </div>
      ) : (
        <div className="divide-y divide-outline/5">
          {notifications.map((n) => (
            <div 
              key={n.id} 
              className={`p-6 flex gap-4 hover:bg-surface-container-low transition-colors cursor-pointer ${!n.read ? 'bg-primary-container/[0.03]' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                n.type === 'email' ? 'bg-blue-500/10 text-blue-500' :
                n.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                n.type === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                n.type === 'error' ? 'bg-error/10 text-error' :
                'bg-on-surface-variant/10 text-on-surface-variant'
              }`}>
                <span className="material-symbols-outlined !text-[20px]">
                  {n.type === 'email' ? 'mail' : 
                   n.type === 'success' ? 'check_circle' : 
                   n.type === 'warning' ? 'warning' : 
                   n.type === 'error' ? 'error' : 
                   'notifications'}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`text-[0.9rem] ${!n.read ? 'font-bold' : 'font-medium'} text-on-surface`}>{n.title}</h4>
                  <span className="text-[0.7rem] text-on-surface-variant/50 font-bold uppercase">{n.time}</span>
                </div>
                <p className="text-[0.85rem] text-on-surface-variant leading-relaxed line-clamp-2">
                  {n.message}
                </p>
              </div>
              
              {!n.read && (
                <div className="w-2 h-2 rounded-full bg-primary-container mt-2"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationList;
