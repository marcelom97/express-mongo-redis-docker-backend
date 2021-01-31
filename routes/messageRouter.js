const express = require('express');
const cleanCache = require('../middlewares/cleanCache');

const router = express.Router();

const {
  createMessage,
  getAllMessages,
  deleteMessageById,
  deleteAllMessages,
  getAllRoomMessages,
} = require('../controllers/messageController');

const Message = require('../models/Message');

const { protectRoute } = require('../middlewares/authHandler');
const advancedResults = require('../middlewares/advancedResults');

router.route('/').get(advancedResults(Message, 'room'), getAllMessages).delete(cleanCache, deleteAllMessages);

router.route('/:roomId/send').post(cleanCache, protectRoute, createMessage);

router.route('/:roomId/messages').get(protectRoute, advancedResults(Message, 'room'), getAllRoomMessages);

router.route('/:id').delete(cleanCache, deleteMessageById);

module.exports = router;
