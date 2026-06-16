import React from 'react';

const DataRules: React.FC = () => {
  const rules = [
    { name: 'Lead Assignment Strategy', type: 'Distribution', lastRun: '15 mins ago', active: true },
    { name: 'Duplicate Check: Email', type: 'Validation', lastRun: 'Real-time', active: true },
    { name: 'Currency Conversion (ST)', type: 'Automation', lastRun: 'Hourly', active: false },
    { name: 'Opportunity Staging Fix', type: 'Cleanup', lastRun: '3 days ago', active: true },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FCFAFE] animate-in fade-in duration-300 overflow-hidden">
      {/* Header - Consistent with User Role Management */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-surface-container-low px-4 sm:px-10 py-5 border-b border-outline/10 shadow-sm shrink-0">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 w-full sm:w-auto">
          <button className="flex items-center justify-center p-2 text-on-surface-variant hover:text-primary-container hover:bg-primary-container/10 rounded-full transition-colors">
            <span className="material-symbols-outlined !text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-[1.5rem] font-bold text-on-surface tracking-tight leading-tight flex items-center gap-3 lowercase">
              <span className="capitalize">Data Governance</span>
              <span className="px-2 py-0.5 bg-surface-container text-on-surface text-[0.7rem] uppercase tracking-widest font-bold border border-outline/10 rounded-sm">
                System
              </span>
            </h1>
            <p className="text-[0.85rem] text-on-surface-variant/80 mt-1">Set validation rules and data entry standards</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-10 py-6 custom-scrollbar">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <h3 className="text-[0.7rem] font-bold text-on-surface-variant uppercase tracking-[0.2em] text-center sm:text-left">Automated Data Rules</h3>
            <button className="text-primary text-[0.8rem] font-bold hover:underline uppercase tracking-wider text-center sm:text-right">Configure Global Rules</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rules.map((rule, idx) => (
            <div key={idx} className="p-4 sm:p-5 bg-surface-container-low/50 border border-outline/10 rounded-sm hover:border-primary/20 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <h4 className="text-[0.95rem] font-medium text-on-surface group-hover:text-primary transition-colors">{rule.name}</h4>
                  <p className="text-[0.7rem] text-on-surface-variant/60 font-medium uppercase tracking-wider">{rule.type}</p>
                </div>
                <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${rule.active ? 'bg-primary/20' : 'bg-outline/20'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300 ${rule.active ? 'right-0.5 bg-primary' : 'left-0.5 bg-white/40'}`}></div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-outline/5">
                <div className="flex items-center gap-1.5 grayscale opacity-40">
                   <span className="material-symbols-outlined text-[1rem]">history</span>
                   <span className="text-[0.7rem] font-medium">Last run: {rule.lastRun}</span>
                </div>
                <button className="text-[0.75rem] font-bold text-on-surface-variant hover:text-on-surface transition-colors">EDIT RULE</button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 sm:p-10 border-2 border-dashed border-outline/10 rounded-sm bg-surface-container-low/20 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant/40">rule</span>
            </div>
            <div className="space-y-1">
                <h4 className="text-[0.9rem] font-medium text-on-surface">Need a custom validation?</h4>
                <p className="text-[0.75rem] text-on-surface-variant/60 max-w-sm">Create complex logic and field dependencies using our visual rule builder.</p>
            </div>
            <button className="mt-2 px-6 py-2 bg-primary text-on-primary rounded-sm text-[0.75rem] font-bold uppercase tracking-wider shadow-md">Build Custom Rule</button>
        </div>
      </div>
    </div>
  </div>
);
};

export default DataRules;
