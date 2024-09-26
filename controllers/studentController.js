// // controllers/studentController.js
// const Student = require('../models/studentModel');

// // Admin Signup for a new student
// exports.signup = async (req, res) => {
//   const { studentId, name, email, password } = req.body;

//   try {
//     // Check if student already exists (by studentId or email)
//     let existingStudent = await Student.findOne({ $or: [{ email }, { studentId }] });
//     if (existingStudent) {
//       return res.status(400).json({ message: 'Student with this email or student ID already exists' });
//     }

//     // Create a new student
//     const student = new Student({
//       studentId,
//       name,
//       email,
//       password,  // Will be hashed in the model's pre-save hook
//     });

//     await student.save();
//     res.status(201).json({ message: 'Student registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

const Student = require('../models/studentModel'); // Ensure this path is correct
const bcrypt = require('bcryptjs');

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

// Function to get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find(); // Fetch all students
    res.status(200).json(students); // Return the students in JSON format
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Function to get a student by ID
exports.getStudentById = async (req, res) => {
  const { id } = req.params; // Get the student ID from the URL parameters

  try {
    const student = await Student.findOne({ studentId: id }); // Find student by studentId
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student); // Return the student data in JSON format
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
