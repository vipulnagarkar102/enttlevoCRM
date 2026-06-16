import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface EventDetailViewProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (event: any) => void;
  onDelete: (id: string) => void;
  event: any;
}

const EventDetailView: React.FC<EventDetailViewProps> = ({ isOpen, onClose, onEdit, onDelete, event }) => {
  const { isDark } = useTheme();
  
  if (!isOpen || !event) return null;

  return (
    <>
      {/* Detail View Wrapper */}
      <div className="fixed inset-0 bg-surface z-[1000] flex flex-col animate-in slide-in-from-bottom duration-500 font-body overflow-hidden">
        
        {/* Navigation Bar */}
        <div className="bg-surface px-8 py-5 border-b border-outline/10 flex items-center justify-between shrink-0 shadow-sm relative z-10">
          <div className="flex items-center gap-6">
            <button 
              onClick={onClose}
              className="flex items-center justify-center p-2 text-on-surface-variant/60 hover:text-on-surface hover:bg-surface-container rounded-full transition-all"
            >
              <span className="material-symbols-outlined !text-[24px]">arrow_back</span>
            </button>
            
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-[1.75rem] font-bold text-on-surface tracking-tight leading-tight">{event.title}</h1>
                <div className={`px-2 py-0.5 ${isDark ? 'bg-primary/20 text-primary-light' : 'bg-primary/10 text-primary'} text-[0.7rem] uppercase tracking-widest font-black rounded-sm border border-outline/5`}>
                   Upcoming
                </div>
              </div>
              <p className="text-[0.85rem] text-on-surface-variant/40 mt-1">
                Event Detail & Meeting Coordination • <span className="font-bold">EV-{event.id || '94000'}</span>
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onEdit(event)}
              className="flex items-center gap-2 px-6 py-2 border border-outline/10 rounded-sm bg-surface-container-low text-[0.8rem] font-bold text-on-surface hover:bg-surface-container-high transition-all shadow-sm tracking-wider uppercase active:scale-95"
            >
              <span className="material-symbols-outlined !text-[18px]">edit</span>
              Edit Meeting
            </button>
            <button 
              onClick={() => onDelete(event.id)}
              className="flex items-center gap-2 px-6 py-2 bg-error text-white border border-error/20 rounded-sm text-[0.8rem] font-bold hover:bg-error/90 transition-all shadow-lg tracking-wider uppercase active:scale-95"
            >
              <span className="material-symbols-outlined !text-[18px]">delete</span>
              Delete
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-surface custom-scrollbar">
          
          <div className="max-w-[1400px] mx-auto w-full p-10 pb-20 mt-4 space-y-10">
            
            {/* Quick Info Section */}
            <div className="bg-surface-container-low p-8 border border-outline/10 rounded-sm shadow-sm relative overflow-hidden group">
                <div className="grid grid-cols-3 gap-10">
                    <div className="flex flex-col gap-2">
                        <label className="text-[0.7rem] font-black text-on-surface-variant/30 uppercase tracking-[0.2em]">Meeting Date</label>
                        <div className="flex items-center gap-4 text-on-surface px-4 py-3 bg-surface border border-outline/5 rounded-sm transition-colors group-hover:bg-surface-container">
                            <span className="material-symbols-outlined !text-[20px] text-primary-container">calendar_today</span>
                            <span className="text-[1rem] font-bold">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[0.7rem] font-black text-on-surface-variant/30 uppercase tracking-[0.2em]">Time Slot</label>
                        <div className="flex items-center gap-4 text-on-surface px-4 py-3 bg-surface border border-outline/5 rounded-sm transition-colors group-hover:bg-surface-container">
                            <span className="material-symbols-outlined !text-[20px] text-primary">schedule</span>
                            <span className="text-[1rem] font-bold">{event.startTime} - {event.endTime}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[0.7rem] font-black text-on-surface-variant/30 uppercase tracking-[0.2em]">Meeting Link</label>
                        <div className="flex items-center gap-4 text-emerald-500 px-4 py-3 bg-surface border border-outline/5 rounded-sm hover:bg-emerald-500/10 transition-colors cursor-pointer group/link">
                            <span className="material-symbols-outlined !text-[20px]">videocam</span>
                            <span className="text-[1rem] font-bold truncate">meet.google.com/q4-strat...</span>
                            <span className="material-symbols-outlined !text-[16px] ml-auto opacity-0 group-hover/link:opacity-100 transition-all transform group-hover/link:translate-x-1">open_in_new</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Multi-Column Layout */}
            <div className="grid grid-cols-12 gap-10">
              
              <div className="col-span-8 space-y-10">
                
                {/* Description Area */}
                <div className="bg-surface p-10 border border-outline/10 rounded-sm shadow-sm hover:border-primary-container/20 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-1.5 h-8 bg-primary-container rounded-full" />
                    <h2 className="text-[1.5rem] font-black text-on-surface tracking-tight uppercase">Description & Agenda</h2>
                  </div>
                  <p className="text-[1.1rem] text-on-surface-variant leading-relaxed mb-10 font-medium">
                    {event.description || 'This strategic session aims to finalize the roadmap for the final quarter. We will review performance metrics, finalize team allocations, and align on key growth initiatives for the upcoming cycle.'}
                  </p>

                  <div className="bg-surface-container-low p-10 rounded-sm border border-outline/5 relative shadow-inner group">
                    <h3 className="text-[0.8rem] font-black text-on-surface-variant/50 mb-8 uppercase tracking-[0.25em]">Key Discussion Items</h3>
                    <div className="grid grid-cols-1 gap-8">
                      {[
                        'Comprehensive Review of Q3 Performance vs Revenue Targets',
                        'Market Expansion Strategy for Western Europe & APAC Regions',
                        'Human Resource Allocation for New Product Launch Cycle',
                        'Risk Mitigation Planning for Supply Chain Volatility'
                      ].map((point, idx) => (
                        <div key={idx} className="flex gap-6 group/item">
                          <div className={`w-8 h-8 rounded-[4px] bg-surface border ${isDark ? 'border-outline/20' : 'border-outline/5'} text-on-surface-variant/40 flex items-center justify-center shrink-0 font-black text-[0.8rem] group-hover/item:bg-primary-container group-hover/item:text-white group-hover/item:border-primary-container group-hover/item:rotate-12 transition-all duration-300`}>
                            {idx + 1}
                          </div>
                          <p className="text-[1rem] text-on-surface-variant/80 font-bold pt-1 transition-colors group-hover/item:text-on-surface">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Shared Resources */}
                <div className="bg-surface p-10 border border-outline/10 rounded-sm shadow-sm">
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="text-[1.5rem] font-black text-on-surface uppercase tracking-tight">Shared Resources</h2>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-container/10 text-primary-container rounded-sm text-[0.75rem] font-black uppercase tracking-[0.2em] hover:bg-primary-container hover:text-white transition-all shadow-sm">
                      <span className="material-symbols-outlined !text-[20px]">cloud_upload</span>
                      Upload file
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { name: 'Strategy_Deck_Q4.pdf', size: '4.2 MB', ext: 'PDF', icon: 'picture_as_pdf', color: 'text-rose-500 bg-rose-500/10' },
                      { name: 'Resource_Planner.xlsx', size: '1.8 MB', ext: 'XLSX', icon: 'table_chart', color: 'text-emerald-500 bg-emerald-500/10' }
                    ].map((file, idx) => (
                      <div key={idx} className="flex items-center gap-6 p-6 border border-outline/5 rounded-sm hover:border-primary-container/20 hover:bg-primary-container/5 transition-all cursor-pointer group/file">
                        <div className={`w-14 h-14 rounded-sm flex items-center justify-center ${file.color}`}>
                          <span className="material-symbols-outlined !text-[36px]">{file.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[1rem] font-black text-on-surface truncate group-hover/file:text-primary-container transition-colors leading-tight uppercase">{file.name}</div>
                          <div className="text-[0.7rem] font-bold text-on-surface-variant/30 uppercase tracking-widest mt-1">{file.size} • {file.ext}</div>
                        </div>
                        <span className="material-symbols-outlined text-on-surface-variant/20 group-hover/file:text-primary-container group-hover/file:translate-y-1 transition-all">download</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-4 space-y-10">
                
                {/* Attendees List */}
                <div className="bg-surface border border-outline/10 rounded-sm shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-outline/5 flex justify-between items-center bg-surface-container-low">
                    <h2 className="text-[1.1rem] font-black text-on-surface uppercase tracking-tight">
                       Attendees (4)
                    </h2>
                    <button className="w-9 h-9 rounded-full bg-surface border border-outline/10 text-on-surface-variant/40 flex items-center justify-center hover:bg-primary-container hover:text-white transition-all shadow-sm">
                      <span className="material-symbols-outlined !text-[24px]">person_add</span>
                    </button>
                  </div>
                  
                  <div className="divide-y divide-outline/5">
                    {[
                      { name: 'Alex Johnson', role: 'Team Lead', status: 'Accepted' },
                      { name: 'Sarah Miller', role: 'Developer', status: 'Accepted' },
                      { name: 'David Chen', role: 'Architect', status: 'Pending' },
                      { name: 'Elena Rodriguez', role: 'Manager', status: 'Accepted' }
                    ].map((user, idx) => (
                      <div key={idx} className="p-6 flex items-center gap-5 hover:bg-surface-container transition-all group">
                        <img src={`https://ui-avatars.com/api/?name=${user.name}&background=random&color=fff`} className="w-12 h-12 rounded-full border-2 border-surface shadow-md transform group-hover:scale-105 transition-transform" alt="" />
                        <div className="flex-1 min-w-0">
                          <div className="text-[1rem] font-black text-on-surface truncate tracking-tight">{user.name}</div>
                          <div className={`text-[0.7rem] font-bold uppercase tracking-widest mt-0.5 ${isDark ? 'text-on-surface-variant/60' : 'text-on-surface-variant/40'}`}>{user.role}</div>
                        </div>
                        <span className={`px-3 py-1 rounded-[4px] text-[0.6rem] font-black uppercase tracking-[0.1em] ${user.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
                          {user.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call Action Card */}
                <div className="bg-surface border border-outline/10 rounded-sm shadow-2xl overflow-hidden group/call-card">
                  <div className="h-40 bg-surface-container flex items-center justify-center relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br from-primary-container/30 to-primary/30 ${isDark ? 'opacity-40' : 'opacity-20'}`} />
                    <div className="w-20 h-20 rounded-full bg-primary-container text-white flex items-center justify-center shadow-[0_0_50px_rgba(255,128,0,0.4)] scale-110 group-hover/call-card:scale-125 transition-all duration-700">
                      <span className="material-symbols-outlined !text-[42px] animate-pulse">videocam</span>
                    </div>
                  </div>
                    <div className="p-10 text-center bg-surface">
                        <h3 className="text-[1.4rem] font-black text-on-surface mb-3 uppercase tracking-tight">Google Meet Call</h3>
                        <p className={`text-[0.9rem] font-medium mb-10 italic leading-relaxed ${isDark ? 'text-on-surface-variant/60' : 'text-on-surface-variant/40'}`}>The session is synchronized. Please join using the official team link below.</p>
                        <button className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-primary-container text-white rounded-sm text-[0.85rem] font-black uppercase tracking-[0.2em] shadow-lg hover:shadow-primary-container/20 active:scale-[0.95] transition-all">
                            <span className="material-symbols-outlined !text-[20px]">rocket_launch</span>
                            Join Meeting Now
                        </button>
                    </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailView;


