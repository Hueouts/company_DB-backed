// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/verified', authController.verifyToken);
router.get('/super', authController.getAllUsers);

module.exports = router;
