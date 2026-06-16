import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import CustomCalendar from '../../components/AM_dashboard/CustomCalendar';
import TableLoader from '../../components/TableLoader';
import AccountDetailsView from '../../components/AM_dashboard/AccountDetailsView';
import { useTheme } from '../../context/ThemeContext';

const AMPayment: React.FC = () => {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [viewTab, setViewTab] = useState<'Estimates' | 'Invoices' | 'Payments'>('Estimates');
  const [paymentSubTab, setPaymentSubTab] = useState<'Monthly' | 'Annual'>('Monthly');
  const [selectedAccount, setSelectedAccount] = useState<{ id: number; name: string } | null>(null);

  // Date Controls
  const [startDate, setStartDate] = useState('2025-12-24');
  const [endDate, setEndDate] = useState('2026-03-24');
  const [showCal1, setShowCal1] = useState(false);
  const [showCal2, setShowCal2] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [viewTab, paymentSubTab]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setIsLoading(false);
    }, 1000);
  };

  // Dummy Data for Payments/Invoices/Estimates/Renewals
  const commonData = [
    {
      id: 1,
      company: 'Mirrat',
      contact: 'Meghna',
      amount: '$12,000',
      status: 'Paid',
      date: '24 Mar 2026',
      dueDate: '10 Apr 2026',
      expiryDate: '15 Apr 2026',
      contractStart: '01 Jan 2026',
      contractRenewal: '31 Dec 2026',
      contractValue: '$144,000',
      type: 'Invoice',
      number: 'INV-2026-001',
      estStatus: 'Pending',
      invStatus: 'Paid'
    },
    {
      id: 2,
      company: 'Zapp.Org',
      contact: 'Ritesh',
      amount: '$25,000',
      status: 'Pending',
      date: '20 Mar 2026',
      dueDate: '05 Apr 2026',
      expiryDate: '10 Apr 2026',
      contractStart: '15 Feb 2026',
      contractRenewal: '14 Feb 2027',
      contractValue: '$300,000',
      type: 'Invoice',
      number: 'INV-2026-002',
      estStatus: 'Close',
      invStatus: 'Unpaid'
    },
    {
      id: 3,
      company: 'Smartlearn',
      contact: 'Amar',
      amount: '$8,000',
      status: 'Overdue',
      date: '15 Mar 2026',
      dueDate: '30 Mar 2026',
      expiryDate: '05 Apr 2026',
      contractStart: '10 Mar 2026',
      contractRenewal: '09 Mar 2027',
      contractValue: '$96,000',
      type: 'Invoice',
      number: 'INV-2026-003',
      estStatus: 'Pending',
      invStatus: 'Unpaid'
    },
    {
      id: 4,
      company: 'Google Cloud',
      contact: 'Ravish',
      amount: '$50,000',
      status: 'Paid',
      date: '10 Mar 2026',
      dueDate: '25 Mar 2026',
      expiryDate: '01 Apr 2026',
      contractStart: '01 May 2025',
      contractRenewal: '30 Apr 2026',
      contractValue: '$600,000',
      type: 'Payment',
      number: 'INV-2026-004',
      estStatus: 'Close',
      invStatus: 'Paid'
    },
  ];

  const filteredData = commonData.filter(item =>
    item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-container/30 overflow-x-hidden min-h-screen">
      <Sidebar />
      <Topbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchPlaceholder="Search payments..." />

      <main className="main-content mt-10 flex flex-col bg-surface min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 w-full space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-2">
            <div className="text-left">
              <h1 className="text-[1.75rem] font-medium tracking-tight text-on-surface leading-tight font-headline uppercase">Payment Management</h1>
              <p className="text-on-surface-variant text-[0.9rem] mt-0.5 font-body">Track and Manage Account Payments & Billing</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center border-b border-outline-variant/30 gap-4">
              <div className="flex gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
                {[
                  { id: 'Estimates', label: 'Estimates', icon: 'description' },
                  { id: 'Invoices', label: 'Invoices', icon: 'receipt_long' },
                  { id: 'Payments', label: 'Payments', icon: 'payments' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setViewTab(tab.id as any)}
                    className={`flex items-center gap-2 pb-2 text-[0.9rem] font-medium transition-all relative whitespace-nowrap ${viewTab === tab.id ? 'text-primary-container' : 'text-on-surface-variant hover:text-on-surface'}`}
                  >
                    <span className="material-symbols-outlined !text-[18px]">{tab.icon}</span>
                    {tab.label}
                    {viewTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-container"></div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pb-2">
                <div className="relative group mr-2">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 !text-[18px] group-focus-within:text-primary-container transition-colors">search</span>
                  <input
                    type="text"
                    placeholder={`Search ${viewTab.toLowerCase()}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-1.5 bg-surface-container border border-outline/10 rounded-sm text-[0.75rem] text-on-surface focus:outline-none focus:border-primary-container/50 focus:ring-1 focus:ring-primary-container/20 w-full sm:w-[200px] transition-all placeholder:text-on-surface-variant/30"
                  />
                </div>

                <div className="relative">
                  <div
                    onClick={() => { setShowCal1(!showCal1); setShowCal2(false); }}
                    className="flex items-center gap-3 bg-surface-container-low border border-outline/10 rounded-sm px-3 py-1.5 cursor-pointer hover:bg-surface-container-high transition-colors group"
                  >
                    <span className="material-symbols-outlined !text-[16px] text-on-surface-variant group-hover:text-primary-container">calendar_month</span>
                    <span className="text-[0.75rem] text-on-surface font-semibold uppercase tracking-wider">{new Date(startDate).toLocaleDateString()}</span>
                    <span className="material-symbols-outlined !text-[14px] text-on-surface-variant">expand_more</span>
                  </div>
                  {showCal1 && <CustomCalendar selectedDate={startDate} onSelect={setStartDate} onClose={() => setShowCal1(false)} />}
                </div>

                <div className="relative">
                  <div
                    onClick={() => { setShowCal2(!showCal2); setShowCal1(false); }}
                    className="flex items-center gap-3 bg-surface-container-low border border-outline/10 rounded-sm px-3 py-1.5 cursor-pointer hover:bg-surface-container-high transition-colors group"
                  >
                    <span className="material-symbols-outlined !text-[16px] text-on-surface-variant group-hover:text-primary-container">calendar_month</span>
                    <span className="text-[0.75rem] text-on-surface font-semibold uppercase tracking-wider">{new Date(endDate).toLocaleDateString()}</span>
                    <span className="material-symbols-outlined !text-[14px] text-on-surface-variant">expand_more</span>
                  </div>
                  {showCal2 && <CustomCalendar selectedDate={endDate} onSelect={setEndDate} onClose={() => setShowCal2(false)} />}
                </div>

                <button
                  onClick={handleRefresh}
                  className={`flex items-center gap-2 px-3 py-1.5 bg-primary-container text-white rounded-sm text-[0.75rem] font-bold uppercase tracking-wider hover:bg-primary-container/90 transition-all group shadow-sm active:scale-95 ${isRefreshing ? 'opacity-80 pointer-events-none' : ''}`}
                >
                  <span className={`material-symbols-outlined !text-[16px] transition-transform duration-500 ${isRefreshing ? 'animate-spin' : 'group-active:rotate-180'}`}>refresh</span>
                  {isRefreshing ? 'Refreshing' : 'Refresh'}
                </button>
              </div>
            </div>

            {/* Sub-tabs for Payments */}
            {viewTab === 'Payments' && (
              <div className="flex gap-2 sm:gap-4 p-1 bg-surface-container-low rounded-sm border border-outline/5 w-full sm:w-fit overflow-x-auto no-scrollbar">
                {[
                  { id: 'Monthly', label: 'Monthly Payment' },
                  { id: 'Annual', label: 'Annual Renewal' }
                ].map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setPaymentSubTab(sub.id as any)}
                    className={`px-3 sm:px-4 py-1.5 text-[0.75rem] font-bold uppercase tracking-wider rounded-sm transition-all whitespace-nowrap ${paymentSubTab === sub.id
                        ? 'bg-primary-container text-white shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-surface-container-low border border-outline/5 rounded-sm overflow-hidden shadow-sm flex flex-col relative mt-2">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-surface-container px-4 sm:px-6 py-3 sm:py-4 border-b border-outline/5 gap-2">
              <h3 className="text-[0.75rem] font-bold text-on-surface-variant/60 uppercase tracking-widest">
                {viewTab === 'Payments' ? `${paymentSubTab} Ledger` : `All ${viewTab} Ledger`}
              </h3>
            </div>

            <div className="overflow-x-auto relative min-h-[400px] custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-surface-container border-b border-outline/5">
                    {viewTab === 'Payments' ? (
                      <>
                        <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap sticky left-0 bg-surface-container z-20">SrNo</th>
                        <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Account Name</th>
                        {paymentSubTab === 'Monthly' ? (
                          <>
                            <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Payment Status</th>
                            <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Due Date</th>
                          </>
                        ) : (
                          <>
                            <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Contract Start Date</th>
                            <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Contract Renewal Date</th>
                            <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Contract Value</th>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap sticky left-0 bg-surface-container z-20">
                          {viewTab === 'Estimates' ? 'Estimate ID' : 'Invoice ID'}
                        </th>
                        <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Customer Name</th>
                        <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Amount</th>
                        <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">
                          {viewTab === 'Invoices' ? 'Invoice Date' : 'Date'}
                        </th>
                        <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">
                          {viewTab === 'Estimates' ? 'Expiration Date' : 'Due Date'}
                        </th>
                        <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Status</th>
                      </>
                    )}
                    <th className="sticky right-0 w-0 p-0 z-20"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline/5 whitespace-nowrap">
                  {isLoading ? (
                    <TableLoader colSpan={viewTab === 'Payments' ? (paymentSubTab === 'Monthly' ? 5 : 6) : 7} />
                  ) : filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr 
                        key={item.id} 
                        className="transition-all cursor-pointer group h-[52px] hover:bg-primary-container/[0.04]"
                        onClick={() => setSelectedAccount({ id: item.id, name: item.company })}
                      >
                        {viewTab === 'Payments' ? (
                          <>
                            <td className="px-6 py-0 sticky left-0 bg-surface-container-low group-hover:bg-surface-container-high transition-colors z-10">
                              <span className="text-[0.8rem] font-medium text-on-surface-variant">{index + 1}</span>
                            </td>
                            <td className="px-6 py-0">
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-sm bg-tertiary/10 flex items-center justify-center text-tertiary font-bold text-[0.65rem] uppercase">
                                  {item.company.charAt(0)}
                                </div>
                                <span 
                                  className="text-[0.85rem] font-semibold text-[#006495] hover:underline cursor-pointer"
                                  onClick={(e) => { e.stopPropagation(); setSelectedAccount({ id: item.id, name: item.company }); }}
                                >
                                  {item.company}
                                </span>
                              </div>
                            </td>
                            {paymentSubTab === 'Monthly' ? (
                              <>
                                <td className="px-6 py-0 text-[0.85rem]">
                                  <div className={`inline-block px-3 py-1 rounded-sm text-[0.65rem] font-bold border ${item.invStatus === 'Paid' ? (isDark ? 'bg-emerald-900/40 text-emerald-300 border-emerald-800' : 'bg-emerald-50 text-emerald-700 border-emerald-100') :
                                      (isDark ? 'bg-error/10 text-error border-error/20' : 'bg-red-50 text-error border-red-100')
                                    }`}>
                                    {item.invStatus}
                                  </div>
                                </td>
                                <td className="px-6 py-0 text-[0.8rem] text-on-surface-variant/80 font-medium">{item.dueDate}</td>
                              </>
                            ) : (
                              <>
                                <td className="px-6 py-0 text-[0.8rem] text-on-surface-variant/80 font-medium">{item.contractStart}</td>
                                <td className="px-6 py-0 text-[0.8rem] text-on-surface-variant/80 font-medium">{item.contractRenewal}</td>
                                <td className="px-6 py-0 text-[0.85rem] font-bold text-emerald-600">{item.contractValue}</td>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <td className="px-6 py-0 sticky left-0 bg-surface-container-low group-hover:bg-surface-container-high transition-colors z-10">
                              <span className="text-[0.8rem] font-medium text-on-surface-variant">{item.number}</span>
                            </td>
                            <td className="px-6 py-0">
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-sm bg-tertiary/10 flex items-center justify-center text-tertiary font-bold text-[0.65rem] uppercase">
                                  {item.company.charAt(0)}
                                </div>
                                <span 
                                  className="text-[0.85rem] font-semibold text-[#006495] hover:underline cursor-pointer"
                                  onClick={(e) => { e.stopPropagation(); setSelectedAccount({ id: item.id, name: item.company }); }}
                                >
                                  {item.company}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-0 text-[0.85rem] font-bold text-emerald-600">{item.amount}</td>
                            <td className="px-6 py-0 text-[0.8rem] text-on-surface-variant/80 font-medium">{item.date}</td>
                            <td className="px-6 py-0 text-[0.8rem] text-on-surface-variant/80 font-medium">
                              {viewTab === 'Estimates' ? item.expiryDate : item.dueDate}
                            </td>
                            <td className="px-6 py-0">
                              {viewTab === 'Estimates' ? (
                                <div className={`inline-block px-3 py-1 rounded-sm text-[0.65rem] font-bold border ${item.estStatus === 'Close' ? (isDark ? 'bg-emerald-900/40 text-emerald-300 border-emerald-800' : 'bg-emerald-50 text-emerald-700 border-emerald-100') :
                                    (isDark ? 'bg-amber-900/40 text-amber-300 border-amber-800' : 'bg-amber-50 text-amber-700 border-amber-100')
                                  }`}>
                                  {item.estStatus}
                                </div>
                              ) : (
                                <div className={`inline-block px-3 py-1 rounded-sm text-[0.65rem] font-bold border ${item.invStatus === 'Paid' ? (isDark ? 'bg-emerald-900/40 text-emerald-300 border-emerald-800' : 'bg-emerald-50 text-emerald-700 border-emerald-100') :
                                    (isDark ? 'bg-error/10 text-error border-error/20' : 'bg-red-50 text-error border-red-100')
                                  }`}>
                                  {item.invStatus}
                                </div>
                              )}
                            </td>
                          </>
                        )}
                        <td className="sticky right-0 w-0 p-0"></td>
                      </tr>
                    ))
                  ) : (
                    <tr className="h-[200px]">
                      <td colSpan={7} className="px-6 py-0 text-center">
                        <div className="flex flex-col items-center justify-center gap-2 opacity-40">
                          <span className="material-symbols-outlined !text-[48px]">search_off</span>
                          <span className="text-[0.85rem] font-medium tracking-wide">No results found</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-surface-container border-t border-outline/5 flex justify-between items-center">
              <span className="text-[0.75rem] text-on-surface-variant font-medium">
                Showing {filteredData.length} entries
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-outline/10 text-[0.75rem] bg-surface-container-low text-on-surface-variant rounded-sm font-semibold opacity-50 cursor-not-allowed">
                  Previous
                </button>
                <button className="px-3 py-1 text-[0.75rem] rounded-sm font-bold shadow-sm bg-primary-container text-white">
                  1
                </button>
                <button className="px-3 py-1 border border-outline/10 text-[0.75rem] bg-surface-container-low text-on-surface-variant rounded-sm font-semibold opacity-50 cursor-not-allowed">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Account Details View Overlay */}
      {selectedAccount && (
        <div className="fixed inset-0 z-[200] bg-surface animate-in fade-in duration-300">
          <AccountDetailsView
            accountId={selectedAccount.id}
            accountName={selectedAccount.name}
            onBack={() => setSelectedAccount(null)}
          />
        </div>
      )}
    </div>
  );
};

export default AMPayment;
