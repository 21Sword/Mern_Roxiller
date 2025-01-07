const Transaction = require('../models/Transaction');

// @desc Get all transactions with search and pagination
exports.getTransactions = async (req, res) => {
  const { month, search = '', page = 1, perPage = 10 } = req.query;

  try {
    // Ensure month is valid
    const monthNumber = parseInt(month);
    if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
      return res.status(400).json({ error: 'Invalid month value.' });
    }

    // Create the query
    const query = {
      $expr: {
        $eq: [{ $month: '$dateOfSale' }, monthNumber], // Match month from dateOfSale
      },
    };

    // Add search conditions if provided
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { price: parseFloat(search) || 0 },
      ];
    }

    // Pagination
    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage))
      .select('id title description price category image sold dateOfSale'); // Select specific fields

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// @desc Get statistics for a selected month
exports.getStatistics = async (req, res) => {
  const { month } = req.query;

  try {
    const monthNumber = parseInt(month);
    if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
      return res.status(400).json({ error: 'Invalid month value.' });
    }

    const stats = await Transaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$price' },
          soldItems: { $sum: { $cond: ['$sold', 1, 0] } },
          notSoldItems: { $sum: { $cond: ['$sold', 0, 1] } },
        },
      },
    ]);

    if (stats.length === 0) {
      return res.status(404).json({ message: 'No data found for the given month.' });
    }

    res.status(200).json(stats[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Get bar chart data for a selected month
exports.getBarChart = async (req, res) => {
  const { month } = req.query;

  try {
    const monthNumber = parseInt(month);
    if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
      return res.status(400).json({ error: 'Invalid month value.' });
    }

    const barChartData = await Transaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] },
        },
      },
      {
        $bucket: {
          groupBy: '$price',
          boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
          default: '901-above',
          output: { count: { $sum: 1 } },
        },
      },
    ]);

    res.status(200).json(barChartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Get pie chart data for a selected month
exports.getPieChart = async (req, res) => {
  const { month } = req.query;

  try {
    const monthNumber = parseInt(month);
    if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
      return res.status(400).json({ error: 'Invalid month value.' });
    }

    const pieChartData = await Transaction.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] },
        },
      },
      {
        $group: {
          _id: '$category',
          itemCount: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(pieChartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Get combined data from statistics, bar chart, and pie chart
exports.getCombinedData = async (req, res) => {
  const { month } = req.query;

  try {
    const monthNumber = parseInt(month);
    if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
      return res.status(400).json({ error: 'Invalid month value.' });
    }

    const [stats, barChart, pieChart] = await Promise.all([
      Transaction.aggregate([
        {
          $match: {
            $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] },
          },
        },
        {
          $group: {
            _id: null,
            totalSales: { $sum: '$price' },
            soldItems: { $sum: { $cond: ['$sold', 1, 0] } },
            notSoldItems: { $sum: { $cond: ['$sold', 0, 1] } },
          },
        },
      ]),
      Transaction.aggregate([
        {
          $match: {
            $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] },
          },
        },
        {
          $bucket: {
            groupBy: '$price',
            boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
            default: '901-above',
            output: { count: { $sum: 1 } },
          },
        },
      ]),
      Transaction.aggregate([
        {
          $match: {
            $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] },
          },
        },
        {
          $group: {
            _id: '$category',
            itemCount: { $sum: 1 },
          },
        },
      ]),
    ]);

    res.status(200).json({
      statistics: stats[0] || {},
      barChart: barChart || [],
      pieChart: pieChart || [],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
