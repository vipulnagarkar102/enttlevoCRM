import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Module/Login/Login';
import SalesDashboard from './Module/sales_dashboard';
import SalesAllLeads from './Module/sales_all_leads';
import SalesDeals from './Module/sales_deals';
import SalesTasks from './Module/sales_tasks';
import SalesSchedulerPage from './Module/sales_schedular';

import OnboardingDashboard from './Module/Onboarding/onboarding_dashboard';
import OnboardingAccounts from './Module/Onboarding/onboarding_accounts';
import OnboardingTasks from './Module/Onboarding/onboarding_tasks';
import OnboardingSchedularPage from './Module/Onboarding/onboarding_schedular';
import OnboardingReports from './Module/Onboarding/onboarding_reports';

import AMDashboard from './Module/AM/am_dashboard';
import AMAccounts from './Module/AM/am_accounts';
import AMTasks from './Module/AM/am_tasks';
import AMReports from './Module/AM/am_reports';

import AMSchedularPage from './Module/AM/am_schedular';
import AMPayment from './Module/AM/am_payment';
import EmailMain from './Module/Email/EmailMain';
import NotificationMain from './Module/Notifications/NotificationMain';
import IntegrationMain from './Module/Integration/IntegrationMain';
import SettingsMain from './Module/Settings/SettingsMain';

const AppRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('crm_auth') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('crm_auth', 'true');
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Sales Module */}
        <Route path="/" element={<SalesDashboard />} />
        <Route path="/leads" element={<SalesAllLeads />} />
        <Route path="/deals" element={<SalesDeals />} />
        <Route path="/tasks" element={<SalesTasks />} />
        <Route path="/scheduler" element={<SalesSchedulerPage />} />

        {/* Onboarding Module */}
        <Route path="/onboarding" element={<OnboardingDashboard />} />
        <Route path="/onboarding/dashboard" element={<OnboardingDashboard />} />
        <Route path="/onboarding/accounts" element={<OnboardingAccounts />} />
        <Route path="/onboarding/tasks" element={<OnboardingTasks />} />
        <Route path="/onboarding/scheduler" element={<OnboardingSchedularPage />} />
        <Route path="/onboarding/schedular" element={<OnboardingSchedularPage />} />
        <Route path="/onboarding/reports" element={<OnboardingReports />} />

        {/* AM Module */}
        <Route path="/am" element={<AMDashboard />} />
        <Route path="/am/dashboard" element={<AMDashboard />} />
        <Route path="/am/accounts" element={<AMAccounts />} />
        <Route path="/am/tasks" element={<AMTasks />} />
        <Route path="/am/scheduler" element={<AMSchedularPage />} />
        <Route path="/am/schedular" element={<AMSchedularPage />} />
        <Route path="/am/reports" element={<AMReports />} />
        <Route path="/am/payment" element={<AMPayment />} />

        {/* Email Module */}
        <Route path="/email" element={<EmailMain />} />
        <Route path="/email/inbox" element={<EmailMain />} />
        <Route path="/email/sent" element={<EmailMain />} />
        <Route path="/email/drafts" element={<EmailMain />} />
        <Route path="/email/templates" element={<EmailMain />} />

        {/* Notifications Module */}
        <Route path="/notifications" element={<NotificationMain />} />
        <Route path="/notifications/today" element={<NotificationMain />} />
        <Route path="/notifications/upcoming" element={<NotificationMain />} />

        {/* Integration Module */}
        <Route path="/integration" element={<IntegrationMain />} />
        <Route path="/integration/campaign" element={<IntegrationMain />} />
        <Route path="/integration/workflows" element={<IntegrationMain />} />
        <Route path="/integration/workflows-library" element={<IntegrationMain />} />
        <Route path="/integration/call-hippo" element={<IntegrationMain />} />
        <Route path="/integration/audio-transcription" element={<IntegrationMain />} />

        {/* Settings Module */}
        <Route path="/settings" element={<SettingsMain />} />
        <Route path="/settings/profile" element={<SettingsMain />} />
        <Route path="/settings/company" element={<SettingsMain />} />
        <Route path="/settings/user-role" element={<SettingsMain />} />
        <Route path="/settings/data-rules" element={<SettingsMain />} />
        <Route path="/settings/integrations" element={<SettingsMain />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
