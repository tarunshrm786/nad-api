// // app.js
// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// // Load environment variables
// dotenv.config();

// // Initialize app
// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware to parse JSON
// app.use(express.json());

// // Import routes
// const authRoutes = require('./routes/studentRoutes');
// const healthRoutes = require('./routes/healthRoutes'); 

// // Use routes
// app.use('/api/auth', authRoutes); // Student routes (signup, etc.)
// app.use('/api/health', healthRoutes); // Health check route

// module.exports = app;

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

// Define allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://nad-api-tarunshrm768gmailcoms-projects.vercel.app',
];

// Middleware to parse JSON
app.use(express.json());

// CORS middleware configuration
app.use(cors({
  origin: allowedOrigins, // Allow these origins to access your API
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specified HTTP methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Import routes
const authRoutes = require('./routes/studentRoutes');
const healthRoutes = require('./routes/healthRoutes');

// Use routes
app.use('/api/auth', authRoutes); // Student routes (signup, etc.)
app.use('/api/health', healthRoutes); // Health check route

module.exports = app;
