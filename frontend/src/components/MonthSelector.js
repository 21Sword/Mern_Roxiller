import React from 'react';

const MonthSelector = ({ selectedMonth, setSelectedMonth }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  return (
    <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
      {months.map((month, index) => (
        <option key={index} value={index + 1}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default MonthSelector;
