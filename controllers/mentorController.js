const Mentor = require('../models/mentorModel');
const multer = require('multer');
const sharp = require('sharp'); // Import sharp

// Set up multer storage in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const createMentor = async (req, res) => {
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

        // Create a new mentor instance
        const newMentor = new Mentor({
            name,
            city,
            post,
            image: {
                data: imageString,
                contentType: 'image/jpeg', // Set content type to JPEG
            },
        });

        await newMentor.save(); // Save the mentor to the database
        res.status(201).json({ message: 'Mentor created successfully!', mentor: newMentor });
    } catch (err) {
        console.error('Error creating mentor:', err);
        res.status(500).json({ error: 'Internal Server Error. Please try again.', details: err.message });
    }
};

// Get mentors without image data (for listing)
const getMentors = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const mentors = await Mentor.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        // Transform the mentors to include the Base64 image string
        const mentorsWithImages = mentors.map(mentor => ({
            _id: mentor._id,
            name: mentor.name,
            city: mentor.city,
            post: mentor.post,
            imageUrl: `data:${mentor.image.contentType};base64,${mentor.image.data}`,
        }));

        res.json(mentorsWithImages);
    } catch (err) {
        console.error('Error fetching mentors:', err.message);
        res.status(400).json({ error: err.message });
    }
};



// Get mentor by ID with all fields, including image
const getMentorById = async (req, res) => {
    try {
        const { id } = req.params;

        const mentor = await Mentor.findById(id);
        if (!mentor) {
            return res.status(404).json({ error: 'Mentor not found.' });
        }

        const mentorWithImage = {
            _id: mentor._id,
            name: mentor.name,
            city: mentor.city,
            post: mentor.post,
            imageUrl: `data:${mentor.image.contentType};base64,${mentor.image.data}`,
        };

        res.json(mentorWithImage);
    } catch (err) {
        console.error('Error fetching mentor:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a mentor
const deleteMentor = async (req, res) => {
    try {
        const { id } = req.params;

        const mentor = await Mentor.findById(id);
        if (!mentor) {
            return res.status(404).json({ error: 'Mentor not found.' });
        }

        await Mentor.findByIdAndDelete(id);
        res.status(200).json({ message: 'Mentor deleted successfully!' });
    } catch (err) {
        console.error('Error deleting mentor:', err.message);
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createMentor,
    getMentors,
    getMentorById,
    deleteMentor,
    upload, // Export the upload middleware for use in routes
};
