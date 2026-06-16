import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface SentimentItem {
  label: string;
  value: number;
  icon: string;
  color: string;
  bgColor: string;
}

const SentimentAnalysis: React.FC = () => {
  const { isDark } = useTheme();

  const sentiments: SentimentItem[] = [
    { label: 'Dropped', value: 11.11, icon: 'keyboard_tab_rtl', color: '#EF4444', bgColor: 'bg-red-500/10' },
    { label: 'Unknown', value: 72.22, icon: 'help_outline', color: '#94A3B8', bgColor: 'bg-slate-500/10' },
    { label: 'Good', value: 11.11, icon: 'sentiment_very_satisfied', color: '#10B981', bgColor: 'bg-emerald-500/10' },
    { label: 'Poor', value: 5.56, icon: 'sentiment_very_dissatisfied', color: '#F59E0B', bgColor: 'bg-amber-500/10' },
  ];

  return (
    <div className="bg-surface border border-outline/10 rounded-sm p-6 shadow-sm flex flex-col h-full min-h-[300px]">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-[0.8rem] font-medium text-on-surface uppercase tracking-widest">
          Sentiment Distribution
        </h3>
        <div className="flex gap-2">
           <span className="material-symbols-outlined text-on-surface-variant/20 !text-[20px]">analytics</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 flex-1 items-end pt-4">
        {sentiments.map((s, idx) => (
          <div key={idx} className="flex flex-col items-center gap-4 group h-full justify-end">
            <div className="flex-1 w-full flex flex-col justify-end items-center relative group-hover:scale-105 transition-transform duration-500">
               {/* Percentage Label on top */}
               <span className="text-[0.65rem] font-bold text-on-surface-variant mb-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                 {s.value}%
               </span>
               
               {/* The Bar */}
               <div className="w-12 bg-surface-container rounded-sm relative overflow-hidden flex flex-col justify-end" style={{ height: '140px' }}>
                  <div 
                    className="w-full rounded-sm transition-all duration-1000 ease-out shadow-[0_-4px_12px_rgba(0,0,0,0.1)]"
                    style={{ 
                        height: `${s.value}%`, 
                        backgroundColor: s.color,
                        opacity: isDark ? 0.8 : 1
                    }}
                  >
                    {/* Inner light highlight for glass effect */}
                    <div className="absolute inset-0 bg-white/10 opacity-50 rounded-sm" />
                  </div>
               </div>
            </div>

            {/* Icon & Label */}
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-8 h-8 rounded-sm ${s.bgColor} flex items-center justify-center border border-outline/5 group-hover:rotate-12 transition-transform`}>
                <span className="material-symbols-outlined !text-[18px]" style={{ color: s.color }}>{s.icon}</span>
              </div>
              <span className="text-[0.7rem] font-bold text-on-surface-variant uppercase tracking-widest">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-outline/5 flex items-center justify-between text-[0.65rem] font-medium text-on-surface-variant/40">
         <span className="uppercase tracking-widest uppercase">Last 30 Days Portfolio health</span>
         <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Live Feed
         </span>
      </div>
    </div>
  );
};

export default SentimentAnalysis;
