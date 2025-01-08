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

  // Generate the price ranges dynamically
  const generatePriceRangeLabel = (value) => {
    if (value <= 100) return '0-100'
    else if (value<=200) return '101-200'
    else if (value<=300) return '201-300'
    else if (value<=400) return '301-400'
    else if (value<=500) return '401-500'
    else if (value<=600) return '501-600'
    else if (value<=700) return '601-700'
    else if (value<=800) return '701-800'
    else if (value<=900) return '801-900'
    else return '901 above'
  };
  
  // Prepare the chart data
  const chartData = {
    labels: barData.map((item) => generatePriceRangeLabel(item._id || 0)), // Handle missing _id
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
      <h1 style={{ textAlign: 'center' }}>Transactions Bar Chart</h1>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TransactionsBarChart;
