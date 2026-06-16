import React from 'react';

const EmptyChartState: React.FC<{ title: string; message?: string }> = ({ title, message = "There is no data to display at the moment. Please try again later or adjust your filters." }) => (
  <div className="bg-surface border border-outline/10 rounded-sm p-6 shadow-sm flex flex-col h-[350px]">
    <h3 className="text-[0.8rem] font-medium text-on-surface uppercase tracking-widest text-left mb-auto">
      {title}
    </h3>
    <div className="flex flex-col items-center justify-center flex-1">
      <span className="material-symbols-outlined !text-[56px] text-on-surface-variant/30 mb-4 opacity-70">bar_chart</span>
      <h4 className="text-on-surface font-bold text-[15px]">No Data Available</h4>
      <p className="text-on-surface-variant/70 text-[13px] mt-2 max-w-[320px] text-center">{message}</p>
    </div>
  </div>
);

export default EmptyChartState;
