// controllers/collaboratorController.js
const Collaborator = require('../models/collaboratorModel');
const sharp = require('sharp');

// Helper function to convert image buffer to base64 string
const bufferToBase64 = (buffer) => {
    return buffer.toString('base64');
};

// Upload multiple logos
exports.uploadLogos = async (req, res) => {
    try {
        const files = req.files; // Access multiple files from req.files

        // Validate that at least one file was uploaded
        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        // Check if all files are PNG and under 200 KB
        for (const file of files) {
            if (file.size > 200 * 1024) { // 200 KB limit
                return res.status(400).json({ message: 'Each image must be less than 200 KB' });
            }
            if (!file.mimetype.includes('image/png')) {
                return res.status(400).json({ message: 'Only PNG images are allowed' });
            }
        }

        // Process and compress images
        const logoBase64Array = await Promise.all(files.map(async (file) => {
            const compressedImageBuffer = await sharp(file.buffer)
                .resize({ width: 1200, height: 800, fit: 'inside' }) // Resize while maintaining aspect ratio
                .toFormat('png') // Convert to PNG
                .toBuffer();
            return bufferToBase64(compressedImageBuffer); // Convert buffer to base64 string
        }));

        // Check if a Collaborator document already exists
        const existingCollaborator = await Collaborator.findOne();

        if (existingCollaborator) {
            // If it exists, update the logos array
            existingCollaborator.logos = [...existingCollaborator.logos, ...logoBase64Array];
            await existingCollaborator.save();
            return res.status(200).json({ message: 'Logos updated successfully', logos: existingCollaborator.logos });
        } else {
            // Save a new document if none exists
            const newCollaborator = new Collaborator({ logos: logoBase64Array });
            await newCollaborator.save();
            res.status(201).json({ message: 'Logos uploaded successfully', logos: newCollaborator.logos });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Fetch the logos
exports.getLogos = async (req, res) => {
    try {
        const collaborator = await Collaborator.findOne().sort({ createdAt: -1 }); // Get the most recent document
        if (!collaborator) {
            return res.status(404).json({ message: 'No logos found' });
        }
        res.status(200).json(collaborator);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete logos (you can customize this function as needed)
exports.deleteLogos = async (req, res) => {
    try {
        const deletedCollaborator = await Collaborator.findOneAndDelete(); // Deletes the most recent document
        if (!deletedCollaborator) {
            return res.status(404).json({ message: 'No logos found to delete' });
        }
        res.status(200).json({ message: 'Logos deleted successfully', logos: deletedCollaborator.logos });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
