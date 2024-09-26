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
const authRoutes = require('./routes/studentRoutes');
const healthRoutes = require('./routes/healthRoutes'); 

// Use routes
app.use('/api/auth', authRoutes); // Student routes (signup, etc.)
app.use('/api/health', healthRoutes); // Health check route

module.exports = app;
