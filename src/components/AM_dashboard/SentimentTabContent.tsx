import React, { useState } from 'react';

type SentimentType = 'Unknown' | 'Good' | 'Dropped' | 'Average' | 'Poor' | 'Below Average';

interface SentimentOption {
  type: SentimentType;
  label: string;
  icon: string;
  color: string;
  bgClass: string;
  hoverClass: string;
}

const SentimentTabContent: React.FC = () => {
  const [currentSentiment, setCurrentSentiment] = useState<SentimentType>('Poor');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSentimentSelect = (type: SentimentType) => {
    setCurrentSentiment(type);
    setToastMessage(`Sentiment updated to ${type}`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const options: SentimentOption[] = [
    {
      type: 'Unknown',
      label: 'Unknown',
      icon: 'help_outline',
      color: '#64748b',
      bgClass: 'border-slate-500/30 text-slate-500',
      hoverClass: 'hover:border-slate-500 hover:bg-slate-500/5'
    },
    {
      type: 'Good',
      label: 'Good',
      icon: 'favorite_border',
      color: '#22c55e',
      bgClass: 'border-emerald-500/30 text-emerald-500',
      hoverClass: 'hover:border-emerald-500 hover:bg-emerald-500/5'
    },
    {
      type: 'Dropped',
      label: 'Dropped',
      icon: 'cancel',
      color: '#ef4444',
      bgClass: 'border-red-600/30 text-red-600',
      hoverClass: 'hover:border-red-600 hover:bg-red-600/5'
    },
    {
      type: 'Average',
      label: 'Average',
      icon: 'info',
      color: '#3b82f6',
      bgClass: 'border-blue-500/30 text-blue-500',
      hoverClass: 'hover:border-blue-500 hover:bg-blue-500/5'
    },
    {
      type: 'Poor',
      label: 'Poor',
      icon: 'cancel',
      color: '#f87171',
      bgClass: 'border-red-500/40 text-red-500',
      hoverClass: 'hover:border-red-500 hover:bg-red-500/5'
    },
    {
      type: 'Below Average',
      label: 'Below Average',
      icon: 'warning',
      color: '#eab308',
      bgClass: 'border-amber-500/30 text-amber-500',
      hoverClass: 'hover:border-amber-500 hover:bg-amber-500/5'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-surface animate-in fade-in duration-300 overflow-hidden px-8 py-10">
      <div className="max-w-5xl mx-auto w-full">
        {/* Simplified Header */}
        <div className="flex justify-start items-center mb-10 pb-6 border-b border-outline/5 gap-4">
          <div className="flex items-center gap-3 px-5 py-2 bg-surface-container-low border border-outline/10 rounded-sm shadow-sm ring-1 ring-black/5">
            <span className="text-[0.75rem] font-bold text-on-surface-variant/40 uppercase tracking-widest">Selected Status</span>
            <div className={`flex items-center gap-2 text-[0.9rem] font-black uppercase tracking-wider ml-2 ${currentSentiment === 'Good' ? 'text-emerald-500' :
                currentSentiment === 'Poor' || currentSentiment === 'Dropped' ? 'text-red-500' :
                  currentSentiment === 'Average' ? 'text-blue-500' :
                    currentSentiment === 'Below Average' ? 'text-amber-500' :
                      'text-slate-500'
              }`}>
              <div className={`w-2 h-2 rounded-full bg-current shadow-[0_0_8px_rgba(0,0,0,0.2)]`} />
              {currentSentiment}
            </div>
          </div>
        </div>

        {/* Sentiment Grid - Consistent Squircle Card Approach */}
        <div className="grid grid-cols-6 gap-3">
          {options.map((option) => {
            const isSelected = currentSentiment === option.type;
            return (
              <div
                key={option.type}
                onClick={() => handleSentimentSelect(option.type)}
                className={`relative group cursor-pointer border rounded-sm p-5 flex flex-col items-center justify-center gap-4 transition-all duration-200 h-[140px] shadow-sm
                  ${isSelected
                    ? `bg-surface-container-high border-primary-container ring-1 ring-primary-container/20`
                    : `bg-surface-container-low border-outline/5 hover:bg-surface-container-high hover:border-outline/10`
                  }
                `}
              >
                {/* Icon Circle */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isSelected ? 'bg-primary-container/10' : 'bg-surface-container opacity-60'}`}
                  style={{ color: isSelected ? 'var(--primary-container)' : option.color }}>
                  <span className="material-symbols-outlined !text-[24px]">
                    {option.icon}
                  </span>
                </div>

                <div className="flex flex-col items-center text-center">
                  <span className={`text-[0.75rem] font-bold uppercase tracking-widest ${isSelected ? 'text-primary-container' : 'text-on-surface-variant'}`}>
                    {option.label}
                  </span>
                </div>

                {/* Selection indicator mark (Green dot as per image) */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)] animate-pulse" />
                )}
              </div>
            );
          })}
        </div>

        {/* Action Footer */}
        <div className="mt-16 flex flex-col items-center gap-2">
          <p className="text-[0.8rem] text-on-surface-variant/40 font-medium uppercase tracking-widest">
            Last updated: 5 minutes ago by System
          </p>
        </div>
      </div>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-md shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-8 fade-in duration-300">
          <span className="material-symbols-outlined !text-[20px] text-emerald-400">check_circle</span>
          <span className="text-[0.85rem] font-medium tracking-wide">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default SentimentTabContent;
