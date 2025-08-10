import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PieChart01 = ({ data, theme }) => {
  // Define colors based on the theme
  const COLORS = theme === 'dark' ? ['#818CF8', '#EC4899'] : ['#4F46E5', '#F472B6'];

  // Tooltip content style based on the theme
  const tooltipContentStyle = theme === 'dark'
    ? { backgroundColor: '#1F2937', border: 'none', color: '#F3F4F6', borderRadius: '4px' }
    : { backgroundColor: '#F9FAFB', border: '1px solid #D1D5DB', color: '#1F2937', borderRadius: '4px' };

  // Tooltip item style based on the theme
  const tooltipItemStyle = theme === 'dark'
    ? { color: '#F3F4F6' }
    : { color: '#1F2937' };

  // Legend style based on the theme
  const legendStyle = theme === 'dark'
    ? { color: '#9CA3AF', paddingTop: '10px' }
    : { color: '#6B7280', paddingTop: '10px' };

  return (
    <div className={`rounded-lg shadow-lg p-4 h-full flex items-center justify-center border
      ${theme === 'dark' ? "bg-gray-800 bg-opacity-80 backdrop-blur-sm border-gray-700" : "bg-white border-gray-300"}`}
    >
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={tooltipContentStyle}
            itemStyle={tooltipItemStyle}
            formatter={(value) => `${value}%`}
          />
          <Legend wrapperStyle={legendStyle} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart01;