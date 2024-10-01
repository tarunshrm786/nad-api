// routes/teamRoutes.js
// const express = require('express');
// const { upload, createTeam, getTeams, deleteTeam } = require('../controllers/teamController');
// const router = express.Router();

// // POST route to create a new team member
// router.post('/', upload, createTeam); // Use the upload middleware here

// // GET route to retrieve all team members
// router.get('/', getTeams);

// // DELETE route to delete a specific team member by ID
// router.delete('/:id', deleteTeam); 

// module.exports = router;

const express = require('express');
const {
    createTeam,
    getTeams,
    getTeamById,
    deleteTeam,
    upload // Import the upload middleware
} = require('../controllers/teamController');

const router = express.Router();

// POST route to create a new mentor
router.post('/', upload.single('image'), createTeam); // Use the upload middleware to handle file uploads

// GET route to retrieve all mentors
router.get('/', getTeams);

// GET route to retrieve a specific mentor's details, including the image
router.get('/:id', getTeamById);

// DELETE route to delete a mentor
router.delete('/:id', deleteTeam);

module.exports = router;
