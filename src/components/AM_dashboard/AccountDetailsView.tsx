import React, { useState, useEffect } from 'react';
import EmailTabContent from './EmailTabContent';
import NotesTabContent from './NotesTabContent';
import TasksTabContent from './TasksTabContent';
import DocumentsTabContent from './DocumentsTabContent';
import HistoryTabContent from './HistoryTabContent';
import SentimentTabContent from './SentimentTabContent';
import ProductServiceTabContent from './ProductServiceTabContent';
import { useTheme } from '../../context/ThemeContext';

const CustomDropdown = ({
  initialValue,
  options,
  isEditing,
  className = ''
}: {
  initialValue: string;
  options: string[];
  isEditing: boolean;
  bgType?: 'slate' | 'white';
  className?: string;
}) => {
  const [value, setValue] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isEditing) setIsOpen(false);
  }, [isEditing]);

  const readOnlyClasses = "bg-surface-container border-outline/15 text-on-surface-variant";

  if (!isEditing) {
    return (
      <input
        readOnly
        value={value}
        className={`w-full py-1.5 border rounded-sm text-[0.85rem] focus:outline-none transition-all ${readOnlyClasses} ${className}`}
      />
    );
  }

  return (
    <div className="relative w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 w-full py-1.5 border border-primary-container/50 shadow-sm ring-1 ring-primary-container/20 bg-surface-container rounded-sm cursor-pointer transition-colors justify-between group ${className}`}
      >
        <span className="text-[0.85rem] text-on-surface truncate">{value || 'Select...'}</span>
        <span className="material-symbols-outlined !text-[16px] text-on-surface-variant group-hover:text-primary-container">expand_more</span>
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[100]" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full mt-1 left-0 w-full min-w-[120px] bg-surface-container-high border border-outline/10 shadow-lg rounded-sm py-1 z-[110] animate-in fade-in slide-in-from-top-1 duration-200 max-h-48 overflow-y-auto custom-scrollbar">
            {options.map((opt) => (
              <div
                key={opt}
                onClick={() => {
                  setValue(opt);
                  setIsOpen(false);
                }}
                className="px-3 py-1.5 text-[0.8rem] font-medium text-on-surface hover:bg-primary-container/10 hover:text-primary-container cursor-pointer transition-colors break-words"
              >
                {opt}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

interface AccountDetailsViewProps {
  accountId: number | string;
  accountName?: string;
  industry?: string;
  onBack: () => void;
}

const AccountDetailsView: React.FC<AccountDetailsViewProps> = ({ accountName = 'Reliance', industry, onBack }) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('Sentiment');
  const [isEditing, setIsEditing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const labelCls = "text-[0.65rem] font-bold text-on-surface-variant/40 uppercase tracking-widest mb-1";
  const inputCls = (isEdit: boolean) => `w-full px-3 py-1.5 border rounded-sm text-[0.85rem] transition-all focus:outline-none ${isEdit ? 'bg-surface-container border-primary-container shadow-sm ring-1 ring-primary-container/20 text-on-surface' : 'bg-surface-container-low border-outline/5 text-on-surface-variant'}`;

  const [openSections, setOpenSections] = useState({
    company: true,
    contact: true,
    deal: true
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = ['Sentiment', 'Email', 'Notes', 'Tasks', 'Documents', 'Product & Service', 'History'];

  const headerBgClass = isDark ? 'bg-[#1A171F]' : 'bg-[#1A171F]';
  const headerHoverClass = isDark ? 'hover:bg-[#2A272F]' : 'hover:bg-[#2A272F]';

  return (
    <div className="flex flex-col bg-surface flex-1 h-[calc(100vh-40px)] overflow-hidden animate-in fade-in duration-300">
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-surface-container-low px-4 sm:px-8 py-5 border-b border-outline/10 shadow-sm flex-shrink-0 fixed top-10 right-0 z-30 transition-all duration-300 ease-in-out"
        style={{ left: 'var(--sidebar-width)' }}
      >
        <div className="flex items-center gap-6">
          <button
            onClick={onBack}
            className="flex items-center justify-center p-2 text-on-surface-variant hover:text-primary-container hover:bg-primary-container/10 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined !text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-[1.5rem] font-bold text-on-surface tracking-tight leading-tight flex items-center gap-3">
              {accountName}
              {industry && (
                <span className="px-2 py-0.5 bg-surface-container text-on-surface text-[0.7rem] uppercase tracking-widest font-bold border border-outline/10 rounded-sm">
                  {industry}
                </span>
              )}
            </h1>
            <p className="text-[0.85rem] text-on-surface-variant/80 mt-1">AM Account Details & Management</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-1.5 border border-outline/10 rounded-sm bg-surface-container-low text-[0.8rem] font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors shadow-sm tracking-wider uppercase active:scale-95"
              >
                <span className="material-symbols-outlined !text-[16px]">close</span>
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setToastMessage('Account details updated successfully!');
                  setTimeout(() => setToastMessage(null), 3500);
                }}
                className="flex items-center gap-2 px-4 py-1.5 bg-primary-container border border-primary-container text-white rounded-sm text-[0.8rem] font-bold hover:bg-primary-container/90 transition-colors shadow-sm tracking-wider uppercase active:scale-95"
              >
                <span className="material-symbols-outlined !text-[16px]">save</span>
                Save
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-1.5 border border-outline/10 rounded-sm bg-surface-container-low text-[0.8rem] font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors shadow-sm tracking-wider uppercase"
              >
                <span className="material-symbols-outlined !text-[16px]">edit</span>
                Edit
              </button>
              <button className="flex items-center gap-2 px-4 py-1.5 bg-red-500 border border-red-600 text-white rounded-sm text-[0.8rem] font-bold hover:bg-red-600 transition-colors shadow-sm tracking-wider uppercase active:scale-95">
                <span className="material-symbols-outlined !text-[16px]">delete</span>
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-6 px-4 sm:px-8 pt-[220px] sm:pt-48 lg:pt-32 pb-4 lg:pb-0 flex-1 overflow-y-auto lg:overflow-hidden relative z-10">

        {/* Left Column - Accordions */}
        <div className="w-full lg:w-[340px] lg:flex-shrink-0 flex flex-col gap-4 h-auto lg:h-full overflow-visible lg:overflow-y-auto pb-4 pr-1 scrollbar-hide">
          {/* Company Details */}
          <div className="bg-surface-container-low border border-outline/10 rounded-sm shadow-sm flex flex-col transition-all">
            <div onClick={() => toggleSection('company')} className={`${headerBgClass} text-white p-3 px-4 flex justify-between items-center rounded-t-sm cursor-pointer ${headerHoverClass} transition-colors`}>
              <h2 className="flex items-center gap-2 text-[0.9rem] font-bold tracking-wide">
                <span className="material-symbols-outlined !text-[18px]">domain</span>
                Company Info
              </h2>
              <span className={`material-symbols-outlined !text-[20px] transition-transform duration-300 ${!openSections.company ? 'rotate-180' : ''}`}>expand_less</span>
            </div>
            {openSections.company && (
              <div className="p-5 space-y-4">
                <div className="flex flex-col"><label className={labelCls}>Company Name</label><input readOnly={!isEditing} defaultValue={accountName} className={inputCls(isEditing)} /></div>
                <div className="flex flex-col"><label className={labelCls}>Email</label><input readOnly={!isEditing} defaultValue="support@reliance.com" className={inputCls(isEditing)} /></div>
                <div className="flex flex-col"><label className={labelCls}>Address</label><textarea readOnly={!isEditing} defaultValue="123 Corporate Way, Mumbai" className={`${inputCls(isEditing)} h-16 resize-none`} /></div>
                <div className="flex flex-col"><label className={labelCls}>LinkedIn</label><input readOnly={!isEditing} defaultValue="linkedin.com/company/reliance" className={inputCls(isEditing)} /></div>
                <div className="flex flex-col"><label className={labelCls}>Website</label><input readOnly={!isEditing} defaultValue="www.reliance.com" className={inputCls(isEditing)} /></div>
              </div>
            )}
          </div>

          {/* Contact Details */}
          <div className="bg-surface-container-low border border-outline/10 rounded-sm shadow-sm flex flex-col transition-all">
            <div onClick={() => toggleSection('contact' as any)} className={`${headerBgClass} text-white p-3 px-4 flex justify-between items-center rounded-t-sm cursor-pointer ${headerHoverClass} transition-colors`}>
              <h2 className="flex items-center gap-2 text-[0.9rem] font-bold tracking-wide">
                <span className="material-symbols-outlined !text-[18px]">contact_page</span>
                Contact Details
              </h2>
              <span className={`material-symbols-outlined !text-[20px] transition-transform duration-300 ${!openSections.contact ? 'rotate-180' : ''}`}>expand_less</span>
            </div>
            {openSections.contact && (
              <div className="p-5 space-y-4">
                <div className="flex flex-col"><label className={labelCls}>Name</label><input readOnly={!isEditing} defaultValue="Tenali Rama" className={inputCls(isEditing)} /></div>
                <div className="flex flex-col"><label className={labelCls}>Email</label><input readOnly={!isEditing} defaultValue="tenali@reliance.com" className={inputCls(isEditing)} /></div>
                <div className="flex flex-col"><label className={labelCls}>Phone</label><input readOnly={!isEditing} defaultValue="+91 98765 43210" className={inputCls(isEditing)} /></div>
                <div className="flex flex-col"><label className={labelCls}>LinkedIn</label><input readOnly={!isEditing} defaultValue="linkedin.com/in/tenalirama" className={inputCls(isEditing)} /></div>
              </div>
            )}
          </div>

          {/* Deal Information */}
          <div className="bg-surface-container-low border border-outline/10 rounded-sm shadow-sm flex flex-col transition-all">
            <div onClick={() => toggleSection('deal' as any)} className={`${headerBgClass} text-white p-3 px-4 flex justify-between items-center rounded-t-sm cursor-pointer ${headerHoverClass} transition-colors`}>
              <h2 className="flex items-center gap-2 text-[0.9rem] font-bold tracking-wide">
                <span className="material-symbols-outlined !text-[18px]">handshake</span>
                Deal Information
              </h2>
              <span className={`material-symbols-outlined !text-[20px] transition-transform duration-300 ${!openSections.deal ? 'rotate-180' : ''}`}>expand_less</span>
            </div>
            {openSections.deal && (
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col"><label className={labelCls}>Contract Value</label><input readOnly={!isEditing} defaultValue="$24,000" className={`${inputCls(isEditing)} text-emerald-500 font-bold`} /></div>
                  <div className="flex flex-col"><label className={labelCls}>Units Sold</label><input readOnly={!isEditing} defaultValue="120" className={inputCls(isEditing)} /></div>
                </div>
                <div className="flex flex-col"><label className={labelCls}>Contract Duration</label><input readOnly={!isEditing} defaultValue="12 Months" className={inputCls(isEditing)} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col"><label className={labelCls}>Contract Start Date</label><input readOnly={!isEditing} defaultValue="2024-01-01" className={inputCls(isEditing)} /></div>
                  <div className="flex flex-col"><label className={labelCls}>Contract Close Date</label><input readOnly={!isEditing} defaultValue="2024-12-31" className={inputCls(isEditing)} /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col"><label className={labelCls}>Live Date</label><input readOnly={!isEditing} defaultValue="2024-01-15" className={inputCls(isEditing)} /></div>
                  <div className="flex flex-col"><label className={labelCls}>Handoff Date</label><input readOnly={!isEditing} defaultValue="2024-01-10" className={inputCls(isEditing)} /></div>
                </div>
                <div className="flex flex-col"><label className={labelCls}>Transfer Date</label><input readOnly={!isEditing} defaultValue="2024-01-12" className={inputCls(isEditing)} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col"><label className={labelCls}>Contract Type</label><CustomDropdown initialValue="Annual" options={['Annual', 'Monthly', 'Quarterly', 'One-time']} isEditing={isEditing} /></div>
                  <div className="flex flex-col"><label className={labelCls}>Status</label><CustomDropdown initialValue="Active" options={['New', 'Active', 'Pending', 'On Hold', 'Completed']} isEditing={isEditing} /></div>
                </div>
                <div className="flex flex-col"><label className={labelCls}>Timezone</label><input readOnly={!isEditing} defaultValue="IST (UTC+5:30)" className={inputCls(isEditing)} /></div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column - Account Overview & Tabs */}
        <div className="flex-1 w-full flex flex-col gap-4 h-auto lg:h-full overflow-visible lg:overflow-y-auto pb-4 pr-1 scrollbar-hide">
          <div className="bg-surface-container-low border border-outline/10 rounded-sm shadow-sm flex flex-col flex-1 min-h-0">
            {/* Right Panel Header */}
            <div className="p-6 pb-2 border-b border-outline/10 flex flex-col gap-4">
              <div>
                <h2 className="flex items-center gap-2 text-[1.15rem] font-bold text-on-surface">
                  <span className="material-symbols-outlined !text-[22px] text-on-surface-variant">description</span>
                  Account Overview
                </h2>
                <p className="text-[0.85rem] text-on-surface-variant/80 ml-8 mt-1">Manage and view account AM progress</p>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-4 mt-4 overflow-x-auto scrollbar-hide border-b border-transparent">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-2 pb-3 px-1 border-b-2 text-[0.85rem] font-bold transition-all whitespace-nowrap ${activeTab === tab
                      ? 'border-primary-container text-primary-container'
                      : 'border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline/20'
                      }`}
                  >
                    {tab === 'Sentiment' && <span className="material-symbols-outlined !text-[18px]">sentiment_satisfied</span>}
                    {tab === 'Email' && <span className="material-symbols-outlined !text-[18px]">mail</span>}
                    {tab === 'Notes' && <span className="material-symbols-outlined !text-[18px]">note</span>}
                    {tab === 'Tasks' && <span className="material-symbols-outlined !text-[18px]">task_alt</span>}
                    {tab === 'Documents' && <span className="material-symbols-outlined !text-[18px]">folder</span>}
                    {tab === 'Product & Service' && <span className="material-symbols-outlined !text-[18px]">inventory_2</span>}
                    {tab === 'History' && <span className="material-symbols-outlined !text-[18px]">history</span>}
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
              {activeTab === 'Sentiment' && <SentimentTabContent />}
              {activeTab === 'Email' && <EmailTabContent />}
              {activeTab === 'Notes' && <NotesTabContent />}
              {activeTab === 'Tasks' && <TasksTabContent />}
              {activeTab === 'Documents' && <DocumentsTabContent />}
              {activeTab === 'Product & Service' && <ProductServiceTabContent />}
              {activeTab === 'History' && <HistoryTabContent />}
            </div>
          </div>
        </div>

        {/* Rightmost Column - Insights & Champions */}
        <div className="w-full lg:w-[320px] lg:flex-shrink-0 flex flex-col gap-4 h-auto lg:h-full overflow-visible lg:overflow-y-auto pb-4 pr-1 scrollbar-hide">

          {/* Champion Details */}
          <div className="bg-surface-container-low border border-outline/10 rounded-sm shadow-sm flex flex-col transition-all">
            <div className={`${headerBgClass} text-white p-3 px-4 flex justify-between items-center rounded-t-sm`}>
              <h2 className="flex items-center gap-2 text-[0.95rem] font-bold tracking-wide">
                <span className="material-symbols-outlined !text-[18px] text-primary-container">verified</span>
                Champion Details
              </h2>
            </div>

            <div className="p-6 flex flex-col items-center border-b border-outline/10">
              <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center shadow-sm mb-4 border border-outline/10 bg-surface-container">
                <span className="text-on-surface-variant font-bold text-[1.5rem]">TR</span>
              </div>
              <div className="text-[1.15rem] font-bold text-on-surface tracking-tight leading-tight">Tenali Rama</div>
              <div className="text-[0.85rem] font-medium text-on-surface-variant mb-3">Chief Technology Officer</div>

              <div className="bg-surface-container px-3 py-1.5 rounded-sm text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-widest mb-2 border border-outline/10 shadow-sm w-full text-center">
                Last Contacted
              </div>
              <div className="text-[0.8rem] font-semibold text-on-surface-variant">
                24 Mar, 2026 | 02:45 PM
              </div>
            </div>
          </div>

          {/* AM Health */}
          <div className="bg-surface-container-low border border-outline/10 rounded-sm shadow-sm flex flex-col transition-all">
            <div className={`${headerBgClass} text-white p-3 px-4 flex justify-between items-center rounded-t-sm`}>
              <h2 className="flex items-center gap-2 text-[0.95rem] font-bold tracking-wide">
                <span className="material-symbols-outlined !text-[18px]">health_and_safety</span>
                Implementation Status
              </h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[0.75rem] font-bold text-on-surface-variant uppercase tracking-wider">
                  <span>Progress</span>
                  <span>65%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container w-[65%] text-white"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-surface-container rounded-sm border border-outline/10 text-center">
                  <div className="text-[1.25rem] font-bold text-primary-container">12</div>
                  <div className="text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-widest">Tasks Done</div>
                </div>
                <div className="p-3 bg-surface-container rounded-sm border border-outline/10 text-center">
                  <div className="text-[1.25rem] font-bold text-tertiary">4</div>
                  <div className="text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-widest">Pending</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-md shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-8 fade-in duration-300">
          <span className="material-symbols-outlined !text-[20px] text-emerald-400">check_circle</span>
          <span className="text-[0.85rem] font-medium tracking-wide">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default AccountDetailsView;
