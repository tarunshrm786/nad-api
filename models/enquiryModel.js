// const mongoose = require('mongoose');

// // Define schema
// const enquirySchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     contactus: {
//         type: String,
//         required: true
//     },
//     city: {
//         type: String,
//         required: true
//     }
// }, {
//     timestamps: true
// });

// // Create and export model
// const Enquiry = mongoose.model('Enquiry', enquirySchema);

// module.exports = Enquiry;

const mongoose = require('mongoose');

// Define schema
const enquirySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactus: {
        type: Number, // Change from String to Number for contact number
        required: true
    },
    city: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Create and export model
const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
