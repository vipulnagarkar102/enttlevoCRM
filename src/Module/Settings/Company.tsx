import React, { useState, useEffect } from 'react';

const Company: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Company Overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Accordion state
  const [openSections, setOpenSections] = useState({
    profile: true
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const headerBgClass = "bg-[#1A171F]";
  const headerHoverClass = "hover:bg-[#2A272F]";

  const [formData, setFormData] = useState({
    companyName: 'Enttlevo',
    email: 'support@enttlevo.com',
    phone: 'N/A',
    location: 'N/A',
    industry: 'N/A',
    companyId: '1',
    createdAt: '11/30/2024'
  });

  const handleSave = () => {
    setIsEditing(false);
    setShowToast(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const labelCls = "text-[0.85rem] font-bold text-[#1F1A24] flex items-center gap-2";
  const inputCls = (isEdit: boolean) => `w-full px-4 py-2.5 rounded-sm text-[0.9rem] transition-all focus:outline-none ${isEdit ? 'bg-[#F4EFF6] border border-orange-400 text-on-surface focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 shadow-sm' : 'bg-[#F4EFF6]/50 border border-[#E5DFE8]/70 text-[#2D2A32]/60 cursor-not-allowed'}`;

  const tabs = [
    { name: 'Company Overview', icon: 'domain' },
    { name: 'Integrations', icon: 'link' }
  ];

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col relative bg-[#FCFAFE] animate-in fade-in duration-300 text-on-surface">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] bg-[#1A171F] text-white px-6 py-3 rounded-md shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-8 fade-in duration-300">
          <span className="material-symbols-outlined !text-[20px] text-emerald-400">check_circle</span>
          <span className="text-[0.85rem] font-medium tracking-wide">Company details updated successfully!</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-surface-container-low px-4 sm:px-8 py-5 border-b border-outline/10 shadow-sm shrink-0">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 w-full sm:w-auto">
          <button className="flex items-center justify-center p-2 text-on-surface-variant hover:text-primary-container hover:bg-primary-container/10 rounded-full transition-colors">
            <span className="material-symbols-outlined !text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-[1.5rem] font-bold text-on-surface tracking-tight leading-tight flex items-center gap-3 lowercase">
              <span className="capitalize">{formData.companyName}</span>
              <span className="px-2 py-0.5 bg-surface-container text-on-surface text-[0.7rem] uppercase tracking-widest font-bold border border-outline/10 rounded-sm">
                Active
              </span>
            </h1>
            <p className="text-[0.85rem] text-on-surface-variant/80 mt-1">Company Profile & Details</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-1.5 border border-outline/10 rounded-sm bg-surface-container-low text-[0.75rem] font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors shadow-sm tracking-wider uppercase active:scale-95"
              >
                <span className="material-symbols-outlined !text-[16px]">close</span>
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500 border border-emerald-600 text-white rounded-sm text-[0.75rem] font-bold hover:bg-emerald-600 transition-colors shadow-sm tracking-wider uppercase active:scale-95"
              >
                <span className="material-symbols-outlined !text-[16px]">save</span>
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-6 py-1.5 border border-outline/10 rounded-sm bg-surface-container-low text-[0.75rem] font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors shadow-sm tracking-wider uppercase"
            >
              <span className="material-symbols-outlined !text-[18px]">edit</span>
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 sm:px-8 border-b border-outline-variant/30 mt-4 mb-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-4 sm:gap-8 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 pb-3 px-1 border-b-2 text-[0.85rem] font-bold transition-all ${activeTab === tab.name
                ? 'border-primary-container text-primary-container'
                : 'border-transparent text-on-surface-variant hover:text-on-surface hover:border-outline/20'
                }`}
            >
              <span className="material-symbols-outlined !text-[18px]">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-4 sm:px-8 flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8 pb-10">

        {activeTab === 'Company Overview' && (
          <>
            {/* Left Card */}
            <div className="flex-[1.5] flex flex-col gap-6">
              <div className="bg-surface-container-low border border-outline/10 rounded-sm shadow-sm flex flex-col transition-all overflow-hidden h-full">
                <div
                  onClick={() => toggleSection('profile')}
                  className={`${headerBgClass} text-white p-3 px-4 flex justify-between items-center rounded-t-sm cursor-pointer ${headerHoverClass} transition-colors`}
                >
                  <h2 className="flex items-center gap-2 text-[0.95rem] font-bold tracking-wide">
                    <span className="material-symbols-outlined !text-[20px] text-white">domain</span>
                    Company Profile
                  </h2>
                  <button className="hover:bg-white/10 rounded-full p-0.5 transition-colors flex items-center justify-center">
                    <span className={`material-symbols-outlined !text-[20px] transition-transform duration-300 ${!openSections.profile ? 'rotate-180' : ''}`}>expand_less</span>
                  </button>
                </div>

                {openSections.profile && (
                  <div className="p-10 space-y-8 text-on-surface animate-in slide-in-from-top-2 fade-in duration-300 flex-1">

                    {/* Basic Information */}
                    <div>
                      <h3 className="text-[0.75rem] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-4">Basic Information</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-12 gap-y-6 lg:gap-y-8">
                        <div className="space-y-1.5">
                          <label className={labelCls}>
                            <span className="material-symbols-outlined !text-[14px]">corporate_fare</span>
                            Company Name
                          </label>
                          <input
                            readOnly={!isEditing}
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            className={inputCls(isEditing)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className={labelCls}>
                            <span className="material-symbols-outlined !text-[14px]">mail</span>
                            Email
                          </label>
                          <input
                            readOnly={!isEditing}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={inputCls(isEditing)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className={labelCls}>
                            <span className="material-symbols-outlined !text-[14px]">call</span>
                            Phone
                          </label>
                          <input
                            readOnly={!isEditing}
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={inputCls(isEditing)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-px bg-outline/5 my-4"></div>

                    {/* Address Details */}
                    <div>
                      <h3 className="text-[0.75rem] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><span className="material-symbols-outlined !text-[14px]">location_on</span> Address Details</h3>
                      <div className="grid grid-cols-1 gap-y-8">
                        <div className="space-y-1.5 max-w-lg">
                          <label className={labelCls}>
                            <span className="material-symbols-outlined !text-[14px]">map</span>
                            Location
                          </label>
                          <input
                            readOnly={!isEditing}
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className={inputCls(isEditing)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-px bg-outline/5 my-4"></div>

                    {/* Additional Information */}
                    <div>
                      <h3 className="text-[0.75rem] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><span className="material-symbols-outlined !text-[14px]">info</span> Additional Information</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-12 gap-y-6 lg:gap-y-8">
                        <div className="space-y-1.5">
                          <label className={labelCls}>
                            <span className="material-symbols-outlined !text-[14px]">precision_manufacturing</span>
                            Industry
                          </label>
                          <input
                            readOnly={!isEditing}
                            value={formData.industry}
                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                            className={inputCls(isEditing)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className={labelCls}>
                            <span className="material-symbols-outlined !text-[14px]">fingerprint</span>
                            Company ID
                          </label>
                          <input
                            readOnly={true}
                            value={formData.companyId}
                            className={inputCls(false)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className={labelCls}>
                            <span className="material-symbols-outlined !text-[14px]">calendar_today</span>
                            Created At
                          </label>
                          <input
                            readOnly={true}
                            value={formData.createdAt}
                            className={inputCls(false)}
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>

            {/* Right Card - Company Hub */}
            <div className="flex-1">
              <div className="bg-surface-container-low border border-outline/10 rounded-sm shadow-sm overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
                <div className={`${headerBgClass} text-white p-3 px-4 flex justify-between items-center rounded-t-sm`}>
                  <h2 className="flex items-center gap-2 text-[0.95rem] font-bold tracking-wide">
                    <span className="material-symbols-outlined !text-[20px] text-white">storefront</span>
                    Company Hub
                  </h2>
                </div>

                <div className="p-10 flex-1 flex flex-col items-center justify-center py-16">
                  <div className="w-24 h-24 rounded-full border-[6px] border-surface-container-high overflow-hidden mb-6 shadow-md shadow-black/5 flex items-center justify-center bg-primary-container/10 transition-all hover:border-primary-container/30">
                    <span className="material-symbols-outlined !text-[48px] text-primary-container">domain</span>
                  </div>

                  <h2 className="text-[1.5rem] font-bold text-on-surface tracking-tight lowercase text-center">
                    <span className="capitalize">{formData.companyName}</span>
                  </h2>
                  <p className="text-[0.9rem] font-medium text-on-surface-variant/60 mt-1 uppercase tracking-wider text-center">ID: {formData.companyId}</p>

                  <div className="flex items-center gap-3 mt-10">
                    <button className="w-10 h-10 flex items-center justify-center bg-primary-container/10 border border-primary-container/20 rounded-md text-primary-container hover:bg-primary-container hover:text-white transition-all shadow-sm active:scale-95">
                      <span className="material-symbols-outlined !text-[20px]">language</span>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center bg-surface-container/50 border border-outline/10 rounded-md text-on-surface-variant/60 hover:bg-primary-container hover:text-white transition-all shadow-sm active:scale-95">
                      <span className="material-symbols-outlined !text-[20px]">mail</span>
                    </button>
                  </div>

                  <div className="mt-12 w-full max-w-[280px] p-6 bg-surface-container/20 border border-outline/5 rounded-2xl flex flex-col items-center gap-1.5 transition-colors hover:bg-surface-container/30">
                    <div className="flex items-center gap-2 text-[0.65rem] font-black text-on-surface-variant/30 uppercase tracking-[0.2em]">
                      <span className="material-symbols-outlined !text-[14px]">history</span>
                      Account Created
                    </div>
                    <div className="text-[0.85rem] font-bold text-on-surface-variant/80 tracking-tight">{formData.createdAt}</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'Integrations' && (
          <>
            {/* Left Card - Integrations List */}
            <div className="flex-[1.5] flex flex-col gap-6">
              <div className="bg-transparent flex flex-col transition-all overflow-hidden h-full">

                {/* Header */}
                <div className="px-6 py-4 bg-surface-container-low/50 border border-outline/10 rounded-t-sm flex items-center gap-3 shrink-0">
                  <span className="material-symbols-outlined text-primary-container !text-[20px]">extension</span>
                  <h3 className="text-[0.75rem] font-bold text-on-surface-variant uppercase tracking-[0.2em]">Active Integrations</h3>
                  <div className="ml-auto bg-primary-container/10 text-primary-container text-[0.65rem] font-bold px-2 py-0.5 rounded-sm border border-primary-container/20">
                    5
                  </div>
                </div>

                <div className="divide-y divide-outline/5 overflow-y-auto flex-1 border-x border-b border-outline/10 bg-surface-container-low">
                  {[
                    {
                      id: 1,
                      name: 'mailerlite',
                      status: 'Email marketing automation platform for creating and managing email campaigns',
                      icon: 'mail',
                      active: true
                    },
                    {
                      id: 2,
                      name: 'callhippo',
                      status: 'Cloud-based phone system for making and managing business calls',
                      icon: 'call',
                      active: true
                    },
                    {
                      id: 3,
                      name: 'slack',
                      status: 'Team communication and instant messaging platform for seamless collaboration',
                      icon: 'tag',
                      active: true
                    },
                    {
                      id: 4,
                      name: 'stripe',
                      status: 'Payment processing system to manage customer transactions and reporting',
                      icon: 'payments',
                      active: true
                    },
                    {
                      id: 5,
                      name: 'google workspace',
                      status: 'Unified suite of secure, cloud-native collaboration and productivity apps',
                      icon: 'cloud',
                      active: true
                    }
                  ].map((n) => (
                    <div
                      key={n.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 px-4 sm:px-6 py-4 hover:bg-primary-container/[0.04] transition-all group relative"
                    >
                      <div className="flex items-center gap-3 sm:hidden">
                        <div className="w-10 h-10 rounded-md flex items-center justify-center shrink-0 shadow-sm border border-outline/10 bg-surface-container text-on-surface">
                          <span className="material-symbols-outlined !text-[20px]">
                            {n.icon}
                          </span>
                        </div>
                        <h4 className="text-[1rem] font-bold text-on-surface tracking-tight lowercase">
                          {n.name}
                        </h4>
                      </div>

                      <div className="hidden sm:flex w-12 h-12 rounded-md items-center justify-center shrink-0 shadow-sm border border-outline/10 bg-surface-container text-on-surface">
                        <span className="material-symbols-outlined !text-[26px]">
                          {n.icon}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-center mt-2 sm:mt-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="hidden sm:block text-[1rem] font-bold text-on-surface tracking-tight lowercase">
                            {n.name}
                          </h4>
                          <span className="flex items-center gap-1.5 text-[0.7rem] font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shadow-[0_0_4px_rgba(5,150,105,0.4)]"></span>
                            Connected
                          </span>
                        </div>
                        <p className="text-[0.85rem] text-on-surface-variant/70 leading-snug w-[90%] font-medium">
                          {n.status}
                        </p>
                      </div>

                      <div className="shrink-0 w-full sm:w-auto sm:min-w-[200px] text-right flex flex-wrap sm:flex-nowrap items-center justify-start sm:justify-end gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all mt-3 sm:mt-0">
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-1.5 border border-outline/10 text-on-surface-variant rounded-sm text-[0.8rem] font-bold hover:bg-surface-container-high transition-colors shadow-sm">
                          <span className="material-symbols-outlined !text-[16px]">settings</span>
                          Configure
                        </button>
                        <button className="px-5 py-1.5 bg-[#EF4444] border border-[#DC2626] text-white rounded-sm text-[0.8rem] font-bold hover:bg-[#DC2626] transition-colors shadow-sm tracking-wide">
                          Disconnect
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Card - Setup Guide / Integration Hub */}
            <div className="flex-1">
              <div className="bg-transparent overflow-hidden flex flex-col h-full transition-all">
                <div className={`${headerBgClass} text-white p-3 px-4 flex justify-between items-center rounded-t-sm`}>
                  <h2 className="flex items-center gap-2 text-[0.95rem] font-bold tracking-wide">
                    <span className="material-symbols-outlined !text-[20px] text-white">storefront</span>
                    App Directory
                  </h2>
                </div>

                <div className="p-10 flex-1 flex flex-col items-center justify-center py-16 bg-surface-container-low border-x border-b border-outline/10">
                  <div className="w-24 h-24 rounded-full border-[6px] border-surface-container-high overflow-hidden mb-6 shadow-md shadow-black/5 flex items-center justify-center bg-primary-container/10 transition-all hover:border-primary-container/30">
                    <span className="material-symbols-outlined !text-[48px] text-primary-container">extension</span>
                  </div>

                  <h2 className="text-[1.5rem] font-bold text-on-surface tracking-tight lowercase text-center">
                    Explore Apps
                  </h2>
                  <p className="text-[0.9rem] font-medium text-on-surface-variant/60 mt-1 uppercase tracking-wider text-center">Connect Tools</p>

                  <div className="mt-8 text-center text-[0.85rem] text-on-surface-variant/70 leading-relaxed font-medium">
                    Extend Enttlevo CRM by integrating your favorite tools. Build powerful automations and sync data effortlessly across platforms.
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Company;
