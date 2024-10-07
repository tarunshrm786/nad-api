// routes/homeBannerRoutes.js
const express = require('express');
const multer = require('multer');
const homeBannerController = require('../controllers/homebannerController');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });


//console.log(homeBannerController); // Should log the functions as an object


// Route to create or update a banner
router.post('/', upload.single('bannerImage'), homeBannerController.uploadBanner);

// Route to fetch the banner
router.get('/', homeBannerController.getBanner);

// Route to delete the banner
router.delete('/', homeBannerController.deleteBanner);

module.exports = router;
