const express = require('express');
const { upload, createMentor, getMentors } = require('../controllers/mentorController');
const router = express.Router();

// POST route to create a new mentor
router.post('/', upload, createMentor); // Use the upload middleware here

// GET route to retrieve all mentors
router.get('/', getMentors);

module.exports = router;
