// App.js
import React, { useState, useEffect } from 'react';
import MonthSelector from './components/MonthSelector';
import TransactionsTable from './components/TransactionsTable';
import TransactionsStatistics from './components/TransactionsStatistics';
import TransactionsBarChart from './components/TransactionsBarChart';
import TransactionsPieChart from './components/TransactionsPieChart';
import { fetchCombinedData } from './services/api';
import './App.css'; // Make sure the path matches the location of your CSS file

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState(3); // Default to March
  const [combinedData, setCombinedData] = useState(null);

  useEffect(() => {
    // Fetch combined data when selectedMonth changes
    fetchCombinedData(selectedMonth)
      .then((response) => setCombinedData(response.data))
      .catch((error) => console.error('Error fetching combined data:', error));
  }, [selectedMonth]);

  return (
    <div>
      <h1>Transactions Dashboard</h1>
      <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
      
      {/* Render Statistics */}
      <TransactionsStatistics selectedMonth={selectedMonth} />

      {/* Render Table */}
      <TransactionsTable selectedMonth={selectedMonth} />

      {/* Render Bar Chart */}
      <TransactionsBarChart selectedMonth={selectedMonth} />

      {/* Render Pie Chart */}
      <TransactionsPieChart selectedMonth={selectedMonth} />

      {/* Render Combined Data */}
      {combinedData && (
        <div>
          <h3>Combined Data</h3>
          <p>Total Sales: ${combinedData.statistics.totalSales || 0}</p>
          <p>Sold Items: {combinedData.statistics.soldItems || 0}</p>
          <p>Not Sold Items: {combinedData.statistics.notSoldItems || 0}</p>
          <h4>Bar Chart Data:</h4>
          <pre>{JSON.stringify(combinedData.barChart, null, 2)}</pre>
          <h4>Pie Chart Data:</h4>
          <pre>{JSON.stringify(combinedData.pieChart, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
