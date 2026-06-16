import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const LeadLabelsScatterChart: React.FC = () => {
  const { isDark } = useTheme();
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : '#f0f0f0';
  const tickColor = isDark ? '#9a9a9a' : '#6b7280';
  const tooltipBg = isDark ? '#1e1e1e' : '#fff';
  const tooltipBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const tooltipText = isDark ? '#e3e3e3' : '#1d1a22';

  return (
    <div className="col-span-4 p-6 bg-surface-container-low rounded-sm border border-outline/5 h-[400px] flex flex-col transition-colors duration-300">
      <div className="flex justify-between items-start mb-4 text-left">
        <h3 className="text-[0.8rem] font-medium text-on-surface uppercase tracking-widest mb-6">
          Account Labels
        </h3>
        <div className="flex flex-col gap-1">
          {[
            { name: 'Hot Accounts', color: '#f87171' },
            { name: 'Warm Accounts', color: '#fb923c' },
            { name: 'Cold Accounts', color: '#60a5fa' },
          ].map((label) => (
            <div key={label.name} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: label.color }}></div>
              <span className="text-[0.8rem] text-on-surface-variant font-medium">{label.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            <XAxis
              type="category"
              dataKey="x"
              name="Category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: tickColor }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Value"
              domain={[0, 4]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: tickColor }}
              ticks={[0, 1, 2, 3, 4]}
            />
            <ZAxis type="number" range={[100, 100]} />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: '4px',
                color: tooltipText,
                fontSize: '11px',
              }}
            />
            <Scatter name="Hot Accounts" data={[{ x: 'Accounts', y: 3.5 }, { x: 'Accounts', y: 4 }, { x: 'Accounts', y: 3.2 }]} fill="#f87171" />
            <Scatter name="Warm Accounts" data={[{ x: 'Accounts', y: 1.5 }, { x: 'Accounts', y: 2.5 }, { x: 'Accounts', y: 2 }]} fill="#fb923c" />
            <Scatter name="Cold Accounts" data={[{ x: 'Accounts', y: 0 }, { x: 'Accounts', y: 0.5 }, { x: 'Accounts', y: 0.2 }]} fill="#60a5fa" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="border-t border-outline-variant/30 pt-4 mt-2 text-left">
        <div className="text-[0.75rem] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-2 font-body">
          Average AM Duration (Warm Accounts)
        </div>
        <div className="flex items-end gap-4">
          <div className="text-3xl font-bold text-primary-container">
            24.5 <span className="text-on-surface-variant/40 text-lg font-medium">Days</span>
          </div>
          <div className="bg-emerald-500/15 text-emerald-500 px-3 py-1.5 rounded-full text-[0.75rem] font-bold flex items-center gap-1 border border-emerald-500/20 mb-1">
            -8% IMPROVEMENT
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadLabelsScatterChart;
