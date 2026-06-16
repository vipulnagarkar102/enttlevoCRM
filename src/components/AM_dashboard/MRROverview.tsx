import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const MRROverview: React.FC = () => {
  const { isDark } = useTheme();
  
  const data = [
    { name: 'EV', value: 5, color: '#312e38' }, // Dark shade
    { name: 'Software', value: 95, color: '#f97316' }, // Primary Orange
  ];

  const tooltipBg = isDark ? '#1e1e1e' : '#fff';
  const tooltipBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const tooltipText = isDark ? '#e3e3e3' : '#1d1a22';

  return (
    <div className="bg-surface border border-outline/10 rounded-sm p-6 shadow-sm flex flex-col h-[450px]">
      <h3 className="text-[0.8rem] font-medium text-on-surface uppercase tracking-widest mb-4">
        MRR Overview
      </h3>
      <div className="h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              isAnimationActive={true}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: '4px',
                color: tooltipText,
                fontSize: '11px',
              }}
            />
            <Legend
              verticalAlign="top"
              align="center"
              iconType="rect"
              formatter={(value) => (
                <span className="text-[0.7rem] font-bold text-on-surface-variant uppercase tracking-widest px-2">
                  {value}
                </span>
              )}
              wrapperStyle={{ paddingTop: 0, paddingBottom: 20 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MRROverview;
