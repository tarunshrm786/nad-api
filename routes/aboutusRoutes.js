const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer(); // Configure multer for file upload
const aboutUsController = require('../controllers/aboutusController');

// Route to upload or update the banner
router.post('/aboutusbanner/upload', upload.single('banner'), aboutUsController.uploadBanner);

// Route to fetch the banner
router.get('/aboutusbanner', aboutUsController.getBanner);

// Route to delete the banner
router.delete('/aboutusbanner/delete', aboutUsController.deleteBanner);

module.exports = router;
