// controllers/studentController.js
const fs = require('fs');
const path = require('path');
const Student = require('../models/student');
const Parent = require('../models/parent');
const multer = require('multer');
const upload = multer({ 
  storage: multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => cb(null, `file-${Date.now()}${path.extname(file.originalname)}`)
  })
});

exports.createStudent = async (req, res) => {
  try {
    const { id, name, JD, u_m, a_id } = req.body;
    const file = req.file ? `http://localhost:3001/data/${req.file.filename}` : '';

    const existingStudent = await Student.findOne({ $or: [{ id }, { name }] });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with the same ID or name already exists' });
    }

    const newStudent = new Student({ id, name, JD, u_m, a_id, file });
    await newStudent.save();
    res.status(201).json({ message: 'Student created successfully', data: newStudent });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, JD } = req.body;

    const updatedStudent = await Student.updateOne({ id }, { $set: { name, JD } });
    if (!updatedStudent.nModified) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findOne({ id });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (student.file) {
      fs.unlinkSync(`./uploads/${path.basename(student.file)}`);
    }

    await Student.deleteOne({ id });
    res.json({ message: 'Student deleted successfully', data: student });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ message: 'Students retrieved successfully', students });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
