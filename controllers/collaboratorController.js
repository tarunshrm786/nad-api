const Collaborator = require('../models/collaboratorModel');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

// Set up multer for file uploads (storing files in memory)
const storage = multer.memoryStorage();  // Store the file in memory
const upload = multer({ storage: storage });

// Create a new collaborator and upload images
const createCollaborator = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Images are required' });
    }

    const imageArray = [];
    for (const file of req.files) {
      // Check the size of the file (200 KB limit)
      if (file.size > 200 * 1024) {
        return res.status(400).json({ message: 'Each image must be less than 200 KB' });
      }

      // Convert the file buffer to base64 string
      const base64Image = file.mimetype + ';base64,' + file.buffer.toString('base64');

      imageArray.push({
        id: uuidv4(), // Assign a unique ID for each image
        imageData: base64Image
      });
    }

    const collaborator = new Collaborator({
      images: imageArray // Store images in base64 format
    });

    await collaborator.save();
    res.status(201).json(collaborator);
  } catch (error) {
    res.status(500).json({ message: 'Error creating collaborator', error });
  }
};

// Fetch all collaborators (and their images)
const getCollaborators = async (req, res) => {
  try {
    const collaborators = await Collaborator.find();
    res.status(200).json(collaborators);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching collaborators', error });
  }
};

// Delete an image from a collaborator's images array using the collaborator ID and image ID
const deleteImage = async (req, res) => {
  try {
    const { collaboratorId, imageId } = req.params; // Get collaborator ID and image ID from the request

    const collaborator = await Collaborator.findById(collaboratorId);
    if (!collaborator) {
      return res.status(404).json({ message: 'Collaborator not found' });
    }

    // Find the index of the image to delete
    const imageIndex = collaborator.images.findIndex(img => img.id === imageId);
    if (imageIndex === -1) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Remove the image from the array
    collaborator.images.splice(imageIndex, 1);
    await collaborator.save();

    res.status(200).json({ message: 'Image deleted successfully', collaborator });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting image', error });
  }
};

// Export all functions and multer middleware
module.exports = {
  createCollaborator,
  getCollaborators,
  deleteImage,
  upload // Export multer to be used in routes
};
