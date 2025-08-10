import React from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';

const CustomLineChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0].payload.date}
          </p>
          <p className="text-sm text-gray-600">
            Amount: <span className="text-sm font-medium text-gray-900">${payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#875Cff" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#875Cff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="3 3" />
          <XAxis dataKey="month" tick={{fontSize: 12, fill: "#555"}} stroke='none'/>
          <YAxis tick={{fontSize: 12, fill: "#555"}} stroke='none'/>
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#875Cff"
            strokeWidth={3}
            dot={{r: 3, fill: "ab8df8"}}
            fill="url(#incomeGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
