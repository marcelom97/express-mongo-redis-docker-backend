const Message = require('../models/Message');

const createMessage = async (req, res, next) => {
  const { message, name } = req.body;
  const timestamp = new Date().toUTCString();

  if (!message || !name) {
    res.status(500).json({
      success: false,
      error: 'Something is missing'
    });
  }

  const newMessage = await Message.create({ message, name, timestamp });

  if (!newMessage) {
    res.status(500).json({
      success: false
    });
  }

  res.status(201).json({
    success: true,
    data: newMessage
  });
};

const getAllMessages = async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    length: messages.length,
    data: messages
  });
};

const deleteMessageById = async (req, res, next) => {
  const { id } = req.params;

  const message = await Message.findById(id);

  if (!message) {
    res.status(500).json({
      success: false,
      error: `Message with id:${id} does not exist`
    });
  }

  await Message.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    data: message
  });
};

const deleteAllMessages = async (req, res, next) => {
  const messages = await Message.deleteMany();
  res.status(200).json({
    success: true,
    length: 0,
    data: []
  });
};

module.exports = {
  createMessage,
  getAllMessages,
  deleteMessageById,
  deleteAllMessages
};
