// controllers/authController.js
const jwt = require('jsonwebtoken');
const Parent = require('../models/parent');
const key = process.env.JWT_KEY;

exports.signup = async (req, res) => {
  try {
    const { name, email, pass } = req.body;
    const existingUser = await Parent.findOne({ $or: [{ name }, { email }] });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new Parent({ name, email, pass });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', data: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const user = await Parent.findOne({ email, pass });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, key, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.verifyToken = (req, res) => {
  const token = req.body.token;
  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.json({ message: 'Token is valid', result: decoded });
  });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Parent.find();
    res.json({ message: 'Users retrieved successfully', users });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
