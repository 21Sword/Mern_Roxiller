const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Transaction = require('../models/Transaction');

// Load environment variables
dotenv.config({ path: './.env' }); // Explicitly point to the .env file
const connectDB = require('../config/db');

// Read data
const data = JSON.parse(fs.readFileSync(`${__dirname}/../data/data.json`, 'utf-8'));

// Seed data
const seedDatabase = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    await Transaction.deleteMany(); // Clear existing data
    await Transaction.insertMany(data); // Insert new data
    console.log('Data Imported Successfully!');
    process.exit(); // Exit process
  } catch (error) {
    console.error('Error:', error);
    process.exit(1); // Exit with failure
  }
};

seedDatabase();
