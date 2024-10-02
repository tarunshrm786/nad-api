const express = require('express');
const { createEnquiry, getEnquiry, deleteEnquiry } = require('../controllers/enquiryController');

const router = express.Router();

// Route to create a contact message (POST)
router.post('/', createEnquiry);

// Route to get all contact messages (GET)
router.get('/', getEnquiry);

// Route to delete a contact message by ID (DELETE)
router.delete('/:id', deleteEnquiry);

module.exports = router;
