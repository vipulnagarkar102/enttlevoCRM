import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Go-live', days: 10 },
  { name: 'Integration', days: 25 },
  { name: 'Training', days: 15 },
  { name: 'Configuration', days: 20 },
];

const AverageDaysByStage: React.FC = () => {
  return (
    <div className="bg-surface border border-outline/10 rounded-sm p-6 shadow-sm flex flex-col h-[350px]">
      <h3 className="text-on-surface font-semibold mb-6">Average Days by Stage</h3>
      <div className="flex-1 min-h-0 -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(var(--outline-rgb), 0.1)" />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'rgba(var(--on-surface-variant-rgb), 0.7)' }} dx={-5} />
            <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'rgba(var(--on-surface-rgb), 0.8)' }} width={80} />
            <Tooltip
              cursor={{fill: 'rgba(var(--outline-rgb), 0.05)'}}
              contentStyle={{ backgroundColor: 'rgb(var(--surface-container-high-rgb))', border: '1px solid rgba(var(--outline-rgb), 0.1)', borderRadius: '4px', fontSize: '13px', color: 'rgb(var(--on-surface-rgb))' }}
              itemStyle={{ color: 'rgb(var(--on-surface-rgb))' }}
            />
            <Bar dataKey="days" name="Days" fill="#8b5cf6" radius={[0, 4, 4, 0]} maxBarSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default AverageDaysByStage;
