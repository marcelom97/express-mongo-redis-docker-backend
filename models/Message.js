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
  timestamp: {
    type: String,
    default: new Date().toUTCString()
  }
});

module.exports = mongoose.model('Message', MessageSchema);
