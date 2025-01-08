import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MonthSelector from './components/MonthSelector';
import TransactionsTable from './components/TransactionsTable';
import TransactionsStatistics from './components/TransactionsStatistics';
import TransactionsBarChart from './components/TransactionsBarChart';
import TransactionsPieChart from './components/TransactionsPieChart';
import { fetchCombinedData } from './services/api';
import './App.css';

const HomePage = ({ selectedMonth, setSelectedMonth }) => {
  return (
    <div>
      <h1>Transactions Dashboard</h1>
      <MonthSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
      {/* Show the Transactions Table only if a month is selected */}
      {selectedMonth && selectedMonth !== 0 ? (
        <TransactionsTable selectedMonth={selectedMonth} />
      ) : (
        <p>Please select a month to view the data.</p>
      )}
    </div>
  );
};

const CombinedDataPage = ({ combinedData }) => {
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Combined Data</h2>
      <table className="combined-data-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Response</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>API Statistics</td>
            <td>
              <ul>
                <li>Total Sales: ${combinedData.statistics.totalSales || 0}</li>
                <li>Sold Items: {combinedData.statistics.soldItems || 0}</li>
                <li>Not Sold Items: {combinedData.statistics.notSoldItems || 0}</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>Bar Chart Data</td>
            <td>
              <pre>{JSON.stringify(combinedData.barChart, null, 2)}</pre>
            </td>
          </tr>
          <tr>
            <td>Pie Chart Data</td>
            <td>
              <pre>{JSON.stringify(combinedData.pieChart, null, 2)}</pre>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const StatisticsPage = ({ selectedMonth }) => {
  return (
    <div>
      {/* Show statistics only if a valid month is selected */}
      {selectedMonth && selectedMonth !== 0 ? (
        <TransactionsStatistics selectedMonth={selectedMonth} />
      ) : (
        <p>Please select a month to view statistics.</p>
      )}
    </div>
  );
};

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState(null); // Start with null (no month selected)
  const [combinedData, setCombinedData] = useState(null);

  useEffect(() => {
    if (selectedMonth) {
      fetchCombinedData(selectedMonth)
        .then((response) => setCombinedData(response.data))
        .catch((error) => console.error('Error fetching combined data:', error));
    }
  }, [selectedMonth]);

  return (
    <Router>
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/statistics">Statistics</Link></li>
          <li><Link to="/bar-chart">Bar Chart</Link></li>
          <li><Link to="/pie-chart">Pie Chart</Link></li>
          <li><Link to="/combined-data">Combined Data</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route 
          path="/" 
          element={<HomePage selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />} 
        />
        <Route path="/bar-chart" element={<TransactionsBarChart selectedMonth={selectedMonth} />} />
        <Route path="/pie-chart" element={<TransactionsPieChart selectedMonth={selectedMonth} />} />
        {/* Only show Combined Data if a valid month is selected */}
        <Route 
          path="/combined-data" 
          element={selectedMonth && selectedMonth !== 0 ? <CombinedDataPage combinedData={combinedData} /> : <p>Please select a month to view the combined data.</p>} 
        />
        <Route path="/statistics" element={<StatisticsPage selectedMonth={selectedMonth} />} />
      </Routes>
    </Router>
  );
};

export default App;
