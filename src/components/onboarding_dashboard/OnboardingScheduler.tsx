import React, { useState } from 'react';
import CreateEventOverlay from '../sales_dashboard/CreateEventOverlay';
import EventDetailView from '../sales_dashboard/EventDetailView';
import { useTheme } from '../../context/ThemeContext';

interface Event {
  id: string;
  title: string;
  category: 'Internal Meetings' | 'Client Onboarding' | 'Training Session';
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  location?: string;
  attendees?: string[];
  color: string;
}

const OnboardingScheduler: React.FC = () => {
  const { isDark } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [view, setView] = useState<'Month' | 'Week' | 'Day'>('Month');
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [selectedViewEvent, setSelectedViewEvent] = useState<any>(null);
  const [prefillDate, setPrefillDate] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string, visible: boolean }>({ message: '', visible: false });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Onboarding Kick-off',
      category: 'Client Onboarding',
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      location: 'Zoom',
      color: 'rgb(var(--color-primary-container))'
    },
    {
      id: '2',
      title: 'User Training Session',
      category: 'Training Session',
      date: new Date().toISOString().split('T')[0],
      startTime: '01:30 PM',
      endTime: '02:30 PM',
      location: 'Teams',
      color: '#10B981'
    },
    {
      id: '3',
      title: 'Implementation Review',
      category: 'Internal Meetings',
      date: new Date().toISOString().split('T')[0],
      startTime: '04:00 PM',
      endTime: '05:00 PM',
      location: 'Room 4',
      color: '#3B82F6'
    },
  ]);

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const handleCreateEvent = (eventData: any) => {
    const colorMap: Record<string, string> = {
      'Internal Meetings': '#3B82F6',
      'Client Onboarding': 'rgb(var(--color-primary-container))',
      'Training Session': '#10B981',
      'Client Sales': 'rgb(var(--color-primary-container))',
      'Product Sync': '#10B981',
    };
    
    const newEvent: Event = {
      ...eventData,
      color: colorMap[eventData.category as string] || '#3B82F6'
    };
    
    if (eventData.id && events.some(e => e.id === eventData.id)) {
        setEvents(prev => prev.map(e => e.id === eventData.id ? newEvent : e));
        if (selectedViewEvent?.id === eventData.id) {
           setSelectedViewEvent(newEvent);
        }
    } else {
        setEvents(prev => [...prev, newEvent]);
    }
    
    setIsAddingEvent(false);
    setEditingEvent(null);
    setPrefillDate(null);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    setIsAddingEvent(false);
    setEditingEvent(null);
    setSelectedViewEvent(null);
    
    setToast({ message: 'Event deleted successfully', visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
  };

  const days = Array.from({ length: daysInMonth(month, year) }, (_, i) => i + 1);
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = daysInMonth(prevMonth, prevYear);
  const trailingDaysCount = firstDayOfMonth(month, year);
  const trailingDays = Array.from({ length: trailingDaysCount }, (_, i) => daysInPrevMonth - trailingDaysCount + i + 1);

  return (
    <div className="flex h-full w-full bg-surface font-body selection:bg-primary-container/30 overflow-hidden animate-in fade-in duration-300 relative">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 lg:z-auto w-[280px] border-r border-outline/10 flex flex-col bg-surface-container-low shrink-0 h-full transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex-1 p-5 space-y-8 custom-scrollbar">
          {/* Action Button */}
          <button 
            onClick={() => { setPrefillDate(null); setIsAddingEvent(true); }}
            className="w-full flex items-center justify-center gap-3 px-4 py-2 bg-primary-container text-white rounded-sm text-[0.85rem] font-bold hover:bg-primary-container/90 transition-all shadow-lg active:scale-95 uppercase tracking-widest group"
          >
            <span className="material-symbols-outlined !text-[20px]">add_circle</span>
            Create Event
          </button>

          {/* Mini Calendar */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <span className="text-[0.75rem] font-bold text-on-surface uppercase tracking-wider">{monthName} {year}</span>
              <div className="flex gap-1">
                <button onClick={() => setCurrentDate(new Date(year, currentDate.getMonth() - 1, 5))} className="material-symbols-outlined !text-[18px] text-on-surface-variant/40 hover:text-on-surface cursor-pointer p-1 rounded-full hover:bg-surface-container transition-colors">chevron_left</button>
                <button onClick={() => setCurrentDate(new Date(year, currentDate.getMonth() + 1, 5))} className="material-symbols-outlined !text-[18px] text-on-surface-variant/40 hover:text-on-surface cursor-pointer p-1 rounded-full hover:bg-surface-container transition-colors">chevron_right</button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-y-1 text-center">
              {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map(d => (
                <span key={d} className="text-[0.6rem] font-bold text-on-surface-variant/30 uppercase tracking-widest">{d}</span>
              ))}
              {trailingDays.map(d => (
                <span key={`prev-${d}`} className={`text-[0.7rem] py-1 opacity-20 ${isDark ? 'text-on-surface-variant' : 'text-on-surface-variant'}`}>{d}</span>
              ))}
              {days.map(d => (
                <button 
                  key={d} 
                  onClick={() => setCurrentDate(new Date(year, month, d))}
                  className={`text-[0.75rem] py-1 cursor-pointer rounded-sm transition-all flex items-center justify-center h-7 w-7 mx-auto font-medium ${d === currentDate.getDate() ? 'bg-primary-container text-white !font-bold shadow-md' : 'text-on-surface hover:bg-surface-container-high'}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-outline/10 flex-1 overflow-y-auto custom-scrollbar-mini pr-2">
            <h3 className="text-[0.65rem] font-bold text-on-surface-variant/60 uppercase tracking-[0.15em] sticky top-0 bg-surface-container-low z-10 py-2">Agenda for {new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</h3>
            <div className="space-y-4 relative">
              {events.filter(e => e.date === selectedDate).sort((a, b) => a.startTime.localeCompare(b.startTime)).map(event => (
                <div 
                    key={event.id} 
                    onClick={(e) => { e.stopPropagation(); setSelectedViewEvent(event); }}
                    className="bg-surface border border-outline/10 rounded-sm shadow-sm flex items-stretch relative group overflow-hidden transition-all hover:border-primary-container/30 hover:bg-surface-container-high cursor-pointer animate-in slide-in-from-left-2 duration-300"
                >
                  <div className="w-1 shrink-0" style={{ backgroundColor: event.color }}></div>
                  <div className="flex-1 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-sm ${isDark ? 'bg-surface-container-high/50' : 'bg-surface-container-low'} text-[0.6rem] font-bold uppercase tracking-wider border border-outline/5`} style={{ color: event.color }}>
                        <span className="material-symbols-outlined !text-[12px]">{event.category === 'Client Onboarding' ? 'rocket_launch' : event.category === 'Training Session' ? 'school' : 'groups'}</span>
                        {event.category}
                      </div>
                      <span className="text-[0.65rem] font-bold text-on-surface-variant/50 uppercase tracking-tight">{event.startTime}</span>
                    </div>
                    <h4 className="text-[0.85rem] font-bold text-on-surface mb-2 group-hover:text-primary-container transition-colors line-clamp-2 leading-tight">{event.title}</h4>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <img 
                            key={i} 
                            src={`https://ui-avatars.com/api/?name=A${i}&background=random&color=fff`} 
                            className="w-5 h-5 rounded-full border border-surface shadow-sm object-cover" 
                            alt="Attendee" 
                          />
                        ))}
                      </div>
                      <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/20 group-hover:text-on-surface-variant transition-colors">more_vert</span>
                    </div>
                  </div>
                </div>
              ))}
              {events.filter(e => e.date === selectedDate).length === 0 && (
                <div className="py-10 text-center opacity-40 flex flex-col items-center gap-2">
                   <span className="material-symbols-outlined !text-[32px]">event_busy</span>
                   <p className="text-[0.75rem] font-medium">No events for today</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-surface overflow-hidden relative min-w-0">
        <header className="px-4 sm:px-8 py-3 sm:py-4 flex flex-wrap justify-between items-center gap-3 bg-surface border-b border-outline/10 shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center justify-center p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-sm transition-colors"
            >
              <span className="material-symbols-outlined !text-[20px]">menu</span>
            </button>
            <h1 className="text-[1.25rem] sm:text-[1.5rem] font-bold text-on-surface tracking-tighter uppercase font-headline">
              {monthName} <span className="text-on-surface-variant/30 font-light">{year}</span>
            </h1>
          </div>
          <div className="flex gap-2 p-1 bg-surface-container-low border border-outline/10 rounded-sm shadow-inner">
            {(['Month', 'Week', 'Day'] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-6 py-1.5 text-[0.7rem] font-bold rounded-sm uppercase tracking-widest transition-all ${
                  view === v 
                  ? 'bg-primary-container text-white shadow-lg active:scale-95' 
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </header>

        <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar">
          <div className="min-w-[700px] h-full flex flex-col">
            <div className="grid grid-cols-7 border-b border-outline/5 bg-surface-container shrink-0">
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                <div key={day} className="py-2 text-[0.6rem] font-bold text-on-surface-variant/40 text-center tracking-[0.2em]">{day}</div>
              ))}
            </div>

            <div className={`flex-1 grid grid-cols-7 ${view === 'Month' ? 'grid-rows-[repeat(6,1fr)]' : 'grid-rows-1'} bg-surface/50 border-t border-outline/10 border-l border-outline/10 overflow-hidden`}>
          {view === 'Month' && trailingDays.map(d => (
            <div key={`prev-grid-${d}`} className="bg-surface-container-low/20 p-2 border-r border-b border-outline/10 min-h-0">
              <span className={`text-[0.8rem] font-bold ${isDark ? 'text-on-surface-variant/20' : 'text-on-surface-variant/10'}`}>{d}</span>
            </div>
          ))}
          
          {(view === 'Month' ? days : days.slice(new Date().getDate() - 3, new Date().getDate() + 4)).map(d => {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const dayEvents = events.filter(e => e.date === dateStr);
            const isToday = d === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
            const isSelected = dateStr === selectedDate;

            return (
              <div 
                key={d} 
                onClick={() => setSelectedDate(dateStr)}
                className={`bg-surface p-2 border-r border-b border-outline/10 relative group/cell transition-all flex flex-col min-h-0 cursor-pointer ${isSelected ? 'bg-primary-container/[0.08]' : isToday ? 'bg-primary-container/[0.04]' : 'hover:bg-surface-container-high/50'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-[0.85rem] font-bold ${isToday ? 'text-white bg-primary-container w-7 h-7 flex items-center justify-center rounded-full shadow-lg transform scale-105' : 'text-on-surface-variant/40 group-hover/cell:text-on-surface'}`}>{d}</span>
                </div>
                
                <div className="flex-1 space-y-1 pb-4 overflow-y-auto custom-scrollbar-mini pr-0.5">
                  {dayEvents.map(event => (
                    <div 
                      key={event.id} 
                      onClick={(e) => { e.stopPropagation(); setSelectedViewEvent(event); }}
                      className="px-2 py-0.5 rounded-sm text-[0.65rem] font-bold truncate transition-all cursor-pointer border-l-[3px] flex items-center gap-1.5 hover:brightness-110 hover:shadow-md"
                      style={{ 
                        backgroundColor: isDark ? `${event.color}25` : `${event.color}15`,
                        color: isDark ? '#FFF' : event.color,
                        borderColor: event.color
                      }}
                      title={event.title}
                    >
                      <span className="truncate uppercase tracking-tight">{event.title}</span>
                    </div>
                  ))}
                </div>

                <button 
                    onClick={(e) => { e.stopPropagation(); setPrefillDate(dateStr); setIsAddingEvent(true); }}
                    className="absolute bottom-2 right-2 w-6 h-6 rounded-sm bg-primary-container text-white flex items-center justify-center opacity-0 group-hover/cell:opacity-100 transition-all shadow-xl active:scale-90 z-20"
                >
                  <span className="material-symbols-outlined !text-[16px]">add</span>
                </button>
              </div>
            );
          })}
            </div>
          </div>
        </div>
        
        <CreateEventOverlay 
            isOpen={isAddingEvent}
            onClose={() => { setIsAddingEvent(false); setPrefillDate(null); setEditingEvent(null); }}
            onAddEvent={handleCreateEvent}
            onDeleteEvent={handleDeleteEvent}
            initialData={editingEvent || (prefillDate ? { date: prefillDate } : { date: selectedDate })}
        />

        <EventDetailView 
            isOpen={!!selectedViewEvent}
            onClose={() => setSelectedViewEvent(null)}
            onEdit={(ev: any) => { setSelectedViewEvent(null); setEditingEvent(ev); setIsAddingEvent(true); }}
            onDelete={handleDeleteEvent}
            event={selectedViewEvent}
        />

        {/* Toast Notifs */}
        {toast.visible && (
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-surface-container-high text-on-surface px-8 py-4 rounded-sm shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-5 duration-500 z-[2000] border border-outline/10">
                <span className="material-symbols-outlined text-emerald-500 !text-[24px]">check_circle</span>
                <span className="text-[0.9rem] font-bold tracking-tight">{toast.message}</span>
            </div>
        )}
      </main>
    </div>
  );
};

export default OnboardingScheduler;
