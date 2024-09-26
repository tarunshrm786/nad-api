// controllers/studentController.js
const Student = require('../models/studentModel');

// Admin Signup for a new student
exports.signup = async (req, res) => {
  const { studentId, name, email, password } = req.body;

  try {
    // Check if student already exists (by studentId or email)
    let existingStudent = await Student.findOne({ $or: [{ email }, { studentId }] });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this email or student ID already exists' });
    }

    // Create a new student
    const student = new Student({
      studentId,
      name,
      email,
      password,  // Will be hashed in the model's pre-save hook
    });

    await student.save();
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
