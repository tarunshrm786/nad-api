const express = require('express');
const { upload, createMentor, getMentors, deleteMentor } = require('../controllers/mentorController');
const router = express.Router();

// POST route to create a new mentor
router.post('/', upload, createMentor); // Use the upload middleware here

// GET route to retrieve all mentors
router.get('/', getMentors);

router.delete('/:id', deleteMentor); 

module.exports = router;
