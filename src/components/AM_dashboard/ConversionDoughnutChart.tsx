import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const ConversionDoughnutChart: React.FC = () => {
  const { isDark } = useTheme();
  const tooltipBg = isDark ? '#1e1e1e' : '#fff';
  const tooltipBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const tooltipText = isDark ? '#e3e3e3' : '#1d1a22';

  const data = [
    { name: 'Implementation', value: 8, color: '#3b82f6' },
    { name: 'Completed', value: 5, color: '#10b981' },
    { name: 'Delayed', value: 2, color: '#f59e0b' },
    { name: 'Active', value: 12, color: 'rgb(var(--color-primary-container))' },
  ];

  return (
    <div className="col-span-4 p-6 bg-surface-container-low rounded-sm border border-outline/5 h-[400px] transition-colors duration-300">
      <h3 className="text-[0.8rem] font-medium text-on-surface uppercase tracking-widest mb-6 text-left">
        AM Status Distribution
      </h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="40%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
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
              layout="vertical"
              verticalAlign="middle"
              align="right"
              iconType="circle"
              formatter={(value, entry: any) => (
                <span style={{ fontSize: '0.75rem', color: isDark ? '#c4c4c4' : '#574235', fontWeight: 500 }}>
                  {value} ({entry.payload.value})
                </span>
              )}
              wrapperStyle={{ paddingLeft: 20 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ConversionDoughnutChart;
