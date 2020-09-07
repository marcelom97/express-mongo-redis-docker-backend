const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a valid username'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a valid password'],
    minlength: 6
  },
  firstname: {
    type: String,
    required: [true, 'Please provide a valid first name']
  },
  lastname: {
    type: String,
    required: [true, 'Please provide a valid last name']
  }
});

module.exports = mongoose.model('User', UserSchema);
