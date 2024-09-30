// routes/teamRoutes.js
const express = require('express');
const { upload, createTeam, getTeams, deleteTeam } = require('../controllers/teamController');
const router = express.Router();

// POST route to create a new team member
router.post('/', upload, createTeam); // Use the upload middleware here

// GET route to retrieve all team members
router.get('/', getTeams);

// DELETE route to delete a specific team member by ID
router.delete('/:id', deleteTeam); 

module.exports = router;
