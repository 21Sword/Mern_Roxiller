const express = require('express');
const {
  getTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData,
} = require('../controllers/transactionController');

const router = express.Router();

router.get('/transactions', getTransactions);
router.get('/statistics', getStatistics);
router.get('/bar-chart', getBarChart);
router.get('/pie-chart', getPieChart);
router.get('/combined', getCombinedData);

module.exports = router;