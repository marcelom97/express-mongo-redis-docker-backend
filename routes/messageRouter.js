const express = require('express');
const router = express.Router();

const {
  createMessage,
  getAllMessages,
  deleteMessageById,
  deleteAllMessages
} = require('../controllers/messageController');

router
  .route('/')
  .post(createMessage)
  .get(getAllMessages)
  .delete(deleteAllMessages);

router.route('/:id').delete(deleteMessageById);

module.exports = router;
