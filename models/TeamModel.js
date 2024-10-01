// models/teamModel.js
// const mongoose = require('mongoose');

// const teamSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     post: { type: String, required: true }, // Changed 'post' to 'position' for clarity
//     city: { type: String, required: true },
//     image: {
//         data: Buffer,
//         contentType: String,
//     }
// });

// module.exports = mongoose.model('Team', teamSchema);


const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    post: { type: String, required: true },
    image: { 
        data: { type: String, required: true }, // Store Base64 image string
        contentType: { type: String, required: true } // Store image MIME type
    }
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;