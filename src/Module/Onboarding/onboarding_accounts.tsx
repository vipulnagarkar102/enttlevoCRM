import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import ColumnSettingsOverlay from '../../components/onboarding_dashboard/ColumnSettingsOverlay';
import ImportLeadsOverlay from '../../components/onboarding_dashboard/ImportAccountsOverlay';
import CreateLeadOverlay from '../../components/onboarding_dashboard/CreateAccountOverlay';
import AdvancedFiltersOverlay from '../../components/onboarding_dashboard/AdvancedFiltersOverlay';
import DeleteConfirmationModal from '../../components/onboarding_dashboard/DeleteConfirmationModal';
import AccountDetailsView from '../../components/onboarding_dashboard/AccountDetailsView';
import TableLoader from '../../components/TableLoader';

const OnboardingAccounts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [showImportOpen, setShowImportOpen] = useState(false);
  const [showAddLeadOpen, setShowAddLeadOpen] = useState(false);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<{ isOpen: boolean, leadId: number | null, leadName: string | undefined }>({ isOpen: false, leadId: null, leadName: undefined });
  const [toastMessage, setToastMessage] = useState<{ msg: string, type: 'success' | 'delete' | null }>({ msg: '', type: null });

  const confirmDelete = () => {
    if (deleteModalOpen.leadId !== null) {
      setLeadsData(leadsData.filter(l => l.id !== deleteModalOpen.leadId));
      setToastMessage({ msg: 'Account successfully deleted', type: 'delete' });
      setTimeout(() => setToastMessage({ msg: '', type: null }), 3000);
    }
    setDeleteModalOpen({ isOpen: false, leadId: null, leadName: undefined });
  };

  const [columns, setColumns] = useState([
    { id: '1', label: 'Company', key: 'company', visible: true },
    { id: '2', label: 'Support Email', key: 'supportEmail', visible: true },
    { id: '3', label: 'Contract Value', key: 'contractValue', visible: true },
    { id: '4', label: 'ARR', key: 'arr', visible: true },
    { id: '5', label: 'MRR', key: 'mrr', visible: true },
    { id: '6', label: 'Account Manager', key: 'accountManager', visible: true },
    { id: '7', label: 'Operations Manager', key: 'operationsManager', visible: true },
    { id: '8', label: 'Status', key: 'status', visible: true },
    { id: '9', label: 'Contract Type', key: 'contractType', visible: true },
    { id: '10', label: 'Timezone', key: 'timezone', visible: true },
  ]);

  const handleToggle = (id: string) => setColumns(prev => prev.map(col => col.id === id ? { ...col, visible: !col.visible } : col));
  const handleReset = () => setColumns(prev => prev.map(col => ({ ...col, visible: true })));
  const handleSave = () => setIsOverlayOpen(false);
  const isVisible = (key: string) => columns.find(c => c.key === key)?.visible;

  const [leadsData, setLeadsData] = useState([
    { id: 1, company: 'Mirrat', supportEmail: 'support@mirrat.com', contractValue: '$50,000', arr: '$12,000', mrr: '$1,000', accountManager: 'Vipul', operationsManager: 'Meghna', status: 'Active', contractType: 'Annual', timezone: 'IST', industry: 'IT' },
  ]);

  const filteredData = leadsData.filter(lead =>
    lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.accountManager.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.operationsManager.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const inlineDropdownMenu = "absolute top-full mt-1 left-0 min-w-full bg-surface-container-high border border-outline/10 shadow-lg rounded-sm py-1 z-50 animate-in fade-in duration-100";
  const inlineDropdownItem = "px-3 py-1.5 text-[0.75rem] font-medium text-on-surface hover:bg-primary-container/10 hover:text-primary-container cursor-pointer transition-colors";

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-container/30 overflow-x-hidden min-h-screen transition-colors duration-300">
      <Sidebar />
      <Topbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchPlaceholder="Filter accounts..." />

      <main className="main-content mt-10 flex flex-col bg-surface min-h-screen transition-colors duration-300">
        {selectedLeadId !== null ? (
          <div className="flex-1 w-full bg-surface flex flex-col">
            <AccountDetailsView
              accountId={selectedLeadId}
              accountName={leadsData.find(l => l.id === selectedLeadId)?.company}
              industry={leadsData.find(l => l.id === selectedLeadId)?.industry}
              onBack={() => setSelectedLeadId(null)}
            />
          </div>
        ) : (
          <div className="p-4 sm:p-6 lg:p-8 w-full space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-2">
              <div className="text-left">
                <h1 className="text-[1.75rem] font-medium tracking-tight text-on-surface leading-tight font-headline uppercase">All Accounts</h1>
                <p className="text-on-surface-variant text-[0.9rem] mt-0.5 font-body">Manage and track your onboarding accounts in one place</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setShowImportOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 border border-outline/10 bg-surface-container-low text-[0.75rem] font-bold text-on-surface-variant hover:bg-surface-container-high hover:text-primary-container transition-colors rounded-sm uppercase tracking-wider group shadow-sm"
                >
                  <span className="material-symbols-outlined !text-[16px]">download</span>
                  Import Accounts
                </button>
                <button
                  onClick={() => setShowAddLeadOpen(true)}
                  className="flex items-center gap-2 px-4 py-1.5 bg-primary-container text-white rounded-sm text-[0.8rem] font-semibold hover:bg-primary-container/90 transition-all group shadow-sm active:scale-95"
                >
                  <span className="material-symbols-outlined !text-[18px]">add</span>
                  Account
                </button>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {[
                { label: 'Total Accounts', value: '1', icon: 'trending_up', iconColor: 'text-primary' },
                { label: 'Total ARR', value: '$12k', icon: 'handshake', iconColor: 'text-tertiary' },
                { label: 'Active Accounts', value: '1', icon: 'schedule', iconColor: 'text-on-surface-variant' },
                { label: 'Onboarding', value: '0', icon: 'workspace_premium', iconColor: 'text-primary' },
              ].map(card => (
                <div key={card.label} className="col-span-1 p-5 bg-surface-container-low rounded-sm transition-colors hover:bg-surface-container-high border border-outline/5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[0.7rem] font-medium text-on-surface-variant uppercase tracking-widest">{card.label}</span>
                    <span className={`material-symbols-outlined text-sm ${card.iconColor}`}>{card.icon}</span>
                  </div>
                  <div className="text-2xl font-medium tracking-tight text-on-surface">{card.value}</div>
                </div>
              ))}
            </div>

            {/* Table Container */}
            <div className="bg-surface-container-low border border-outline/5 rounded-sm overflow-hidden shadow-sm flex flex-col relative mt-2">
              {/* Table toolbar */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-surface-container px-4 sm:px-6 py-3 sm:py-4 border-b border-outline/5">
                <h3 className="text-[0.75rem] font-bold text-on-surface-variant/60 uppercase tracking-widest">
                  Onboarding Accounts Pipeline
                </h3>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 !text-[18px] group-focus-within:text-primary-container transition-colors">search</span>
                    <input
                      type="text"
                      placeholder="Search accounts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-1.5 bg-surface-container-low border border-outline/10 rounded-sm text-[0.75rem] text-on-surface focus:outline-none focus:border-primary-container/50 focus:ring-1 focus:ring-primary-container/20 w-full sm:w-[240px] transition-all placeholder:text-on-surface-variant/30"
                    />
                  </div>
                  <button
                    onClick={() => setShowAdvancedFilter(true)}
                    className="flex items-center gap-2 px-3 py-1.5 border border-outline/10 text-[0.75rem] font-bold text-on-surface-variant hover:bg-surface-container-high hover:text-primary-container transition-colors rounded-sm uppercase tracking-wider group"
                  >
                    <span className="material-symbols-outlined !text-[16px]">filter_list</span>
                    Advanced Filters
                  </button>
                  <button
                    onClick={() => setIsOverlayOpen(true)}
                    className="flex items-center gap-2 px-3 py-1.5 border border-outline/10 text-[0.75rem] font-bold text-on-surface-variant hover:bg-surface-container-high hover:text-primary-container transition-colors rounded-sm uppercase tracking-wider group"
                  >
                    <span className="material-symbols-outlined !text-[16px] group-hover:rotate-180 transition-transform duration-500">settings</span>
                    Manage Columns
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto relative min-h-[200px]">
                <table className="w-full text-left border-collapse min-w-[1500px]">
                  <thead>
                    <tr className="bg-surface-container border-b border-outline/5">
                      {isVisible('company') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap sticky left-0 bg-surface-container z-20 shadow-[2px_0_5px_rgba(0,0,0,0.08)]">Company</th>}
                      {isVisible('supportEmail') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Support Email</th>}
                      {isVisible('contractValue') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Contract Value</th>}
                      {isVisible('arr') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">ARR</th>}
                      {isVisible('mrr') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">MRR</th>}
                      {isVisible('accountManager') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Account Manager</th>}
                      {isVisible('operationsManager') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Operations Manager</th>}
                      {isVisible('status') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Status</th>}
                      {isVisible('contractType') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Contract Type</th>}
                      {isVisible('timezone') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Timezone</th>}
                      <th className="sticky right-0 w-0 p-0 z-20"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline/5 whitespace-nowrap overflow-hidden">
                    {isLoading ? (
                      <TableLoader colSpan={columns.length} />
                    ) : filteredData.length > 0 ? (
                      filteredData.map((lead) => (
                        <tr key={lead.id} className="transition-all cursor-pointer group h-[52px]">
                          {isVisible('company') && (
                            <td className="px-6 py-0 sticky left-0 bg-surface-container-low group-hover:bg-primary-container/[0.08] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.06)] transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-sm bg-tertiary/10 flex items-center justify-center text-tertiary font-bold text-[0.65rem] uppercase">
                                  {lead.company.charAt(0)}
                                </div>
                                <span
                                  className="text-[0.85rem] font-semibold text-tertiary hover:underline cursor-pointer"
                                  onClick={() => setSelectedLeadId(lead.id)}
                                >
                                  {lead.company}
                                </span>
                              </div>
                            </td>
                          )}
                          {isVisible('supportEmail') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.8rem] text-on-surface font-medium">{lead.supportEmail}</span></td>}
                          {isVisible('contractValue') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.8rem] text-emerald-500 font-bold">{lead.contractValue}</span></td>}
                          {isVisible('arr') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.8rem] text-emerald-500 font-bold">{lead.arr}</span></td>}
                          {isVisible('mrr') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.8rem] text-emerald-500 font-bold">{lead.mrr}</span></td>}
                          {isVisible('accountManager') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.8rem] text-on-surface font-medium">{lead.accountManager}</span></td>}
                          {isVisible('operationsManager') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.8rem] text-on-surface font-medium">{lead.operationsManager}</span></td>}

                          {/* Status inline dropdown */}
                          {isVisible('status') && (
                            <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0">
                              <div className="relative inline-block w-[110px]">
                                <div onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === `status_${lead.id}` ? null : `status_${lead.id}`); }} className={`flex items-center justify-between text-center px-2 py-1 rounded-sm text-[0.65rem] font-bold border cursor-pointer group transition-colors ${lead.status === 'New' ? 'bg-tertiary/10 text-tertiary border-tertiary/20' :
                                  lead.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                    'bg-secondary/10 text-secondary border-secondary/20'
                                  }`}>
                                  <span className="flex-1 text-center">{lead.status}</span>
                                  <span className="material-symbols-outlined !text-[14px] opacity-60">expand_more</span>
                                </div>
                                {openDropdown === `status_${lead.id}` && (
                                  <>
                                    <div className="fixed inset-0 z-40" onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }} />
                                    <div className={inlineDropdownMenu + " text-left"}>
                                      {['New', 'Active', 'Delayed', 'On Hold'].map(opt => (
                                        <div key={opt} onClick={(e) => { e.stopPropagation(); setLeadsData(leadsData.map(l => l.id === lead.id ? { ...l, status: opt } : l)); setOpenDropdown(null); }} className={inlineDropdownItem}>{opt}</div>
                                      ))}
                                    </div>
                                  </>
                                )}
                              </div>
                            </td>
                          )}

                          {isVisible('contractType') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.8rem] text-on-surface font-medium">{lead.contractType}</span></td>}
                          {isVisible('timezone') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.75rem] text-on-surface-variant/80">{lead.timezone}</span></td>}

                          {/* Sticky Delete Button Removed */}
                          <td className="sticky right-0 w-0 p-0 overflow-visible z-30 pointer-events-none"></td>
                        </tr>
                      ))
                    ) : (
                      <tr className="h-[200px]">
                        <td colSpan={10} className="px-6 py-0 text-center">
                          <div className="flex flex-col items-center justify-center gap-2 opacity-40 text-on-surface">
                            <span className="material-symbols-outlined !text-[48px]">search_off</span>
                            <span className="text-[0.85rem] font-medium tracking-wide">No results found for "{searchQuery}"</span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 bg-surface-container border-t border-outline/5 flex justify-between items-center">
                <span className="text-[0.75rem] text-on-surface-variant font-medium">
                  Showing {filteredData.length > 0 ? 1 : 0} to {filteredData.length} of {leadsData.length} accounts
                </span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border border-outline/10 text-[0.75rem] bg-surface-container-low text-on-surface rounded-sm font-semibold opacity-50 cursor-not-allowed">Previous</button>
                  <button className="px-3 py-1 text-[0.75rem] rounded-sm font-bold shadow-sm bg-primary-container text-white">1</button>
                  <button className="px-3 py-1 border border-outline/10 text-[0.75rem] bg-surface-container-low text-on-surface rounded-sm font-semibold opacity-50 cursor-not-allowed">Next</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Overlays */}
      <ColumnSettingsOverlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} columns={columns} onToggle={handleToggle} onReset={handleReset} onSave={handleSave} />
      <ImportLeadsOverlay isOpen={showImportOpen} onClose={() => setShowImportOpen(false)} />
      <CreateLeadOverlay isOpen={showAddLeadOpen} onClose={() => setShowAddLeadOpen(false)} />
      <AdvancedFiltersOverlay isOpen={showAdvancedFilter} onClose={() => setShowAdvancedFilter(false)} />
      <DeleteConfirmationModal isOpen={deleteModalOpen.isOpen} onClose={() => setDeleteModalOpen({ isOpen: false, leadId: null, leadName: undefined })} onConfirm={confirmDelete} accountName={deleteModalOpen.leadName} />

      {/* Toast */}
      {toastMessage.type && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-md shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-8 fade-in duration-300">
          <span className={`material-symbols-outlined !text-[20px] ${toastMessage.type === 'delete' ? 'text-error' : 'text-emerald-400'}`}>
            {toastMessage.type === 'delete' ? 'delete' : 'check_circle'}
          </span>
          <span className="text-[0.85rem] font-medium tracking-wide">{toastMessage.msg}</span>
        </div>
      )}
    </div>
  );
};

export default OnboardingAccounts;
