import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const StocksLineGraph = ({ stockData }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const productNames = stockData.map((product) => product.name); 
      const stockLevels = stockData.map((product) => product.stock);

      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: productNames, 
          datasets: [
            {
              label: 'Stock Levels',
              data: stockLevels, 
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
  }, [stockData]);

  return (
    <div>
      <h4 style={{marginTop:'87px'}}>Stock Levels</h4>
      <canvas ref={chartContainer} width="400" height="200"></canvas>
    </div>
  );
};

export default StocksLineGraph;
