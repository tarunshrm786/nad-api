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
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // Middleware to parse JSON with increased limit for larger payloads
// app.use(express.json({ limit: '50mb' })); // Updated: Set JSON payload limit to 50 MB
// app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Updated: Set URL-encoded payload limit to 50 MB


// // CORS middleware configuration
// app.use(cors({
//   // origin: allowedOrigins,
//   origin: '*', // Allow all origins
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// }));

// // Import routes
// const studentRoutes = require('./routes/studentRoutes'); // Include student routes for authentication
// const healthRoutes = require('./routes/healthRoutes'); // Health check route
// const mentorRoutes = require('./routes/mentorRoutes'); // Mentor routes
// const teamRoutes = require('./routes/teamRoutes'); // team routes

// // Use routes
// app.use('/api/auth', studentRoutes); // Student routes (signup, login, etc.)
// app.use('/api/health', healthRoutes); // Health check route
// app.use('/api/mentors', mentorRoutes); // Mentor CRUD routes
// app.use('/api/teams', teamRoutes); // team CRUD routes

// // Basic health check route (you might not need this if healthRoutes is defined elsewhere)
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ message: 'API is healthy' });
// });

// // Export the app for server usage
// module.exports = app;


// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const multer = require('multer'); // Import multer

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

// // Middleware to parse JSON with increased limit for larger payloads
// app.use(express.json({ limit: '50mb' })); // Updated: Set JSON payload limit to 50 MB
// app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Updated: Set URL-encoded payload limit to 50 MB

// // CORS middleware configuration
// app.use(cors({
//   // origin: allowedOrigins,
//   origin: '*', // Allow all origins
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// }));

// // Multer configuration for file uploads
// const upload = multer({ 
//   dest: 'uploads/', // Set the upload directory
//   limits: { fileSize: 10 * 1024 * 1024 } // Limit to 10 MB
// });

// // File upload route
// app.post('/upload', upload.single('image'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }
//   console.log('Uploaded file:', req.file);
//   res.send('File uploaded successfully.');
// });

// // Import routes
// const studentRoutes = require('./routes/studentRoutes'); // Include student routes for authentication
// const healthRoutes = require('./routes/healthRoutes'); // Health check route
// const mentorRoutes = require('./routes/mentorRoutes'); // Mentor routes
// const teamRoutes = require('./routes/teamRoutes'); // Team routes

// // Use routes
// app.use('/api/auth', studentRoutes); // Student routes (signup, login, etc.)
// app.use('/api/health', healthRoutes); // Health check route
// app.use('/api/mentors', mentorRoutes); // Mentor CRUD routes
// app.use('/api/teams', teamRoutes); // Team CRUD routes

// // Basic health check route (you might not need this if healthRoutes is defined elsewhere)
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ message: 'API is healthy' });
// });

// // Export the app for server usage
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

// Use routes
app.use('/api/auth', studentRoutes); // Student routes (signup, login, etc.)
app.use('/api/health', healthRoutes); // Health check route
app.use('/api/mentors', mentorRoutes); // Mentor CRUD routes
app.use('/api/teams', teamRoutes); // Team CRUD routes

// Basic health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is healthy' });
});

// Export the app for server usage
module.exports = app;
