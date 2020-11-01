const Message = require('../models/Message');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const Rooms = require('../models/Rooms');

const createMessage = asyncHandler(async (req, res, next) => {
  const { message } = req.body;
  const name = req.user.username;

  const room = await Rooms.findById(req.params.roomId);
  const user = await User.findById(req.user.id);

  if (!room.users.includes(user.id)) {
    return next(new ErrorResponse(`User with id: ${req.user.id} is not authorized to modify this room`, 401));
  }

  if (!message) {
    res.status(500).json({
      success: false,
      error: 'Something is missing'
    });
  }

  const newMessage = await Message.create({ message, name, room });

  if (!newMessage) {
    res.status(500).json({
      success: false
    });
  }

  res.status(201).json({
    success: true,
    data: newMessage
  });
});

const getAllMessages = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

const getAllRoomMessages = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults);
});

const deleteMessageById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const message = await Message.findById(id);

  if (!message) {
    return next(new ErrorResponse(`Resource not found with id of: ${id}`, 404));
  }

  await Message.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    data: message
  });
});

const deleteAllMessages = asyncHandler(async (req, res) => {
  await Message.deleteMany();
  res.status(200).json({
    success: true,
    length: 0,
    data: []
  });
});

module.exports = {
  createMessage,
  getAllMessages,
  deleteMessageById,
  deleteAllMessages,
  getAllRoomMessages
};
