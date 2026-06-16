import React from 'react';
import type { Email } from './types';

interface EmailTabsProps {
  activeFolder: string;
  setActiveFolder: (folder: string) => void;
  emails: Email[];
  isViewingDetail?: boolean;
}

const EmailTabs: React.FC<EmailTabsProps> = ({ activeFolder, setActiveFolder, emails, isViewingDetail }) => {
  if (isViewingDetail) return null;
  
  const folders = ['Inbox', 'Sent', 'Drafts', 'Trash'];
  
  return (
    <div className="border-b border-outline-variant/30 mb-6 shrink-0 transition-all overflow-x-auto no-scrollbar">
      <div className="flex gap-4 sm:gap-8 min-w-max">
        {folders.map((folder) => {
          const count = emails.filter(e => e.folder === folder && (folder === 'Inbox' ? e.unread : false)).length;
          const icon = folder === 'Inbox' ? 'inbox' : folder === 'Sent' ? 'send' : folder === 'Drafts' ? 'draft' : 'delete';
          return (
            <button
              key={folder}
              onClick={() => setActiveFolder(folder)}
              className={`flex items-center gap-2 pb-3 text-[0.9rem] font-medium transition-all relative whitespace-nowrap ${
                activeFolder === folder ? 'text-primary-container' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined !text-[18px]">{icon}</span>
              {folder}
              {count > 0 && (
                <span className="text-[0.65rem] font-bold bg-primary-container text-white px-1.5 py-0.5 rounded-sm ml-1.5">
                  {count}
                </span>
              )}
              {activeFolder === folder && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-container"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EmailTabs;
