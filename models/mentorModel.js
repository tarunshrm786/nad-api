// const mongoose = require("mongoose");

// const mentorSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   city: {
//     type: String,
//     required: true,
//   },
//   post: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String, // Store the image path as a string
//     required: false,
//   },
// });

// const Mentor = mongoose.model("Mentor", mentorSchema);

// module.exports = Mentor;

// models/Mentor.js
const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    post: { type: String, required: true },
    image: {
        data: Buffer,
        contentType: String,
    }
});

module.exports = mongoose.model('Mentor', mentorSchema);
