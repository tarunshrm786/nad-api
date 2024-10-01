// const express = require('express');
// const { upload, createMentor, getMentors, deleteMentor } = require('../controllers/mentorController');
// const router = express.Router();

// // POST route to create a new mentor
// router.post('/', upload, createMentor); // Use the upload middleware here

// // GET route to retrieve all mentors
// router.get('/', getMentors);

// router.delete('/:id', deleteMentor); 

// module.exports = router;

const express = require('express');
const {
    upload,
    createMentor,
    getMentors,
    deleteMentor
} = require('../controllers/mentorController');

const router = express.Router();

// POST route to create a new mentor
router.post('/', upload, createMentor); // Use the upload middleware here

// GET route to retrieve all mentors
router.get('/', getMentors);

// GET route to retrieve a specific mentor's image
router.get('/:id/image', async (req, res) => {
    try {
        const { id } = req.params;
        const mentor = await Mentor.findById(id);

        // Check if mentor exists
        if (!mentor || !mentor.image || !mentor.image.data) {
            return res.status(404).json({ error: 'Mentor or image not found.' });
        }

        // Set the response content type to the image type
        res.set('Content-Type', mentor.image.contentType);
        res.send(mentor.image.data); // Send the image data
    } catch (err) {
        console.error('Error fetching mentor image:', err.message);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
});

// DELETE route to delete a mentor
router.delete('/:id', deleteMentor);

module.exports = router;
