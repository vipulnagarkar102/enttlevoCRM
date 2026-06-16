import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Wk 37', deals: 15, value: 20, tasks: 5 },
  { name: 'Wk 38', deals: 18, value: 25, tasks: 8 },
  { name: 'Wk 39', deals: 24, value: 18, tasks: 12 },
  { name: 'Wk 40', deals: 30, value: 28, tasks: 15 },
  { name: 'Wk 41', deals: 20, value: 35, tasks: 10 },
];

const TeamAMPerformance: React.FC = () => {
  return (
    <div className="bg-surface border border-outline/10 rounded-sm p-6 shadow-sm flex flex-col h-[350px]">
      <h3 className="text-on-surface font-semibold mb-6">Team AM Performance</h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--outline-rgb), 0.1)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'rgba(var(--on-surface-variant-rgb), 0.7)' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'rgba(var(--on-surface-variant-rgb), 0.7)' }} dx={-10} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgb(var(--surface-container-high-rgb))', border: '1px solid rgba(var(--outline-rgb), 0.1)', borderRadius: '4px', fontSize: '13px', color: 'rgb(var(--on-surface-rgb))' }}
              itemStyle={{ color: 'rgb(var(--on-surface-rgb))' }}
              cursor={{fill: 'rgba(var(--outline-rgb), 0.05)'}}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} iconType="circle" />
            <Bar dataKey="deals" name="Deals" fill="#20c997" radius={[2, 2, 0, 0]} maxBarSize={40} />
            <Bar dataKey="value" name="Value" fill="#3b82f6" radius={[2, 2, 0, 0]} maxBarSize={40} />
            <Bar dataKey="tasks" name="Tasks" fill="#e2e8f0" radius={[2, 2, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default TeamAMPerformance;
