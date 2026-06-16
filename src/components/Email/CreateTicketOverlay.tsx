import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import type { Email } from './types';

interface CreateTicketOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  emailContext?: Email | null;
}

const CreateTicketOverlay: React.FC<CreateTicketOverlayProps> = ({
  isOpen,
  onClose,
  emailContext
}) => {
  const { isDark } = useTheme();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && emailContext) {
      setTitle(emailContext.subject);
      setDescription(`From: ${emailContext.sender} <${emailContext.email}>\n\n${emailContext.snippet}`);
    } else if (isOpen) {
      setTitle('');
      setDescription('');
      setPriority('');
    }
  }, [isOpen, emailContext]);

  const handleCreate = () => {
    setToastMessage('Ticket created successfully');
    setTimeout(() => {
      setToastMessage(null);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  const inputClass = "w-full px-3 py-2 border border-outline/15 bg-surface-container rounded-sm text-[0.85rem] text-on-surface focus:outline-none focus:border-primary-container/50 focus:ring-1 focus:ring-primary-container/20 placeholder:text-on-surface-variant/30 transition-colors";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[100] transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Slide-in Overlay */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[600px] max-w-full bg-surface-container shadow-2xl z-[101] flex flex-col border-l border-outline/10 transform transition-transform duration-300 animate-in slide-in-from-right overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-outline/10 relative bg-surface-container-low">
          <button 
            onClick={onClose} 
            className="absolute right-6 top-6 text-primary-container p-1 hover:bg-primary-container/10 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined !text-[24px]">close</span>
          </button>
          <div className="pr-8">
            <h2 className="text-[1.25rem] font-bold text-on-surface tracking-tight">Create Ticket</h2>
            <p className="text-[0.8rem] text-on-surface-variant mt-1">Convert email communication into a trackable support ticket</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-surface space-y-6 custom-scrollbar">
          
          {/* Title Field */}
          <div className="space-y-1.5 flex flex-col">
            <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
              <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">assignment</span>
              Ticket Title <span className="text-error ml-0.5">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter ticket title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Priority Field */}
          <div className="space-y-1.5 flex flex-col">
            <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
              <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">priority_high</span>
              Priority <span className="text-error ml-0.5">*</span>
            </label>
            <div className="relative">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 border border-outline/15 bg-surface-container rounded-sm text-[0.85rem] text-on-surface focus:outline-none focus:border-primary-container/50 appearance-none transition-colors"
              >
                <option value="" disabled>Select Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant/50 !text-[18px] pointer-events-none">expand_more</span>
            </div>
          </div>

          {/* Description Field */}
          <div className="space-y-1.5 flex flex-col flex-1 min-h-0">
            <label className="flex items-center gap-2 text-[0.85rem] font-bold text-on-surface">
              <span className="material-symbols-outlined !text-[18px] text-on-surface-variant/70">description</span>
              Description <span className="text-error ml-0.5">*</span>
            </label>
            <textarea
              placeholder="Enter ticket details"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${inputClass} flex-1 min-h-[300px] resize-none leading-relaxed custom-scrollbar`}
            />
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-outline/10 flex flex-col-reverse sm:flex-row justify-end gap-3 bg-surface-container-low shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <button 
            onClick={onClose} 
            className="min-w-[100px] px-4 py-1.5 border border-outline/10 rounded-sm text-[0.8rem] font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors uppercase tracking-wider"
          >
            Cancel
          </button>
          <button 
            onClick={handleCreate}
            className="min-w-[120px] px-4 py-1.5 bg-primary-container text-white rounded-sm text-[0.8rem] font-bold hover:bg-primary-container/90 uppercase tracking-wider shadow-sm active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined !text-[18px]">confirmation_number</span>
            Create Ticket
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] bg-inverse-surface text-inverse-on-surface px-8 py-4 rounded-sm shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-10 fade-in duration-300">
          <span className="material-symbols-outlined text-emerald-400 !text-[24px]">check_circle</span>
          <span className="text-[0.90rem] font-bold tracking-wide">{toastMessage}</span>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(var(--color-outline), 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(var(--color-outline), 0.2);
        }
      `}</style>
    </>
  );
};

export default CreateTicketOverlay;
