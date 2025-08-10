import React from 'react';

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap gap-4 ">
      {payload?.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center space-x-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></span>
          <span className="text-sm text-gray-700 ">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
