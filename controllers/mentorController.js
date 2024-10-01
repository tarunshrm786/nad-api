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

// const Mentor = require('../models/mentorModel');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const sharp = require('sharp');

// // Configure multer for file uploads
// const upload = multer({
//     storage: multer.memoryStorage(), // Store in memory to process with sharp
//     limits: { fileSize: 1024 * 1024 * 10 }, // Allow up to 10 MB for high-res images before compression
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

//         // Compress the image using sharp
//         const compressedImageBuffer = await sharp(req.file.buffer)
//             .resize(300) // Resize to a width of 300px (maintain aspect ratio)
//             .jpeg({ quality: 80 }) // Compress to JPEG with 80% quality
//             .toBuffer();

//         const newMentor = new Mentor({
//             name,
//             city,
//             post,
//             image: {
//                 data: compressedImageBuffer,
//                 contentType: 'image/jpeg', // Store as JPEG format
//             }
//         });

//         await newMentor.save();
//         res.status(201).json({ message: 'Mentor created successfully!' });
//     } catch (err) {
//         console.error('Error creating mentor:', err.message); // Log the error message
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

// const Mentor = require('../models/mentorModel');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const sharp = require('sharp');

// // Configure multer for file uploads
// const upload = multer({
//     storage: multer.memoryStorage(),
//     limits: { fileSize: 1024 * 1024 * 10 },
//     fileFilter: (req, file, cb) => {
//         const filetypes = /jpg|jpeg|png/;
//         const mimetype = filetypes.test(file.mimetype);
//         if (mimetype) {
//             return cb(null, true);
//         }
//         cb(new Error('Error: File type not supported!'));
//     }
// }).single('image');

// // Create mentor with compressed image
// const createMentor = async (req, res) => {
//     try {
//         const { name, city, post } = req.body;

//         if (!req.file) {
//             return res.status(400).json({ error: 'No file uploaded. Please upload an image.' });
//         }

//         const compressedImageBuffer = await sharp(req.file.buffer)
//             .resize(300)
//             .jpeg({ quality: 80 })
//             .toBuffer();

//         const newMentor = new Mentor({
//             name,
//             city,
//             post,
//             image: {
//                 data: compressedImageBuffer,
//                 contentType: 'image/jpeg',
//             }
//         });

//         await newMentor.save();
//         res.status(201).json({ message: 'Mentor created successfully!', mentor: newMentor });
//     } catch (err) {
//         console.error('Error creating mentor:', err.message);
//         res.status(500).json({ error: 'Internal Server Error. Please try again.' });
//     }
// };

// // Get mentors without image data (for listing)
// const getMentors = async (req, res) => {
//     try {
//         const { page = 1, limit = 10 } = req.query;
//         const mentors = await Mentor.find()
//             .skip((page - 1) * limit)
//             .limit(parseInt(limit));

//         // Transform the mentors to include base64 image
//         const mentorsWithImages = mentors.map(mentor => ({
//             _id: mentor._id,
//             name: mentor.name,
//             city: mentor.city,
//             post: mentor.post,
//             base64Image: mentor.image.data ? mentor.image.data.toString('base64') : null,
//         }));

//         res.json(mentorsWithImages);
//     } catch (err) {
//         console.error('Error fetching mentors:', err.message);
//         res.status(400).json({ error: err.message });
//     }
// };

// // Get mentor by ID with all fields, including image
// const getMentorById = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const mentor = await Mentor.findById(id);

//         if (!mentor) {
//             return res.status(404).json({ error: 'Mentor not found.' });
//         }

//         // Include base64 image in response
//         const mentorWithImage = {
//             _id: mentor._id,
//             name: mentor.name,
//             city: mentor.city,
//             post: mentor.post,
//             base64Image: mentor.image.data ? mentor.image.data.toString('base64') : null,
//         };

//         res.json(mentorWithImage);
//     } catch (err) {
//         console.error('Error fetching mentor:', err.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// // Delete a mentor
// const deleteMentor = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const mentor = await Mentor.findById(id);
//         if (!mentor) {
//             return res.status(404).json({ error: 'Mentor not found.' });
//         }

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
//     getMentorById,
//     deleteMentor,
// };

// const Mentor = require('../models/mentorModel');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const sharp = require('sharp');

// // Ensure the uploads directory exists
// const uploadsDir = path.join(__dirname, '../uploads');
// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir);
// }

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadsDir); // Save to the uploads directory
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Unique identifier
//         const ext = path.extname(file.originalname); // Get file extension
//         cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Create a unique filename
//     }
// });

// const upload = multer({
//     storage,
//     limits: { fileSize: 1024 * 1024 * 10 },
//     fileFilter: (req, file, cb) => {
//         const filetypes = /jpg|jpeg|png/;
//         const mimetype = filetypes.test(file.mimetype);
//         if (mimetype) {
//             return cb(null, true);
//         }
//         cb(new Error('Error: File type not supported!'));
//     }
// }).single('image');

// // Create mentor with compressed image
// const createMentor = async (req, res) => {
//     try {
//         console.log('Received request body:', req.body);
//         console.log('Uploaded file:', req.file);
        
//         const { name, city, post } = req.body;

//         if (!name || !city || !post) {
//             return res.status(400).json({ error: 'All fields are required.' });
//         }

//         if (!req.file) {
//             return res.status(400).json({ error: 'No file uploaded. Please upload an image.' });
//         }

//         // Compress the image using sharp
//         const compressedImageBuffer = await sharp(req.file.path)
//             .resize(300)
//             .jpeg({ quality: 80 })
//             .toBuffer();

//         // Save the compressed image back to the file system
//         await fs.promises.writeFile(req.file.path, compressedImageBuffer);

//         // Store the image URL (file path) in MongoDB
//         const imageUrl = `/uploads/${req.file.filename}`;

//         const newMentor = new Mentor({
//             name,
//             city,
//             post,
//             image: {
//                 url: imageUrl,
//                 contentType: req.file.mimetype,
//             }
//         });

//         await newMentor.save();
//         res.status(201).json({ message: 'Mentor created successfully!', mentor: newMentor });
//     } catch (err) {
//         console.error('Error creating mentor:', err.message);
//         res.status(500).json({ error: 'Internal Server Error. Please try again.' });
//     }
// };


// // Get mentors without image data (for listing)
// const getMentors = async (req, res) => {
//     try {
//         const { page = 1, limit = 10 } = req.query;
//         const mentors = await Mentor.find()
//             .skip((page - 1) * limit)
//             .limit(parseInt(limit));

//         // Transform the mentors to include the image URL
//         const mentorsWithImages = mentors.map(mentor => ({
//             _id: mentor._id,
//             name: mentor.name,
//             city: mentor.city,
//             post: mentor.post,
//             imageUrl: mentor.image.url, // Send the image URL instead of base64
//         }));

//         res.json(mentorsWithImages);
//     } catch (err) {
//         console.error('Error fetching mentors:', err.message);
//         res.status(400).json({ error: err.message });
//     }
// };

// // Get mentor by ID with all fields, including image
// const getMentorById = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const mentor = await Mentor.findById(id);

//         if (!mentor) {
//             return res.status(404).json({ error: 'Mentor not found.' });
//         }

//         // Include the image URL in response
//         const mentorWithImage = {
//             _id: mentor._id,
//             name: mentor.name,
//             city: mentor.city,
//             post: mentor.post,
//             imageUrl: mentor.image.url, // Include the image URL
//         };

//         res.json(mentorWithImage);
//     } catch (err) {
//         console.error('Error fetching mentor:', err.message);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// // Delete a mentor
// const deleteMentor = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const mentor = await Mentor.findById(id);
//         if (!mentor) {
//             return res.status(404).json({ error: 'Mentor not found.' });
//         }

//         // Optionally, delete the image file from the server
//         const imagePath = path.join(__dirname, '../uploads', mentor.image.url.split('/').pop());
//         fs.unlinkSync(imagePath); // Delete the file

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
//     getMentorById,
//     deleteMentor,
// };

// const Mentor = require('../models/mentorModel');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const sharp = require('sharp');

// // Ensure the uploads directory exists
// const uploadsDir = path.join(__dirname, '../uploads');
// if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir, { recursive: true }); // Ensure parent directories are created if they don't exist
// }

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadsDir); // Save to the uploads directory
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Unique identifier
//         const ext = path.extname(file.originalname); // Get file extension
//         cb(null, `image-${uniqueSuffix}${ext}`); // Create a unique filename
//     }
// });

// const upload = multer({
//     storage,
//     limits: { fileSize: 1024 * 1024 * 10 }, // Limit file size to 10MB
//     fileFilter: (req, file, cb) => {
//         const filetypes = /jpg|jpeg|png/;
//         const mimetype = filetypes.test(file.mimetype);
//         if (mimetype) {
//             return cb(null, true);
//         }
//         cb(new Error('Error: File type not supported!'));
//     }
// }).single('image');

// const createMentor = async (req, res) => {
//     try {
//         console.log('Received request body:', req.body);
//         console.log('Uploaded file:', req.file);

//         const { name, city, post } = req.body;

//         if (!name || !city || !post) {
//             return res.status(400).json({ error: 'All fields are required.' });
//         }

//         if (!req.file) {
//             return res.status(400).json({ error: 'No file uploaded. Please upload an image.' });
//         }

//         // Check if the file exists before processing
//         const filePath = req.file.path;
//         if (!fs.existsSync(filePath)) {
//             return res.status(404).json({ error: 'File not found. Please try again.' });
//         }

//         // Compress the image using sharp
//         const compressedImageBuffer = await sharp(filePath)
//             .resize(300) // Resize the image
//             .jpeg({ quality: 80 }) // Compress the image
//             .toBuffer();

//         // Save the compressed image back to the file system
//         await fs.promises.writeFile(filePath, compressedImageBuffer);

//         // // Store the image URL (file path) in MongoDB
//         // const imageUrl = path.join('/uploads', path.basename(req.file.filename)); // Store relative URL

//         const imageUrl = path.join('/uploads', path.basename(filePath)).replace(/\\/g, '/');


//         const newMentor = new Mentor({
//             name,
//             city,
//             post,
//             image: {
//                 url: imageUrl,
//                 contentType: req.file.mimetype,
//             }
//         });

//         await newMentor.save();
//         res.status(201).json({ message: 'Mentor created successfully!', mentor: newMentor });
//     } catch (err) {
//         console.error('Error creating mentor:', err);
//         res.status(500).json({ error: 'Internal Server Error. Please try again.', details: err.message });
//     }
// };

// // Get mentors without image data (for listing)
// const getMentors = async (req, res) => {
//     try {
//         const { page = 1, limit = 10 } = req.query;
//         const mentors = await Mentor.find()
//             .skip((page - 1) * limit)
//             .limit(parseInt(limit));

//         // Transform the mentors to include the image URL
//         const mentorsWithImages = mentors.map(mentor => ({
//             _id: mentor._id,
//             name: mentor.name,
//             city: mentor.city,
//             post: mentor.post,
//             imageUrl: mentor.image.url,
//         }));

//         res.json(mentorsWithImages);
//     } catch (err) {
//         console.error('Error fetching mentors:', err.message);
//         res.status(400).json({ error: err.message });
//     }
// };

// // Get mentor by ID with all fields, including image
// const getMentorById = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const mentor = await Mentor.findById(id);
//         if (!mentor) {
//             return res.status(404).json({ error: 'Mentor not found.' });
//         }

//         const mentorWithImage = {
//             _id: mentor._id,
//             name: mentor.name,
//             city: mentor.city,
//             post: mentor.post,
//             imageUrl: mentor.image.url,
//         };

//         res.json(mentorWithImage);
//     } catch (err) {
//         console.error('Error fetching mentor:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// // Delete a mentor
// const deleteMentor = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const mentor = await Mentor.findById(id);
//         if (!mentor) {
//             return res.status(404).json({ error: 'Mentor not found.' });
//         }

//         // Delete the image file from the server
//         const imagePath = path.join(__dirname, '../uploads', path.basename(mentor.image.url));
//         await fs.promises.unlink(imagePath); // Use promises to delete the file

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
//     getMentorById,
//     deleteMentor,
// };

// const Mentor = require('../models/mentorModel');
// const mongoose = require('mongoose');
// const Busboy = require('busboy');

// // Create a new mentor
// const createMentor = async (req, res) => {
//     const busboy = new Busboy({ headers: req.headers });
//     let name = '';
//     let city = '';
//     let post = '';
//     let imageBuffer = null;

//     // Handle file uploads
//     busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
//         const chunks = [];
//         file.on('data', (data) => {
//             chunks.push(data);
//         });
//         file.on('end', () => {
//             imageBuffer = Buffer.concat(chunks);
//         });
//     });

//     // Handle form fields
//     busboy.on('field', (fieldname, val) => {
//         if (fieldname === 'name') name = val;
//         if (fieldname === 'city') city = val;
//         if (fieldname === 'post') post = val;
//     });

//     // After all fields and files are processed
//     busboy.on('finish', async () => {
//         try {
//             console.log('Received request body:', { name, city, post });
//             // Validate fields
//             if (!name || !city || !post) {
//                 return res.status(400).json({ error: 'All fields are required.' });
//             }

//             if (!imageBuffer) {
//                 return res.status(400).json({ error: 'No image uploaded. Please upload an image.' });
//             }

//             // Convert image buffer to Base64 string
//             const imageString = imageBuffer.toString('base64');

//             // Create a new mentor instance
//             const newMentor = new Mentor({
//                 name,
//                 city,
//                 post,
//                 image: {
//                     data: imageString,
//                     contentType: 'image/jpeg', // Adjust based on your needs
//                 },
//             });

//             await newMentor.save(); // Save the mentor to the database
//             res.status(201).json({ message: 'Mentor created successfully!', mentor: newMentor });
//         } catch (err) {
//             console.error('Error creating mentor:', err);
//             res.status(500).json({ error: 'Internal Server Error. Please try again.', details: err.message });
//         }
//     });

//     req.pipe(busboy); // Pipe the request to Busboy
// };

// // Get mentors without image data (for listing)
// const getMentors = async (req, res) => {
//     try {
//         const { page = 1, limit = 10 } = req.query;
//         const mentors = await Mentor.find()
//             .skip((page - 1) * limit)
//             .limit(parseInt(limit));

//         // Transform the mentors to include the Base64 image string
//         const mentorsWithImages = mentors.map(mentor => ({
//             _id: mentor._id,
//             name: mentor.name,
//             city: mentor.city,
//             post: mentor.post,
//             imageUrl: `data:${mentor.image.contentType};base64,${mentor.image.data}`,
//         }));

//         res.json(mentorsWithImages);
//     } catch (err) {
//         console.error('Error fetching mentors:', err.message);
//         res.status(400).json({ error: err.message });
//     }
// };

// // Get mentor by ID with all fields, including image
// const getMentorById = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const mentor = await Mentor.findById(id);
//         if (!mentor) {
//             return res.status(404).json({ error: 'Mentor not found.' });
//         }

//         const mentorWithImage = {
//             _id: mentor._id,
//             name: mentor.name,
//             city: mentor.city,
//             post: mentor.post,
//             imageUrl: `data:${mentor.image.contentType};base64,${mentor.image.data}`,
//         };

//         res.json(mentorWithImage);
//     } catch (err) {
//         console.error('Error fetching mentor:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// // Delete a mentor
// const deleteMentor = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const mentor = await Mentor.findById(id);
//         if (!mentor) {
//             return res.status(404).json({ error: 'Mentor not found.' });
//         }

//         await Mentor.findByIdAndDelete(id);
//         res.status(200).json({ message: 'Mentor deleted successfully!' });
//     } catch (err) {
//         console.error('Error deleting mentor:', err.message);
//         res.status(400).json({ error: err.message });
//     }
// };

// module.exports = {
//     createMentor,
//     getMentors,
//     getMentorById,
//     deleteMentor,
// };

const Mentor = require('../models/mentorModel');
const multer = require('multer');

// Set up multer storage in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a new mentor
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

        // Convert image buffer to Base64 string
        const imageString = imageBuffer.toString('base64');

        // Create a new mentor instance
        const newMentor = new Mentor({
            name,
            city,
            post,
            image: {
                data: imageString,
                contentType: req.file.mimetype, // Capture the content type from the uploaded file
            },
        });

        await newMentor.save(); // Save the mentor to the database
        res.status(201).json({ message: 'Mentor created successfully!', mentor: newMentor });
    } catch (err) {
        console.error('Error creating mentor:', err);
        res.status(500).json({ error: 'Internal Server Error. Please try again.', details: err.message });
    }
};

// // Get mentors without image data (for listing)
// const getMentors = async (req, res) => {
//     try {
//         const { page = 1, limit = 10 } = req.query;
//         const mentors = await Mentor.find()
//             .skip((page - 1) * limit)
//             .limit(parseInt(limit));

//         // Transform the mentors to include the Base64 image string
//         const mentorsWithImages = mentors.map(mentor => ({
//             _id: mentor._id,
//             name: mentor.name,
//             city: mentor.city,
//             post: mentor.post,
//             imageUrl: `data:${mentor.image.contentType};base64,${mentor.image.data}`,
//         }));

//         res.json(mentorsWithImages);
//     } catch (err) {
//         console.error('Error fetching mentors:', err.message);
//         res.status(400).json({ error: err.message });
//     }
// };

const getMentors = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const parsedLimit = Math.min(parseInt(limit), 100); // Set a maximum limit of 100
        const mentors = await Mentor.find()
            .skip((page - 1) * parsedLimit)
            .limit(parsedLimit);

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
