import React, { useState } from 'react';

interface CustomCalendarProps {
  selectedDate: string;
  onSelect: (date: string) => void;
  onClose: () => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ selectedDate, onSelect, onClose }) => {
  const [viewDate, setViewDate] = useState(new Date(selectedDate));
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  const monthName = viewDate.toLocaleString('default', { month: 'long' });

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[1000]" onClick={onClose} />

      {/* Calendar Overlay */}
      <div className="absolute top-full left-0 mt-3 z-[1001] bg-surface-container border border-outline/15 shadow-[0_10px_40px_rgba(0,0,0,0.3)] rounded-sm p-5 w-72 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300">

        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 5))}
            className="material-symbols-outlined !text-xl text-on-surface-variant/40 hover:text-primary-container hover:bg-surface-container-high p-1 rounded-full transition-all"
          >
            chevron_left
          </button>
          <span className="text-[0.8rem] font-black text-on-surface uppercase tracking-[0.15em] font-headline">
            {monthName} {viewDate.getFullYear()}
          </span>
          <button
            onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 5))}
            className="material-symbols-outlined !text-xl text-on-surface-variant/40 hover:text-primary-container hover:bg-surface-container-high p-1 rounded-full transition-all"
          >
            chevron_right
          </button>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, idx) => (
            <span key={idx} className="text-[0.6rem] font-black text-on-surface-variant/20 uppercase tracking-widest pb-2">
              {d}
            </span>
          ))}

          {/* Calendar Grid */}
          {blanks.map((i) => (
            <div key={`b-${i}`} className="aspect-square" />
          ))}
          {days.map((d) => {
            const dateStr = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const isSelected = dateStr === selectedDate;
            const isToday = new Date().toISOString().split('T')[0] === dateStr;

            return (
              <button
                key={d}
                onClick={() => {
                  onSelect(dateStr);
                  onClose();
                }}
                className={`w-full aspect-square text-[0.8rem] rounded-sm transition-all relative group flex items-center justify-center font-bold ${isSelected
                  ? 'bg-primary-container text-white shadow-lg z-10 scale-105'
                  : isToday
                    ? 'bg-surface-container-high text-primary-container border border-primary-container/20'
                    : 'hover:bg-surface text-on-surface active:scale-90 hover:shadow-md'
                  }`}
              >
                {d}
                {isToday && !isSelected && <div className="absolute bottom-1 w-1 h-1 bg-primary-container rounded-full" />}
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-4 border-t border-outline/10 text-center">
          <button
            onClick={() => {
              const today = new Date().toISOString().split('T')[0];
              onSelect(today);
              onClose();
            }}
            className="text-[0.65rem] font-black text-primary-container uppercase tracking-[0.2em] hover:opacity-80 transition-opacity"
          >
            Set to Today
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomCalendar;
