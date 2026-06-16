import React, { useState } from 'react';
import ColumnSettingsOverlay from './ColumnSettingsOverlay';
import AssignAccountModal from './AssignAccountModal';
import AccountDetailsView from './AccountDetailsView';

const UnassignedAccountsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [assignModalOpen, setAssignModalOpen] = useState<{ isOpen: boolean; leadId: number | null }>({ isOpen: false, leadId: null });
  const [selectedAccount, setSelectedAccount] = useState<{ id: number; name: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const itemsPerPage = 5;

  const [columns, setColumns] = useState([
    { id: '1', label: 'Account Name', key: 'account_name', visible: true },
    { id: '2', label: 'Support Email', key: 'support_email', visible: true },
    { id: '3', label: 'Address', key: 'address', visible: true },
    { id: '4', label: 'City', key: 'city', visible: true },
    { id: '5', label: 'State', key: 'state', visible: true },
    { id: '6', label: 'Country', key: 'country', visible: true },
    { id: '7', label: 'OBM ID', key: 'obm_id', visible: true },
    { id: '8', label: 'Website', key: 'website', visible: true },
    { id: '9', label: 'LinkedIn', key: 'linkedin', visible: true },
    { id: '10', label: 'Go Live Date', key: 'go_live_date', visible: true },
    { id: '11', label: 'Handoff Date', key: 'handoff_date', visible: true },
    { id: '12', label: 'Transfer Date', key: 'transfer_date', visible: true },
    { id: '13', label: 'Contract Start', key: 'contract_start', visible: true },
    { id: '14', label: 'Contract End', key: 'contract_end', visible: true },
    { id: '15', label: 'Balance', key: 'balance', visible: true },
    { id: '16', label: 'Contract Value', key: 'contract_value', visible: true },
    { id: '17', label: 'ARR', key: 'arr', visible: true },
    { id: '18', label: 'Duration (months)', key: 'duration_months', visible: true },
    { id: '19', label: 'MRR', key: 'mrr', visible: true },
    { id: '20', label: 'Account Manager', key: 'account_manager', visible: true },
    { id: '21', label: 'Is Unassigned', key: 'is_unassigned', visible: true },
    { id: '22', label: 'Onboarding Manager', key: 'onboarding_manager', visible: true },
    { id: '23', label: 'Status', key: 'status', visible: true },
    { id: '24', label: 'Contract Type', key: 'contract_type', visible: true },
    { id: '25', label: 'Previous Platform', key: 'previous_platform', visible: true },
    { id: '26', label: 'Timezone', key: 'timezone', visible: true },
    { id: '27', label: 'Accounting Software', key: 'accounting_software', visible: true },
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
      address: '123 Tech Park',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      obm_id: 'OBM-7701',
      website: 'mirrat.com',
      linkedin: 'linkedin.com/company/mirrat',
      go_live_date: '2024-01-15',
      handoff_date: '2024-01-10',
      transfer_date: '2024-01-12',
      contract_start: '2024-01-01',
      contract_end: '2024-12-31',
      balance: '$4,000',
      contract_value: '$24,000',
      arr: '$24,000',
      duration_months: 12,
      mrr: '$2,000',
      account_manager: 'Riya Mehta',
      is_unassigned: 'No',
      onboarding_manager: 'Sameer Joshi',
      status: 'Active',
      contract_type: 'Annual',
      previous_platform: 'HubSpot',
      timezone: 'IST (UTC+5:30)',
      accounting_software: 'Tally',
    },
    {
      id: 2,
      account_name: 'TechVault',
      support_email: 'help@techvault.io',
      address: '45 Silicon Valley',
      city: 'San Francisco',
      state: 'California',
      country: 'USA',
      obm_id: 'OBM-8802',
      website: 'techvault.io',
      linkedin: 'linkedin.com/company/techvault',
      go_live_date: '2024-02-20',
      handoff_date: '2024-02-15',
      transfer_date: '2024-02-18',
      contract_start: '2024-02-01',
      contract_end: '2024-08-01',
      balance: '$1,500',
      contract_value: '$6,000',
      arr: '$12,000',
      duration_months: 6,
      mrr: '$1,000',
      account_manager: 'Sameer Joshi',
      is_unassigned: 'No',
      onboarding_manager: 'Rahul V.',
      status: 'Active',
      contract_type: 'Monthly',
      previous_platform: 'Salesforce',
      timezone: 'EST (UTC-5)',
      accounting_software: 'QuickBooks',
    },
    {
      id: 3,
      account_name: 'NovaBrands',
      support_email: 'care@novabrands.co',
      address: '78 London Bridge',
      city: 'London',
      state: 'Greater London',
      country: 'UK',
      obm_id: 'OBM-9903',
      website: 'novabrands.co',
      linkedin: 'linkedin.com/company/novabrands',
      go_live_date: '2024-03-10',
      handoff_date: '2024-03-05',
      transfer_date: '2024-03-08',
      contract_start: '2024-03-01',
      contract_end: '2024-12-01',
      balance: '$3,000',
      contract_value: '$9,000',
      arr: '$18,000',
      duration_months: 9,
      mrr: '$1,500',
      account_manager: 'Kavita Singh',
      is_unassigned: 'Yes',
      onboarding_manager: 'Unassigned',
      status: 'Pending',
      contract_type: 'Quarterly',
      previous_platform: 'Zoho CRM',
      timezone: 'GMT (UTC+0)',
      accounting_software: 'Xero',
    },
    {
      id: 4,
      account_name: 'GreenLeaf Analytics',
      support_email: 'support@greenleaf.io',
      address: '12 Green Park',
      city: 'Sydney',
      state: 'NSW',
      country: 'Australia',
      obm_id: 'OBM-1104',
      website: 'greenleaf.io',
      linkedin: 'linkedin.com/company/greenleaf-analytics',
      go_live_date: '2024-04-05',
      handoff_date: '2024-04-01',
      transfer_date: '2024-04-03',
      contract_start: '2024-04-01',
      contract_end: '2025-03-31',
      balance: '$6,000',
      contract_value: '$36,000',
      arr: '$36,000',
      duration_months: 12,
      mrr: '$3,000',
      account_manager: 'Anjali Rao',
      is_unassigned: 'No',
      onboarding_manager: 'Priya S.',
      status: 'New',
      contract_type: 'Annual',
      previous_platform: 'Pipedrive',
      timezone: 'SGT (UTC+8)',
      accounting_software: 'MYOB',
    },
    {
      id: 5,
      account_name: 'CloudNest',
      support_email: 'ops@cloudnest.net',
      address: '900 Metro Blvd',
      city: 'Toronto',
      state: 'Ontario',
      country: 'Canada',
      obm_id: 'OBM-2205',
      website: 'cloudnest.net',
      linkedin: 'linkedin.com/company/cloudnest',
      go_live_date: '2024-05-12',
      handoff_date: '2024-05-08',
      transfer_date: '2024-05-10',
      contract_start: '2024-05-01',
      contract_end: '2024-11-01',
      balance: '$2,000',
      contract_value: '$15,000',
      arr: '$30,000',
      duration_months: 6,
      mrr: '$2,500',
      account_manager: 'Nikhil Verma',
      is_unassigned: 'No',
      onboarding_manager: 'Vikram K.',
      status: 'Active',
      contract_type: 'Biannual',
      previous_platform: 'Monday.com',
      timezone: 'AEST (UTC+10)',
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
  // Common cell classes for consistency
  const tdCls = 'px-6 py-0 bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors';

  return (
    <>
      <div className="bg-surface-container-low border border-outline/5 rounded-sm overflow-hidden shadow-sm flex flex-col relative transition-colors duration-300">

        {/* Table Header */}
        <div className="flex justify-between items-center bg-surface-container px-6 py-4 border-b border-outline/5">
          <h3 className="text-[0.75rem] font-bold text-on-surface-variant/60 uppercase tracking-widest">
            Unassigned Account Pipeline
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
          <table className="w-full text-left border-collapse min-w-[3800px]">
            <thead>
              <tr className="bg-surface-container border-b border-outline/5">
                {isVisible('account_name') && <th className={`${thCls} sticky left-0 bg-surface-container z-20 shadow-[2px_0_5_rgba(0,0,0,0.08)]`}>Account Name</th>}
                {isVisible('support_email') && <th className={thCls}>Support Email</th>}
                {isVisible('address') && <th className={thCls}>Address</th>}
                {isVisible('city') && <th className={thCls}>City</th>}
                {isVisible('state') && <th className={thCls}>State</th>}
                {isVisible('country') && <th className={thCls}>Country</th>}
                {isVisible('obm_id') && <th className={thCls}>OBM ID</th>}
                {isVisible('website') && <th className={thCls}>Website</th>}
                {isVisible('linkedin') && <th className={thCls}>LinkedIn</th>}
                {isVisible('go_live_date') && <th className={thCls}>Go Live Date</th>}
                {isVisible('handoff_date') && <th className={thCls}>Handoff Date</th>}
                {isVisible('transfer_date') && <th className={thCls}>Transfer Date</th>}
                {isVisible('contract_start') && <th className={thCls}>Contract Start</th>}
                {isVisible('contract_end') && <th className={thCls}>Contract End</th>}
                {isVisible('balance') && <th className={thCls}>Balance</th>}
                {isVisible('contract_value') && <th className={thCls}>Contract Value</th>}
                {isVisible('arr') && <th className={thCls}>ARR</th>}
                {isVisible('duration_months') && <th className={thCls}>Duration (months)</th>}
                {isVisible('mrr') && <th className={thCls}>MRR</th>}
                {isVisible('account_manager') && <th className={thCls}>Account Manager</th>}
                {isVisible('is_unassigned') && <th className={thCls}>Is Unassigned</th>}
                {isVisible('onboarding_manager') && <th className={thCls}>Onboarding Manager</th>}
                {isVisible('status') && <th className={thCls}>Status</th>}
                {isVisible('contract_type') && <th className={thCls}>Contract Type</th>}
                {isVisible('previous_platform') && <th className={thCls}>Previous Platform</th>}
                {isVisible('timezone') && <th className={thCls}>Timezone</th>}
                {isVisible('accounting_software') && <th className={thCls}>Accounting Software</th>}
                <th className="sticky right-0 w-0 p-0 z-20" />
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/5 whitespace-nowrap overflow-hidden text-on-surface">
              {currentData.length === 0 ? (
                <tr className="h-[200px]">
                  <td colSpan={columns.filter(c => c.visible).length + 1} className="px-6 py-0 text-center text-on-surface">
                    <div className="flex flex-col items-center justify-center gap-2 opacity-40 text-on-surface">
                      <span className="material-symbols-outlined !text-[48px]">search_off</span>
                      <span className="text-[0.85rem] font-medium tracking-wide">No results found for "{searchQuery}"</span>
                    </div>
                  </td>
                </tr>
              ) : (
                currentData.map((lead) => (
                  <tr
                    key={lead.id}
                    className="transition-all cursor-pointer group h-[52px]"
                    onClick={() => setSelectedAccount({ id: lead.id, name: lead.account_name })}
                  >

                    {/* Account Name — sticky */}
                    {isVisible('account_name') && (
                      <td className="px-6 py-0 sticky left-0 bg-surface-container-low group-hover:bg-primary-container/[0.08] z-10 shadow-[2px_0_5_rgba(0,0,0,0.06)] transition-colors text-on-surface">
                        <span 
                          className="text-[0.85rem] font-semibold text-on-surface hover:underline cursor-pointer"
                          onClick={(e) => { e.stopPropagation(); setSelectedAccount({ id: lead.id, name: lead.account_name }); }}
                        >
                          {lead.account_name}
                        </span>
                      </td>
                    )}

                    {isVisible('support_email') && (
                      <td className={tdCls}>
                        <span className="text-[0.8rem] text-tertiary hover:underline font-medium">{lead.support_email}</span>
                      </td>
                    )}

                    {isVisible('address') && (
                      <td className={tdCls}>
                        <span className="text-[0.8rem] text-on-surface-variant line-clamp-1">{lead.address}</span>
                      </td>
                    )}

                    {isVisible('city') && (
                      <td className={tdCls}>
                        <span className="text-[0.8rem] text-on-surface-variant">{lead.city}</span>
                      </td>
                    )}

                    {isVisible('state') && (
                      <td className={tdCls}>
                        <span className="text-[0.8rem] text-on-surface-variant">{lead.state}</span>
                      </td>
                    )}

                    {isVisible('country') && (
                      <td className={tdCls}>
                        <span className="text-[0.8rem] text-on-surface font-medium">{lead.country}</span>
                      </td>
                    )}

                    {isVisible('obm_id') && (
                      <td className={tdCls}>
                        <span className="text-[0.8rem] text-on-surface-variant font-medium">{lead.obm_id}</span>
                      </td>
                    )}

                    {isVisible('website') && (
                      <td className={tdCls}>
                        <span className="text-[0.8rem] text-tertiary hover:underline">{lead.website}</span>
                      </td>
                    )}

                    {isVisible('linkedin') && (
                      <td className={tdCls}>
                        <span className="text-[0.75rem] text-on-surface-variant/80">{lead.linkedin}</span>
                      </td>
                    )}

                    {isVisible('go_live_date') && (
                      <td className={tdCls}>
                        <span className="text-[0.8rem] text-on-surface-variant">{lead.go_live_date}</span>
                      </td>
                    )}

                    {isVisible('handoff_date') && (
                      <td className={tdCls}>
                        <span className="text-[0.8rem] text-on-surface-variant">{lead.handoff_date}</span>
                      </td>
                    )}

                    {isVisible('transfer_date') && (
                      <td className={tdCls}>
                        <span className="text-[0.8rem] text-on-surface-variant">{lead.transfer_date}</span>
                      </td>
                    )}

                    {isVisible('contract_start') && (
                      <td className={tdCls}>
                        <span className="text-[0.8rem] text-on-surface-variant">{lead.contract_start}</span>
                      </td>
                    )}

                    {isVisible('contract_end') && (
                      <td className={tdCls}>
                        <span className="text-[0.8rem] text-on-surface-variant">{lead.contract_end}</span>
                      </td>
                    )}

                    {isVisible('balance') && (
                      <td className={tdCls}>
                        <span className="text-[0.8rem] text-amber-500 font-bold">{lead.balance}</span>
                      </td>
                    )}

                    {isVisible('contract_value') && (
                      <td className={tdCls}>
                        <span className="text-[0.8rem] text-emerald-500 font-bold">{lead.contract_value}</span>
                      </td>
                    )}

                    {isVisible('arr') && (
                      <td className={tdCls}>
                        <span className="text-[0.8rem] text-emerald-500 font-bold">{lead.arr}</span>
                      </td>
                    )}

                    {isVisible('duration_months') && (
                      <td className={tdCls}>
                        <span className="text-[0.8rem] text-on-surface font-medium">{lead.duration_months} mo</span>
                      </td>
                    )}

                    {isVisible('mrr') && (
                      <td className={tdCls}>
                        <span className="text-[0.8rem] text-emerald-500 font-bold">{lead.mrr}</span>
                      </td>
                    )}

                    {isVisible('account_manager') && (
                      <td className={tdCls}>
                        <span className="text-[0.8rem] text-on-surface font-medium">{lead.account_manager}</span>
                      </td>
                    )}

                    {isVisible('is_unassigned') && (
                      <td className={tdCls}>
                        <span className={`text-[0.8rem] font-medium ${lead.is_unassigned === 'Yes' ? 'text-amber-500' : 'text-on-surface'}`}>{lead.is_unassigned}</span>
                      </td>
                    )}

                    {isVisible('onboarding_manager') && (
                      <td className={tdCls}>
                        <span className={`text-[0.8rem] font-medium ${lead.onboarding_manager === 'Unassigned' ? 'text-on-surface-variant/40 italic' : 'text-on-surface'}`}>
                          {lead.onboarding_manager}
                        </span>
                      </td>
                    )}

                    {isVisible('status') && (
                      <td className={tdCls}>
                        <span className={`inline-block text-center w-[90px] px-2 py-1 rounded-sm text-[0.65rem] font-bold border ${statusStyle(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                    )}

                    {isVisible('contract_type') && (
                      <td className={tdCls}>
                        <span className="text-[0.8rem] text-on-surface font-medium">{lead.contract_type}</span>
                      </td>
                    )}

                    {isVisible('previous_platform') && (
                      <td className={tdCls}>
                        <span className="text-[0.8rem] text-on-surface-variant font-medium">{lead.previous_platform}</span>
                      </td>
                    )}

                    {isVisible('timezone') && (
                      <td className={tdCls}>
                        <span className="text-[0.75rem] text-on-surface-variant/80">{lead.timezone}</span>
                      </td>
                    )}

                    {isVisible('accounting_software') && (
                      <td className={tdCls}>
                        <span className="text-[0.8rem] text-on-surface-variant font-medium">{lead.accounting_software}</span>
                      </td>
                    )}

                    {/* Floating assign button */}
                    <td className="sticky right-0 w-0 p-0 overflow-visible z-30 pointer-events-none">
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                        <button
                          onClick={(e) => { e.stopPropagation(); setAssignModalOpen({ isOpen: true, leadId: lead.id }); }}
                          className="flex items-center gap-2 px-4 py-1.5 bg-primary-container text-white rounded-sm text-[0.8rem] font-semibold hover:bg-primary-container/90 transition-all shadow-sm active:scale-95 whitespace-nowrap pointer-events-auto"
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

        {/* Pagination */}<div className="p-4 bg-surface-container border-t border-outline/5 flex justify-between items-center text-on-surface">
          <span className="text-[0.75rem] text-on-surface-variant font-medium">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} accounts
          </span>
          <div className="flex gap-2">
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
    </>
  );
};

export default UnassignedAccountsTable;
