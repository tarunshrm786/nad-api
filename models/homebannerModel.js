const mongoose = require('mongoose');

// Define the schema for HomeBanner
const homeBannerSchema = new mongoose.Schema({
  textOnBanner: {
    type: String,
    required: true,
  },
  banner: {
    type: String, // Storing banner image as base64
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('HomeBanner', homeBannerSchema);
