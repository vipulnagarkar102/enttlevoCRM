import React, { useState } from 'react';

interface AdvancedFiltersOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdvancedFiltersOverlay: React.FC<AdvancedFiltersOverlayProps> = ({ isOpen, onClose }) => {
  const [filters, setFilters] = useState([{ id: 1, column: '', operator: '', value: '' }]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  if (!isOpen) return null;

  const dropdownMenuClass = "absolute top-full mt-1 left-0 w-full bg-surface-container-high border border-outline/10 shadow-lg rounded-sm py-1 z-[120] animate-in fade-in duration-100";
  const dropdownItemClass = "px-3 py-2 text-[0.85rem] text-on-surface font-medium hover:bg-primary-container/10 hover:text-primary-container cursor-pointer transition-colors";
  const dropdownTriggerClass = "flex items-center justify-between w-full px-3 py-2 border border-outline/15 bg-surface-container-low rounded-sm text-[0.85rem] text-on-surface cursor-pointer hover:border-primary-container/50 transition-colors group";

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[100] animate-in fade-in" onClick={onClose} />

      <div className="fixed top-0 right-0 h-full w-[650px] max-w-[90vw] bg-surface-container shadow-2xl z-[101] flex flex-col border-l border-outline/10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-outline/10 relative bg-surface-container-low">
          <button onClick={onClose} className="absolute right-6 top-6 text-primary-container p-1 hover:bg-primary-container/10 rounded-full transition-colors">
            <span className="material-symbols-outlined !text-[24px]">close</span>
          </button>
          <div className="flex items-center gap-3 pr-8">
            <span className="material-symbols-outlined text-on-surface-variant !text-[22px]">filter_list</span>
            <h2 className="text-[1.25rem] font-bold text-on-surface tracking-tight">Advanced Filters</h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-surface">
          {filters.map((filter) => (
            <div key={filter.id} className="bg-surface-container border border-outline/10 rounded-sm p-4 flex gap-4 items-end shadow-sm relative group">
              {filters.length > 1 && (
                <button
                  onClick={() => setFilters(filters.filter(f => f.id !== filter.id))}
                  className="absolute -right-2 -top-2 bg-surface-container-high border border-outline/10 text-on-surface-variant hover:text-error rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm z-50"
                >
                  <span className="material-symbols-outlined !text-[16px]">close</span>
                </button>
              )}

              {/* Column */}
              <div className="flex flex-col gap-1.5 flex-1 relative">
                <label className="text-[0.8rem] font-bold text-on-surface-variant">Column</label>
                <div onClick={() => setOpenDropdown(openDropdown === `col_${filter.id}` ? null : `col_${filter.id}`)} className={dropdownTriggerClass}>
                  <span className={filter.column ? 'text-on-surface' : 'text-on-surface-variant/40'}>{filter.column || 'Select Column'}</span>
                  <span className="material-symbols-outlined !text-[18px] text-on-surface-variant group-hover:text-primary-container">expand_more</span>
                </div>
                {openDropdown === `col_${filter.id}` && (
                  <>
                    <div className="fixed inset-0 z-[110]" onClick={() => setOpenDropdown(null)} />
                    <div className={dropdownMenuClass}>
                      {['Company', 'Contact Name', 'Email', 'Industry', 'Account Owner', 'Onboarding Stage', 'Status', 'Label'].map(opt => (
                        <div key={opt} onClick={() => { setFilters(filters.map(f => f.id === filter.id ? { ...f, column: opt } : f)); setOpenDropdown(null); }} className={dropdownItemClass}>{opt}</div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Operator */}
              <div className="flex flex-col gap-1.5 flex-1 relative">
                <label className="text-[0.8rem] font-bold text-on-surface-variant">Operator</label>
                <div onClick={() => setOpenDropdown(openDropdown === `op_${filter.id}` ? null : `op_${filter.id}`)} className={dropdownTriggerClass}>
                  <span className={filter.operator ? 'text-on-surface' : 'text-on-surface-variant/40'}>{filter.operator || 'Operator'}</span>
                  <span className="material-symbols-outlined !text-[18px] text-on-surface-variant group-hover:text-primary-container">expand_more</span>
                </div>
                {openDropdown === `op_${filter.id}` && (
                  <>
                    <div className="fixed inset-0 z-[110]" onClick={() => setOpenDropdown(null)} />
                    <div className={dropdownMenuClass}>
                      {['Equals', 'Contains', 'Starts with', 'Ends with', 'Is empty', 'Is not empty'].map(opt => (
                        <div key={opt} onClick={() => { setFilters(filters.map(f => f.id === filter.id ? { ...f, operator: opt } : f)); setOpenDropdown(null); }} className={dropdownItemClass}>{opt}</div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Value */}
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[0.8rem] font-bold text-on-surface-variant">Value</label>
                <input
                  type="text"
                  value={filter.value}
                  onChange={(e) => setFilters(filters.map(f => f.id === filter.id ? { ...f, value: e.target.value } : f))}
                  placeholder="Enter Value"
                  className="w-full px-3 py-2 border border-outline/15 bg-surface-container-low rounded-sm text-[0.85rem] text-on-surface focus:outline-none focus:border-primary-container/50 focus:ring-1 focus:ring-primary-container/20 placeholder:text-on-surface-variant/30 transition-colors"
                />
              </div>
            </div>
          ))}

          <button
            onClick={() => setFilters([...filters, { id: Date.now(), column: '', operator: '', value: '' }])}
            className="w-full py-3 border border-dashed border-outline/30 rounded-sm flex items-center justify-center gap-2 text-[0.85rem] font-bold text-on-surface-variant hover:text-primary-container hover:border-primary-container/50 hover:bg-primary-container/5 transition-all mt-2"
          >
            <span className="material-symbols-outlined !text-[18px]">add</span>
            Add Another Filter
          </button>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-outline/10 flex justify-between items-center bg-surface-container-low shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <button
            onClick={() => setFilters([{ id: 1, column: '', operator: '', value: '' }])}
            className="flex items-center gap-2 px-4 py-1.5 bg-error/90 text-white border border-error hover:bg-error rounded-sm text-[0.8rem] font-bold uppercase tracking-wider shadow-sm"
          >
            <span className="material-symbols-outlined !text-[18px]">close</span>
            Reset All
          </button>
          <div className="flex gap-3">
            <button onClick={onClose} className="min-w-[100px] px-4 py-1.5 border border-outline/10 rounded-sm text-[0.8rem] font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors uppercase tracking-wider">Cancel</button>
            <button onClick={onClose} className="min-w-[100px] px-4 py-1.5 bg-primary-container text-white rounded-sm text-[0.8rem] font-bold hover:bg-primary-container/90 uppercase tracking-wider shadow-sm active:scale-95">Apply Filters</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedFiltersOverlay;
