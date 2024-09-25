// app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const healthRoutes = require('./routes/healthRoutes'); // Add this line

// Use routes
app.use('/api/auth', authRoutes);
app.use('/', healthRoutes); // Add this line to serve the health check route

module.exports = app;
