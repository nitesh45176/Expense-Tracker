import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";


const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
     console.log("📊 Chart Data:", result); 
    setChartData(result);
   
  }, [data]);

  useEffect(() => {
  if (data.length === 0) {
    setChartData([
      { label: "No Data", value: 0 }
    ]);
  } else {
    setChartData(prepareExpenseBarChartData(data));
  }
}, [data]);


  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>
      <CustomBarChart data={chartData} />
    </div>
  );
};

export default Last30DaysExpenses;
