// // server.js
// const app = require('./app');

// const PORT = process.env.PORT || 7000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


require('dotenv').config(); // Load environment variables
const express = require('express');
const connectDB = require('./config/db');
const app = require('./app'); // Import the app from app.js

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000; // Set the port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
