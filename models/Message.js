const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Please provide a message body']
  },
  name: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rooms',
    required: true,
    select: '_id'
  }
});

module.exports = mongoose.model('Message', MessageSchema);
