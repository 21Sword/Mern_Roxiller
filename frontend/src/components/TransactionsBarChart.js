import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { fetchBarChartData } from '../services/api';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransactionsBarChart = ({ selectedMonth }) => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    // Fetch bar chart data for the selected month
    fetchBarChartData(selectedMonth)
      .then((response) => setBarData(response.data))
      .catch((error) => console.error('Error fetching bar chart data:', error));
  }, [selectedMonth]);

  // Prepare the chart data
  const chartData = {
    labels: barData.map((item) => item._id || "Unknown"), // Handle cases where _id is null/undefined
    datasets: [
      {
        label: 'Number of Items',
        data: barData.map((item) => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Transactions by Price Range for ${selectedMonth}`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Price Range',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Items',
        },
      },
    },
  };

  return (
    <div>
      <h3>Transactions Bar Chart</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TransactionsBarChart;
