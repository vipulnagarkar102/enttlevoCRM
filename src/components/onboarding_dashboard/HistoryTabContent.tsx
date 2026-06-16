import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

type HistoryEventType = 'lead_created' | 'email_sent' | 'stage_changed' | 'document_uploaded' | 'task_completed';

interface HistoryEvent {
  id: string;
  type: HistoryEventType;
  title: string;
  description: string;
  date: string;
  time: string;
  details?: {
    subject?: string;
    body?: string;
  };
}

const HistoryTabContent = () => {
  const { isDark } = useTheme();
  const [events] = useState<HistoryEvent[]>([
    {
      id: '5',
      type: 'task_completed',
      title: 'Implementation Task Done',
      description: 'System config review task has been marked as complete by Shrinath Rao.',
      date: 'MAR 26, 2026',
      time: '04:00 PM'
    },
    {
      id: '4',
      type: 'document_uploaded',
      title: 'Onboarding Plan Uploaded',
      description: 'Onboarding_Plan_v1.pdf has been uploaded to the account documents.',
      date: 'MAR 24, 2026',
      time: '11:00 AM'
    },
    {
      id: '3',
      type: 'stage_changed',
      title: 'Moved to Implementation',
      description: 'Account moved from Configuration to Implementation phase.',
      date: 'MAR 24, 2026',
      time: '10:30 AM'
    },
    {
      id: '2',
      type: 'email_sent',
      title: 'Portal Access Sent',
      description: 'Sent email to Tenali Rama regarding portal access credentials.',
      date: 'MAR 22, 2026',
      time: '02:30 PM',
      details: {
        subject: 'Your Onboarding Portal Credentials',
        body: '"Hi Rama, please find your access details for the onboarding portal..." '
      }
    },
    {
      id: '1',
      type: 'lead_created',
      title: 'Onboarding Initialized',
      description: 'Account initialized for onboarding from Sales handover.',
      date: 'MAR 20, 2026',
      time: '09:15 AM'
    }
  ]);

  const getEventStyles = (type: HistoryEvent['type']) => {
    switch (type) {
      case 'lead_created': return { icon: 'add', color: 'bg-surface-container text-on-surface-variant/60 border-outline/10' };
      case 'email_sent': return { icon: 'send', color: isDark ? 'bg-primary/20 text-primary border-primary/30' : 'bg-primary/10 text-primary border-primary/20' };
      case 'stage_changed': return { icon: 'trending_up', color: isDark ? 'bg-tertiary/20 text-tertiary border-tertiary/30' : 'bg-tertiary/10 text-tertiary border-tertiary/20' };
      case 'document_uploaded': return { icon: 'upload_file', color: isDark ? 'bg-emerald-900/30 text-emerald-300 border-emerald-800' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' };
      case 'task_completed': return { icon: 'check_circle', color: isDark ? 'bg-purple-900/30 text-purple-300 border-purple-800' : 'bg-purple-500/10 text-purple-500 border-purple-500/20' };
      default: return { icon: 'history', color: 'bg-surface-container text-on-surface-variant/40' };
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-surface animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-outline/10 flex flex-col gap-4 shrink-0">
        <div>
          <h2 className="flex items-center gap-2 text-[1.15rem] font-bold text-on-surface">
            <span className="material-symbols-outlined !text-[22px] text-on-surface-variant">history</span>
            Activity History
          </h2>
          <p className="text-[0.85rem] text-on-surface-variant/80 ml-8 mt-1">Timeline of all account interactions and updates</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 md:p-10 custom-scrollbar relative">
        <div className="max-w-3xl mx-auto">
          {events.map((event, index) => {
            const styles = getEventStyles(event.type);
            const isLast = index === events.length - 1;

            return (
              <div key={event.id} className="flex gap-6 min-h-[100px] group hover:bg-primary-container/[0.04] -mx-4 px-4 py-4 rounded-sm transition-colors cursor-default">
                {/* Timeline Column */}
                <div className="flex flex-col items-center shrink-0">
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center shadow-sm z-10 transition-transform group-hover:scale-110 ${styles.color}`}>
                    <span className="material-symbols-outlined !text-[20px]">{styles.icon}</span>
                  </div>
                  {!isLast && (
                    <div className={`w-0.5 grow ${isDark ? 'bg-outline/10' : 'bg-outline/5'} mt-1 mb-[-16px] group-hover:bg-primary-container/20 transition-colors`}></div>
                  )}
                </div>

                {/* Content Column */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[1.05rem] font-bold text-on-surface tracking-tight lowercase first-letter:uppercase">
                      {event.title}
                    </h4>
                    <div className="text-[0.75rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">
                      {event.date} <span className="mx-1">•</span> {event.time}
                    </div>
                  </div>

                  <p className="text-[0.95rem] font-medium text-on-surface-variant leading-relaxed mb-4">
                    {event.description}
                  </p>

                  {event.details && (
                    <div className="bg-surface-container-low/50 border border-outline/10 rounded-sm p-4 space-y-2 animate-in fade-in slide-in-from-left-2 duration-300 shadow-sm group-hover:border-primary-container/20 transition-colors">
                      {event.details.subject && (
                        <div className="flex gap-2 text-[0.85rem]">
                          <span className="font-bold text-on-surface/80 whitespace-nowrap">Subject:</span>
                          <span className="font-semibold text-on-surface-variant italic">{event.details.subject}</span>
                        </div>
                      )}
                      {event.details.body && (
                        <p className="text-[0.85rem] font-medium text-on-surface-variant/40 italic">
                          {event.details.body}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {events.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 opacity-40">
              <span className="material-symbols-outlined !text-[64px] text-on-surface-variant/20 mb-4">history_toggle_off</span>
              <p className="text-[1.1rem] font-bold text-on-surface-variant/60">No history events yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryTabContent;
