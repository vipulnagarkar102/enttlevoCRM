import React, { useState } from 'react';
import type { Email } from './types';
import enttlevoIcon from '../../assets/enttlevologo1.png';

interface SummarizeOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  emailContext?: Email | null;
}

const SummarizeOverlay: React.FC<SummarizeOverlayProps> = ({
  isOpen,
  onClose,
  emailContext
}) => {
  const [workflow, setWorkflow] = useState('Generate Email Summary');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryResult, setSummaryResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExecute = () => {
    setIsSummarizing(true);
    setSummaryResult(null);
    
    // Simulate API call for summarization
    setTimeout(() => {
      setIsSummarizing(false);
      setSummaryResult(
        `Summary for: ${emailContext?.subject}\n\n` +
        `This email from ${emailContext?.sender} discusses "${emailContext?.snippet.substring(0, 100)}...". ` +
        `The primary action item appears to be a follow-up regarding the specific details mentioned in the communication.`
      );
    }, 1500);
  };


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
            <h2 className="text-[1.25rem] font-bold text-on-surface tracking-tight">Automate Email Summary</h2>
            <p className="text-[0.8rem] text-on-surface-variant mt-1">Leverage AI to generate summaries and automate communication workflows</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-surface flex flex-col custom-scrollbar">
          
          {/* Workflow Selection Section */}
          <div className="space-y-4">
            <h3 className="text-[1rem] font-bold text-primary-container tracking-tight">Select a Workflow</h3>
            
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-start">
              <div className="flex-1 relative">
                <select
                  value={workflow}
                  onChange={(e) => setWorkflow(e.target.value)}
                  className="w-full px-3 py-2 border border-outline/15 bg-surface-container rounded-sm text-[0.85rem] text-on-surface focus:outline-none focus:border-primary-container/50 appearance-none transition-colors"
                >
                  <option value="Generate Email Summary">Generate Email Summary</option>
                  <option value="Generate Email Reply">Generate Email Reply</option>
                  <option value="Extract Action Items">Extract Action Items</option>
                  <option value="Sentiment Analysis">Sentiment Analysis</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant/50 !text-[18px] pointer-events-none">expand_more</span>
              </div>
              
              <button
                onClick={handleExecute}
                disabled={isSummarizing}
                className="px-6 py-2 bg-[#FF8A00] text-white rounded-sm text-[0.85rem] font-bold hover:bg-[#FF8A00]/90 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider w-full sm:w-auto"
              >
                {isSummarizing ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <span className="material-symbols-outlined !text-[18px]">bolt</span>
                )}
                Execute
              </button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-outline/5 flex-1 flex flex-col min-h-0">
            {isSummarizing ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-6 transition-all duration-300">
                <div className="relative">
                  <img 
                    src={enttlevoIcon} 
                    alt="Analyzing..." 
                    className="w-16 h-16 grayscale opacity-40 animate-pulse transition-all duration-700"
                  />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <h4 className="text-[0.75rem] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em] animate-pulse text-center">Analyzing Email Content</h4>
                  <p className="text-[0.65rem] text-on-surface-variant/20 italic font-medium tracking-tight">Accessing Enttlevo Intelligence...</p>
                </div>
              </div>
            ) : summaryResult ? (
              <div className="flex-1 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="bg-surface-container-low border border-outline/10 p-6 rounded-sm min-h-full">
                  <div className="flex items-center gap-2 mb-4 text-primary-container">
                    <span className="material-symbols-outlined !text-[20px]">auto_awesome</span>
                    <span className="text-[0.75rem] font-bold uppercase tracking-widest">AI Generated Result</span>
                  </div>
                  <div className="text-[0.95rem] text-on-surface leading-loose whitespace-pre-wrap font-medium">
                    {summaryResult}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center opacity-20 select-none">
                <span className="material-symbols-outlined !text-[48px] mb-4">analytics</span>
                <p className="text-[0.95rem] font-bold uppercase tracking-[0.15em]">No summary generated.</p>
                <p className="text-[0.8rem] mt-2 font-medium">Run a workflow to see results</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-outline/10 flex flex-col sm:flex-row justify-end gap-3 bg-surface-container-low shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          {summaryResult && (
            <button 
              onClick={() => {
                navigator.clipboard.writeText(summaryResult);
                // In a real app, show a toast here
              }}
              className="sm:mr-auto flex items-center justify-center sm:justify-start gap-2 px-4 py-1.5 border border-outline/10 rounded-sm text-[0.8rem] font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors uppercase tracking-wider w-full sm:w-auto"
            >
              <span className="material-symbols-outlined !text-[18px]">content_copy</span>
              Copy Result
            </button>
          )}
          <button 
            onClick={onClose} 
            className="min-w-[100px] px-4 py-1.5 border border-outline/10 rounded-sm text-[0.8rem] font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors uppercase tracking-wider"
          >
            Close
          </button>
        </div>
      </div>

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

export default SummarizeOverlay;
