import React, { useState } from 'react';

interface AssignLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (memberName: string | 'me') => void;
}

const AssignLeadModal: React.FC<AssignLeadModalProps> = ({ isOpen, onClose, onAssign }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedMember, setSelectedMember] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-surface-container rounded-xl shadow-2xl w-full max-w-[500px] flex flex-col transform animate-in zoom-in-95 duration-200 border border-outline/10">

        {/* Header */}
        <div className="p-5 border-b border-outline/10 flex justify-between items-center">
          <h2 className="text-[1.1rem] font-bold text-on-surface tracking-tight leading-tight">Assign Lead</h2>
          <button
            onClick={onClose}
            className="text-on-surface-variant p-1 hover:text-primary-container hover:bg-primary-container/10 transition-colors rounded-full"
          >
            <span className="material-symbols-outlined !text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-4 flex flex-col items-center">
          <div className="relative w-full z-10 max-w-[400px]">
            <div
              onClick={() => setOpenDropdown(!openDropdown)}
              className={`flex items-center justify-between w-full px-4 py-2 border rounded-sm text-[0.85rem] cursor-pointer hover:bg-primary-container/5 transition-colors group bg-surface-container-low ${openDropdown ? 'border-primary-container ring-1 ring-primary-container/20' : 'border-outline/20'}`}
            >
              <span className={selectedMember ? 'text-on-surface font-medium' : 'text-on-surface-variant/40'}>
                {selectedMember || 'Select team member'}
              </span>
              <span className="material-symbols-outlined !text-[20px] text-on-surface-variant group-hover:text-primary-container">expand_more</span>
            </div>

            {openDropdown && (
              <>
                <div className="fixed inset-0 z-[110]" onClick={() => setOpenDropdown(false)} />
                <div className="absolute top-full mt-1 left-0 w-full bg-surface-container-high border border-outline/10 shadow-lg rounded-sm py-1 z-[120] animate-in fade-in duration-100 max-h-[200px] overflow-y-auto">
                  {['Rishi', 'Prasadi', 'Richardson', 'Shanu', 'Ravish'].map(opt => (
                    <div
                      key={opt}
                      onClick={() => { setSelectedMember(opt); setOpenDropdown(false); }}
                      className="px-4 py-2 text-[0.85rem] text-on-surface font-medium hover:bg-primary-container/10 hover:text-primary-container cursor-pointer transition-colors"
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-2 flex justify-center gap-3 border-t border-outline/10">
          <button
            onClick={() => onAssign(selectedMember)}
            disabled={!selectedMember}
            className="flex items-center justify-center min-w-[100px] px-5 py-2 bg-primary-container/15 text-primary-container hover:bg-primary-container/25 rounded-sm text-[0.85rem] font-bold transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Assign
          </button>
          <button
            onClick={() => onAssign('me')}
            className="flex items-center justify-center min-w-[100px] px-5 py-2 bg-primary-container text-white rounded-sm text-[0.85rem] font-bold hover:bg-primary-container/90 transition-all shadow-sm active:scale-95"
          >
            Assign to Me
          </button>
          <button
            onClick={onClose}
            className="flex items-center justify-center min-w-[100px] px-5 py-2 border border-outline/10 bg-surface-container-low text-on-surface-variant rounded-sm text-[0.85rem] font-bold hover:bg-surface-container-high transition-colors shadow-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignLeadModal;


