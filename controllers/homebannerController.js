// controllers/homeController.js
const HomeBanner = require('../models/homebannerModel');
const sharp = require('sharp');

// Helper function to convert image buffer to base64 string
const bufferToBase64 = (buffer) => {
  return buffer.toString('base64');
};

// Create or replace a banner
exports.uploadBanner = async (req, res) => {
  try {
    const file = req.file;

    // Check if the file exists
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

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
    const existingBanner = await HomeBanner.findOne();

    if (existingBanner) {
      // If a banner exists, update it
      existingBanner.bannerText = req.body.bannerText; // Assuming you also want to update the text
      existingBanner.bannerImage = bannerBase64;
      await existingBanner.save();
      return res.status(200).json({ message: 'Banner updated successfully', banner: existingBanner });
    } else {
      // Save a new banner if none exists
      const newBanner = new HomeBanner({
        bannerText: req.body.bannerText, // Assuming you also want to set the text
        bannerImage: bannerBase64,
      });
      await newBanner.save();
      return res.status(201).json({ message: 'Banner uploaded successfully', banner: newBanner });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fetch the banner
exports.getBanner = async (req, res) => {
  try {
    const banner = await HomeBanner.findOne().sort({ createdAt: -1 }); // Get the most recent banner
    if (!banner) {
      return res.status(404).json({ message: 'No banner found' });
    }
    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete the banner
exports.deleteBanner = async (req, res) => {
  try {
    const deletedBanner = await HomeBanner.findOneAndDelete(); // Deletes the most recent banner
    if (!deletedBanner) {
      return res.status(404).json({ message: 'No banner found to delete' });
    }
    res.status(200).json({ message: 'Banner deleted successfully', banner: deletedBanner });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
