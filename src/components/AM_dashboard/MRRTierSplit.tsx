import React from 'react';

interface TierItem {
  label: string;
  value: number;
  percentage: string;
  icon: string;
  color: string;
  count: string;
}

const MRRTierSplit: React.FC = () => {

  const tiers: TierItem[] = [
    { label: 'Rabbit', value: 0.06, percentage: '0.06%', icon: 'eco', color: '#FDBA74', count: '12 Accounts' },
    { label: 'Elephant', value: 99.94, percentage: '99.94%', icon: 'rocket_launch', color: '#F97316', count: '450 Accounts' },
  ];

  return (
    <div className="bg-surface border border-outline/10 rounded-sm p-6 shadow-sm flex flex-col h-full min-h-[300px]">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-[0.8rem] font-medium text-on-surface uppercase tracking-widest">
          MRR Tier Distribution
        </h3>
        <span className="material-symbols-outlined text-on-surface-variant/20 !text-[20px]">layers</span>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-10">
        {tiers.map((tier, idx) => (
          <div key={idx} className="space-y-3 group">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-sm bg-surface-container flex items-center justify-center border border-outline/5 group-hover:bg-primary-container/10 transition-colors`}>
                  <span className="material-symbols-outlined !text-[20px]" style={{ color: tier.color }}>{tier.icon}</span>
                </div>
                <div>
                  <h4 className="text-[0.85rem] font-bold text-on-surface uppercase tracking-wide">{tier.label}</h4>
                  <p className="text-[0.65rem] font-medium text-on-surface-variant/40 uppercase tracking-widest">{tier.count}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[1.1rem] font-bold text-on-surface tracking-tight">{tier.percentage}</span>
              </div>
            </div>

            <div className="w-full h-3 bg-surface-container rounded-sm overflow-hidden relative">
              <div 
                 className="h-full rounded-sm transition-all duration-1000 ease-out relative shadow-[0_0_12px_rgba(0,0,0,0.1)]"
                 style={{ 
                    width: `${tier.value}%`, 
                    backgroundColor: tier.color,
                    boxShadow: `0 0 15px ${tier.color}30`
                 }}
              >
                  {/* Subtle inner gradient for premium look */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
              </div>
              
              {/* Value indicator line for very small values */}
              {tier.value < 1 && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-on-surface-variant/20 ml-[0.5%]" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-outline/5 flex items-center justify-between">
         <div className="flex -space-x-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-6 h-6 rounded-sm bg-surface-container border border-surface flex items-center justify-center overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=C${i}&background=random&color=fff`} className="w-full h-full object-cover" alt="User" />
              </div>
            ))}
            <div className="w-6 h-6 rounded-sm bg-primary-container text-white text-[0.6rem] font-bold flex items-center justify-center border border-surface">+12</div>
         </div>
         <span className="text-[0.65rem] font-bold text-primary-container uppercase tracking-widest cursor-pointer hover:underline">View All Tiers</span>
      </div>
    </div>
  );
};

export default MRRTierSplit;
