// models/collaboratorModel.js
const mongoose = require('mongoose');

const collaboratorSchema = new mongoose.Schema({
    logos: {
        type: [String], // Store multiple base64 strings for logos
        required: true,
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const Collaborator = mongoose.model('Collaborator', collaboratorSchema);

module.exports = Collaborator;
