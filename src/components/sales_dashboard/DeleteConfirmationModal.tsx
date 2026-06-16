import React from 'react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  leadName?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm, leadName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] animate-in fade-in" onClick={onClose} />

      <div className="relative bg-surface-container rounded-xl shadow-2xl w-full max-w-[450px] flex flex-col animate-in zoom-in-95 duration-200 border border-outline/10 overflow-hidden">

        {/* Content */}
        <div className="p-8 pb-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mb-4 border-8 border-error/5">
            <span className="material-symbols-outlined !text-[32px] text-error">warning</span>
          </div>
          <h2 className="text-[1.25rem] font-bold text-on-surface tracking-tight leading-tight mb-2">Delete Lead?</h2>
          <p className="text-[0.9rem] text-on-surface-variant leading-relaxed max-w-[300px]">
            Are you sure you want to delete <span className="font-semibold text-on-surface">{leadName ? `"${leadName}"` : 'this lead'}</span>? This action cannot be undone and the record will be permanently removed.
          </p>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex justify-center gap-3 border-t border-outline/10">
          <button
            onClick={onClose}
            className="min-w-[100px] px-5 py-2 border border-outline/10 bg-surface-container-low text-on-surface-variant rounded-sm text-[0.85rem] font-bold hover:bg-surface-container-high transition-colors shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center justify-center min-w-[100px] gap-2 px-5 py-2 bg-error text-white rounded-sm text-[0.85rem] font-bold hover:bg-error/90 transition-all shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined !text-[18px]">delete</span>
            Delete Lead
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;


