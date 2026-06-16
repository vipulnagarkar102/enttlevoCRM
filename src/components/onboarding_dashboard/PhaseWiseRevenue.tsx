import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const data = [
  { name: 'Phase 1', value: 70 },
  { name: 'Phase 2', value: 30 },
];

const COLORS = ['#20c997', '#3b82f6'];

const PhaseWiseRevenue: React.FC = () => {
  const { isDark } = useTheme();
  const tooltipBg = isDark ? '#1e1e1e' : '#fff';
  const tooltipBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const tooltipText = isDark ? '#e3e3e3' : '#1d1a22';

  return (
    <div className="bg-surface border border-outline/10 rounded-sm p-6 shadow-sm flex flex-col h-[350px]">
      <h3 className="text-[0.8rem] font-medium text-on-surface uppercase tracking-widest text-left mb-6">
        Phase Wise Revenue
      </h3>
      <div className="flex-1 min-h-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius="65%"
              outerRadius="85%"
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `${value}%`}
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: '4px',
                color: tooltipText,
                fontSize: '11px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} iconType="circle" verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8 text-center">
          <span className="text-2xl font-bold text-on-surface">50%</span>
          <span className="text-[11px] text-on-surface-variant font-medium mt-0.5">Avg. Rate</span>
        </div>
      </div>
    </div>
  );
};
export default PhaseWiseRevenue;
