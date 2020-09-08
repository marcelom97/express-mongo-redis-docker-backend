const express = require('express');
const router = express.Router();

const {
  createRoom,
  getAllOwnersRooms,
  getRoomsThatUserIsParticipant,
  updateRoomById
} = require('../controllers/roomsController');

const { protectRoute } = require('../middlewares/authHandler');
router.use(protectRoute);

router.route('/').post(createRoom);
router.route('/myrooms').get(getAllOwnersRooms);
router.route('/participaterooms').get(getRoomsThatUserIsParticipant);
router.route('/:id').put(updateRoomById);

module.exports = router;
