import React, { useState, useEffect } from 'react';
import { fetchStatistics } from '../services/api';

const TransactionsStatistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({});

  // Month names array
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Mapping the selectedMonth to the month name
  const monthName = selectedMonth ? months[selectedMonth - 1] : '';

  useEffect(() => {
    if (selectedMonth) {
      fetchStatistics(selectedMonth)
        .then((response) => setStatistics(response.data))
        .catch((error) => console.error('Error fetching statistics:', error));
    }
  }, [selectedMonth]);

  return (
    <div>
      {/* Dynamically setting the title with the month name */}
      <h1 style={{ textAlign: 'center' }}>{monthName ? `Statistics for ${monthName}` : 'Please select a month to view statistics.'}</h1>

      {/* Show statistics in table format if selectedMonth is valid */}
      {selectedMonth && selectedMonth !== 0 ? (
        <table className="statistics-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Sales</td>
              <td>${statistics.totalSales || 0}</td>
            </tr>
            <tr>
              <td>Sold Items</td>
              <td>{statistics.soldItems || 0}</td>
            </tr>
            <tr>
              <td>Not Sold Items</td>
              <td>{statistics.notSoldItems || 0}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Please select a month to view statistics.</p>
      )}
    </div>
  );
};

export default TransactionsStatistics;
