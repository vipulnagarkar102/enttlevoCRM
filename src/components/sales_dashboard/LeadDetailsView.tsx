import React, { useState, useEffect } from 'react';
import EmailTabContent from './EmailTabContent';
import NotesTabContent from './NotesTabContent';
import TasksTabContent from './TasksTabContent';
import DocumentsTabContent from './DocumentsTabContent';
import HistoryTabContent from './HistoryTabContent';
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

interface LeadDetailsViewProps {
  leadId: number | string;
  leadName?: string;
  industry?: string;
  onBack: () => void;
}

const LeadDetailsView: React.FC<LeadDetailsViewProps> = ({ leadName = 'Reliance', industry, onBack }) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('Email');
  const [isEditing, setIsEditing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [openSections, setOpenSections] = useState({
    company: true,
    contact: true,
    deal: true
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = ['Email', 'Notes', 'Tasks', 'Documents', 'History'];

  const headerBgClass = isDark ? 'bg-[#1A171F]' : 'bg-[#1A171F]'; // Headers are consistently dark
  const headerHoverClass = isDark ? 'hover:bg-[#2A272F]' : 'hover:bg-[#2A272F]';

  return (
    <div className="flex flex-col bg-surface flex-1 h-[calc(100vh-40px)] overflow-hidden animate-in fade-in duration-300">
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-surface-container-low px-4 sm:px-8 py-4 sm:py-5 border-b border-outline/10 shadow-sm flex-shrink-0 fixed top-10 right-0 z-30 transition-all duration-300 ease-in-out"
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
              {leadName}
              {industry && (
                <span className="px-2 py-0.5 bg-surface-container text-on-surface text-[0.7rem] uppercase tracking-widest font-bold border border-outline/10 rounded-sm">
                  {industry}
                </span>
              )}
            </h1>
            <p className="text-[0.85rem] text-on-surface-variant/80 mt-1">Account Details & Management</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
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
                  setToastMessage('Lead details updated successfully!');
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
              <button className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500 border border-emerald-600 text-white rounded-sm text-[0.8rem] font-bold hover:bg-emerald-600 transition-colors shadow-sm tracking-wider uppercase active:scale-95">
                <span className="material-symbols-outlined !text-[16px]">send</span>
                Send to Onboarding
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
        <div className="w-full lg:w-[320px] lg:flex-shrink-0 flex flex-col gap-4 h-auto lg:h-full overflow-visible lg:overflow-y-auto pb-4 pr-1 scrollbar-hide">

          {/* Company Details Section */}
          <div className="bg-surface-container-low border border-outline/10 rounded-sm shadow-sm flex flex-col transition-all">
            <div
              onClick={() => toggleSection('company')}
              className={`${headerBgClass} text-white p-3 px-4 flex justify-between items-center rounded-t-sm cursor-pointer ${headerHoverClass} transition-colors`}
            >
              <h2 className="flex items-center gap-2 text-[0.95rem] font-bold tracking-wide">
                <span className="material-symbols-outlined !text-[18px]">domain</span>
                Company Details
              </h2>
              <button className="hover:bg-white/10 rounded-full p-0.5 transition-colors flex items-center justify-center">
                <span className={`material-symbols-outlined !text-[20px] transition-transform duration-300 ${!openSections.company ? 'rotate-180' : ''}`}>expand_less</span>
              </button>
            </div>

            {openSections.company && (
              <div className="p-5 space-y-4 animate-in slide-in-from-top-2 fade-in duration-200">
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-on-surface-variant">Company Name</label>
                  <input readOnly={!isEditing} defaultValue={leadName} className={`w-full px-3 py-1.5 border rounded-sm text-[0.85rem] focus:outline-none transition-all ${isEditing ? 'bg-surface-container border-primary-container/50 shadow-sm ring-1 ring-primary-container/20 text-on-surface' : 'bg-surface-container border-outline/15 text-on-surface-variant'}`} />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-on-surface-variant">Account Owner</label>
                  <input readOnly={!isEditing} defaultValue="Shrinath Rao" className={`w-full px-3 py-1.5 border rounded-sm text-[0.85rem] focus:outline-none transition-all ${isEditing ? 'bg-surface-container border-primary-container/50 shadow-sm ring-1 ring-primary-container/20 text-on-surface' : 'bg-surface-container border-outline/15 text-on-surface-variant'}`} />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-on-surface-variant">Contact Name</label>
                  <input readOnly={!isEditing} defaultValue="Tenali Rama" className={`w-full px-3 py-1.5 border rounded-sm text-[0.85rem] focus:outline-none transition-all ${isEditing ? 'bg-surface-container border-primary-container/50 shadow-sm ring-1 ring-primary-container/20 text-on-surface' : 'bg-surface-container border-outline/15 text-on-surface-variant'}`} />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-on-surface-variant">Email</label>
                  <input readOnly={!isEditing} defaultValue="Datta1@McAfee" className={`w-full px-3 py-1.5 border rounded-sm text-[0.85rem] focus:outline-none transition-all ${isEditing ? 'bg-surface-container border-primary-container/50 shadow-sm ring-1 ring-primary-container/20 text-on-surface' : 'bg-surface-container border-outline/15 text-on-surface-variant'}`} />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-on-surface-variant">Address</label>
                  <textarea readOnly={!isEditing} defaultValue="Main St 123, Tech Park" className={`w-full px-3 py-1.5 border rounded-sm text-[0.85rem] focus:outline-none min-h-[60px] resize-none transition-all ${isEditing ? 'bg-surface-container border-primary-container/50 shadow-sm ring-1 ring-primary-container/20 text-on-surface' : 'bg-surface-container border-outline/15 text-on-surface-variant'}`}></textarea>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1 text-left">
                    <label className="text-[0.75rem] font-bold text-on-surface-variant">City</label>
                    <CustomDropdown initialValue="Pune" options={['Pune', 'Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Chennai']} isEditing={isEditing} className="px-2" />
                  </div>
                  <div className="flex flex-col gap-1 text-left">
                    <label className="text-[0.75rem] font-bold text-on-surface-variant">State</label>
                    <CustomDropdown initialValue="MH" options={['MH', 'KA', 'DL', 'TS', 'TN', 'GJ', 'WB']} isEditing={isEditing} className="px-2" />
                  </div>
                  <div className="flex flex-col gap-1 text-left">
                    <label className="text-[0.75rem] font-bold text-on-surface-variant">Country</label>
                    <CustomDropdown initialValue="India" options={['India', 'USA', 'UK', 'Australia', 'Canada', 'Singapore']} isEditing={isEditing} className="px-2" />
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-on-surface-variant">LinkedIn</label>
                  <input readOnly={!isEditing} defaultValue="Tenali Rama" className={`w-full px-3 py-1.5 border rounded-sm text-[0.85rem] focus:outline-none transition-all ${isEditing ? 'bg-surface-container border-primary-container/50 shadow-sm ring-1 ring-primary-container/20 text-[#006495]' : 'bg-surface-container border-outline/15 text-[#006495]'}`} />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-on-surface-variant">Website</label>
                  <input readOnly={!isEditing} defaultValue="www.reliance.com" className={`w-full px-3 py-1.5 border rounded-sm text-[0.85rem] focus:outline-none transition-all ${isEditing ? 'bg-surface-container border-primary-container/50 shadow-sm ring-1 ring-primary-container/20 text-[#006495]' : 'bg-surface-container border-outline/15 text-[#006495]'}`} />
                </div>
              </div>
            )}
          </div>

          {/* Contact Details Section */}
          <div className="bg-surface-container-low border border-outline/10 rounded-sm shadow-sm flex flex-col transition-all">
            <div
              onClick={() => toggleSection('contact')}
              className={`${headerBgClass} text-white p-3 px-4 flex justify-between items-center rounded-t-sm cursor-pointer ${headerHoverClass} transition-colors`}
            >
              <h2 className="flex items-center gap-2 text-[0.95rem] font-bold tracking-wide">
                <span className="material-symbols-outlined !text-[18px]">person_outline</span>
                Contact Details
              </h2>
              <button className="hover:bg-white/10 rounded-full p-0.5 transition-colors flex items-center justify-center">
                <span className={`material-symbols-outlined !text-[20px] transition-transform duration-300 ${!openSections.contact ? 'rotate-180' : ''}`}>expand_less</span>
              </button>
            </div>

            {openSections.contact && (
              <div className="p-8 flex items-center justify-center animate-in slide-in-from-top-2 fade-in duration-200">
                <p className="text-[0.85rem] text-on-surface-variant font-medium tracking-wide">No contact details available</p>
              </div>
            )}
          </div>

          {/* Deal Information Section */}
          <div className="bg-surface-container-low border border-outline/10 rounded-sm shadow-sm flex flex-col transition-all">
            <div
              onClick={() => toggleSection('deal')}
              className={`${headerBgClass} text-white p-3 px-4 flex justify-between items-center rounded-t-sm cursor-pointer ${headerHoverClass} transition-colors`}
            >
              <h2 className="flex items-center gap-2 text-[0.95rem] font-bold tracking-wide">
                <span className="material-symbols-outlined !text-[18px]">attach_money</span>
                Deal Information
              </h2>
              <button className="hover:bg-white/10 rounded-full p-0.5 transition-colors flex items-center justify-center">
                <span className={`material-symbols-outlined !text-[20px] transition-transform duration-300 ${!openSections.deal ? 'rotate-180' : ''}`}>expand_less</span>
              </button>
            </div>

            {openSections.deal && (
              <div className="p-5 grid grid-cols-2 gap-x-4 gap-y-4 animate-in slide-in-from-top-2 fade-in duration-200">
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-on-surface-variant">Contract Stage</label>
                  <CustomDropdown initialValue="Proposal" options={['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost']} isEditing={isEditing} className="px-3" />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-on-surface-variant">Status</label>
                  <CustomDropdown initialValue="Not Qualified" options={['New', 'Qualified', 'Not Qualified', 'In Progress', 'On Hold', 'Archived']} isEditing={isEditing} className="px-3" />
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-on-surface-variant">Label</label>
                  <CustomDropdown initialValue="Cold" options={['Hot', 'Warm', 'Cold']} isEditing={isEditing} className="px-3" />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-on-surface-variant">Contract Type</label>
                  <CustomDropdown initialValue="Monthly" options={['Monthly', 'Quarterly', 'Semi-Annual', 'Annual', 'Multi-Year']} isEditing={isEditing} className="px-3" />
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-on-surface-variant">Proposed ARR</label>
                  <input readOnly={!isEditing} defaultValue="" className={`w-full px-3 py-1.5 border rounded-sm text-[0.85rem] focus:outline-none transition-all ${isEditing ? 'bg-surface-container border-primary-container/50 shadow-sm ring-1 ring-primary-container/20 text-on-surface' : 'bg-surface-container border-outline/15 text-on-surface-variant'}`} />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-on-surface-variant">Contract Value</label>
                  <input readOnly={!isEditing} defaultValue="" className={`w-full px-3 py-1.5 border rounded-sm text-[0.85rem] focus:outline-none transition-all ${isEditing ? 'bg-surface-container border-primary-container/50 shadow-sm ring-1 ring-primary-container/20 text-on-surface' : 'bg-surface-container border-outline/15 text-on-surface-variant'}`} />
                </div>

                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-on-surface-variant">Money in Bank</label>
                  <input readOnly={!isEditing} defaultValue="" className={`w-full px-3 py-1.5 border rounded-sm text-[0.85rem] focus:outline-none transition-all ${isEditing ? 'bg-surface-container border-primary-container/50 shadow-sm ring-1 ring-primary-container/20 text-on-surface' : 'bg-surface-container border-outline/15 text-on-surface-variant'}`} />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <label className="text-[0.75rem] font-bold text-on-surface-variant">Duration (Years)</label>
                  <input readOnly={!isEditing} defaultValue="" className={`w-full px-3 py-1.5 border rounded-sm text-[0.85rem] focus:outline-none transition-all ${isEditing ? 'bg-surface-container border-primary-container/50 shadow-sm ring-1 ring-primary-container/20 text-on-surface' : 'bg-surface-container border-outline/15 text-on-surface-variant'}`} />
                </div>

                <div className="flex flex-col gap-1 text-left col-span-2">
                  <label className="text-[0.75rem] font-bold text-on-surface-variant">Timezone</label>
                  <CustomDropdown initialValue="IST" options={['IST', 'EST', 'CST', 'MST', 'PST', 'GMT', 'UTC']} isEditing={isEditing} className="px-3" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center Column - Account Overview & Tabs */}
        <div className="flex-1 w-full flex flex-col gap-4 h-auto lg:h-full overflow-visible lg:overflow-y-auto pb-4 pr-1 scrollbar-hide">
          <div className="bg-surface-container-low border border-outline/10 rounded-sm shadow-sm flex flex-col flex-1 min-h-0">
            {/* Right Panel Header */}
            <div className="p-6 pb-2 border-b border-outline/10 flex flex-col gap-4">
              <div>
                <h2 className="flex items-center gap-2 text-[1.15rem] font-bold text-on-surface">
                  <span className="material-symbols-outlined !text-[22px] text-on-surface-variant">description</span>
                  Account Overview
                </h2>
                <p className="text-[0.85rem] text-on-surface-variant/80 ml-8 mt-1">Manage and view account details</p>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-4 sm:gap-8 mt-4 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-2 pb-3 px-1 border-b-2 text-[0.85rem] font-bold transition-all ${activeTab === tab
                      ? 'border-primary-container text-primary-container'
                      : 'border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline/20'
                      }`}
                  >
                    {tab === 'Email' && <span className="material-symbols-outlined !text-[18px]">mail</span>}
                    {tab === 'Notes' && <span className="material-symbols-outlined !text-[18px]">note</span>}
                    {tab === 'Tasks' && <span className="material-symbols-outlined !text-[18px]">task_alt</span>}
                    {tab === 'Documents' && <span className="material-symbols-outlined !text-[18px]">folder</span>}
                    {tab === 'History' && <span className="material-symbols-outlined !text-[18px]">history</span>}
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className={`flex-1 flex flex-col overflow-hidden relative ${!['Email', 'Notes', 'Tasks', 'Documents', 'History'].includes(activeTab) ? 'items-center justify-center p-8 bg-surface' : ''}`}>

              {activeTab === 'Email' && <EmailTabContent />}
              {activeTab === 'Notes' && <NotesTabContent />}
              {activeTab === 'Tasks' && <TasksTabContent />}
              {activeTab === 'Documents' && <DocumentsTabContent />}
              {activeTab === 'History' && <HistoryTabContent />}

              {activeTab !== 'Email' && activeTab !== 'Notes' && activeTab !== 'Tasks' && activeTab !== 'Documents' && activeTab !== 'History' && (
                <div className="flex flex-col items-center justify-center text-center opacity-50">
                  <span className="material-symbols-outlined !text-[48px] text-slate-400 mb-4">construction</span>
                  <h3 className="text-[1.1rem] font-bold text-on-surface mb-2">{activeTab} section under construction</h3>
                  <p className="text-[0.9rem] text-on-surface-variant">
                    Information for {activeTab.toLowerCase()} will appear here.
                  </p>
                </div>
              )}

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

              <div className="flex items-center gap-3 mb-5 text-tertiary">
                <a href="#" className="hover:text-primary-container transition-colors"><i className="fa-brands fa-linkedin text-[18px]"></i></a>
                <a href="#" className="text-on-surface-variant hover:text-primary-container transition-colors"><i className="fa-brands fa-twitter text-[18px]"></i></a>
              </div>

              <div className="bg-surface-container px-3 py-1.5 rounded-sm text-[0.65rem] font-bold text-on-surface-variant uppercase tracking-widest mb-2 border border-outline/10 shadow-sm w-full text-center">
                Last Contacted
              </div>
              <div className="text-[0.8rem] font-semibold text-on-surface-variant">
                01 Jul, 2024 | 11:19 AM
              </div>
            </div>
          </div>

          {/* Previous Champions */}
          <div className="bg-surface-container-low border border-outline/10 rounded-sm shadow-sm flex flex-col transition-all">
            <div className={`${headerBgClass} text-white p-3 px-4 flex justify-between items-center rounded-t-sm`}>
              <h2 className="flex items-center gap-2 text-[0.95rem] font-bold tracking-wide">
                <span className="material-symbols-outlined !text-[18px]">history</span>
                Previous Champions
              </h2>
            </div>
            <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] rounded-full overflow-hidden border border-outline/10 shadow-sm bg-surface-container flex-shrink-0">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXqN59oxtGeBdvgVWGhfxxkdMU9hPcHp7YbPRv2cLzOa4DvV2k6LSubWDWa_Ch9L96Uy7uuzkvZmNjRtWEa7Gip4lQNJq0mg2neS3lkSwDp_jS9TPWeYWxKxAMlSBg0cI0TDBtvvbbI-_UZN9LyYTUyBDxQ9byL5FQa6Wt-lNsWAawJDIQ-W4MDcw0uJAa6W1qw9uZhqaXuKTjrG6NwwDPjVo4aT6BxqXgd7_sCvLcxRqYqj0LWu9yAnps3W-CLK_LhM-jz9KlRDM" alt="Prev Champion" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[0.85rem] font-bold text-on-surface truncate">Vipul Nagarkar</div>
                  <div className="text-[0.75rem] font-medium text-on-surface-variant truncate">Former VP of Engineering</div>
                </div>
                <a href="#" className="text-tertiary hover:text-primary-container p-1"><i className="fa-brands fa-linkedin text-[16px]"></i></a>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] rounded-full overflow-hidden border border-outline/10 shadow-sm bg-surface-container flex-shrink-0 flex items-center justify-center">
                  <span className="text-on-surface-variant font-bold text-[0.8rem]">AK</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[0.85rem] font-bold text-on-surface truncate">Arjun Krishnan</div>
                  <div className="text-[0.75rem] font-medium text-on-surface-variant truncate">Director of IT</div>
                </div>
                <a href="#" className="text-tertiary hover:text-primary-container p-1"><i className="fa-brands fa-linkedin text-[16px]"></i></a>
              </div>
            </div>
          </div>

          {/* Company Insights */}
          <div className="bg-surface-container-low border border-outline/10 rounded-sm shadow-sm flex flex-col transition-all">
            <div className={`${headerBgClass} text-white p-3 px-4 flex justify-between items-center rounded-t-sm`}>
              <h2 className="flex items-center gap-2 text-[0.95rem] font-bold tracking-wide">
                <span className="material-symbols-outlined !text-[18px]">lightbulb</span>
                Company Insights
              </h2>
            </div>

            <div className="p-4">
              <div className="border border-outline/10 rounded-sm p-4 bg-surface-container shadow-sm mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-on-surface"></div>
                  <span className="text-[0.7rem] font-bold text-on-surface tracking-widest uppercase">Expansion</span>
                </div>
                <h4 className="text-[0.9rem] font-bold leading-snug text-on-surface mb-2">
                  New infrastructure rollout plan announced for Q4.
                </h4>
                <p className="text-[0.75rem] font-medium text-on-surface-variant">2 hours ago</p>
              </div>

              <button className="w-full bg-primary-container text-white px-4 py-1.5 rounded-sm text-[0.8rem] font-bold uppercase tracking-wider transition-colors shadow-sm active:scale-[0.98] hover:bg-[#E67300]">
                View More Insights
              </button>
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

export default LeadDetailsView;


