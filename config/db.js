// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connection successful');
  } catch (error) {
    console.error('Connection failed', error);
    process.exit(1);
  }
};

module.exports = connectDB;
