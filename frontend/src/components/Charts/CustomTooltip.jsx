import React from 'react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded p-2 border border-gray-300">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-gray-600">{`${payload[0].name || payload[0].dataKey}: ₹${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
