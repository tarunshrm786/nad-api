// models/AboutUs.js
const mongoose = require('mongoose');

const AboutUsSchema = new mongoose.Schema({
  banner: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('AboutUs', AboutUsSchema);
