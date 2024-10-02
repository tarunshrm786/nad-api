// const Contact = require('../models/enquiryModel');

// const createEnquiry = async (req, res) => {
//     try {
//         const { name, email, contactus, city } = req.body;

//         // Create new enquiry document
//         const enquiry = new Enquiry({
//             name,
//             email,
//             contactus,
//             city
//         });

//         await enquiry.save();

//         res.status(201).json(enquiry);
//     } catch (error) {
//         res.status(400).json({ message: 'Failed to create enquiry', error: error.message });
//     }
// };

// const getEnquiry = async (req, res) => {
//     try {
//         const enquiry = await Enquiry.find();
//         res.status(200).json(enquiry);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to retrieve contacts', error: error.message });
//     }
// };

// // @desc Delete a contact message by ID
// // @route DELETE /api/contacts/:id
// // @access Public
// const deleteEnquiry = async (req, res) => {
//     try {
//         const enquiry = await Enquiry.findById(req.params.id);

//         if (!enquiry) {
//             return res.status(404).json({ message: 'Enquiry not found' });
//         }

//         await enquiry.remove();
//         res.status(200).json({ message: 'Enquiry deleted' });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to delete enquiry', error: error.message });
//     }
// };

// module.exports = {
//     createEnquiry,
//     getEnquiry,
//     deleteEnquiry
// };

const Enquiry = require('../models/enquiryModel'); // Changed to Enquiry for consistency

// @desc Create a new enquiry
// @route POST /api/enquiries
// @access Public
const createEnquiry = async (req, res) => {
    try {
        const { name, email, contactus, city } = req.body;

        // Create new enquiry document
        const enquiry = new Enquiry({
            name,
            email,
            contactus,
            city
        });

        await enquiry.save(); // Save the enquiry to the database

        res.status(201).json(enquiry);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create enquiry', error: error.message });
    }
};

// @desc Get all enquiries
// @route GET /api/enquiries
// @access Public
const getEnquiry = async (req, res) => {
    try {
        const enquiries = await Enquiry.find(); // Fetch all enquiries
        res.status(200).json(enquiries);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve enquiries', error: error.message });
    }
};

// @desc Delete an enquiry by ID
// @route DELETE /api/enquiries/:id
// @access Public
const deleteEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id); // Find enquiry by ID

        if (!enquiry) {
            return res.status(404).json({ message: 'Enquiry not found' });
        }

        await Enquiry.findByIdAndDelete(req.params.id); // Use findByIdAndDelete instead of remove()
        res.status(200).json({ message: 'Enquiry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete enquiry', error: error.message });
    }
};

module.exports = {
    createEnquiry,
    getEnquiry,
    deleteEnquiry
};
