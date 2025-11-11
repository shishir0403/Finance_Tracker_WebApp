import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function ChartView({ income, expense }) {
  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];
  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <PieChart width={300} height={250}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={80}
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}

export default ChartView;
