import React from 'react';

const IntegrationLibrary: React.FC = () => {
  const integrations = [
    { name: 'Salesforce', icon: 'cloud', category: 'CRM Sync', connected: true, desc: 'Bidirectional sync for leads and opportunities.' },
    { name: 'Slack', icon: 'chat', category: 'Team Comms', connected: true, desc: 'Real-time notifications for deal closures.' },
    { name: 'QuickBooks', icon: 'account_balance_wallet', category: 'Finance', connected: false, desc: 'Automated invoice generation from deals.' },
    { name: 'Gmail', icon: 'mail', category: 'Email', connected: true, desc: 'Track email threads directly in account views.' },
    { name: 'Stripe', icon: 'payments', category: 'Payments', connected: false, desc: 'Accept payments and manage subscriptions.' },
    { name: 'Zoom', icon: 'videocam', category: 'Meetings', connected: false, desc: 'Automatically log meeting details and recordings.' },
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
              <span className="capitalize">Integration Hub</span>
              <span className="px-2 py-0.5 bg-surface-container text-on-surface text-[0.7rem] uppercase tracking-widest font-bold border border-outline/10 rounded-sm">
                Connected
              </span>
            </h1>
            <p className="text-[0.85rem] text-on-surface-variant/80 mt-1">Connect third-party tools and API services</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-10 py-6 custom-scrollbar">
        <div className="space-y-10">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <h3 className="text-[0.7rem] font-bold text-on-surface-variant uppercase tracking-[0.2em] text-center sm:text-left">Available Integrations</h3>
            <div className="flex w-full sm:w-auto">
                <input 
                    type="text" 
                    placeholder="Search integrations..." 
                    className="bg-surface-container-low border border-outline/10 rounded-sm px-3 py-1.5 text-[0.8rem] focus:outline-none focus:border-primary/30 w-full sm:w-64 transition-all"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((app, idx) => (
            <div key={idx} className="bg-surface-container-low/50 border border-outline/10 rounded-sm p-6 hover:border-primary/20 transition-all group flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${app.connected ? 'bg-primary/10 text-primary' : 'bg-outline/10 text-on-surface-variant/40'}`}>
                   <span className="material-symbols-outlined text-2xl">{app.icon}</span>
                </div>
                <div className={`px-2 py-0.5 rounded-full text-[0.6rem] font-bold uppercase tracking-widest ${
                    app.connected ? 'bg-success/10 text-success' : 'bg-outline/5 text-on-surface-variant/30'
                }`}>
                    {app.connected ? 'Connected' : 'Available'}
                </div>
              </div>
              
              <div className="space-y-1 mb-4 flex-1">
                <h4 className="text-[1rem] font-medium text-on-surface group-hover:text-primary transition-colors">{app.name}</h4>
                <p className="text-[0.65rem] font-bold text-on-surface-variant/40 uppercase tracking-wider">{app.category}</p>
                <p className="text-[0.8rem] text-on-surface-variant/70 pt-2 leading-relaxed">{app.desc}</p>
              </div>

              <div className="pt-6 mt-auto border-t border-outline/5 flex justify-between items-center">
                <button className="text-[0.7rem] font-bold text-on-surface-variant/60 hover:text-on-surface transition-colors uppercase tracking-wider">Details</button>
                <button className={`px-4 py-1.5 rounded-sm text-[0.75rem] font-bold uppercase tracking-wider transition-all ${
                    app.connected ? 'border border-outline/10 text-on-surface-variant hover:bg-surface-container-high' : 'bg-primary text-on-primary hover:bg-primary/90'
                }`}>
                    {app.connected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
};

export default IntegrationLibrary;
