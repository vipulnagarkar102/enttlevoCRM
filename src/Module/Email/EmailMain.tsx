import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import ComposeEmailOverlay from '../../components/AM_dashboard/ComposeEmailOverlay';

// Modular Components
import EmailHeader from '../../components/Email/EmailHeader';
import EmailTabs from '../../components/Email/EmailTabs';
import EmailList from '../../components/Email/EmailList';
import EmailDetailView from '../../components/Email/EmailDetailView';
import CreateTicketOverlay from '../../components/Email/CreateTicketOverlay';
import SummarizeOverlay from '../../components/Email/SummarizeOverlay';
import type { Email } from '../../components/Email/types';

const EmailMain: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFolder, setActiveFolder] = useState('Inbox');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [isSummarizeOpen, setIsSummarizeOpen] = useState(false);
  const [viewingEmail, setViewingEmail] = useState<Email | null>(null);
  const [ticketEmailContext, setTicketEmailContext] = useState<Email | null>(null);
  const [summarizeEmailContext, setSummarizeEmailContext] = useState<Email | null>(null);
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 18;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFolder, searchQuery]);

  const [emails, setEmails] = useState<Email[]>([
    {
      id: 1,
      folder: 'Inbox',
      sender: '"Fred from Fireflies.ai"',
      email: 'fred@fireflies.ai',
      initials: 'F',
      subject: 'Your meeting recap - Auris/Carex: Reports Discussion',
      snippet: 'Auxplutes Tech (admin@auxplutes.com) invited Fireflies to join the call and record the discussion for future reference.',
      time: '05:14 AM',
      isStarred: false,
      initialsBg: 'bg-[#E3C54E] text-white',
      date: 'Today',
      unread: true
    },
    {
      id: 2,
      folder: 'Inbox',
      sender: '"Fred from Fireflies.ai"',
      email: 'fred@fireflies.ai',
      initials: 'F',
      subject: 'Meeting Prep: Standup: Team',
      snippet: 'Fireflies.ai Standup: Team Apr 14, 2026 - 11:00 AM IST U.',
      time: '04:26 AM',
      isStarred: false,
      initialsBg: 'bg-[#E3C54E] text-white',
      date: 'Today',
      unread: true
    },
    {
      id: 3,
      folder: 'Inbox',
      sender: 'E2E Networks',
      email: 'billing-support@e2enetworks.com',
      initials: 'EN',
      subject: '[E2E Networks] Alert! credit balance low',
      snippet: 'Dear Customer (CRN - 31339), your account credit balance is below the minimum threshold.',
      time: 'Yesterday',
      isStarred: false,
      initialsBg: 'bg-[#BDB719] text-white',
      date: 'Apr 13',
      unread: false
    },
    {
      id: 4,
      folder: 'Inbox',
      sender: 'IndiaFilings Team',
      email: 'compliance@indiafilings.com',
      initials: 'IT',
      subject: 'Companies Compliance Facilitation Scheme, 2026',
      snippet: 'Follow-up regarding the new compliance filing window opening soon.',
      time: 'Yesterday',
      isStarred: true,
      initialsBg: 'bg-[#BDB719] text-white',
      date: 'Apr 13',
      unread: false
    },
    {
      id: 5,
      folder: 'Inbox',
      sender: 'Amazon Web Services',
      email: 'no-reply@amazonaws.com',
      initials: 'AW',
      subject: 'Payment issues for March-2026',
      snippet: 'Issue processing your payment method on file for March.',
      time: 'Yesterday',
      isStarred: false,
      initialsBg: 'bg-[#BDB719] text-white',
      date: 'Apr 13',
      unread: false
    },
    {
      id: 6,
      folder: 'Inbox',
      sender: 'bankalerts@kotak.bank.in',
      email: 'bankalerts@kotak.bank.in',
      initials: 'B',
      subject: 'Transaction alert for your account',
      snippet: 'A transaction has been made on your account ending in 0921.',
      time: 'Yesterday',
      isStarred: false,
      initialsBg: 'bg-[#BDB719] text-white',
      date: 'Apr 13',
      unread: false
    },
    {
      id: 7,
      folder: 'Sent',
      sender: 'Arjun Deshmukh',
      email: 'arjun.d@enterprise.com',
      initials: 'AD',
      subject: 'Proposal for Q4 Partnership',
      snippet: 'Attached is the revised proposal as discussed.',
      time: '11:20 AM',
      isStarred: false,
      initialsBg: 'bg-primary-container text-white',
      date: 'Today',
      unread: false
    },
    {
      id: 8,
      folder: 'Drafts',
      sender: 'Draft',
      email: '',
      initials: 'D',
      subject: 'Follow up with AWS account manager',
      snippet: 'Discussion about the recent billing discrepancy...',
      time: '09:00 AM',
      isStarred: false,
      initialsBg: 'bg-surface-container-high text-on-surface-variant',
      date: 'Today',
      unread: false
    },
    {
      id: 9,
      folder: 'Inbox',
      sender: 'Google Workspace',
      email: 'workspace-noreply@google.com',
      initials: 'GW',
      subject: 'Your Google Workspace bill is ready',
      snippet: 'Your invoice for March 2026 is now available.',
      time: 'Apr 12',
      isStarred: false,
      initialsBg: 'bg-[#4285F4] text-white',
      date: 'Apr 12',
      unread: false
    },
    {
      id: 10,
      folder: 'Inbox',
      sender: 'Slack Notifications',
      email: 'notifications@slack.com',
      initials: 'S',
      subject: 'New message in #product-updates',
      snippet: 'We just pushed the latest design tokens.',
      time: 'Apr 12',
      isStarred: false,
      initialsBg: 'bg-[#4A154B] text-white',
      date: 'Apr 12',
      unread: false
    },
    {
      id: 11,
      folder: 'Inbox',
      sender: 'Zoom Video Communications',
      email: 'no-reply@zoom.us',
      initials: 'Z',
      subject: 'Your cloud recording is available',
      snippet: 'The recording for "Weekly Product Sync" is now processed.',
      time: 'Apr 11',
      isStarred: false,
      initialsBg: 'bg-[#2D8CFF] text-white',
      date: 'Apr 11',
      unread: false
    },
    {
      id: 12,
      folder: 'Inbox',
      sender: 'GitHub',
      email: 'noreply@github.com',
      initials: 'GH',
      subject: '[GitHub] Personal access token added',
      snippet: 'A new personal access token was added to your account.',
      time: 'Apr 11',
      isStarred: false,
      initialsBg: 'bg-[#181717] text-white',
      date: 'Apr 11',
      unread: false
    },
    {
      id: 13,
      folder: 'Inbox',
      sender: 'LinkedIn',
      email: 'messages-noreply@linkedin.com',
      initials: 'L',
      subject: 'New message from Vipul Nagarkar',
      snippet: 'Saw your recent post about the CRM update.',
      time: 'Apr 10',
      isStarred: true,
      initialsBg: 'bg-[#0A66C2] text-white',
      date: 'Apr 10',
      unread: false
    },
    {
      id: 14,
      folder: 'Inbox',
      sender: 'Trello',
      email: 'do-not-reply@trello.com',
      initials: 'T',
      subject: 'New card "Email Module Redesign" added',
      snippet: 'A new card was created in the "In Progress" column.',
      time: 'Apr 10',
      isStarred: false,
      initialsBg: 'bg-[#0079BF] text-white',
      date: 'Apr 10',
      unread: false
    },
    {
      id: 15,
      folder: 'Sent',
      sender: 'Arjun Deshmukh',
      email: 'arjun@enttlevo.com',
      initials: 'AD',
      subject: 'Re: Project Roadmap Update',
      snippet: 'Incorporate changes and send final draft tomorrow.',
      time: 'Apr 09',
      isStarred: false,
      initialsBg: 'bg-primary-container text-white',
      date: 'Apr 09',
      unread: false
    },
    {
      id: 16,
      folder: 'Trash',
      sender: 'Marketing Hub',
      email: 'newsletter@marketing.com',
      initials: 'M',
      subject: 'Limited time offer: 50% off',
      snippet: 'Biggest sale of the year. Level up your marketing skills.',
      time: 'Apr 08',
      isStarred: false,
      initialsBg: 'bg-surface-container-high text-on-surface-variant',
      date: 'Apr 08',
      unread: false
    },
    {
      id: 17,
      folder: 'Drafts',
      sender: 'Draft',
      email: '',
      initials: 'D',
      subject: 'Feedback on new UI components',
      snippet: 'Reviewing the new components you added.',
      time: 'Apr 07',
      isStarred: false,
      initialsBg: 'bg-surface-container-high text-on-surface-variant',
      date: 'Apr 07',
      unread: false
    },
    {
      id: 18,
      folder: 'Inbox',
      sender: 'Microsoft Azure',
      email: 'azure-noreply@microsoft.com',
      initials: 'AZ',
      subject: 'Planned maintenance for Azure resources',
      snippet: 'Scheduled maintenance for some of your resources.',
      time: 'Apr 06',
      isStarred: false,
      initialsBg: 'bg-[#0078D4] text-white',
      date: 'Apr 06',
      unread: false
    },
    {
      id: 19,
      folder: 'Sent',
      sender: 'Arjun Deshmukh',
      email: 'arjun@enttlevo.com',
      initials: 'AD',
      subject: 'Onboarding docs for sales team',
      snippet: 'Attached are documents to get team up to speed.',
      time: 'Apr 05',
      isStarred: true,
      initialsBg: 'bg-primary-container text-white',
      date: 'Apr 05',
      unread: false
    },
    {
      id: 20,
      folder: 'Inbox',
      sender: 'Stack Overflow',
      email: 'digest@stackoverflow.com',
      initials: 'SO',
      subject: 'Top questions of the week',
      snippet: 'Most interesting questions from your communities.',
      time: 'Apr 04',
      isStarred: false,
      initialsBg: 'bg-[#F48024] text-white',
      date: 'Apr 04',
      unread: false
    }
  ]);

  const filteredEmails = emails.filter(e => e.folder === activeFolder &&
    (e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.sender.toLowerCase().includes(searchQuery.toLowerCase())));

  const totalItems = filteredEmails.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const displayedEmails = filteredEmails.slice(startIndex, endIndex);

  const isAllSelected = displayedEmails.length > 0 && displayedEmails.every(e => selectedEmails.includes(e.id));

  const handleSelectAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAllSelected) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(displayedEmails.map(e => e.id));
    }
  };

  const toggleSelect = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedEmails.includes(id)) {
      setSelectedEmails(selectedEmails.filter(sid => sid !== id));
    } else {
      setSelectedEmails([...selectedEmails, id]);
    }
  };

  const toggleStar = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEmails(emails.map(eObj => eObj.id === id ? { ...eObj, isStarred: !eObj.isStarred } : eObj));
  };

  const handleEmailClick = (email: Email) => {
    setViewingEmail(email);
    if (email.unread) {
      setEmails(emails.map(e => e.id === email.id ? { ...e, unread: false } : e));
    }
  };

  const handleCreateTicket = (email: Email) => {
    setTicketEmailContext(email);
    setIsTicketOpen(true);
  };

  const handleSummarize = (email: Email) => {
    setSummarizeEmailContext(email);
    setIsSummarizeOpen(true);
  };

  return (
    <div className="bg-surface text-on-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchPlaceholder="Search mail" />
        <main className="main-content flex-1 flex flex-col p-4 sm:p-6 lg:p-8 pb-4" style={{ height: 'calc(100vh - 40px)', marginTop: '40px' }}>
          <EmailHeader
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onCompose={() => setIsComposeOpen(true)}
          />
          <EmailTabs
            activeFolder={activeFolder}
            setActiveFolder={(folder) => { setActiveFolder(folder); setSelectedEmails([]); setViewingEmail(null); }}
            emails={emails}
            isViewingDetail={!!viewingEmail}
          />
          <div className="flex-1 flex flex-col min-h-0 bg-white/5 rounded-sm border border-black/5 overflow-hidden">
            {viewingEmail ? (
              <EmailDetailView email={viewingEmail} onBack={() => setViewingEmail(null)} />
            ) : (
              <EmailList
                isLoading={isLoading}
                activeFolder={activeFolder}
                displayedEmails={displayedEmails}
                selectedEmails={selectedEmails}
                handleSelectAll={handleSelectAll}
                toggleSelect={toggleSelect}
                toggleStar={toggleStar}
                handleEmailClick={handleEmailClick}
                startIndex={startIndex}
                endIndex={endIndex}
                totalItems={totalItems}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                isAllSelected={isAllSelected}
                onCreateTicket={handleCreateTicket}
                onSummarize={handleSummarize}
              />
            )}
          </div>
        </main>
      </div>
      <ComposeEmailOverlay isOpen={isComposeOpen} onClose={() => setIsComposeOpen(false)} />
      <CreateTicketOverlay
        isOpen={isTicketOpen}
        onClose={() => setIsTicketOpen(false)}
        emailContext={ticketEmailContext}
      />
      <SummarizeOverlay
        isOpen={isSummarizeOpen}
        onClose={() => setIsSummarizeOpen(false)}
        emailContext={summarizeEmailContext}
      />
    </div>
  );
};

export default EmailMain;
