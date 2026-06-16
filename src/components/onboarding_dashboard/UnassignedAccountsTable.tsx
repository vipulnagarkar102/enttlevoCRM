import React, { useState } from 'react';
import ColumnSettingsOverlay from './ColumnSettingsOverlay';
import AssignAccountModal from './AssignAccountModal';

const UnassignedAccountsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [assignModalOpen, setAssignModalOpen] = useState<{ isOpen: boolean; leadId: number | null }>({ isOpen: false, leadId: null });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const itemsPerPage = 5;

  const [columns, setColumns] = useState([
    { id: '1', label: 'Account Name', key: 'account_name', visible: true },
    { id: '2', label: 'Support Email', key: 'support_email', visible: true },
    { id: '3', label: 'Website', key: 'website', visible: true },
    { id: '4', label: 'LinkedIn', key: 'linkedin', visible: true },
    { id: '5', label: 'Status', key: 'status', visible: true },
    { id: '6', label: 'Contract Type', key: 'contract_type', visible: true },
    { id: '7', label: 'Contract Value', key: 'contract_value', visible: true },
    { id: '8', label: 'Duration (months)', key: 'duration_months', visible: true },
    { id: '9', label: 'ARR', key: 'arr', visible: true },
    { id: '10', label: 'MRR', key: 'mrr', visible: true },
    { id: '11', label: 'Balance', key: 'balance', visible: true },
    { id: '12', label: 'Account Manager', key: 'account_manager', visible: true },
    { id: '13', label: 'Onboarding Manager', key: 'onboarding_manager', visible: true },
    { id: '14', label: 'Timezone', key: 'timezone', visible: true },
    { id: '15', label: 'Previous Platform', key: 'previous_platform', visible: true },
    { id: '16', label: 'Accounting Software', key: 'accounting_software', visible: true },
  ]);

  const handleToggle = (id: string) =>
    setColumns(prev => prev.map(col => col.id === id ? { ...col, visible: !col.visible } : col));
  const handleReset = () => setColumns(prev => prev.map(col => ({ ...col, visible: true })));
  const handleSave = () => setIsOverlayOpen(false);
  const handleAssign = (assignee: string | 'me') => {
    setAssignModalOpen({ isOpen: false, leadId: null });
    const msg = assignee === 'me'
      ? 'Account successfully assigned to you!'
      : `Account successfully assigned to ${assignee}!`;
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const unassignedData = [
    {
      id: 1,
      account_name: 'Mirrat',
      support_email: 'support@mirrat.com',
      website: 'mirrat.com',
      linkedin: 'linkedin.com/company/mirrat',
      status: 'New',
      contract_type: 'Annual',
      contract_value: '$24,000',
      duration_months: 12,
      arr: '$24,000',
      mrr: '$2,000',
      balance: '$4,000',
      account_manager: 'Riya Mehta',
      onboarding_manager: 'Unassigned',
      timezone: 'IST (UTC+5:30)',
      previous_platform: 'HubSpot',
      accounting_software: 'Tally',
    },
    {
      id: 2,
      account_name: 'TechVault',
      support_email: 'help@techvault.io',
      website: 'techvault.io',
      linkedin: 'linkedin.com/company/techvault',
      status: 'Active',
      contract_type: 'Monthly',
      contract_value: '$6,000',
      duration_months: 6,
      arr: '$12,000',
      mrr: '$1,000',
      balance: '$1,500',
      account_manager: 'Sameer Joshi',
      onboarding_manager: 'Unassigned',
      timezone: 'EST (UTC-5)',
      previous_platform: 'Salesforce',
      accounting_software: 'QuickBooks',
    },
    {
      id: 3,
      account_name: 'NovaBrands',
      support_email: 'care@novabrands.co',
      website: 'novabrands.co',
      linkedin: 'linkedin.com/company/novabrands',
      status: 'Pending',
      contract_type: 'Quarterly',
      contract_value: '$9,000',
      duration_months: 9,
      arr: '$18,000',
      mrr: '$1,500',
      balance: '$3,000',
      account_manager: 'Kavita Singh',
      onboarding_manager: 'Unassigned',
      timezone: 'GMT (UTC+0)',
      previous_platform: 'Zoho CRM',
      accounting_software: 'Xero',
    },
    {
      id: 4,
      account_name: 'GreenLeaf Analytics',
      support_email: 'support@greenleaf.io',
      website: 'greenleaf.io',
      linkedin: 'linkedin.com/company/greenleaf-analytics',
      status: 'New',
      contract_type: 'Annual',
      contract_value: '$36,000',
      duration_months: 12,
      arr: '$36,000',
      mrr: '$3,000',
      balance: '$6,000',
      account_manager: 'Anjali Rao',
      onboarding_manager: 'Unassigned',
      timezone: 'SGT (UTC+8)',
      previous_platform: 'Pipedrive',
      accounting_software: 'MYOB',
    },
    {
      id: 5,
      account_name: 'CloudNest',
      support_email: 'ops@cloudnest.net',
      website: 'cloudnest.net',
      linkedin: 'linkedin.com/company/cloudnest',
      status: 'Active',
      contract_type: 'Biannual',
      contract_value: '$15,000',
      duration_months: 6,
      arr: '$30,000',
      mrr: '$2,500',
      balance: '$2,000',
      account_manager: 'Nikhil Verma',
      onboarding_manager: 'Unassigned',
      timezone: 'AEST (UTC+10)',
      previous_platform: 'Monday.com',
      accounting_software: 'FreshBooks',
    },
  ];

  const filteredData = unassignedData.filter(lead =>
    lead.account_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.support_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.account_manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.onboarding_manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.previous_platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const isVisible = (key: string) => columns.find(c => c.key === key)?.visible;

  const statusStyle = (s: string) => {
    if (s === 'Active') return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    if (s === 'New') return 'bg-tertiary/10 text-tertiary border-tertiary/20';
    if (s === 'Pending') return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    return 'bg-on-surface/5 text-on-surface-variant border-outline/10';
  };

  const thCls = 'px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap';

  return (
    <div className="bg-surface-container-low border border-outline/5 rounded-sm overflow-hidden shadow-sm flex flex-col relative transition-colors duration-300">

      {/* Table Header */}
      <div className="flex justify-between items-center bg-surface-container px-6 py-4 border-b border-outline/5">
        <h3 className="text-[0.75rem] font-bold text-on-surface-variant/60 uppercase tracking-widest">
          Unassigned Onboarding Pipeline
        </h3>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 !text-[18px] group-focus-within:text-primary-container transition-colors">
              search
            </span>
            <input
              type="text"
              placeholder="Search accounts..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="pl-10 pr-4 py-1.5 bg-surface-container-low border border-outline/10 rounded-sm text-[0.75rem] text-on-surface focus:outline-none focus:border-primary-container/50 focus:ring-1 focus:ring-primary-container/20 w-[240px] transition-all placeholder:text-on-surface-variant/30"
            />
          </div>
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
      <div className="overflow-x-auto relative min-h-[300px]">
        <table className="w-full text-left border-collapse min-w-[2400px]">
          <thead>
            <tr className="bg-surface-container border-b border-outline/5">
              {isVisible('account_name') && <th className={`${thCls} sticky left-0 bg-surface-container z-20 shadow-[2px_0_5px_rgba(0,0,0,0.08)]`}>Account Name</th>}
              {isVisible('support_email') && <th className={thCls}>Support Email</th>}
              {isVisible('website') && <th className={thCls}>Website</th>}
              {isVisible('linkedin') && <th className={thCls}>LinkedIn</th>}
              {isVisible('status') && <th className={thCls}>Status</th>}
              {isVisible('contract_type') && <th className={thCls}>Contract Type</th>}
              {isVisible('contract_value') && <th className={thCls}>Contract Value</th>}
              {isVisible('duration_months') && <th className={thCls}>Duration (months)</th>}
              {isVisible('arr') && <th className={thCls}>ARR</th>}
              {isVisible('mrr') && <th className={thCls}>MRR</th>}
              {isVisible('balance') && <th className={thCls}>Balance</th>}
              {isVisible('account_manager') && <th className={thCls}>Account Manager</th>}
              {isVisible('onboarding_manager') && <th className={thCls}>Onboarding Manager</th>}
              {isVisible('timezone') && <th className={thCls}>Timezone</th>}
              {isVisible('previous_platform') && <th className={thCls}>Previous Platform</th>}
              {isVisible('accounting_software') && <th className={thCls}>Accounting Software</th>}
              <th className="sticky right-0 w-0 p-0 z-20" />
            </tr>
          </thead>
          <tbody className="divide-y divide-outline/5 whitespace-nowrap overflow-hidden">
            {currentData.length === 0 ? (
              <tr className="h-[200px]">
                <td colSpan={columns.filter(c => c.visible).length + 1} className="px-6 py-0 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 opacity-40 text-on-surface">
                    <span className="material-symbols-outlined !text-[48px]">search_off</span>
                    <span className="text-[0.85rem] font-medium tracking-wide">No results found for "{searchQuery}"</span>
                  </div>
                </td>
              </tr>
            ) : (
              currentData.map((lead) => (
                <tr key={lead.id} className="transition-all cursor-pointer group h-[52px]">

                  {/* Account Name — sticky */}
                  {isVisible('account_name') && (
                    <td className="px-6 py-0 sticky left-0 bg-surface-container-low group-hover:bg-primary-container/[0.08] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.06)] transition-colors">
                      <span className="text-[0.85rem] font-semibold text-on-surface">{lead.account_name}</span>
                    </td>
                  )}

                  {isVisible('support_email') && (
                    <td className="px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors">
                      <span className="text-[0.8rem] text-tertiary hover:underline font-medium">{lead.support_email}</span>
                    </td>
                  )}

                  {isVisible('website') && (
                    <td className="px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors">
                      <span className="text-[0.8rem] text-tertiary hover:underline">{lead.website}</span>
                    </td>
                  )}

                  {isVisible('linkedin') && (
                    <td className="px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors">
                      <span className="text-[0.75rem] text-on-surface-variant/80">{lead.linkedin}</span>
                    </td>
                  )}

                  {isVisible('status') && (
                    <td className="px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors">
                      <span className={`inline-block text-center w-[90px] px-2 py-1 rounded-sm text-[0.65rem] font-bold border ${statusStyle(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                  )}

                  {isVisible('contract_type') && (
                    <td className="px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors">
                      <span className="text-[0.8rem] text-on-surface font-medium">{lead.contract_type}</span>
                    </td>
                  )}

                  {isVisible('contract_value') && (
                    <td className="px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors">
                      <span className="text-[0.8rem] text-emerald-500 font-bold">{lead.contract_value}</span>
                    </td>
                  )}

                  {isVisible('duration_months') && (
                    <td className="px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors">
                      <span className="text-[0.8rem] text-on-surface font-medium">{lead.duration_months} mo</span>
                    </td>
                  )}

                  {isVisible('arr') && (
                    <td className="px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors">
                      <span className="text-[0.8rem] text-emerald-500 font-bold">{lead.arr}</span>
                    </td>
                  )}

                  {isVisible('mrr') && (
                    <td className="px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors">
                      <span className="text-[0.8rem] text-emerald-500 font-bold">{lead.mrr}</span>
                    </td>
                  )}

                  {isVisible('balance') && (
                    <td className="px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors">
                      <span className="text-[0.8rem] text-amber-500 font-bold">{lead.balance}</span>
                    </td>
                  )}

                  {isVisible('account_manager') && (
                    <td className="px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors">
                      <span className="text-[0.8rem] text-on-surface font-medium">{lead.account_manager}</span>
                    </td>
                  )}

                  {isVisible('onboarding_manager') && (
                    <td className="px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors">
                      <span className={`text-[0.8rem] font-medium ${lead.onboarding_manager === 'Unassigned' ? 'text-on-surface-variant/40 italic' : 'text-on-surface'}`}>
                        {lead.onboarding_manager}
                      </span>
                    </td>
                  )}

                  {isVisible('timezone') && (
                    <td className="px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors">
                      <span className="text-[0.75rem] text-on-surface-variant/80">{lead.timezone}</span>
                    </td>
                  )}

                  {isVisible('previous_platform') && (
                    <td className="px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors">
                      <span className="text-[0.8rem] text-on-surface-variant font-medium">{lead.previous_platform}</span>
                    </td>
                  )}

                  {isVisible('accounting_software') && (
                    <td className="px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors">
                      <span className="text-[0.8rem] text-on-surface-variant font-medium">{lead.accounting_software}</span>
                    </td>
                  )}

                  {/* Floating assign button */}
                  <td className="sticky right-0 w-0 p-0 overflow-visible z-30 pointer-events-none">
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                      <button
                        onClick={() => setAssignModalOpen({ isOpen: true, leadId: lead.id })}
                        className="flex items-center gap-2 px-4 py-1.5 bg-primary-container text-white rounded-sm text-[0.8rem] font-semibold hover:bg-primary-container/90 transition-all shadow-sm active:scale-95 whitespace-nowrap"
                      >
                        <span className="material-symbols-outlined !text-[18px]">person_add</span>
                        Assign Owner
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 bg-surface-container border-t border-outline/5 flex justify-between items-center">
        <span className="text-[0.75rem] text-on-surface-variant font-medium">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} accounts
        </span>
        <div className="flex gap-2 text-on-surface">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-outline/10 text-[0.75rem] bg-surface-container-low rounded-sm font-semibold transition-all text-on-surface ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surface-container-high'}`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 text-[0.75rem] rounded-sm font-bold shadow-sm transition-all ${currentPage === num ? 'bg-primary-container text-white' : 'bg-surface-container-low border border-outline/10 text-on-surface hover:bg-surface-container-high'}`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border border-outline/10 text-[0.75rem] bg-surface-container-low rounded-sm font-semibold transition-all text-on-surface ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surface-container-high'}`}
          >
            Next
          </button>
        </div>
      </div>

      <ColumnSettingsOverlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        columns={columns}
        onToggle={handleToggle}
        onReset={handleReset}
        onSave={handleSave}
      />
      <AssignAccountModal
        isOpen={assignModalOpen.isOpen}
        onClose={() => setAssignModalOpen({ isOpen: false, leadId: null })}
        onAssign={handleAssign}
      />

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-md shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-8 fade-in duration-300">
          <span className="material-symbols-outlined text-emerald-400 !text-[20px]">check_circle</span>
          <span className="text-[0.85rem] font-medium tracking-wide">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default UnassignedAccountsTable;
