import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import { useTheme } from '../../context/ThemeContext';
import enttlevoIcon from '../../assets/enttlevologo1.png';

// Import subpages (to be created)
import Profile from './Profile';
import Company from './Company';
import UserRoleManagement from './UserRoleManagement';
import DataRules from './DataRules';
import IntegrationLibrary from './IntegrationLibrary';

const SettingsMain: React.FC = () => {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const path = window.location.pathname;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="h-full flex flex-col items-center justify-center gap-6 transition-all duration-300">
          <div className="relative">
            <img
              src={enttlevoIcon}
              alt="Loading..."
              className="w-16 h-16 grayscale opacity-40 animate-pulse transition-all duration-700"
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <h4 className="text-[0.75rem] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] animate-pulse">Loading Settings</h4>
            <p className="text-[0.65rem] text-on-surface-variant/20 italic font-medium tracking-tight">Accessing Enttlevo CRM Config...</p>
          </div>
        </div>
      );
    }

    if (path === '/settings/profile') return <Profile />;
    if (path === '/settings/company') return <Company />;
    if (path === '/settings/user-role') return <UserRoleManagement />;
    if (path === '/settings/data-rules') return <DataRules />;
    if (path === '/settings/integrations') return <IntegrationLibrary />;
    
    return <Profile />; // Default
  };

  const getTitle = () => {
    if (path === '/settings/profile') return "Profile Settings";
    if (path === '/settings/company') return "Company Settings";
    if (path === '/settings/user-role') return "Role Management";
    if (path === '/settings/data-rules') return "Data Governance";
    if (path === '/settings/integrations') return "Integration Hub";
    return "Settings";
  };

  const getSubtitle = () => {
    if (path === '/settings/profile') return ""; // subtitle removed to match image simplicity
    if (path === '/settings/company') return "Configure organization-wide details and branding";
    if (path === '/settings/user-role') return "Define access levels and team permissions";
    if (path === '/settings/data-rules') return "Set validation rules and data entry standards";
    if (path === '/settings/integrations') return "Connect third-party tools and API services";
    return "Configure your Enttlevo CRM experience";
  };

  return (
    <div className="bg-surface text-on-surface flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchPlaceholder="Search settings..." />

        <main 
          className={`main-content flex-1 flex flex-col overflow-hidden ${path === '/settings/profile' || path === '/settings/company' || path === '/settings/user-role' || path === '/settings/data-rules' || path === '/settings/integrations' ? 'p-0' : 'p-4 sm:p-6 lg:p-8 pb-4'}`} 
          style={{ height: 'calc(100vh - 40px)', marginTop: '40px' }}
        >
          {path !== '/settings/profile' && path !== '/settings/company' && path !== '/settings/user-role' && path !== '/settings/data-rules' && path !== '/settings/integrations' && (
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-4 sm:mb-8 px-4 sm:px-6 lg:px-10 mt-4 sm:mt-8">
              <div className="text-left">
                <h1 className="text-[1.75rem] font-medium tracking-tight text-on-surface leading-tight font-headline uppercase">
                  {getTitle()}
                </h1>
                <p className="text-on-surface-variant text-[0.9rem] mt-0.5 font-body">
                  {getSubtitle()}
                </p>
              </div>
            </div>
          )}

          <div className={`flex-1 flex flex-col min-h-0 overflow-hidden ${path === '/settings/profile' || path === '/settings/company' || path === '/settings/user-role' || path === '/settings/data-rules' || path === '/settings/integrations' ? '' : 'bg-surface-container-low/30 rounded-sm border border-outline/5'}`}>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsMain;
