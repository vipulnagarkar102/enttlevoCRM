import React, { useState } from 'react';
import ColumnSettingsOverlay from './ColumnSettingsOverlay';
import AssignLeadModal from './AssignLeadModal';

const UnassignedLeadsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [assignModalOpen, setAssignModalOpen] = useState<{isOpen: boolean, leadId: number | null}>({isOpen: false, leadId: null});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const itemsPerPage = 5;

  const [columns, setColumns] = useState([
    { id: '1', label: 'Account Name', key: 'account_name', visible: true },
    { id: '2', label: 'Contact Name', key: 'contact_name', visible: true },
    { id: '3', label: 'Email', key: 'email', visible: true },
    { id: '4', label: 'Industry', key: 'industry', visible: true },
    { id: '5', label: 'Product', key: 'product_name', visible: true },
    { id: '6', label: 'Status', key: 'account_status_id', visible: true },
    { id: '7', label: 'Label', key: 'label', visible: true },
    { id: '8', label: 'Lead Source', key: 'lead_source', visible: true },
    { id: '9', label: 'Created At', key: 'created_at', visible: true },
    { id: '10', label: 'Updated At', key: 'updated_at', visible: true },
    { id: '11', label: 'Address', key: 'address', visible: true },
    { id: '12', label: 'City', key: 'city', visible: true },
    { id: '13', label: 'State', key: 'state', visible: true },
    { id: '14', label: 'Country', key: 'country', visible: true },
    { id: '15', label: 'Postal Code', key: 'postal', visible: true },
    { id: '16', label: 'Company Size', key: 'size', visible: true },
    { id: '17', label: 'Annual Revenue', key: 'revenue', visible: true },
    { id: '18', label: 'Website', key: 'website', visible: true },
    { id: '19', label: 'Description', key: 'description', visible: true },
  ]);

  const handleToggle = (id: string) => setColumns(prev => prev.map(col => col.id === id ? { ...col, visible: !col.visible } : col));
  const handleReset = () => setColumns(prev => prev.map(col => ({ ...col, visible: true })));
  const handleSave = () => setIsOverlayOpen(false);
  const handleAssign = (assignee: string | 'me') => {
    setAssignModalOpen({isOpen: false, leadId: null});
    const msg = assignee === 'me' ? 'Lead successfully assigned to you!' : `Lead successfully assigned to ${assignee}!`;
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const unassignedData = [
    { id: 1, account: 'Mirrat', contact: 'Meghna', email: 'meghna@mirrat.com', industry: 'IT', product: 'enttevo', status: 'Touchbase', label: 'Hot', created: '01-12-2024', updated: '03-01-2025', address: 'Dehu road pune', city: 'Pune', state: 'Maharashtra', country: 'India', postal: '411033', size: '50-100', revenue: '$2M', website: 'mirrar.com', description: 'Interested in CRM expansion' },
    { id: 2, account: 'Zapp.Org', contact: 'Ritesh', email: 'ritesh@zapp.org', industry: 'IT', product: 'enttevo', status: 'Open', label: 'Hot', created: '01-12-2024', updated: '03-01-2025', address: '', city: 'Pune', state: 'MH', country: 'IN', postal: '', size: '500+', revenue: '$10M', website: 'zoop.one', description: 'Product upgrade request' },
    { id: 3, account: 'Smartlearn', contact: 'Amar', email: 'amar@smartlearn.com', industry: 'IT', product: 'i-managem', status: 'Won', label: 'Hot', created: '01-12-2024', updated: '03-01-2025', address: '', city: '', state: '', country: '', postal: '', size: '10-50', revenue: '$500k', website: 'smartserv.com', description: 'New site installation' },
    { id: 4, account: 'rheo', contact: 'rishi', email: 'rishi@enttevo.com', industry: 'Software', product: 'enttevo', status: 'Won', label: 'Hot', created: '01-12-2024', updated: '03-01-2025', address: '', city: '', state: '', country: '', postal: '', size: '1-10', revenue: '$100k', website: 'rheo.io', description: 'Initial contact via web' },
    { id: 5, account: 'Nexus Dynamics', contact: 'Priya', email: 'priya@nexus.io', industry: 'Tech', product: 'enttevo', status: 'Qualified', label: 'Warm', created: '05-12-2024', updated: '04-01-2025', address: 'Industrial Area', city: 'Mumbai', state: 'Maharashtra', country: 'India', postal: '400001', size: '200+', revenue: '$5M', website: 'nexus.io', description: 'Enterprise solution inquiry' },
    { id: 6, account: 'CloudSphere', contact: 'Rahul', email: 'rahul@cloud.co', industry: 'Software', product: 'enttevo', status: 'Open', label: 'Hot', created: '06-12-2024', updated: '05-01-2025', address: 'Baner', city: 'Pune', state: 'MH', country: 'India', postal: '411045', size: '50-200', revenue: '$3M', website: 'clouds.io', description: 'Migrating from legacy CRM' },
    { id: 7, account: 'Innotech', contact: 'Sanjay', email: 'sanjay@innotech.com', industry: 'IT', product: 'i-managem', status: 'Touchbase', label: 'Warm', created: '07-12-2024', updated: '06-01-2025', address: '', city: 'Bangalore', state: 'KA', country: 'India', postal: '560001', size: '100+', revenue: '$8M', website: 'innotech.com', description: 'Interested in AI modules' },
    { id: 8, account: 'TechFlow', contact: 'Anjali', email: 'anjali@tflow.io', industry: 'Software', product: 'enttevo', status: 'Qualified', label: 'Hot', created: '08-12-2024', updated: '07-01-2025', address: 'Hi-tech City', city: 'Hyderabad', state: 'TS', country: 'India', postal: '500081', size: '20-50', revenue: '$1.5M', website: 'techflow.io', description: 'Lead assignment automation' },
  ];

  const filteredData = unassignedData.filter(lead =>
    lead.account.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const isVisible = (key: string) => columns.find(c => c.key === key)?.visible;

  return (
    <div className="bg-surface-container-low border border-outline/5 rounded-sm overflow-hidden shadow-sm flex flex-col relative transition-colors duration-300">
      {/* Table Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-surface-container px-4 sm:px-6 py-3 sm:py-4 border-b border-outline/5">
        <h3 className="text-[0.75rem] font-bold text-on-surface-variant/60 uppercase tracking-widest">
          Unassigned Opportunity Pipeline
        </h3>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 !text-[18px] group-focus-within:text-primary-container transition-colors">search</span>
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="pl-10 pr-4 py-1.5 bg-surface-container-low border border-outline/10 rounded-sm text-[0.75rem] text-on-surface focus:outline-none focus:border-primary-container/50 focus:ring-1 focus:ring-primary-container/20 w-full sm:w-[240px] transition-all placeholder:text-on-surface-variant/30"
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
        <table className="w-full text-left border-collapse min-w-[2000px]">
          <thead>
            <tr className="bg-surface-container border-b border-outline/5">
              {isVisible('account_name') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap sticky left-0 bg-surface-container z-20 shadow-[2px_0_5px_rgba(0,0,0,0.08)]">Account Name</th>}
              {isVisible('contact_name') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Contact Name</th>}
              {isVisible('email') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Email</th>}
              {isVisible('industry') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Industry</th>}
              {isVisible('product_name') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Product</th>}
              {isVisible('account_status_id') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Status</th>}
              {isVisible('label') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Label</th>}
              {isVisible('lead_source') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Lead Source</th>}
              {isVisible('created_at') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Created At</th>}
              {isVisible('updated_at') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Updated At</th>}
              {isVisible('address') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Address</th>}
              {isVisible('city') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">City</th>}
              {isVisible('state') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">State</th>}
              {isVisible('country') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Country</th>}
              {isVisible('postal') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Postal Code</th>}
              {isVisible('size') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Company Size</th>}
              {isVisible('revenue') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Annual Revenue</th>}
              {isVisible('website') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Website</th>}
              {isVisible('description') && <th className="px-6 py-4 text-[0.7rem] font-bold text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">Description</th>}
              <th className="sticky right-0 w-0 p-0 z-20"></th>
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
                  {isVisible('account_name') && (
                    <td className="px-6 py-0 sticky left-0 bg-surface-container-low group-hover:bg-primary-container/[0.08] z-10 shadow-[2px_0_5px_rgba(0,0,0,0.06)] transition-colors">
                      <span className="text-[0.85rem] font-semibold text-on-surface">{lead.account}</span>
                    </td>
                  )}
                  {isVisible('contact_name') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.85rem] font-medium text-on-surface-variant">{lead.contact}</span></td>}
                  {isVisible('email') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.8rem] text-tertiary hover:underline font-medium">{lead.email}</span></td>}
                  {isVisible('industry') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.8rem] text-on-surface-variant/80 font-medium uppercase tracking-tight">{lead.industry}</span></td>}
                  {isVisible('product_name') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.8rem] text-on-surface font-semibold">{lead.product}</span></td>}
                  {isVisible('account_status_id') && (
                    <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0">
                      <span className={`inline-block text-center w-[110px] px-2 py-1 rounded-sm text-[0.65rem] font-bold border ${
                        lead.status === 'Won' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                        lead.status === 'Touchbase' ? 'bg-tertiary/10 text-tertiary border-tertiary/20' :
                        'bg-on-surface/5 text-on-surface-variant border-outline/10'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                  )}
                  {isVisible('label') && (
                    <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${lead.label === 'Hot' ? 'bg-red-500' : 'bg-orange-400'}`}></div>
                        <span className="text-[0.75rem] text-on-surface font-medium">{lead.label}</span>
                      </div>
                    </td>
                  )}
                  {isVisible('lead_source') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.75rem] text-on-surface-variant font-medium">self</span></td>}
                  {isVisible('created_at') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.75rem] text-on-surface-variant/60 font-medium">{lead.created}</span></td>}
                  {isVisible('updated_at') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.75rem] text-on-surface-variant/60 font-medium">{lead.updated}</span></td>}
                  {isVisible('address') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.8rem] text-on-surface-variant/70 italic">{lead.address || '-'}</span></td>}
                  {isVisible('city') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.8rem] text-on-surface-variant/70">{lead.city || '-'}</span></td>}
                  {isVisible('state') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.8rem] text-on-surface-variant/70">{lead.state || '-'}</span></td>}
                  {isVisible('country') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.8rem] text-on-surface-variant/70">{lead.country || '-'}</span></td>}
                  {isVisible('postal') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.8rem] text-on-surface-variant/70">{lead.postal || '-'}</span></td>}
                  {isVisible('size') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.8rem] text-on-surface font-medium">{lead.size || '-'}</span></td>}
                  {isVisible('revenue') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.8rem] text-emerald-500 font-bold">{lead.revenue || '-'}</span></td>}
                  {isVisible('website') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.8rem] text-tertiary hover:underline">{lead.website || '-'}</span></td>}
                  {isVisible('description') && <td className="bg-surface-container-low group-hover:bg-primary-container/[0.06] transition-colors px-6 py-0"><span className="text-[0.8rem] text-on-surface-variant/60 line-clamp-1 max-w-[200px]">{lead.description || '-'}</span></td>}
                  <td className="sticky right-0 w-0 p-0 overflow-visible z-30 pointer-events-none">
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                      <button
                        onClick={() => setAssignModalOpen({isOpen: true, leadId: lead.id})}
                        className="flex items-center gap-2 px-4 py-1.5 bg-primary-container text-white rounded-sm text-[0.8rem] font-semibold hover:bg-primary-container/90 transition-all shadow-sm active:scale-95 whitespace-nowrap"
                      >
                        <span className="material-symbols-outlined !text-[18px]">person_add</span>
                        Assign Lead
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
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} leads
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
      <AssignLeadModal
        isOpen={assignModalOpen.isOpen}
        onClose={() => setAssignModalOpen({isOpen: false, leadId: null})}
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

export default UnassignedLeadsTable;


