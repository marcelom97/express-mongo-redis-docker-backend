const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Please provide a message body']
  },
  name: {
    type: String,
    required: [true, 'Please provide a name']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Message', MessageSchema);
