// const express = require('express');
// const { upload, createMentor, getMentors, deleteMentor } = require('../controllers/mentorController');
// const router = express.Router();

// // POST route to create a new mentor
// router.post('/', upload, createMentor); // Use the upload middleware here

// // GET route to retrieve all mentors
// router.get('/', getMentors);

// router.delete('/:id', deleteMentor); 

// module.exports = router;

// const express = require('express');
// const {
//     upload,
//     createMentor,
//     getMentors,
//     getMentorById, // Import the new function
//     deleteMentor
// } = require('../controllers/mentorController');

// const router = express.Router();

// // POST route to create a new mentor
// router.post('/', upload, createMentor); // Use the upload middleware here

// // GET route to retrieve all mentors
// router.get('/', getMentors);

// // GET route to retrieve a specific mentor's details, including the image
// router.get('/:id', getMentorById); // Updated to use getMentorById

// // DELETE route to delete a mentor
// router.delete('/:id', deleteMentor);

// module.exports = router;

const express = require('express');
const {
    createMentor,
    getMentors,
    getMentorById,
    deleteMentor,
    upload // Import the upload middleware
} = require('../controllers/mentorController');

const router = express.Router();

// POST route to create a new mentor
router.post('/', upload.single('image'), createMentor); // Use the upload middleware to handle file uploads

// GET route to retrieve all mentors
router.get('/', getMentors);

// GET route to retrieve a specific mentor's details, including the image
router.get('/:id', getMentorById);

// DELETE route to delete a mentor
router.delete('/:id', deleteMentor);

module.exports = router;
