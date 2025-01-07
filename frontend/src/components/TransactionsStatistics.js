import React, { useState, useEffect } from 'react';
import { fetchStatistics } from '../services/api';

const TransactionsStatistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    fetchStatistics(selectedMonth)
      .then((response) => setStatistics(response.data))
      .catch((error) => console.error('Error fetching statistics:', error));
  }, [selectedMonth]);

  return (
    <div>
      <h3>Statistics</h3>
      <p>Total Sale Amount: ${statistics.totalSales || 0}</p>
      <p>Total Sold Items: {statistics.soldItems || 0}</p>
      <p>Total Not Sold Items: {statistics.notSoldItems || 0}</p>
    </div>
  );
};

export default TransactionsStatistics;
