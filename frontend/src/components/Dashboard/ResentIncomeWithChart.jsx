import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875cf5", "#fa2c37", "#ff6900", "#4F38F6"];

const ResentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data
      ?.map((item) => ({
        name: item?.source,
        amount: Number(item?.amount) || 0,
      }))
      .filter((item) => item.amount > 0);

    setChartData(dataArr);
  };

  useEffect(() => {
  if (data.length === 0) {
    setChartData([
      { label: "No Data", value: 0 }
    ]);
  } else {
    setChartData(prepareExpenseBarChartData(data));
  }
}, [data]);


  useEffect(() => {
    console.log("Income data received:", data);
    prepareChartData();
  }, [data]);

  return (
    <div className="card h-[350px]">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default ResentIncomeWithChart;