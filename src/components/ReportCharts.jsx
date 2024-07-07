import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { StrategyCompareData } from "../firebase/fetchingTradeData";

function ReportCharts() {
  const [data, setData] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      markers: {
        size: 4,
      },
      colors: ["#4154f1", "#2eca6a", "#ff771d", "#ffd700", "#808080"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.4,
          stops: [0, 90, 100],
        },
      },
      datalabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        type: "datetime",
        categories: [],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const processedData = await StrategyCompareData();

        const categoriesSet = new Set();
        const seriesMap = {};

        // Initialize series map and collect all unique dates
        processedData.forEach((strategyGroup) => {
          seriesMap[strategyGroup.strategy] = {
            name: strategyGroup.strategy,
            data: [],
          };

          strategyGroup.data.forEach((trade) => {
            const date = new Date(trade.entryDate).toISOString();
            categoriesSet.add(date);
          });
        });

        const categories = Array.from(categoriesSet).sort();

        // Populate series data aligned with categories (dates)
        processedData.forEach((strategyGroup) => {
          const strategyName = strategyGroup.strategy;
          seriesMap[strategyName].data = strategyGroup.data.map((trade) => ({
            x: new Date(trade.entryDate).toISOString(),
            y: trade.accumulatedResult,
          }));
        });

        const series = Object.values(seriesMap);

        setData((prevData) => ({
          ...prevData,
          series,
          options: {
            ...prevData.options,
            xaxis: {
              ...prevData.options.xaxis,
              categories,
            },
          },
        }));
      } catch (error) {
        console.error("Error fetching and processing trades data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Chart
      options={data.options}
      series={data.series}
      type={data.options.chart.type}
      height={data.options.chart.height}
    />
  );
}

export default ReportCharts;
