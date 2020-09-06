const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  message: String,
  name: String,
  timestamp: String
});

module.exports = mongoose.model('Message', MessageSchema);
