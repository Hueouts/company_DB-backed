// app.js
require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const path = require('path');

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use('/data', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/auth', authRoutes);
app.use('/students', studentRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
