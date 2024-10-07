const HomeBanner = require('../models/homebannerModel');
const sharp = require('sharp');

// Helper function to convert image buffer to base64 string
const bufferToBase64 = (buffer) => {
  return buffer.toString('base64');
};

// Create or update a banner with text and image
exports.uploadHomeBanner = async (req, res) => {
  try {
    const { textOnBanner } = req.body;
    const file = req.file;

    // Check if the file size is less than 5 MB
    if (file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ message: 'Image size must be less than 5 MB' });
    }

    // Compress the image using sharp
    const compressedImageBuffer = await sharp(file.buffer)
      .resize({ width: 1200, height: 800, fit: 'inside' }) // Resize while maintaining aspect ratio
      .toFormat('jpeg', { quality: 90 }) // Convert to JPEG with quality 90
      .toBuffer();

    // Convert buffer to base64 string
    const bannerBase64 = bufferToBase64(compressedImageBuffer);

    // Check if a banner already exists
    const existingHomeBanner = await HomeBanner.findOne();

    if (existingHomeBanner) {
      // If a banner exists, update it
      existingHomeBanner.textOnBanner = textOnBanner;
      existingHomeBanner.banner = bannerBase64;
      await existingHomeBanner.save();
      return res.status(200).json({ message: 'Home Banner updated successfully', banner: existingHomeBanner });
    } else {
      // Save a new banner if none exists
      const newHomeBanner = new HomeBanner({ textOnBanner, banner: bannerBase64 });
      await newHomeBanner.save();
      res.status(201).json({ message: 'Home Banner uploaded successfully', banner: newHomeBanner });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fetch the most recent home banner
exports.getHomeBanner = async (req, res) => {
  try {
    const homeBanner = await HomeBanner.findOne().sort({ createdAt: -1 });
    if (!homeBanner) {
      return res.status(404).json({ message: 'No home banner found' });
    }
    res.status(200).json(homeBanner);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete the most recent home banner
exports.deleteHomeBanner = async (req, res) => {
  try {
    const deletedHomeBanner = await HomeBanner.findOneAndDelete();
    if (!deletedHomeBanner) {
      return res.status(404).json({ message: 'No home banner found to delete' });
    }
    res.status(200).json({ message: 'Home Banner deleted successfully', banner: deletedHomeBanner });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
