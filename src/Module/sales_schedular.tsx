import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import SalesScheduler from '../components/sales_dashboard/SalesScheduler';

const SalesSchedularPage: React.FC = () => {
  return (
    <div className="flex bg-surface min-h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-surface">
        <Topbar />
        <div className="h-10 shrink-0" /> {/* Fixed Topbar Spacer */}
        <main className="flex-1 main-content relative overflow-hidden" style={{ height: 'calc(100vh - 40px)' }}>
          <SalesScheduler />
        </main>
      </div>
    </div>
  );
};

export default SalesSchedularPage;


