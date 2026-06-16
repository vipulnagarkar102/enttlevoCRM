import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const PipelineBarChart: React.FC = () => {
  const { isDark } = useTheme();
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : '#f0f0f0';
  const tickColor = isDark ? '#9a9a9a' : '#6b7280';
  const tooltipBg = isDark ? '#1e1e1e' : '#fff';
  const tooltipBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const tooltipText = isDark ? '#e3e3e3' : '#1d1a22';

  return (
    <div className="col-span-4 p-6 bg-surface-container-low rounded-sm border border-outline/5 h-[400px] transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[0.8rem] font-medium text-on-surface uppercase tracking-widest text-left">
          Onboarding Pipeline
        </h3>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={[
              { date: 'Jan', active: 5, completed: 2 },
              { date: 'Feb', active: 8, completed: 6 },
              { date: 'Mar', active: 4, completed: 3 },
            ]}
            margin={{ top: 20, right: 30, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: tickColor }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: tickColor }} />
            <Tooltip
              cursor={{ fill: 'transparent' }}
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
              align="right"
              iconType="circle"
              wrapperStyle={{ fontSize: 10, paddingBottom: 20, color: tickColor }}
            />
            <Bar dataKey="active" name="Active" fill="#3b82f6" radius={[2, 2, 0, 0]} barSize={40} />
            <Bar dataKey="completed" name="Completed" fill="#10b981" radius={[2, 2, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PipelineBarChart;
