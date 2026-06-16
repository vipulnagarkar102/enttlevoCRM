import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import CustomCalendar from '../../components/AM_dashboard/CustomCalendar';
import SentimentAnalysis from '../../components/AM_dashboard/SentimentAnalysis';
import MRRTierSplit from '../../components/AM_dashboard/MRRTierSplit';
import MRROverview from '../../components/AM_dashboard/MRROverview';

const AMReports: React.FC = () => {
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

          {/* Reports Header & Controls */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
              <div className="text-left">
                <h1 className="text-[1.75rem] font-medium tracking-tight text-on-surface leading-tight font-headline uppercase">AM Reports</h1>
                <p className="text-on-surface-variant text-[0.9rem] mt-0.5 font-body">In-depth performance metrics and account health analytics</p>
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

          {/* Reports Content */}
          <div className="grid grid-cols-12 gap-5">
            {/* Top Row: Sentiment & Tier Split */}
            <div className="col-span-12 lg:col-span-7">
              <SentimentAnalysis />
            </div>
            <div className="col-span-12 lg:col-span-5">
              <MRRTierSplit />
            </div>

            {/* Bottom Row: MRR Overview */}
            <div className="col-span-12">
              <MRROverview />
            </div>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AMReports;
