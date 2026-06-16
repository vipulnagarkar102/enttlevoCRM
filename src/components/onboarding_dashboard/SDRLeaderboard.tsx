import React from 'react';

const SDRLeaderboard: React.FC = () => {
  const sdrData = [
    { rank: 1, name: 'Shrinath Rao', rev: '$142k', accounts: 18, initials: 'SR', color: 'bg-blue-500', starred: true },
    { rank: 2, name: 'Jessica Chen', rev: '$128k', accounts: 14, initials: 'JC', color: 'bg-pink-500' },
    { rank: 3, name: 'Marcus Smith', rev: '$98k', accounts: 12, initials: 'MS', color: 'bg-orange-500' },
    { rank: 4, name: 'Elena Rodriguez', rev: '$84k', accounts: 10, initials: 'ER', color: 'bg-emerald-500' },
    { rank: 5, name: 'David Kim', rev: '$110k', accounts: 15, initials: 'DK', color: 'bg-violet-500' },
    { rank: 6, name: 'Sofia Garcia', rev: '$92k', accounts: 11, initials: 'SG', color: 'bg-rose-500' },
    { rank: 7, name: 'Liam Thompson', rev: '$76k', accounts: 9, initials: 'LT', color: 'bg-cyan-500' },
    { rank: 8, name: 'Ava Wilson', rev: '$81k', accounts: 10, initials: 'AW', color: 'bg-amber-500' },
  ];

  return (
    <div className="col-span-4 p-6 bg-surface-container-low rounded-sm border border-outline/5 h-[400px] flex flex-col transition-colors duration-300">
      <h3 className="text-[0.8rem] font-medium text-on-surface uppercase tracking-widest mb-6 text-left">
        Onboarding Manager Performance
      </h3>
      <div className="flex-1 space-y-4 overflow-y-auto pr-1 text-left">
        {sdrData.map((sdr) => (
          <div key={sdr.rank} className="flex items-center gap-3 group cursor-pointer">
            <span className="text-[0.8rem] font-bold text-on-surface-variant/40 w-4">{sdr.rank}</span>
            <div className="relative">
              <div className={`w-9 h-9 rounded-full ${sdr.color} flex items-center justify-center text-white text-[0.8rem] font-bold shadow-sm`}>
                {sdr.initials}
              </div>
              {sdr.starred && (
                <div className="absolute -top-1 -right-1 bg-orange-500 border-2 border-surface-container-low rounded-full w-4 h-4 flex items-center justify-center">
                  <span className="material-symbols-outlined !text-[10px] text-white">star</span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[0.85rem] font-semibold text-on-surface truncate">{sdr.name}</div>
              <div className="text-[0.7rem] text-on-surface-variant/70">{sdr.rev} ARR</div>
            </div>
            <div className="text-right">
              <div className="text-[0.9rem] font-bold text-primary-container">{sdr.accounts}</div>
              <div className="text-[0.65rem] text-on-surface-variant/60 font-medium uppercase tracking-tighter">
                Accounts
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-2 border border-outline/20 rounded-sm text-[0.75rem] text-on-surface-variant font-semibold hover:bg-surface-container transition-colors uppercase tracking-wider">
        View Full Rankings
      </button>
    </div>
  );
};

export default SDRLeaderboard;
