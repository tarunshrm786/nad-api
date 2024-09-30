// // controllers/mentorController.js
// const Mentor = require('../models/mentorModel');
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

// const createMentor = async (req, res) => {
//     try {
//         console.log('Request Body:', req.body);
//         console.log('Uploaded File:', req.file);

//         const { name, city, post } = req.body;

//         // Check if image is provided
//         if (!req.file) {
//             console.error('No file uploaded.');
//             return res.status(400).json({ error: 'No file uploaded. Please upload an image.' });
//         }

//         const newMentor = new Mentor({
//             name,
//             city,
//             post,
//             image: {
//                 data: req.file.buffer,
//                 contentType: req.file.mimetype,
//             }
//         });

//         await newMentor.save();
//         res.status(201).json({ message: 'Mentor created successfully!' });
//     } catch (err) {
//         // console.error('Error creating mentor:', err.message);
//         // res.status(400).json({ error: err.message });
//         console.error('Error creating mentor:', err.message); // Log only the error message
//         console.error('Error stack:', err.stack); // Log the error stack for debugging
//         res.status(500).json({ error: 'Internal Server Error. Please try again.' });
//     }
// };

// const getMentors = async (req, res) => {
//     try {
//         const mentors = await Mentor.find();
//         res.json(mentors);
//     } catch (err) {
//         console.error('Error fetching mentors:', err.message);
//         res.status(400).json({ error: err.message });
//     }
// };




// // New deleteMentor function
// const deleteMentor = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Check if the mentor exists
//         const mentor = await Mentor.findById(id);
//         if (!mentor) {
//             return res.status(404).json({ error: 'Mentor not found.' });
//         }

//         // Delete the mentor
//         await Mentor.findByIdAndDelete(id);
//         res.status(200).json({ message: 'Mentor deleted successfully!' });
//     } catch (err) {
//         console.error('Error deleting mentor:', err.message);
//         res.status(400).json({ error: err.message });
//     }
// };


// module.exports = {
//     upload,
//     createMentor,
//     getMentors,
//     deleteMentor,
// };

const Mentor = require('../models/mentorModel');
const mongoose = require('mongoose');
const multer = require('multer');
const sharp = require('sharp');

// Configure multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(), // Store in memory to process with sharp
    limits: { fileSize: 1024 * 1024 * 100 }, // Allow up to 10 MB for high-res images before compression
    fileFilter: (req, file, cb) => {
        const filetypes = /jpg|jpeg|png/;
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype) {
            return cb(null, true);
        }
        cb('Error: File type not supported!');
    }
}).single('image');

const createMentor = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('Uploaded File:', req.file);

        const { name, city, post } = req.body;

        // Check if image is provided
        if (!req.file) {
            console.error('No file uploaded.');
            return res.status(400).json({ error: 'No file uploaded. Please upload an image.' });
        }

        // Compress the image using sharp
        const compressedImageBuffer = await sharp(req.file.buffer)
            .resize(300) // Resize to a width of 300px (maintain aspect ratio)
            .jpeg({ quality: 80 }) // Compress to JPEG with 80% quality
            .toBuffer();

        const newMentor = new Mentor({
            name,
            city,
            post,
            image: {
                data: compressedImageBuffer,
                contentType: 'image/jpeg', // Store as JPEG format
            }
        });

        await newMentor.save();
        res.status(201).json({ message: 'Mentor created successfully!' });
    } catch (err) {
        console.error('Error creating mentor:', err.message); // Log the error message
        console.error('Error stack:', err.stack); // Log the error stack for debugging
        res.status(500).json({ error: 'Internal Server Error. Please try again.' });
    }
};

// const getMentors = async (req, res) => {
//     try {
//         const mentors = await Mentor.find();
//         res.json(mentors);
//     } catch (err) {
//         console.error('Error fetching mentors:', err.message);
//         res.status(400).json({ error: err.message });
//     }
// };

const getMentors = async (req, res) => {
    try {
        // Fetch mentors while excluding the image data
        const mentors = await Mentor.find().select('-image.data');

        // Map through the mentors to include image URLs
        const mentorsWithImageUrls = mentors.map(mentor => {
            let imageUrl = null;

            // Check if image data exists
            if (mentor.image.data) {
                imageUrl = `data:${mentor.image.contentType};base64,${mentor.image.data.toString('base64')}`;
            }

            return {
                ...mentor._doc, // Spread the existing mentor data
                imageUrl, // Add image URL to the response
            };
        });

        res.json(mentorsWithImageUrls);
    } catch (err) {
        console.error('Error fetching mentors:', err.message);
        res.status(400).json({ error: err.message });
    }
};


const deleteMentor = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the mentor exists
        const mentor = await Mentor.findById(id);
        if (!mentor) {
            return res.status(404).json({ error: 'Mentor not found.' });
        }

        // Delete the mentor
        await Mentor.findByIdAndDelete(id);
        res.status(200).json({ message: 'Mentor deleted successfully!' });
    } catch (err) {
        console.error('Error deleting mentor:', err.message);
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    upload,
    createMentor,
    getMentors,
    deleteMentor,
};

