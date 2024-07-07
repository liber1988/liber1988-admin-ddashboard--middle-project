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
      colors: ["#4154f1", "#2eca6a", "#ff771d", "red"],
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

        const categories = [];
        const seriesMap = {};

        processedData.forEach((strategyGroup) => {
          seriesMap[strategyGroup.strategy] = {
            name: strategyGroup.strategy,
            data: [],
          };

          strategyGroup.data.forEach((trade) => {
            const date = new Date(trade.entryDate).toISOString();
            if (!categories.includes(date)) {
              categories.push(date);
            }

            seriesMap[strategyGroup.strategy].data.push(
              trade.accumulatedResult
            );
          });
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
