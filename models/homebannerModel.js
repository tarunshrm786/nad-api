// models/HomeBanner.js
const mongoose = require('mongoose');

const HomeBannerSchema = new mongoose.Schema({
  bannerText: {
    type: String,
    required: true,
  },
  bannerImage: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('HomeBanner', HomeBannerSchema);
