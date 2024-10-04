// contactusRoute.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactusController');

// POST route to create a new contact form submission
router.post('/', contactController.createContact);

// GET route to retrieve all contact form submissions
router.get('/', contactController.getContacts);

// DELETE route to delete a contact form entry by ID
router.delete('/:id', contactController.deleteContact);

module.exports = router;
