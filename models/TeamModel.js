// models/teamModel.js
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    post: { type: String, required: true }, // Changed 'post' to 'position' for clarity
    city: { type: String, required: true },
    image: {
        data: Buffer,
        contentType: String,
    }
});

module.exports = mongoose.model('Team', teamSchema);
