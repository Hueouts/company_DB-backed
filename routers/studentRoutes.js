// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/create', authenticateToken, studentController.createStudent);
router.put('/update/:id', authenticateToken, studentController.updateStudent);
router.delete('/delete/:id', authenticateToken, studentController.deleteStudent);
router.get('/read', authenticateToken, studentController.getAllStudents);

module.exports = router;
