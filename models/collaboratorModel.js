const mongoose = require('mongoose');

// Define the schema for collaborator
const collaboratorSchema = new mongoose.Schema({
  images: [{
    id: { type: String, required: true },  // Unique identifier for each image
    imageData: { type: String, required: true }  // Image data in base64 string format
  }],
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Create the Collaborator model
const Collaborator = mongoose.model('Collaborator', collaboratorSchema);

// Export the model
module.exports = Collaborator;
