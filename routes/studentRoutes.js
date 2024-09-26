// // routes/studentRoutes.js
// const express = require('express');
// const { signup } = require('../controllers/studentController');

// const router = express.Router();

// // Admin route to add a new student
// router.post('/signup', signup);

// module.exports = router;

const express = require('express');
const { signup, getAllStudents, getStudentById } = require('../controllers/studentController');

const router = express.Router();

// Admin route to add a new student
router.post('/signup', signup);

// Route to get all students
router.get('/', getAllStudents);

// Route to get a student by ID
router.get('/:id', getStudentById);

module.exports = router;
