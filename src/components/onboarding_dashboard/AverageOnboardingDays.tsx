import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Support Setup', days: 38 },
  { name: 'Marketing', days: 22 },
  { name: 'Finance', days: 35 },
  { name: 'HR Customer', days: 25 },
  { name: 'IT Customer', days: 41 },
];

const AverageOnboardingDays: React.FC = () => {
  return (
    <div className="bg-surface border border-outline/10 rounded-sm p-6 shadow-sm flex flex-col h-[350px]">
      <h3 className="text-on-surface font-semibold mb-6">Average Onboarding Days</h3>
      <div className="flex-1 min-h-0 -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(var(--outline-rgb), 0.1)" />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'rgba(var(--on-surface-variant-rgb), 0.7)' }} dx={-5} />
            <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'rgba(var(--on-surface-rgb), 0.8)' }} width={90} />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgb(var(--surface-container-high-rgb))', border: '1px solid rgba(var(--outline-rgb), 0.1)', borderRadius: '4px', fontSize: '13px', color: 'rgb(var(--on-surface-rgb))' }}
              itemStyle={{ color: 'rgb(var(--on-surface-rgb))' }}
              cursor={{fill: 'rgba(var(--outline-rgb), 0.05)'}}
            />
            <Bar dataKey="days" name="Days" fill="#20c997" radius={[0, 4, 4, 0]} maxBarSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default AverageOnboardingDays;
