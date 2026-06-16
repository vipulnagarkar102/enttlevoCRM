import React, { useState, useEffect } from 'react';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Password visibility state
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Accordion state
  const [openSections, setOpenSections] = useState({
    personal: true,
    work: true
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const headerBgClass = "bg-[#1A171F]";
  const headerHoverClass = "hover:bg-[#2A272F]";

  // Local state for form fields
  const [formData, setFormData] = useState({
    firstName: 'Arjun',
    lastName: 'Deshmukh',
    username: '@arjundeshmukh',
    phone: '+91 8787876765',
    email: 'a.deshmukh@reliance.com',
    role: 'VP of Operations',
    company: 'Reliance IT'
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
    { name: 'Profile', icon: 'person_outline' },
    { name: 'Security', icon: 'verified_user' },
    { name: 'Connected Accounts', icon: 'link' }
  ];

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col relative bg-[#FCFAFE] animate-in fade-in duration-300 text-on-surface">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] bg-[#1A171F] text-white px-6 py-3 rounded-md shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-8 fade-in duration-300">
          <span className="material-symbols-outlined !text-[20px] text-emerald-400">check_circle</span>
          <span className="text-[0.85rem] font-medium tracking-wide">Profile updated successfully!</span>
        </div>
      )}

      {/* Header - EXACT COMPANY DETAILS STYLE */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-surface-container-low px-4 sm:px-8 py-5 border-b border-outline/10 shadow-sm shrink-0">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 w-full sm:w-auto">
          <button className="flex items-center justify-center p-2 text-on-surface-variant hover:text-primary-container hover:bg-primary-container/10 rounded-full transition-colors">
            <span className="material-symbols-outlined !text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-[1.5rem] font-bold text-on-surface tracking-tight leading-tight flex items-center gap-3 lowercase">
              <span className="capitalize">{formData.firstName} {formData.lastName}</span>
              <span className="px-2 py-0.5 bg-surface-container text-on-surface text-[0.7rem] uppercase tracking-widest font-bold border border-outline/10 rounded-sm">
                IT
              </span>
            </h1>
            <p className="text-[0.85rem] text-on-surface-variant/80 mt-1">Profile Details & Management</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-1.5 border border-outline/10 rounded-sm bg-surface-container-low text-[0.75rem] font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined !text-[16px]">close</span>
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500 border border-emerald-600 text-white rounded-sm text-[0.75rem] font-bold hover:bg-emerald-600 transition-colors shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined !text-[16px]">save</span>
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-6 py-1.5 border border-outline/10 rounded-sm bg-surface-container-low text-[0.75rem] font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined !text-[18px]">edit</span>
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Tabs - MATCHING ACCOUNT OVERVIEW TABS STYLE */}
      <div className="px-4 sm:px-8 border-b border-outline-variant/30 mt-4 mb-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-4 sm:gap-8 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 pb-3 px-1 border-b-2 text-[0.85rem] font-bold transition-all ${
                activeTab === tab.name 
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

      {/* Main Content Area - Balanced Heights Like Company Details */}
      <div className="px-4 sm:px-8 flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8 pb-10">
        
        {activeTab === 'Profile' && (
          <>
            {/* Left Card - Personal Details (Collapsible Header Style) */}
            <div className="flex-[1.5] flex flex-col gap-6">
              <div className="bg-surface-container-low border border-outline/10 rounded-sm shadow-sm flex flex-col transition-all overflow-hidden">
                <div
                  onClick={() => toggleSection('personal')}
                  className={`${headerBgClass} text-white p-3 px-4 flex justify-between items-center rounded-t-sm cursor-pointer ${headerHoverClass} transition-colors`}
                >
                  <h2 className="flex items-center gap-2 text-[0.95rem] font-bold tracking-wide">
                    <span className="material-symbols-outlined !text-[20px] text-white">verified</span>
                    Personal Information
                  </h2>
                  <button className="hover:bg-white/10 rounded-full p-0.5 transition-colors flex items-center justify-center">
                    <span className={`material-symbols-outlined !text-[20px] transition-transform duration-300 ${!openSections.personal ? 'rotate-180' : ''}`}>expand_less</span>
                  </button>
                </div>

                {openSections.personal && (
                  <div className="p-6 sm:p-10 space-y-8 text-on-surface animate-in slide-in-from-top-2 fade-in duration-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-12 gap-y-6 lg:gap-y-8">
                       <div className="space-y-1.5">
                          <label className={labelCls}>
                            <span className="material-symbols-outlined !text-[14px]">person</span>
                            First Name
                          </label>
                          <input 
                            readOnly={!isEditing}
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            className={inputCls(isEditing)}
                          />
                       </div>
                       <div className="space-y-1.5">
                          <label className={labelCls}>
                            <span className="material-symbols-outlined !text-[14px]">person</span>
                            Last Name
                          </label>
                          <input 
                            readOnly={!isEditing}
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            className={inputCls(isEditing)}
                          />
                       </div>
                       <div className="space-y-1.5">
                          <label className={labelCls}>
                            <span className="material-symbols-outlined !text-[14px]">person_outline</span>
                            Username
                          </label>
                          <input 
                            readOnly={!isEditing}
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
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
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className={inputCls(isEditing)}
                          />
                       </div>
                       <div className="col-span-1 sm:col-span-2 space-y-1.5">
                          <label className={labelCls}>
                            <span className="material-symbols-outlined !text-[14px]">mail</span>
                            Email Address
                          </label>
                          <input 
                            readOnly
                            value={formData.email}
                            className={inputCls(false)}
                          />
                       </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Card - Profile Hub (Balanced Height) */}
            <div className="flex-1">
               <div className="bg-surface-container-low border border-outline/10 rounded-sm shadow-sm overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
                <div className={`${headerBgClass} text-white p-3 px-4 flex justify-between items-center rounded-t-sm`}>
                  <h2 className="flex items-center gap-2 text-[0.95rem] font-bold tracking-wide">
                    <span className="material-symbols-outlined !text-[20px] text-white">account_circle</span>
                    Profile
                  </h2>
                </div>

                <div className="p-10 flex-1 flex flex-col items-center justify-center py-16">
                    <div className="w-24 h-24 rounded-full border-[6px] border-surface-container-high overflow-hidden mb-6 shadow-md shadow-black/5 transition-all hover:border-primary-container/30">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
                        alt="Arjun" 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h2 className="text-[1.5rem] font-bold text-on-surface tracking-tight lowercase text-center">
                       <span className="capitalize">{formData.firstName} {formData.lastName}</span>
                    </h2>
                    <p className="text-[0.9rem] font-medium text-on-surface-variant/60 mt-1 uppercase tracking-wider text-center">{formData.role}</p>

                    <div className="flex items-center gap-3 mt-10">
                       <button className="w-10 h-10 flex items-center justify-center bg-primary-container/10 border border-primary-container/20 rounded-md text-primary-container hover:bg-primary-container hover:text-white transition-all shadow-sm active:scale-95">
                          <span className="material-symbols-outlined !text-[20px]">linked_camera</span>
                       </button>
                       <button className="w-10 h-10 flex items-center justify-center bg-surface-container/50 border border-outline/10 rounded-md text-on-surface-variant/60 hover:bg-primary-container hover:text-white transition-all shadow-sm active:scale-95">
                          <span className="material-symbols-outlined !text-[20px]">mail</span>
                       </button>
                       <button className="w-10 h-10 flex items-center justify-center bg-surface-container/50 border border-outline/10 rounded-md text-on-surface-variant/60 hover:bg-primary-container hover:text-white transition-all shadow-sm active:scale-95">
                          <span className="material-symbols-outlined !text-[20px]">call</span>
                       </button>
                    </div>

                    <div className="mt-12 w-full max-w-[280px] p-6 bg-surface-container/20 border border-outline/5 rounded-2xl flex flex-col items-center gap-1.5 transition-colors hover:bg-surface-container/30">
                        <div className="flex items-center gap-2 text-[0.65rem] font-black text-on-surface-variant/30 uppercase tracking-[0.2em]">
                          <span className="material-symbols-outlined !text-[14px]">history</span>
                          Last Updated
                        </div>
                        <div className="text-[0.85rem] font-bold text-on-surface-variant/80 tracking-tight">Oct 25, 2023 • 11:15 AM</div>
                    </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'Security' && (
          <>
            {/* Left Card - Password Management */}
            <div className="flex-[1.5] flex flex-col gap-6">
              <div className="bg-surface-container-low border border-outline/10 rounded-sm shadow-sm flex flex-col transition-all overflow-hidden h-full">
                <div className={`${headerBgClass} text-white p-3 px-4 flex justify-between items-center rounded-t-sm cursor-pointer ${headerHoverClass} transition-colors`}>
                  <h2 className="flex items-center gap-2 text-[0.95rem] font-bold tracking-wide">
                    <span className="material-symbols-outlined !text-[20px] text-white">lock</span>
                    Password
                  </h2>
                </div>

                <div className="p-6 sm:p-10 space-y-8 text-on-surface animate-in slide-in-from-top-2 fade-in duration-300 flex-1">
                  <div className="grid grid-cols-1 gap-y-8 w-full sm:max-w-lg">
                     <div className="space-y-1.5">
                        <label className={labelCls}>
                          <span className="material-symbols-outlined !text-[14px]">key</span>
                          Current Password
                        </label>
                        <div className="relative">
                          <input 
                            type={showCurrentPassword ? "text" : "password"}
                            readOnly={!isEditing}
                            className={`${inputCls(isEditing)} pr-10`}
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            disabled={!isEditing}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-center transition-colors ${!isEditing ? 'text-on-surface-variant/30 cursor-not-allowed' : 'text-on-surface-variant/60 hover:text-on-surface'}`}
                          >
                            <span className="material-symbols-outlined !text-[18px]">
                              {showCurrentPassword ? 'visibility_off' : 'visibility'}
                            </span>
                          </button>
                        </div>
                     </div>
                     <div className="space-y-1.5">
                        <label className={labelCls}>
                          <span className="material-symbols-outlined !text-[14px]">lock_reset</span>
                          New Password
                        </label>
                        <div className="relative">
                          <input 
                            type={showNewPassword ? "text" : "password"}
                            readOnly={!isEditing}
                            className={`${inputCls(isEditing)} pr-10`}
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            disabled={!isEditing}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-center transition-colors ${!isEditing ? 'text-on-surface-variant/30 cursor-not-allowed' : 'text-on-surface-variant/60 hover:text-on-surface'}`}
                          >
                            <span className="material-symbols-outlined !text-[18px]">
                              {showNewPassword ? 'visibility_off' : 'visibility'}
                            </span>
                          </button>
                        </div>
                     </div>
                     <div className="space-y-1.5">
                        <label className={labelCls}>
                          <span className="material-symbols-outlined !text-[14px]">check_circle</span>
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input 
                            type={showConfirmPassword ? "text" : "password"}
                            readOnly={!isEditing}
                            className={`${inputCls(isEditing)} pr-10`}
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={!isEditing}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 flex items-center transition-colors ${!isEditing ? 'text-on-surface-variant/30 cursor-not-allowed' : 'text-on-surface-variant/60 hover:text-on-surface'}`}
                          >
                            <span className="material-symbols-outlined !text-[18px]">
                              {showConfirmPassword ? 'visibility_off' : 'visibility'}
                            </span>
                          </button>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card - Security Hub (Balanced Height) */}
            <div className="flex-1">
               <div className="bg-surface-container-low border border-outline/10 rounded-sm shadow-sm overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
                <div className={`${headerBgClass} text-white p-3 px-4 flex justify-between items-center rounded-t-sm`}>
                  <h2 className="flex items-center gap-2 text-[0.95rem] font-bold tracking-wide">
                    <span className="material-symbols-outlined !text-[20px] text-white">security</span>
                    Security Activity
                  </h2>
                </div>

                <div className="p-10 flex-1 flex flex-col items-center justify-center py-16">
                    <div className="w-24 h-24 rounded-full border-[6px] border-surface-container-high overflow-hidden mb-6 shadow-md shadow-black/5 bg-primary-container/10 flex items-center justify-center transition-all hover:border-primary-container/30">
                      <span className="material-symbols-outlined !text-[40px] text-primary-container">shield_person</span>
                    </div>

                    <h2 className="text-[1.5rem] font-bold text-on-surface tracking-tight lowercase text-center">
                       Account Secured
                    </h2>
                    <p className="text-[0.9rem] font-medium text-emerald-500 mt-1 uppercase tracking-wider text-center">No vulnerabilities found</p>

                    <div className="mt-12 w-full max-w-[280px] p-6 bg-surface-container/20 border border-outline/5 rounded-2xl flex flex-col items-center gap-1.5 transition-colors hover:bg-surface-container/30">
                        <div className="flex items-center gap-2 text-[0.65rem] font-black text-on-surface-variant/30 uppercase tracking-[0.2em]">
                          <span className="material-symbols-outlined !text-[14px]">history</span>
                          Password Last Changed
                        </div>
                        <div className="text-[0.85rem] font-bold text-on-surface-variant/80 tracking-tight">Nov 12, 2023 • 09:30 AM</div>
                    </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'Connected Accounts' && (
          <>
            {/* Left Card - Connected Accounts List */}
            <div className="flex-[1.5] flex flex-col gap-6">
              <div className="bg-surface-container-low border border-outline/10 rounded-sm shadow-sm flex flex-col transition-all overflow-hidden h-full">
                
                {/* Header - Today's Notification Style */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-surface-container-low/50 border-b border-outline/10 flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
                  <span className="material-symbols-outlined text-primary-container !text-[20px]">link</span>
                  <h3 className="text-[0.75rem] font-bold text-on-surface-variant uppercase tracking-[0.2em] break-words">Active Connections</h3>
                  <div className="ml-auto bg-primary-container/10 text-primary-container text-[0.65rem] font-bold px-2 py-0.5 rounded-sm border border-primary-container/20">
                    3
                  </div>
                </div>

                <div className="divide-y divide-outline/5 overflow-y-auto flex-1">
                  {[
                    { id: 1, name: 'Google Workspace', status: 'Synced 5 mins ago', type: 'email', icon: 'mail', active: true },
                    { id: 2, name: 'Slack Integration', status: 'Active connection', type: 'success', icon: 'tag', active: true },
                    { id: 3, name: 'Stripe Billing', status: 'Requires re-authentication', type: 'error', icon: 'payments', active: false }
                  ].map((n) => (
                    <div 
                      key={n.id} 
                      className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-4 sm:px-6 min-h-[52px] py-3 sm:py-2 hover:bg-primary-container/[0.04] transition-all cursor-pointer group relative ${!n.active ? 'bg-primary-container/[0.02]' : ''}`}
                    >
                      {/* Branded Status Indicator */}
                      {!n.active && (
                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-error"></div>
                      )}
                      
                      <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                        <div className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 shadow-sm border border-outline/10 ${
                          n.type === 'email' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                          n.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                          n.type === 'error' ? 'bg-error/10 text-error border-error/20' :
                          'bg-primary-container/10 text-primary-container border-primary-container/20'
                        }`}>
                          <span className="material-symbols-outlined !text-[18px]">
                            {n.icon}
                          </span>
                        </div>
                        
                        <h4 className={`sm:hidden flex-1 text-[0.85rem] ${!n.active ? 'font-bold' : 'font-semibold'} text-on-surface group-hover:text-primary-container transition-colors tracking-tight truncate`}>
                          {n.name}
                        </h4>
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-8 pl-11 sm:pl-0">
                        <h4 className={`hidden sm:block w-[200px] shrink-0 text-[0.85rem] ${!n.active ? 'font-bold' : 'font-semibold'} text-on-surface group-hover:text-primary-container transition-colors tracking-tight truncate`}>
                          {n.name}
                        </h4>
                        <p className={`w-full sm:flex-1 text-[0.85rem] truncate font-medium ${!n.active ? 'text-error/80' : 'text-on-surface-variant/60'}`}>
                          {n.status}
                        </p>
                      </div>

                      <div className="shrink-0 w-full sm:w-auto sm:min-w-[150px] text-right relative flex items-center justify-end pl-11 sm:pl-0 mt-2 sm:mt-0">
                        <span className={`text-[0.7rem] font-bold uppercase sm:group-hover:opacity-0 transition-all hidden sm:block ${n.active ? 'text-emerald-500' : 'text-error'}`}>
                          {n.active ? 'Connected' : 'Attention'}
                        </span>
                        <div className="sm:absolute sm:right-0 flex gap-2 w-full sm:w-auto sm:opacity-0 sm:group-hover:opacity-100 transition-all">
                          {n.active ? (
                            <>
                              <button className="px-3 py-1.5 sm:py-1 bg-primary-container/10 text-primary-container rounded-sm text-[0.75rem] sm:text-[0.7rem] font-bold hover:bg-primary-container/20">
                                Sync
                              </button>
                              <button className="px-3 py-1.5 sm:py-1 bg-error/10 text-error rounded-sm text-[0.75rem] sm:text-[0.7rem] font-bold hover:bg-error/20">
                                D/C
                              </button>
                            </>
                          ) : (
                            <button className="px-3 py-1.5 sm:py-1 bg-primary-container/10 text-primary-container rounded-sm text-[0.75rem] sm:text-[0.7rem] font-bold hover:bg-primary-container/20">
                              Reconnect
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Card - Connection Hub */}
            <div className="flex-1">
               <div className="bg-surface-container-low border border-outline/10 rounded-sm shadow-sm overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
                <div className={`${headerBgClass} text-white p-3 px-4 flex justify-between items-center rounded-t-sm`}>
                  <h2 className="flex items-center gap-2 text-[0.95rem] font-bold tracking-wide">
                    <span className="material-symbols-outlined !text-[20px] text-white">hub</span>
                    Integration Hub
                  </h2>
                </div>

                <div className="p-10 flex-1 flex flex-col items-center justify-center py-16">
                    <div className="w-24 h-24 rounded-full border-[6px] border-surface-container-high overflow-hidden mb-6 shadow-md shadow-black/5 bg-primary-container/10 flex items-center justify-center transition-all hover:border-primary-container/30">
                      <span className="material-symbols-outlined !text-[40px] text-primary-container">dns</span>
                    </div>

                    <h2 className="text-[1.5rem] font-bold text-on-surface tracking-tight lowercase text-center">
                       2 Active
                    </h2>
                    <p className="text-[0.9rem] font-medium text-error mt-1 uppercase tracking-wider text-center">1 Offline</p>

                    <div className="mt-12 w-full max-w-[280px] p-6 bg-surface-container/20 border border-outline/5 rounded-2xl flex flex-col items-center gap-1.5 transition-colors hover:bg-surface-container/30">
                        <div className="flex items-center gap-2 text-[0.65rem] font-black text-on-surface-variant/30 uppercase tracking-[0.2em]">
                          <span className="material-symbols-outlined !text-[14px]">sync</span>
                          Last Full Sync
                        </div>
                        <div className="text-[0.85rem] font-bold text-on-surface-variant/80 tracking-tight">Today • 10:45 AM</div>
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

export default Profile;
