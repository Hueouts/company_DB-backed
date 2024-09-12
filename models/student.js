// models/student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  JD: {
    type: String,
    required: true,
  },
  u_m: {
    type: String,
    required: true,
  },
  a_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parent',
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Student', studentSchema);
