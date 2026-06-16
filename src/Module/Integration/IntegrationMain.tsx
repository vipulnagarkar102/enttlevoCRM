import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import enttlevoIcon from '../../assets/enttlevologo1.png';

const IntegrationMain: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const path = window.location.pathname;

  const getTitle = () => {
    if (path === '/integration/campaign') return "Campaign Management";
    if (path === '/integration/workflows') return "Active Workflows";
    if (path === '/integration/workflows-library') return "Workflows Library";
    if (path === '/integration/call-hippo') return "Call Hippo Integration";
    if (path === '/integration/audio-transcription') return "Audio Transcription";
    return "Integration Hub";
  };

  const getSubtitle = () => {
    if (path === '/integration/campaign') return "Manage and track your marketing campaigns";
    if (path === '/integration/workflows') return "Design and monitor automated business processes";
    if (path === '/integration/workflows-library') return "Pre-built workflow templates for rapid deployment";
    if (path === '/integration/call-hippo') return "Seamless cloud telephony and call tracking";
    if (path === '/integration/audio-transcription') return "Convert meetings and calls to searchable text";
    return "Connect and automate your business tools";
  };

  const renderPlaceholder = (title: string) => (
    <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-20 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="w-24 h-24 bg-primary-container/10 rounded-full flex items-center justify-center mb-8 shadow-inner border border-primary-container/20">
        <span className="material-symbols-outlined !text-[48px] text-primary-container">
          {path.includes('campaign') ? 'campaign' : 
           path.includes('library') ? 'library_books' :
           path.includes('workflows') ? 'schema' :
           path.includes('call') ? 'call' : 'transcribe'}
        </span>
      </div>
      <h2 className="text-[1.75rem] font-bold text-on-surface tracking-tight mb-3 capitalize">{title}</h2>
      <p className="text-[1rem] text-on-surface-variant/60 max-w-lg leading-relaxed">
        This module is currently being configured to provide deep integration with your workspace. 
        Advanced analytics and automation controls will be available shortly.
      </p>
      <button className="mt-10 px-8 py-3 bg-primary text-on-primary rounded-sm text-[0.8rem] font-bold uppercase tracking-[0.15em] hover:bg-primary/90 transition-all shadow-lg active:scale-95">
        Initialize Module
      </button>
    </div>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="h-full flex flex-col items-center justify-center gap-6">
          <img src={enttlevoIcon} alt="Loading..." className="w-16 h-16 grayscale opacity-40 animate-pulse" />
          <div className="flex flex-col items-center gap-1">
            <h4 className="text-[0.75rem] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em]">Syncing Integrations</h4>
            <p className="text-[0.65rem] text-on-surface-variant/20 italic font-medium">Accessing Enttlevo Cloud...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 flex flex-col h-full bg-[#FCFAFE] animate-in fade-in duration-300 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-surface-container-low px-4 sm:px-10 py-5 border-b border-outline/10 shadow-sm shrink-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 w-full sm:w-auto">
            <button className="flex items-center justify-center p-2 text-on-surface-variant hover:text-primary-container hover:bg-primary-container/10 rounded-full transition-colors">
              <span className="material-symbols-outlined !text-[20px]">arrow_back</span>
            </button>
            <div className="text-center sm:text-left">
              <h1 className="text-[1.5rem] font-bold text-on-surface tracking-tight leading-tight flex items-center gap-3 lowercase">
                <span className="capitalize">{getTitle()}</span>
                <span className="px-2 py-0.5 bg-surface-container text-on-surface text-[0.7rem] uppercase tracking-widest font-bold border border-outline/10 rounded-sm">
                  v1.0
                </span>
              </h1>
              <p className="text-[0.85rem] text-on-surface-variant/80 mt-1">{getSubtitle()}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-10 py-6 custom-scrollbar">
          {renderPlaceholder(getTitle())}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-surface text-on-surface flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchPlaceholder="Search integrations..." />
        <main className="flex-1 flex flex-col overflow-hidden" style={{ height: 'calc(100vh - 40px)', marginTop: '40px' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default IntegrationMain;
