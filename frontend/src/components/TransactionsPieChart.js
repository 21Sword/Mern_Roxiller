// components/TransactionsPieChart.js
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { fetchPieChartData } from '../services/api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionsPieChart = ({ selectedMonth }) => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    // Fetch the pie chart data for the selected month
    fetchPieChartData(selectedMonth)
      .then((response) => setPieData(response.data))
      .catch((error) => console.error('Error fetching pie chart data:', error));
  }, [selectedMonth]);

  // Prepare the pie chart data
  const chartData = {
    labels: pieData.map((item) => item._id || "Unknown"), // Use category or 'Unknown'
    datasets: [
      {
        data: pieData.map((item) => item.itemCount),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#FF9F40'], // You can modify the colors
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,  // Disable aspect ratio to allow custom sizing
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ 
      display: 'grid', 
      placeItems: 'center', // This centers the content both horizontally and vertically
      height: '500px',      // You can adjust the height as needed
      width: '100%'         // Make the container full width
    }}>
      <div style={{ width: '500px', height: '500px' }}>
        <h2 style={{ textAlign: 'center' }}>Transactions Pie Chart</h2>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TransactionsPieChart;
