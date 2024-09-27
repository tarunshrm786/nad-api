const express = require('express');
const Student = require('../models/studentModel'); // Adjust the path to your model
const router = express.Router();

// Login API for students
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find student by email
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the password using the instance method
    const isMatch = await student.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Optionally, return a token or other student data (excluding password)
    res.status(200).json({
      message: 'Login successful',
      studentId: student.studentId,
      name: student.name,
      email: student.email,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
