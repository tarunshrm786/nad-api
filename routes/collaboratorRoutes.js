const express = require('express');
const { createCollaborator, getCollaborators, deleteImage, upload } = require('../controllers/collaboratorController');

const router = express.Router();

// POST: Create a collaborator with image uploads
router.post('/', upload.array('images'), createCollaborator);

// GET: Fetch all collaborators and their images
router.get('/', getCollaborators);

// DELETE: Delete a specific image from a collaborator
router.delete('/collaborators/:collaboratorId/images/:imageId', deleteImage);

module.exports = router;
