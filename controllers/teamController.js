// // controllers/teamsController.js
// const Team = require('../models/TeamModel'); // Assuming you have a teamModel.js
// const mongoose = require('mongoose');
// const Grid = require('gridfs-stream'); // If you're using GridFS, ensure it's set up correctly
// const { storage } = require('../config/db'); // Make sure your storage config is properly set
// const multer = require('multer');

// // Configure multer for file uploads
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1024 * 1024 }, // 1 MB limit
//     fileFilter: (req, file, cb) => {
//         const filetypes = /jpg|jpeg|png/;
//         const mimetype = filetypes.test(file.mimetype);
//         if (mimetype) {
//             return cb(null, true);
//         }
//         cb('Error: File type not supported!');
//     }
// }).single('image');

// const createTeam = async (req, res) => {
//     try {
//         console.log('Request Body:', req.body);
//         console.log('Uploaded File:', req.file);

//         const { name, city, post } = req.body; // Assuming the team member has name, city, and role

//         // Check if image is provided
//         if (!req.file) {
//             console.error('No file uploaded.');
//             return res.status(400).json({ error: 'No file uploaded. Please upload an image.' });
//         }

//         const newTeamMember = new Team({
//             name,
//             city,
//             post, // Using 'role' instead of 'post' for team members
//             image: {
//                 data: req.file.buffer,
//                 contentType: req.file.mimetype,
//             }
//         });

//         await newTeamMember.save();
//         res.status(201).json({ message: 'Team member created successfully!' });
//     } catch (err) {
//         console.error('Error creating team member:', err.message);
//         res.status(400).json({ error: err.message });
//     }
// };

// const getTeams = async (req, res) => {
//     try {
//         const teams = await Team.find();
//         res.json(teams);
//     } catch (err) {
//         console.error('Error fetching team members:', err.message);
//         res.status(400).json({ error: err.message });
//     }
// };

// // New deleteTeam function
// const deleteTeam = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Check if the team member exists
//         const teamMember = await Team.findById(id);
//         if (!teamMember) {
//             return res.status(404).json({ error: 'Team member not found.' });
//         }

//         // Delete the team member
//         await Team.findByIdAndDelete(id);
//         res.status(200).json({ message: 'Team member deleted successfully!' });
//     } catch (err) {
//         console.error('Error deleting team member:', err.message);
//         res.status(400).json({ error: err.message });
//     }
// };

// module.exports = {
//     upload,
//     createTeam,
//     getTeams,
//     deleteTeam,
// };

const Team = require('../models/TeamModel'); // Updated model import
const multer = require('multer');
const sharp = require('sharp'); // Import sharp

// Set up multer storage in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const createTeam = async (req, res) => {
    // Access uploaded file and fields from req
    const { name, city, post } = req.body;
    const imageBuffer = req.file ? req.file.buffer : null;

    try {
        console.log('Received request body:', { name, city, post });

        // Validate fields
        if (!name || !city || !post) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        if (!imageBuffer) {
            return res.status(400).json({ error: 'No image uploaded. Please upload an image.' });
        }

        // Compress and resize the image
        const compressedImageBuffer = await sharp(imageBuffer)
            .resize({ width: 800 }) // Resize to a width of 800 pixels (you can adjust as needed)
            .jpeg({ quality: 80 }) // Convert to JPEG format with a quality of 80 (you can adjust this as well)
            .toBuffer();

        // Convert compressed image buffer to Base64 string
        const imageString = compressedImageBuffer.toString('base64');

        // Create a new team instance
        const newTeam = new Team({
            name,
            city,
            post,
            image: {
                data: imageString,
                contentType: 'image/jpeg', // Set content type to JPEG
            },
        });

        await newTeam.save(); // Save the team to the database
        res.status(201).json({ message: 'Team created successfully!', team: newTeam });
    } catch (err) {
        console.error('Error creating team:', err);
        res.status(500).json({ error: 'Internal Server Error. Please try again.', details: err.message });
    }
};

// Get teams without image data (for listing)
const getTeams = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const teams = await Team.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        // Transform the teams to include the Base64 image string
        const teamsWithImages = teams.map(team => ({
            _id: team._id,
            name: team.name,
            city: team.city,
            post: team.post,
            imageUrl: `data:${team.image.contentType};base64,${team.image.data}`,
        }));

        res.json(teamsWithImages);
    } catch (err) {
        console.error('Error fetching teams:', err.message);
        res.status(400).json({ error: err.message });
    }
};

// Get team by ID with all fields, including image
const getTeamById = async (req, res) => {
    try {
        const { id } = req.params;

        const team = await Team.findById(id);
        if (!team) {
            return res.status(404).json({ error: 'Team not found.' });
        }

        const teamWithImage = {
            _id: team._id,
            name: team.name,
            city: team.city,
            post: team.post,
            imageUrl: `data:${team.image.contentType};base64,${team.image.data}`,
        };

        res.json(teamWithImage);
    } catch (err) {
        console.error('Error fetching team:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a team
const deleteTeam = async (req, res) => {
    try {
        const { id } = req.params;

        const team = await Team.findById(id);
        if (!team) {
            return res.status(404).json({ error: 'Team not found.' });
        }

        await Team.findByIdAndDelete(id);
        res.status(200).json({ message: 'Team deleted successfully!' });
    } catch (err) {
        console.error('Error deleting team:', err.message);
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createTeam,    // Updated method name
    getTeams,      // Updated method name
    getTeamById,   // Updated method name
    deleteTeam,    // Updated method name
    upload,        // Export the upload middleware for use in routes
};
