import React from 'react'
import { Bar, BarChart, CartesianGrid, Cell, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const CustomBarChart = ({data = []}) => {

    // function to alternate colors
    const getBarColor  = (index) => {
        return index % 2 === 0 ? "#875cf5" : "#cfbefb"
    }

    const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { category, amount } = payload[0].payload; // ✅ Correct way to get it
    return (
      <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
        <p className='text-xs font-semibold text-purple-800 mb-1'>{category}</p>
        <p className='text-sm text-gray-800'>
          Amount: <span className='font-medium text-gray-800'>₹{amount}</span>
        </p>
      </div>
    );
  }
  return null;
};

    return (
        <div className='bg-white mt-9'>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none" />
                    
                    <XAxis dataKey="category" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
                    <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
                    <Tooltip content={CustomTooltip} />
                    <Bar
                        dataKey="amount"
                        fill='#FF8042'
                        radius={[10, 10, 0, 0]}
                        activeDot={{ r: 8, fill: "yellow" }}
                        activeStyle={{ fill: "green" }}
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={getBarColor(index)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart
