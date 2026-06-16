import React from 'react';
import type { Email } from './types';

interface EmailDetailViewProps {
  email: Email;
  onBack: () => void;
}

const EmailDetailView: React.FC<EmailDetailViewProps> = ({ email, onBack }) => {
  return (
    <div className="h-full flex flex-col animate-in fade-in duration-300">
      <div className="px-4 sm:px-6 py-3 border-b border-outline/10 flex items-center justify-between shrink-0 bg-surface-container-low">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-widest"
        >
          <span className="material-symbols-outlined !text-[18px]">arrow_back</span>
          BACK TO {email.folder}
        </button>
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-surface-container-high transition-colors text-on-surface-variant">
            <span className="material-symbols-outlined !text-[18px]">archive</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-error">
            <span className="material-symbols-outlined !text-[18px]">delete</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 custom-scrollbar">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-[1.5rem] font-bold text-on-surface mb-8 tracking-tight leading-tight">{email.subject}</h2>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-outline/10">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-sm flex items-center justify-center text-[0.9rem] font-bold shadow-sm ${email.initialsBg}`}>
                {email.initials}
              </div>
              <div>
                <p className="font-bold text-on-surface text-[0.95rem] tracking-tight">
                  {email.sender} <span className="font-medium text-on-surface-variant/40 ml-1">&lt;{email.email}&gt;</span>
                </p>
                <p className="text-[0.75rem] text-on-surface-variant/50 font-bold uppercase tracking-wider mt-0.5">To: Me</p>
              </div>
            </div>
            <div className="sm:text-right ml-14 sm:ml-0">
              <p className="text-[0.8rem] font-bold text-on-surface-variant/80">{email.time}</p>
              <p className="text-[0.65rem] text-on-surface-variant/40 font-bold uppercase mt-0.5 tracking-tighter">{email.date}</p>
            </div>
          </div>

          <div className="text-on-surface/90 text-[0.95rem] leading-relaxed whitespace-pre-wrap">
            {email.snippet}
            {"\n\nKind regards,\n" + email.sender}
          </div>

          <div className="mt-12 pt-10 border-t border-outline/10 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-primary-container text-white rounded-sm text-[0.85rem] font-bold hover:bg-primary-container/90 transition-all shadow-sm active:scale-95 whitespace-nowrap">
              <span className="material-symbols-outlined !text-[18px]">reply</span>
              REPLY
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-surface-container border border-outline/10 rounded-sm text-[0.85rem] font-bold text-on-surface hover:bg-surface-container-high transition-all shadow-sm active:scale-95 whitespace-nowrap">
              <span className="material-symbols-outlined !text-[18px]">forward</span>
              FORWARD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDetailView;
