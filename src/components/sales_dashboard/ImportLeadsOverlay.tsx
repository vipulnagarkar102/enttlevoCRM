import React from 'react';

interface ImportLeadsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImportLeadsOverlay: React.FC<ImportLeadsOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-[100] transition-opacity duration-300 animate-in fade-in" onClick={onClose} />

      <div className="fixed top-0 right-0 h-full w-[900px] max-w-[90vw] bg-surface-container shadow-2xl z-[101] flex flex-col border-l border-outline/10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-outline/10 relative bg-surface-container-low">
          <button onClick={onClose} className="absolute right-6 top-6 text-primary-container p-1 hover:bg-primary-container/10 transition-colors rounded-full">
            <span className="material-symbols-outlined !text-[24px]">close</span>
          </button>
          <div className="flex items-center gap-3 pr-8">
            <h2 className="flex items-center gap-2 text-[1.25rem] font-bold text-on-surface tracking-tight">
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant">upload</span>
              Import Leads from CSV/Excel
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 flex flex-col gap-8">
            <div className="flex gap-6">
              {/* Left Column */}
              <div className="flex-1 space-y-4">
                {/* Instructions */}
                <div className="bg-tertiary/10 border border-tertiary/20 rounded-sm p-5">
                  <div className="flex items-center gap-2 text-tertiary font-semibold mb-3">
                    <span className="material-symbols-outlined !text-[18px]">info</span>
                    Instructions
                  </div>
                  <ul className="text-[0.85rem] text-tertiary/80 space-y-2.5 list-none">
                    <li className="flex gap-2 leading-tight"><span className="text-tertiary/50">•</span><span>File must be in .csv, .xls, .xlsx format</span></li>
                    <li className="flex gap-2 leading-tight"><span className="text-tertiary/50">•</span><span>First row should contain column headers</span></li>
                    <li className="flex gap-2 leading-tight"><span className="text-tertiary/50">•</span><span>Required columns: Organization Name, Contact Person, Email, Phone Number</span></li>
                    <li className="flex gap-2 leading-tight"><span className="text-tertiary/50">•</span><span>Maximum file size: 5MB</span></li>
                    <li className="flex gap-2 leading-tight"><span className="text-tertiary/50">•</span><span>Ensure phone numbers include country code (e.g., +1234567890)</span></li>
                  </ul>
                </div>

                {/* Important Note */}
                <div className="bg-primary-container/10 border border-primary-container/20 rounded-sm p-5 flex gap-2">
                  <span className="material-symbols-outlined !text-[20px] text-primary-container">error</span>
                  <p className="text-[0.85rem] text-primary-container/90 leading-tight">
                    <strong className="font-bold">Important Note:</strong> All new leads will appear in the "Unassigned" tab under the Sales section.
                  </p>
                </div>
              </div>

              {/* Right Column - Upload Zone */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-[0.95rem] font-bold text-on-surface mb-3">Upload CSV File</h3>
                <div className="flex-1 border-2 border-dashed border-outline/20 rounded-sm flex flex-col items-center justify-center p-8 text-center hover:bg-surface-container-high hover:border-primary-container/50 transition-all cursor-pointer">
                  <span className="material-symbols-outlined !text-[48px] text-on-surface-variant/40 mb-4">upload</span>
                  <p className="text-[0.95rem] text-on-surface-variant font-medium mb-1">Click or drag CSV file to upload</p>
                  <p className="text-[0.75rem] text-on-surface-variant/60 mb-6">CSV, XLS, XLSX format only | Max: 5MB</p>
                  <button className="px-6 py-2 bg-surface-container-high border border-outline/20 rounded-sm text-[0.85rem] font-semibold text-on-surface hover:text-primary-container hover:border-primary-container transition-colors shadow-sm">
                    Select File
                  </button>
                </div>
              </div>
            </div>

            {/* Sample File */}
            <div className="border-t border-outline/10 pt-6">
              <h3 className="text-[0.95rem] font-bold text-on-surface mb-1">Sample File</h3>
              <p className="text-[0.85rem] text-on-surface-variant/80 mb-4">Download our sample template to see the correct format:</p>
              <button className="flex items-center gap-2 px-4 py-2 border border-outline/10 rounded-sm text-[0.8rem] font-semibold text-on-surface hover:bg-surface-container-high transition-colors shadow-sm w-fit">
                <span className="material-symbols-outlined !text-[18px]">download</span>
                Download Sample Template
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-outline/10 flex justify-end gap-3 bg-surface-container-low shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <button onClick={onClose} className="flex items-center justify-center min-w-[100px] px-4 py-1.5 border border-outline/10 rounded-sm text-[0.8rem] font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors uppercase tracking-wider">
            Cancel
          </button>
          <button className="flex items-center justify-center min-w-[100px] px-4 py-1.5 bg-primary-container opacity-50 text-white rounded-sm text-[0.8rem] font-bold shadow-sm uppercase tracking-wider cursor-not-allowed">
            Import Leads
          </button>
        </div>
      </div>
    </>
  );
};

export default ImportLeadsOverlay;


