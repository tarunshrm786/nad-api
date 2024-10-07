const mongoose = require('mongoose');

// Define the schema for HomeBanner
const homeBannerSchema = new mongoose.Schema({
  textOnBanner: {
    type: String,
    required: true,
  },
  banner: {
    type: String,  // Store banner image as a base64 string or URL
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('HomeBanner', homeBannerSchema);
