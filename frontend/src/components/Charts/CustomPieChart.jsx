import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
  return (
   <div className="my-3 w-full max-w-[500px] mx-auto bg-white p-4 rounded shadow">
  <ResponsiveContainer width="100%" height={320}>
    <PieChart margin={{ top: 20, right: 20, left: 20, bottom: 60 }}>
      <Pie
        data={data}
        dataKey="amount"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={110}
        innerRadius={80}
        labelLine={false}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend  content={<CustomLegend />} />
      {showTextAnchor && (
        <>
          <text
            x="50%"
            y="50%"
            dy={-20}
            textAnchor="middle"
            fill="#666"
            fontSize="12px"
          >
            {label}
          </text>
          <text
            x="50%"
            y="50%"
            dy={10}
            textAnchor="middle"
            fill="#333"
            fontSize="20px"
            fontWeight="semi-bold"
          >
            {totalAmount}
          </text>
        </>
      )}
    </PieChart>
  </ResponsiveContainer>
</div>

   
  );
};

export default CustomPieChart;