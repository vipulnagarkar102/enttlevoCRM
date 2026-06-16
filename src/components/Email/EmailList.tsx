import React from 'react';
import type { Email } from './types';
import enttlevoIcon from '../../assets/enttlevologo1.png';

interface EmailListProps {
  isLoading: boolean;
  activeFolder: string;
  displayedEmails: Email[];
  selectedEmails: number[];
  handleSelectAll: (e: React.MouseEvent) => void;
  toggleSelect: (id: number, e: React.MouseEvent) => void;
  toggleStar: (id: number, e: React.MouseEvent) => void;
  handleEmailClick: (email: Email) => void;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  isAllSelected: boolean;
  onCreateTicket: (email: Email) => void;
  onSummarize: (email: Email) => void;
}

const EmailList: React.FC<EmailListProps> = ({
  isLoading,
  displayedEmails,
  selectedEmails,
  handleSelectAll,
  toggleSelect,
  toggleStar,
  handleEmailClick,
  startIndex,
  endIndex,
  totalItems,
  currentPage,
  totalPages,
  setCurrentPage,
  isAllSelected,
  onCreateTicket,
  onSummarize
}) => {
  return (
    <div className="h-full flex flex-col min-w-0">
      {/* Toolbar */}
      <div className="bg-[#f8f9fa] dark:bg-white/[0.02] border-b border-black/5 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div
            onClick={handleSelectAll}
            className={`w-[18px] h-[18px] rounded-sm flex items-center justify-center transition-all cursor-pointer ${isAllSelected ? 'bg-primary-container' : 'border border-outline/30 bg-white dark:bg-transparent'}`}
          >
            {isAllSelected && <span className="material-symbols-outlined !text-[14px] text-white">check</span>}
          </div>
          <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant/60">
            <span className="material-symbols-outlined !text-[20px]">refresh</span>
          </button>

          {selectedEmails.length > 0 && (
            <div className="flex items-center gap-2 border-l border-outline/20 ml-2 pl-4">
              <span className="text-[0.75rem] font-bold text-primary-container">{selectedEmails.length} Selected</span>
              <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant"><span className="material-symbols-outlined !text-[18px]">archive</span></button>
              <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-error"><span className="material-symbols-outlined !text-[18px]">delete</span></button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[0.75rem] font-bold text-on-surface-variant/40">
          <span>{totalItems > 0 ? startIndex + 1 : 0}-{endIndex} of {totalItems}</span>
          <div className="flex gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className={`w-7 h-7 flex items-center justify-center ${currentPage === 1 ? 'opacity-20' : 'hover:bg-black/5'}`}
            >
              <span className="material-symbols-outlined !text-[16px]">chevron_left</span>
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className={`w-7 h-7 flex items-center justify-center ${currentPage === totalPages ? 'opacity-20' : 'hover:bg-black/5'}`}
            >
              <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center gap-6 transition-all duration-300">
            <div className="relative">
              <img
                src={enttlevoIcon}
                alt="Loading..."
                className="w-16 h-16 grayscale opacity-40 animate-pulse transition-all duration-700"
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <h4 className="text-[0.75rem] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] animate-pulse">Synchronizing Records</h4>
              <p className="text-[0.65rem] text-on-surface-variant/20 italic font-medium tracking-tight">Accessing Enttlevo CRM Core...</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-black/[0.02]">
            {displayedEmails.map((email) => (
              <div
                key={email.id}
                onClick={() => handleEmailClick(email)}
                className={`group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-0 min-h-[52px] sm:h-[52px] hover:bg-primary-container/[0.04] transition-all cursor-pointer ${email.unread ? 'bg-primary-container/[0.02]' : ''}`}
              >
                <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                  <div
                    onClick={(e) => toggleSelect(email.id, e)}
                    className={`w-[18px] h-[18px] rounded-sm flex items-center justify-center transition-all ${selectedEmails.includes(email.id) ? 'bg-primary-container' : 'border border-outline/30'}`}
                  >
                    {selectedEmails.includes(email.id) && <span className="material-symbols-outlined !text-[14px] text-white">check</span>}
                  </div>
                  <button onClick={(e) => toggleStar(email.id, e)} className={`${email.isStarred ? 'text-[#FFB800]' : 'text-on-surface-variant/10 group-hover:text-on-surface-variant/30'}`}>
                    <span className="material-symbols-outlined !text-[18px]" style={email.isStarred ? { fontVariationSettings: "'FILL' 1" } : {}}>star</span>
                  </button>
                </div>

                <div className="hidden sm:flex w-8 h-8 rounded-sm items-center justify-center text-[0.8rem] font-bold shrink-0 ${email.initialsBg}">
                  {email.initials}
                </div>

                <div className="flex-1 min-w-0 flex flex-col sm:grid sm:grid-cols-12 gap-1 sm:gap-8">
                  <div className="sm:col-span-3 truncate pr-4 text-[0.88rem] font-medium flex items-center gap-2">
                    <div className={`sm:hidden w-6 h-6 rounded-sm flex items-center justify-center text-[0.6rem] font-bold shrink-0 ${email.initialsBg}`}>
                      {email.initials}
                    </div>
                    <span className="truncate">{email.sender}</span>
                  </div>
                  <div className="sm:col-span-8 truncate text-[0.85rem] pl-8 sm:pl-0">
                    <span className="font-semibold text-on-surface/80">{email.subject}</span>
                    <span className="mx-2 opacity-20">—</span>
                    <span className="opacity-50">{email.snippet}</span>
                  </div>
                </div>

                <div className="shrink-0 w-full sm:w-auto sm:min-w-[200px] text-right relative flex items-center justify-end pl-8 sm:pl-0 mt-2 sm:mt-0">
                  <span className="text-[0.7rem] font-bold opacity-30 uppercase group-hover:opacity-0 transition-opacity hidden sm:block">{email.time}</span>
                  <div className="sm:absolute sm:right-0 flex flex-wrap gap-2 w-full sm:w-auto sm:opacity-0 sm:group-hover:opacity-100 transition-all sm:translate-x-8 sm:group-hover:translate-x-0 pointer-events-auto sm:pointer-events-none sm:group-hover:pointer-events-auto">
                    <button
                      onClick={(e) => { e.stopPropagation(); onCreateTicket(email); }}
                      className="flex items-center gap-2 px-4 py-1.5 bg-primary-container text-white rounded-sm text-[0.8rem] font-semibold hover:bg-primary-container/90 transition-all shadow-sm active:scale-95 whitespace-nowrap"
                    >
                      <span className="material-symbols-outlined !text-[18px]">confirmation_number</span>
                      Create Ticket
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onSummarize(email); }}
                      className="flex items-center gap-2 px-4 py-1.5 bg-surface-container-highest border border-outline/10 text-on-surface rounded-sm text-[0.8rem] font-semibold hover:bg-primary-container/10 hover:text-primary-container transition-all shadow-sm active:scale-95 whitespace-nowrap"
                    >
                      <span className="material-symbols-outlined !text-[18px]">summarize</span>
                      Summarize
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default EmailList;
