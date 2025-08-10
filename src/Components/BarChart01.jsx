import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Custom Tooltip component to display both food name and quantity
const CustomTooltip = ({ active, payload, theme }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`p-3 border rounded-lg shadow-lg
        ${theme === 'dark' ? "bg-gray-800 bg-opacity-80 backdrop-blur-sm border-gray-700 text-gray-200" : "bg-white border-gray-300 text-gray-800"}`}
      >
        <p className={`font-bold ${theme === 'dark' ? "text-indigo-400" : "text-indigo-600"}`}>{`${payload[0].payload.foodName}`}</p>
        <p className={`${theme === 'dark' ? "text-gray-300" : "text-gray-700"}`}>{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const BarChart01 = ({ data, theme }) => {
  const isDarkMode = theme === 'dark';

  return (
    <div className={`rounded-lg shadow-lg p-4 h-full flex flex-col justify-center border
      ${isDarkMode ? "bg-gray-800 bg-opacity-80 backdrop-blur-sm border-gray-700" : "bg-white border-gray-300"}`}
    >
      <h3 className={`text-lg font-bold mb-4 text-center
        ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
      >
        Food Quantity by Name
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#4B5563" : "#D1D5DB"} />
          <YAxis stroke={isDarkMode ? "#9CA3AF" : "#6B7280"} tick={{ fill: isDarkMode ? '#9CA3AF' : '#6B7280' }} />
          <Tooltip 
            cursor={{ fill: isDarkMode ? '#4B5563' : '#E5E7EB', opacity: 0.5 }}
            content={<CustomTooltip theme={theme} />}
          />
          <Legend wrapperStyle={{ color: isDarkMode ? '#9CA3AF' : '#6B7280', paddingTop: '10px' }} />
          <Bar dataKey="foodQuantity" fill={isDarkMode ? "#818CF8" : "#4F46E5"} name="Quantity" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart01;