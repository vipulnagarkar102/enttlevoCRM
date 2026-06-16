import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import CustomCalendar from '../../components/AM_dashboard/CustomCalendar';
import UnassignedAccountsTable from '../../components/AM_dashboard/UnassignedAccountsTable';
import ManagersTable from '../../components/AM_dashboard/ManagersTable';
import TeamsTable from '../../components/AM_dashboard/TeamsTable';
import UsersTable from '../../components/AM_dashboard/UsersTable';

const AMDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Unassigned');
  const [startDate, setStartDate] = useState('2025-12-24');
  const [endDate, setEndDate] = useState('2026-03-24');
  const [showCal1, setShowCal1] = useState(false);
  const [showCal2, setShowCal2] = useState(false);
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Quarterly');
  const [isRefreshing, setIsRefreshing] = useState(false);

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-container/30 overflow-x-hidden min-h-screen transition-colors duration-300">
      <Sidebar />
      <Topbar />

      {/* Main Canvas */}
      <main className="main-content mt-10 p-4 sm:p-6 lg:p-8 min-h-screen">
        <div className="max-w-[1400px] mx-auto space-y-6">

          {/* AM Header & Controls */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
              <div className="text-left">
                <h1 className="text-[1.75rem] font-medium tracking-tight text-on-surface leading-tight font-headline uppercase">Account Management</h1>
                <p className="text-on-surface-variant text-[0.9rem] mt-0.5 font-body">Q3 Fiscal Year AM Performance Metrics</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* Start Date */}
                <div className="relative">
                  <div
                    onClick={() => { setShowCal1(!showCal1); setShowCal2(false); }}
                    className="flex items-center gap-4 bg-surface-container-low border border-outline/10 rounded-sm px-3 py-1.5 cursor-pointer hover:bg-surface-container-high transition-colors group"
                  >
                    <span className="material-symbols-outlined !text-[18px] text-on-surface-variant group-hover:text-primary-container">calendar_month</span>
                    <span className="text-[0.8rem] text-on-surface font-medium">{new Date(startDate).toLocaleDateString()}</span>
                    <span className="material-symbols-outlined !text-[16px] text-on-surface-variant">expand_more</span>
                  </div>
                  {showCal1 && <CustomCalendar selectedDate={startDate} onSelect={setStartDate} onClose={() => setShowCal1(false)} />}
                </div>

                {/* End Date */}
                <div className="relative">
                  <div
                    onClick={() => { setShowCal2(!showCal2); setShowCal1(false); }}
                    className="flex items-center gap-4 bg-surface-container-low border border-outline/10 rounded-sm px-3 py-1.5 cursor-pointer hover:bg-surface-container-high transition-colors group"
                  >
                    <span className="material-symbols-outlined !text-[18px] text-on-surface-variant group-hover:text-primary-container">calendar_month</span>
                    <span className="text-[0.8rem] text-on-surface font-medium">{new Date(endDate).toLocaleDateString()}</span>
                    <span className="material-symbols-outlined !text-[16px] text-on-surface-variant">expand_more</span>
                  </div>
                  {showCal2 && <CustomCalendar selectedDate={endDate} onSelect={setEndDate} onClose={() => setShowCal2(false)} />}
                </div>

                <div className="h-6 w-[1px] bg-outline-variant/30 mx-1"></div>

                {/* Period Dropdown */}
                <div className="relative">
                  <div
                    onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
                    className="flex items-center gap-3 bg-surface-container-low border border-outline/10 rounded-sm px-3 py-1.5 min-w-[120px] cursor-pointer hover:bg-surface-container-high transition-colors justify-between group"
                  >
                    <span className="text-[0.8rem] text-on-surface font-medium">{selectedPeriod}</span>
                    <span className="material-symbols-outlined !text-[16px] text-on-surface-variant group-hover:text-primary-container">expand_more</span>
                  </div>
                  {showPeriodDropdown && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowPeriodDropdown(false)} />
                      <div className="absolute top-full mt-1 left-0 w-full bg-surface-container-high border border-outline/10 shadow-lg rounded-sm py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        {['Quarterly', 'Half-Yearly', 'Yearly'].map((period) => (
                          <div
                            key={period}
                            onClick={() => {
                              setSelectedPeriod(period);
                              setShowPeriodDropdown(false);
                            }}
                            className="px-3 py-1.5 text-[0.8rem] font-medium text-on-surface hover:bg-primary-container/10 hover:text-primary-container cursor-pointer transition-colors"
                          >
                            {period}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Refresh Button */}
                <button
                  onClick={() => {
                    setIsRefreshing(true);
                    setTimeout(() => setIsRefreshing(false), 1000);
                  }}
                  className={`flex items-center gap-2 px-4 py-1.5 bg-primary-container text-white rounded-sm text-[0.8rem] font-semibold hover:bg-primary-container/90 transition-all group shadow-sm active:scale-95 ${isRefreshing ? 'opacity-80 pointer-events-none' : ''}`}
                >
                  <span className={`material-symbols-outlined !text-[18px] transition-transform duration-500 ${isRefreshing ? 'animate-spin' : 'group-active:rotate-180'}`}>refresh</span>
                  {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </button>
              </div>
            </div>

            {/* Tabs Row */}
            <div className="border-b border-outline-variant/30">
              <div className="flex gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
                {[
                  { id: 'Unassigned', label: 'Unassigned (105)', icon: 'person_add' },
                  { id: 'Manager', label: 'Manager (11)', icon: 'groups' },
                  { id: 'Team', label: 'Team (10)', icon: 'groups' },
                  { id: 'User', label: 'User (24)', icon: 'person' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 pb-3 text-[0.9rem] font-medium transition-all relative whitespace-nowrap ${
                      activeTab === tab.id ? 'text-primary-container' : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined !text-[18px]">{tab.icon}</span>
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-container"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'Unassigned' ? (
            <UnassignedAccountsTable />
          ) : activeTab === 'Manager' ? (
            <ManagersTable />
          ) : activeTab === 'Team' ? (
            <TeamsTable />
          ) : activeTab === 'User' ? (
            <UsersTable />
          ) : (
            <div className="flex flex-col items-center justify-center h-[500px] bg-surface-container-low border border-outline/5 rounded-sm">
              <span className="material-symbols-outlined !text-6xl text-on-surface-variant/20 mb-4">analytics</span>
              <h2 className="text-xl font-medium text-on-surface-variant">No data available for {activeTab}</h2>
              <p className="text-on-surface-variant/60">Select a tab to view active account management performance</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AMDashboard;
