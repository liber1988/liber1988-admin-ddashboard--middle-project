import React, { useState, useEffect } from "react";
import * as echarts from "echarts";

function BudgetChart() {
  useEffect(() => {
    echarts.init(document.querySelector("#budgetChart")).setOption({
      legend: {
        data: ["Allocated Budget", "Actual Spending"],
      },
      radar: {
        shape: "circle",

        indicator: [
          {
            name: "Growth",
            max: 6500,
          },
          { name: "Profitability", max: 16000 },
          {
            name: "GV Value",
            max: 30000,
          },
          { name: "Momentum", max: 38000 },
          { name: "Financial Strength", max: 52000 },
        ],
      },
      series: [
        {
          name: "Budget vs spending",
          type: "radar",
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000],
              name: "Company data",
            },
          ],
        },
      ],
    });
  }, []);
  return (
    <div
      id="budgetChart"
      style={{ minHeight: "400px" }}
      className="echart"
    ></div>
  );
}
export default BudgetChart;
