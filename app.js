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
  'https://react-college-website-design-by-tarun-sharma.vercel.app',
  'https://nad-api-tarunshrm768gmailcoms-projects.vercel.app/api'
];

// Middleware to parse JSON with increased limit for larger payloads
app.use(express.json({ limit: '50mb' })); // Set JSON payload limit to 50 MB
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Set URL-encoded payload limit to 50 MB

// CORS middleware configuration
app.use(cors({
  origin: allowedOrigins, // Allow specified origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Import routes
const studentRoutes = require('./routes/studentRoutes'); // Include student routes for authentication
const healthRoutes = require('./routes/healthRoutes'); // Health check route
const mentorRoutes = require('./routes/mentorRoutes'); // Mentor routes
const teamRoutes = require('./routes/teamRoutes'); // Team routes
const aboutUsRoutes = require('./routes/aboutusRoutes'); // About Us routes
const enquiryRoutes = require('./routes/enquiryRoutes'); // About Us routes

// Use routes
app.use('/api/auth', studentRoutes); // Student routes (signup, login, etc.)
app.use('/api/health', healthRoutes); // Health check route
app.use('/api/mentors', mentorRoutes); // Mentor CRUD routes
app.use('/api/teams', teamRoutes); // Team CRUD routes
app.use('/api/aboutus', aboutUsRoutes); // About Us routes for banner upload and retrieval
app.use('/api/enquiry', enquiryRoutes); // Team CRUD routes


// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is healthy' });
});

// Export the app for server usage
module.exports = app;
