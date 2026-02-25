'use client';

import { ChartDataPoint } from '@/types/statistics';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface TransactionChartProps {
  data: ChartDataPoint[];
}

export default function TransactionChart({ data }: TransactionChartProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300">
      <div className="text-center text-sm text-gray-600 mb-4">
        Spending Chart
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
            }}
            formatter={(value: number) => `$${value.toFixed(2)}`}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#764ba2' : '#667eea'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
