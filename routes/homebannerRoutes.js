const express = require('express');
const router = express.Router();
const homeBannerController = require('../controllers/homebannerController');
const multer = require('multer');

// Multer setup for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
router.post('/', upload.single('banner'), homeBannerController.uploadHomeBanner); // POST route to create/update banner
router.get('/', homeBannerController.getHomeBanner); // GET route to fetch banner
router.delete('/', homeBannerController.deleteHomeBanner); // DELETE route to remove banner

module.exports = router;
