"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];

interface DataItem {
  name: string;
  value: number;
}

export function DonutChart({ data }: { data: DataItem[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [`${value} (${((value as number / total) * 100).toFixed(1)}%)`, name]} />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
        >
          <tspan fontSize="24px" fontWeight="bold">
            {total}
          </tspan>
          <tspan fontSize="14px" x="50%" dy="1.5em">
            Total
          </tspan>
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
}