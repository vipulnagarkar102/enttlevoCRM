import React from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import AMScheduler from '../../components/AM_dashboard/AMScheduler';

const AMSchedularPage: React.FC = () => {
  return (
    <div className="flex bg-surface min-h-screen selection:bg-primary-container/30 overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-surface">
        <Topbar />
        <div className="h-10 shrink-0" /> {/* Fixed Topbar Spacer */}
        <main className="flex-1 main-content relative">
          <AMScheduler />
        </main>
      </div>
    </div>
  );
};

export default AMSchedularPage;
