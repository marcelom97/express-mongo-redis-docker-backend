const mongoose = require('mongoose');

const RoomsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a valid Room name'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a valid Room owner'],
  },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Rooms', RoomsSchema);
