// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');

// // Load environment variables
// dotenv.config();

// // Initialize app
// const app = express(); 

// // Connect to MongoDB
// connectDB();

// // Define allowed origins
// const allowedOrigins = [
//   'http://localhost:3000',
//   'https://nad-api-tarunshrm768gmailcoms-projects.vercel.app',
//   'https://react-college-website-design-by-tarun-sharma.vercel.app'
// ];

// // Middleware to parse JSON
// app.use(express.json());

// // CORS middleware configuration
// app.use(cors({
//   origin: allowedOrigins, // Allow these origins to access your API
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specified HTTP methods
//   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
// }));

// // Import routes
// const authRoutes = require('./routes/studentRoutes');
// const healthRoutes = require('./routes/healthRoutes');

// // Use routes
// app.use('/api/auth', authRoutes); // Student routes (signup, etc.)
// app.use('/api/health', healthRoutes); // Health check route

// module.exports = app;

// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');

// // Load environment variables
// dotenv.config();

// // Initialize app
// const app = express(); 

// // Connect to MongoDB
// connectDB();

// // Define allowed origins
// const allowedOrigins = [
//   'http://localhost:3000',
//   'https://nad-api-tarunshrm768gmailcoms-projects.vercel.app',
//   'https://react-college-website-design-by-tarun-sharma.vercel.app'
// ];

// // Middleware to parse JSON
// app.use(express.json());

// // CORS middleware configuration
// app.use(cors({
//   origin: allowedOrigins, // Allow these origins to access your API
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specified HTTP methods
//   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
// }));

// // Import routes
// const studentRoutes = require('./routes/studentRoutes'); // Include student routes for authentication
// const healthRoutes = require('./routes/healthRoutes'); // Health check route

// // Use routes
// app.use('/api/auth', studentRoutes); // Student routes (signup, login, etc.)
// app.use('/api/health', healthRoutes); // Health check route

// // Basic health check route
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ message: 'API is healthy' });
// });

// module.exports = app;


// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');

// // Load environment variables
// dotenv.config();

// // Initialize app
// const app = express(); 

// // Connect to MongoDB
// connectDB();

// // Define allowed origins
// const allowedOrigins = [
//   'http://localhost:3000',
//   'https://nad-api-tarunshrm768gmailcoms-projects.vercel.app',
//   'https://react-college-website-design-by-tarun-sharma.vercel.app'
// ];

// // Middleware to parse JSON
// app.use(express.json());

// // CORS middleware configuration
// app.use(cors({
//   origin: allowedOrigins, // Allow these origins to access your API
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specified HTTP methods
//   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
// }));

// // Import routes
// const studentRoutes = require('./routes/studentRoutes'); // Include student routes for authentication
// const healthRoutes = require('./routes/healthRoutes'); // Health check route
// const mentorRoutes = require('./routes/mentorRoutes'); // Mentor routes

// // Use routes
// app.use('/api/auth', studentRoutes); // Student routes (signup, login, etc.)
// app.use('/api/health', healthRoutes); // Health check route
// app.use('/api/mentors', mentorRoutes); // Mentor CRUD routes

// // Basic health check route
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ message: 'API is healthy' });
// });

// module.exports = app;

// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');

// // Load environment variables
// dotenv.config();

// // Initialize app
// const app = express(); 

// // Connect to MongoDB
// connectDB();

// // Define allowed origins
// const allowedOrigins = [
//   'http://localhost:3000',
//   'https://nad-api-tarunshrm768gmailcoms-projects.vercel.app',
//   'https://react-college-website-design-by-tarun-sharma.vercel.app'
// ];

// // Middleware to parse JSON
// app.use(express.json());
// // Middleware to parse URL-encoded data (if needed)
// app.use(express.urlencoded({ extended: true }));

// // CORS middleware configuration
// app.use(cors({
//   origin: allowedOrigins, // Allow these origins to access your API
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specified HTTP methods
//   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
// }));

// // Import routes
// const studentRoutes = require('./routes/studentRoutes'); // Include student routes for authentication
// const healthRoutes = require('./routes/healthRoutes'); // Health check route
// const mentorRoutes = require('./routes/mentorRoutes'); // Mentor routes

// // Use routes
// app.use('/api/auth', studentRoutes); // Student routes (signup, login, etc.)
// app.use('/api/health', healthRoutes); // Health check route
// app.use('/api/mentors', mentorRoutes); // Mentor CRUD routes

// // Basic health check route
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ message: 'API is healthy' });
// });

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
  'https://react-college-website-design-by-tarun-sharma.vercel.app'
];

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware configuration
app.use(cors({
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// Import routes
const studentRoutes = require('./routes/studentRoutes'); // Include student routes for authentication
const healthRoutes = require('./routes/healthRoutes'); // Health check route
const mentorRoutes = require('./routes/mentorRoutes'); // Mentor routes
const teamRoutes = require('./routes/teamRoutes'); // team routes

// Use routes
app.use('/api/auth', studentRoutes); // Student routes (signup, login, etc.)
app.use('/api/health', healthRoutes); // Health check route
app.use('/api/mentors', mentorRoutes); // Mentor CRUD routes
app.use('/api/teams', teamRoutes); // team CRUD routes

// Basic health check route (you might not need this if healthRoutes is defined elsewhere)
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is healthy' });
});

// Export the app for server usage
module.exports = app;

