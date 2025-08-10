import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875cf5", "#fa2c37", "#ff6900", "#4F38F6"];

const ResentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  // FIXED: Create proper income chart data preparation function
  const prepareIncomeChartData = (incomeData = []) => {
    if (!Array.isArray(incomeData) || incomeData.length === 0) {
      return [{ name: "No Data", amount: 0 }];
    }

    const grouped = {};

    incomeData.forEach(item => {
      const source = item?.source || "Unknown";
      const amount = Number(item?.amount) || 0;

      if (grouped[source]) {
        grouped[source] += amount;
      } else {
        grouped[source] = amount;
      }
    });

    return Object.entries(grouped).map(([source, amount]) => ({
      name: source,
      amount: amount,
    }));
  };

  useEffect(() => {
    console.log("Income data received:", data);
    
    if (!data || data.length === 0) {
      setChartData([{ name: "No Data", amount: 0 }]);
    } else {
      // FIXED: Use the correct function for income data
      const preparedData = prepareIncomeChartData(data);
      console.log("📊 Prepared Income Chart Data:", preparedData);
      setChartData(preparedData);
    }
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