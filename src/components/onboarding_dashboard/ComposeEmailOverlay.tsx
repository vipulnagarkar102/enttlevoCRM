import React, { useState, useEffect } from 'react';

interface ComposeEmailOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
  initialMessage?: string;
}

const ComposeEmailOverlay: React.FC<ComposeEmailOverlayProps> = ({
  isOpen,
  onClose,
  initialSubject = '',
  initialMessage = ''
}) => {
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState(initialMessage);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSubject(initialSubject);
      setMessage(initialMessage);
    }
  }, [isOpen, initialSubject, initialMessage]);

  const [recipients, setRecipients] = useState([
    { email: 'arjun.d@enterprise.com', name: 'Arjun Deshmukh', initials: 'AD', color: 'bg-primary' }
  ]);
  const [newRecipient, setNewRecipient] = useState('');

  const handleAddRecipient = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newRecipient.trim() !== '') {
      setRecipients([...recipients, {
        email: newRecipient,
        name: newRecipient,
        initials: newRecipient.charAt(0).toUpperCase(),
        color: 'bg-outline-variant'
      }]);
      setNewRecipient('');
    }
  };

  const handleRemoveRecipient = (emailToRemove: string) => {
    setRecipients(recipients.filter(r => r.email !== emailToRemove));
  };

  const handleDelete = () => {
    setToastMessage('Message draft deleted successfully');
    setTimeout(() => {
      setToastMessage(null);
      setSubject('');
      setMessage('');
      onClose(); // Auto close the drawer
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[100] transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Side Overlay */}
      <div className="fixed top-0 right-0 h-full w-[600px] max-w-[95vw] bg-surface shadow-2xl z-[101] flex flex-col transform transition-transform duration-300 animate-slide-in-right border-l border-outline/10">

        {/* Header */}
        <div className="p-6 border-b border-outline/10 flex items-center justify-between shrink-0 bg-surface-container-low">
          <div className="flex flex-col">
            <h2 className="text-[1.1rem] font-bold text-on-surface tracking-tight">
              New Message
            </h2>
            <p className="text-[0.75rem] text-on-surface-variant font-medium opacity-60">Composing draft for client engagement</p>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant/40 p-2 hover:bg-surface-container hover:text-on-surface transition-all rounded-full"
            title="Close"
          >
            <span className="material-symbols-outlined !text-[22px]">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col custom-scrollbar bg-surface">
          {/* To Field */}
          <div className="px-6 py-4 border-b border-outline/5 flex items-start gap-5">
            <span className="text-[0.85rem] font-bold text-on-surface-variant/40 mt-1 min-w-[32px] uppercase tracking-widest">To</span>
            <div className="flex-1 flex flex-wrap gap-2 items-center">
              {recipients.map(r => (
                <div key={r.email} className="flex items-center gap-2 pr-2 py-1 bg-surface-container border border-outline/10 rounded-sm shadow-sm animate-in zoom-in-95 duration-200">
                  <div className={`w-6 h-6 rounded-sm ${r.color} text-white flex items-center justify-center text-[0.65rem] font-bold shadow-sm`}>
                    {r.initials}
                  </div>
                  <span className="text-[0.85rem] text-on-surface font-medium truncate max-w-[200px]">{r.name !== r.email ? `${r.name}` : r.email}</span>
                  <button
                    onClick={() => handleRemoveRecipient(r.email)}
                    className="material-symbols-outlined !text-[16px] text-on-surface-variant/40 cursor-pointer hover:text-error transition-colors ml-1"
                  >
                    close
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={newRecipient}
                onChange={e => setNewRecipient(e.target.value)}
                onKeyDown={handleAddRecipient}
                placeholder={recipients.length === 0 ? "Add recipients (Press Enter)" : "Add more..."}
                className="flex-1 min-w-[150px] text-[0.85rem] text-on-surface placeholder:text-on-surface-variant/20 focus:outline-none bg-transparent"
              />
            </div>
            <div className="flex items-center gap-4 ml-auto text-[0.7rem] font-bold text-on-surface-variant/40 tracking-widest mt-1.5">
              <button className="hover:text-primary-container transition-colors uppercase">CC</button>
              <button className="hover:text-primary-container transition-colors uppercase">BCC</button>
            </div>
          </div>

          {/* Cc Field */}
          <div className="px-6 py-3 border-b border-outline/5 flex items-start gap-5">
            <span className="text-[0.85rem] font-bold text-on-surface-variant/40 mt-1 min-w-[32px] uppercase tracking-widest">Cc</span>
            <input
              type="text"
              placeholder="Add recipients"
              className="flex-1 text-[0.85rem] text-on-surface placeholder:text-on-surface-variant/20 focus:outline-none bg-transparent"
            />
          </div>

          {/* Subject Field */}
          <div className="px-6 py-5 border-b border-outline/5">
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-[1rem] font-bold text-on-surface placeholder:text-on-surface-variant/20 focus:outline-none bg-transparent"
            />
          </div>

          {/* Message Body */}
          <div className="px-6 py-6 flex-1 flex flex-col min-h-[350px]">
            <textarea
              placeholder="Start typing your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full flex-1 text-[0.95rem] text-on-surface/90 placeholder:text-on-surface-variant/20 focus:outline-none resize-none bg-transparent custom-scrollbar leading-relaxed"
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 flex flex-col gap-5 border-t border-outline/10 mt-auto shadow-[0_-4px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_-4px_30px_rgba(0,0,0,0.4)] relative z-10 bg-surface-container-low">
          <div className="flex items-center justify-between">
            {/* Formatting Tools */}
            <div className="flex items-center gap-2 text-on-surface-variant/60">
              <button className="w-9 h-9 flex items-center justify-center rounded-sm hover:bg-surface-container hover:text-on-surface transition-all">
                <span className="font-serif font-bold text-[16px]">B</span>
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-sm hover:bg-surface-container hover:text-on-surface transition-all">
                <span className="font-serif italic text-[16px]">I</span>
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-sm hover:bg-surface-container hover:text-on-surface transition-all">
                <span className="material-symbols-outlined !text-[20px]">link</span>
              </button>
              <div className="w-[1px] h-5 bg-outline/20 mx-2"></div>
              <button className="w-9 h-9 flex items-center justify-center rounded-sm hover:bg-surface-container hover:text-on-surface transition-all">
                <span className="material-symbols-outlined !text-[20px]">image</span>
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-sm hover:bg-surface-container hover:text-on-surface transition-all">
                <span className="material-symbols-outlined !text-[20px]">attach_file</span>
              </button>
            </div>

            <button
              onClick={handleDelete}
              className="w-9 h-9 flex items-center justify-center rounded-sm text-on-surface-variant/30 hover:bg-error/10 hover:text-error transition-all"
              title="Discard Draft"
            >
              <span className="material-symbols-outlined !text-[20px]">delete</span>
            </button>
          </div>

          <div className="flex items-stretch gap-3">
            <button
              className="flex-1 flex items-center justify-center gap-3 px-6 py-2.5 bg-primary-container text-white rounded-sm text-[0.85rem] font-bold hover:bg-primary-container/90 transition-all shadow-lg shadow-primary-container/20 active:scale-[0.98] tracking-[0.1em] uppercase"
            >
              Send Email
              <span className="material-symbols-outlined !text-[18px] -rotate-45 relative top-[1px]">send</span>
            </button>
            <button className="px-4 py-2.5 bg-surface-container border border-outline/10 flex items-center justify-center rounded-sm hover:bg-surface-container-high hover:border-primary-container/30 transition-all group">
              <span className="material-symbols-outlined !text-[22px] text-on-surface-variant group-hover:text-primary-container">schedule</span>
            </button>
          </div>
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
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(var(--color-outline), 0.3);
          border-radius: 10px;
        }
      `}</style>
    </>
  );
};

export default ComposeEmailOverlay;
