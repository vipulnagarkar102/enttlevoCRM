import React, { useState } from 'react';

interface ColumnSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  columns: { id: string, label: string, key: string, visible: boolean }[];
  onToggle: (id: string) => void;
  onReset: () => void;
  onSave: () => void;
}

const ColumnSettingsOverlay: React.FC<ColumnSettingsProps> = ({
  isOpen,
  onClose,
  columns,
  onToggle,
  onReset,
  onSave
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredColumns = columns.filter(col =>
    col.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    col.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleCount = columns.filter(c => c.visible).length;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[100] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Side Overlay — Responsive width panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-surface-container shadow-2xl z-[101] flex flex-col transform transition-transform duration-300 animate-slide-in-right border-l border-outline/10">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-outline/10 relative bg-surface-container-low">
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-primary-container p-1 hover:bg-primary-container/10 transition-colors rounded-full"
          >
            <span className="material-symbols-outlined !text-[24px]">close</span>
          </button>

          <div className="flex items-center gap-3 mb-6 pr-8">
            <span className="material-symbols-outlined text-on-surface-variant !text-[22px]">settings_suggest</span>
            <h2 className="text-[0.95rem] font-bold text-on-surface uppercase tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
              Unassigned Sales Table Column Settings
            </h2>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40 !text-[18px]">search</span>
              <input
                type="text"
                placeholder="Search columns..."
                className="w-full border border-outline/10 bg-surface-container rounded-sm py-2 pl-10 pr-4 text-[0.85rem] text-on-surface focus:outline-none focus:border-primary-container/50 transition-all placeholder:text-on-surface-variant/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-3 py-2 border border-outline/10 rounded-sm text-[0.8rem] font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined !text-[18px]">refresh</span>
              Reset
            </button>
          </div>

          <div className="flex justify-between items-center mt-6">
            <span className="text-[0.75rem] font-medium text-on-surface-variant">{visibleCount} of {columns.length} columns visible</span>
            <span className="bg-surface-container-highest text-on-surface-variant text-[0.7rem] font-bold px-2 py-0.5 rounded-sm uppercase">{visibleCount}/{columns.length}</span>
          </div>
        </div>

        {/* Column List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-surface">
          {filteredColumns.map(column => (
            <div
              key={column.id}
              className={`flex items-center justify-between p-3 rounded-sm border transition-all ${
                column.visible
                  ? 'bg-primary-container/5 border-primary-container/20'
                  : 'bg-surface-container border-outline/5 opacity-60'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`material-symbols-outlined !text-[20px] ${column.visible ? 'text-primary-container' : 'text-on-surface-variant/30'}`}>
                  {column.visible ? 'visibility' : 'visibility_off'}
                </span>
                <div className="flex flex-col">
                  <span className="text-[0.85rem] font-bold text-on-surface leading-tight">{column.label}</span>
                  <span className="text-[0.7rem] font-medium text-on-surface-variant/60">{column.key}</span>
                </div>
              </div>

              <button
                onClick={() => onToggle(column.id)}
                className={`relative w-11 h-5 rounded-full transition-colors duration-200 focus:outline-none ${column.visible ? 'bg-primary-container' : 'bg-outline/40'}`}
              >
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${column.visible ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-outline/10 flex justify-end gap-3 bg-surface-container-low shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <button
            onClick={onClose}
            className="flex items-center justify-center min-w-[100px] px-4 py-1.5 border border-outline/10 rounded-sm text-[0.8rem] font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors uppercase tracking-wider"
          >
            Cancel
          </button>
          <button
            onClick={() => { onSave(); onClose(); }}
            className="flex items-center justify-center min-w-[100px] px-4 py-1.5 bg-primary-container text-white rounded-sm text-[0.8rem] font-bold hover:bg-primary-container/90 transition-all uppercase tracking-wider shadow-sm active:scale-95"
          >
            Save
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default ColumnSettingsOverlay;


