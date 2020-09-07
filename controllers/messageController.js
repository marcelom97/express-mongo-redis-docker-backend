const Message = require('../models/Message');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const createMessage = asyncHandler(async (req, res, next) => {
  const { message, name } = req.body;
  // const timestamp = new Date().toUTCString();

  if (!message || !name) {
    res.status(500).json({
      success: false,
      error: 'Something is missing'
    });
  }

  const newMessage = await Message.create({ message, name });

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

const getAllMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    length: messages.length,
    data: messages
  });
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

const deleteAllMessages = asyncHandler(async (req, res, next) => {
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
  deleteAllMessages
};
