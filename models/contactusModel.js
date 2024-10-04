// contactusModel.js
const mongoose = require('mongoose');

// Define schema for ContactUs form submissions
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  course: { type: String, required: true }, // Values: UG, PG, Professional Diploma, Academic Diploma
});

// Export the model
module.exports = mongoose.model('Contact', contactSchema);
