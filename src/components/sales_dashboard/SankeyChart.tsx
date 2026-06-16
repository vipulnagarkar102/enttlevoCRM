import React from 'react';
import { Sankey, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from '../../context/ThemeContext';

interface SankeyChartProps {
  className?: string;
}

const SankeyChart: React.FC<SankeyChartProps> = ({ className }) => {
  const { isDark } = useTheme();
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : '#DFD7E3';
  const nodeStroke = isDark ? '#2c2c2c' : '#fff';

  return (
    <div className={`${className || 'col-span-1 sm:col-span-2 xl:col-span-8'} p-5 sm:p-6 bg-surface-container-low rounded-sm border border-outline/5 h-[400px] transition-colors duration-300`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[0.8rem] font-medium text-on-surface uppercase tracking-widest text-left">
          Sales Journey Hub
        </h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-[0.7rem] text-on-surface-variant font-medium bg-surface-container px-2 py-1 rounded-sm border border-outline/5">
            Conversion Rate: <span className="text-primary-container">24.8%</span>
          </div>
        </div>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <Sankey
            data={{
              nodes: [
                { name: 'Total Traffic', color: '#ffb787' },
                { name: 'Qualified Leads', color: '#3b82f6' },
                { name: 'No Fit', color: '#f87171' },
                { name: 'Demo/Discovery', color: '#fb923c' },
                { name: 'Technical Eval', color: '#60a5fa' },
                { name: 'Master Proposal', color: '#10b981' },
                { name: 'Legal/Review', color: '#f59e0b' },
                { name: 'Closed Won', color: '#059669' },
                { name: 'Comp. Loss', color: '#ef4444' },
              ],
              links: [
                { source: 0, target: 1, value: 1200 },
                { source: 0, target: 2, value: 300 },
                { source: 1, target: 3, value: 900 },
                { source: 3, target: 4, value: 650 },
                { source: 3, target: 8, value: 250 },
                { source: 4, target: 5, value: 480 },
                { source: 4, target: 2, value: 170 },
                { source: 5, target: 6, value: 380 },
                { source: 5, target: 8, value: 100 },
                { source: 6, target: 7, value: 310 },
                { source: 6, target: 8, value: 70 },
              ],
            }}
            nodePadding={50}
            margin={{ left: 10, right: 100, top: 20, bottom: 20 }}
            link={{ stroke: gridColor, strokeOpacity: 0.4 }}
            node={{ stroke: nodeStroke, strokeWidth: 2 }}
          >
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1e1e1e' : '#fff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                borderRadius: '4px',
                color: isDark ? '#e3e3e3' : '#1d1a22',
                fontSize: '11px',
              }}
            />
          </Sankey>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SankeyChart;


