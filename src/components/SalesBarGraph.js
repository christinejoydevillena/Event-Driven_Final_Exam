import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarGraph = ({ reportData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (reportData.length > 0) {
      if (chartInstance.current) {
        // If a chart instance already exists, destroy it before creating a new one
        chartInstance.current.destroy();
      }

      // Aggregate quantities for each product name
      const aggregatedData = reportData.reduce((accumulator, currentItem) => {
        if (!accumulator[currentItem.productName]) {
          accumulator[currentItem.productName] = 0;
        }
        accumulator[currentItem.productName] += currentItem.productQuantity;
        return accumulator;
      }, {});

      const productNames = Object.keys(aggregatedData);
      const productQuantities = Object.values(aggregatedData);

      const chartCanvas = chartRef.current.getContext('2d');

      chartInstance.current = new Chart(chartCanvas, {
        type: 'bar',
        data: {
          labels: productNames,
          datasets: [
            {
              label: "Sales",
              data: productQuantities,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    // Cleanup function to destroy the chart instance when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [reportData]);

  return <canvas ref={chartRef} width={50} height={20}></canvas>;
};

export default BarGraph;
