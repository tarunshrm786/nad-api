// const Student = require('../models/studentModel'); // Ensure this path is correct
// const bcrypt = require('bcryptjs');

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

// // Function to get all students
// exports.getAllStudents = async (req, res) => {
//   try {
//     const students = await Student.find(); // Fetch all students
//     res.status(200).json(students); // Return the students in JSON format
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// // Function to get a student by ID
// exports.getStudentById = async (req, res) => {
//   const { id } = req.params; // Get the student ID from the URL parameters

//   try {
//     const student = await Student.findOne({ studentId: id }); // Find student by studentId
//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }
//     res.status(200).json(student); // Return the student data in JSON format
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

// const Student = require('../models/studentModel'); // Ensure this path is correct
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken'); // Import the jsonwebtoken package

// // Function to sign up a new student
// exports.signup = async (req, res) => {
//   const { studentId, name, email, password } = req.body;

//   try {
//     // Check if the student already exists
//     const existingStudent = await Student.findOne({ email });
//     if (existingStudent) {
//       return res.status(400).json({ message: 'Student already exists' });
//     }

//     // Create a new student instance
//     const newStudent = new Student({ studentId, name, email, password });

//     // Save the student to the database
//     await newStudent.save();

//     res.status(201).json({ message: 'Student registered successfully', studentId: newStudent.studentId });
//   } catch (error) {
//     console.error('Signup error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Function to log in a student
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Validate input
//     if (!email || !password) {
//       return res.status(400).json({ message: 'Email and password are required' });
//     }

//     // Find student by email
//     const student = await Student.findOne({ email });
//     if (!student) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Compare the password using the instance method
//     const isMatch = await student.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Generate a token
//     const token = jwt.sign(
//       { id: student._id, studentId: student.studentId, name: student.name, email: student.email },
//       process.env.JWT_SECRET, // Make sure to define this in your .env file
//       { expiresIn: '1h' } // Token expiration time
//     );

//     res.status(200).json({
//       message: 'Login successful',
//       token, // Include the token in the response
//       studentId: student.studentId,
//       name: student.name,
//       email: student.email,
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Function to get all students
// exports.getAllStudents = async (req, res) => {
//   try {
//     const students = await Student.find({});
//     res.status(200).json(students);
//   } catch (error) {
//     console.error('Get all students error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Function to get a student by ID
// exports.getStudentById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const student = await Student.findById(id);
//     if (!student) {
//       return res.status(404).json({ message: 'Student not found' });
//     }
//     res.status(200).json(student);
//   } catch (error) {
//     console.error('Get student by ID error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

const Student = require('../models/studentModel'); // Ensure this path is correct
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken package

// Function to sign up a new student
exports.signup = async (req, res) => {
  const { studentId, name, email, password } = req.body;

  try {
    // Check if the student already exists by email
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Create a new student instance
    const newStudent = new Student({ studentId, name, email, password });

    // Save the student to the database
    await newStudent.save();

    res.status(201).json({ message: 'Student registered successfully', studentId: newStudent.studentId });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to log in a student
exports.login = async (req, res) => {
  const { studentId, password } = req.body; // Changed to use studentId

  try {
    // Validate input
    if (!studentId || !password) {
      return res.status(400).json({ message: 'Student ID and password are required' });
    }

    // Find student by student ID
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the password using the instance method
    const isMatch = await student.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a token
    const token = jwt.sign(
      { id: student._id, studentId: student.studentId, name: student.name, email: student.email },
      process.env.JWT_SECRET, // Make sure to define this in your .env file
      { expiresIn: '1h' } // Token expiration time
    );

    res.status(200).json({
      message: 'Login successful',
      token, // Include the token in the response
      studentId: student.studentId,
      name: student.name,
      email: student.email,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (error) {
    console.error('Get all students error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to get a student by ID
exports.getStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error('Get student by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
