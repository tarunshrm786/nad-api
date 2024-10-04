// contactusController.js
const Contact = require('../models/contactusModel');

// Controller to handle the creation of a new contact form entry
exports.createContact = async (req, res) => {
  const { name, email, phone, course } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      course,
    });
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting form', error });
  }
};

// Controller to fetch all contact form submissions
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error });
  }
};

// Controller to delete a specific contact form entry by ID
exports.deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error });
  }
};
