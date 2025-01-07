// services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchTransactions = (month, search, page, perPage) =>
  axios.get(`${API_BASE_URL}/transactions`, {
    params: { month, search, page, perPage },
  });

export const fetchStatistics = (month) =>
  axios.get(`${API_BASE_URL}/statistics`, { params: { month } });

export const fetchBarChartData = (month) =>
  axios.get(`${API_BASE_URL}/bar-chart`, { params: { month } });

export const fetchPieChartData = (month) =>
  axios.get(`${API_BASE_URL}/pie-chart`, { params: { month } });

export const fetchCombinedData = (month) =>
  axios.get(`${API_BASE_URL}/combined`, { params: { month } });
