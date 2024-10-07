// routes/collaboratorRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const collaboratorController = require('../controllers/collaboratorController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).array('logos', 10); // Allow up to 10 logo uploads

// Route to upload logos
router.post('/upload', upload, collaboratorController.uploadLogos);

// Route to fetch logos
router.get('/', collaboratorController.getLogos);

// Route to delete logos
router.delete('/delete', collaboratorController.deleteLogos);

module.exports = router;
