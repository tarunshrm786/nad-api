// controllers/teamsController.js
const Team = require('../models/TeamModel'); // Assuming you have a teamModel.js
const mongoose = require('mongoose');
const Grid = require('gridfs-stream'); // If you're using GridFS, ensure it's set up correctly
const { storage } = require('../config/db'); // Make sure your storage config is properly set
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 }, // 1 MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpg|jpeg|png/;
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype) {
            return cb(null, true);
        }
        cb('Error: File type not supported!');
    }
}).single('image');

const createTeam = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);

        const { name, city, post } = req.body; // Assuming the team member has name, city, and role

        // Check if image is provided
        if (!req.file) {
            console.error('No file uploaded.');
            return res.status(400).json({ error: 'No file uploaded. Please upload an image.' });
        }

        const newTeamMember = new Team({
            name,
            city,
            post, // Using 'role' instead of 'post' for team members
            image: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            }
        });

        await newTeamMember.save();
        res.status(201).json({ message: 'Team member created successfully!' });
    } catch (err) {
        console.error('Error creating team member:', err.message);
        res.status(400).json({ error: err.message });
    }
};

const getTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (err) {
        console.error('Error fetching team members:', err.message);
        res.status(400).json({ error: err.message });
    }
};

// New deleteTeam function
const deleteTeam = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the team member exists
        const teamMember = await Team.findById(id);
        if (!teamMember) {
            return res.status(404).json({ error: 'Team member not found.' });
        }

        // Delete the team member
        await Team.findByIdAndDelete(id);
        res.status(200).json({ message: 'Team member deleted successfully!' });
    } catch (err) {
        console.error('Error deleting team member:', err.message);
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    upload,
    createTeam,
    getTeams,
    deleteTeam,
};
