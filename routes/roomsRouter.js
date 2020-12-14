const express = require('express');
const cleanCache = require('../middlewares/cleanCache');

const router = express.Router();

const {
  createRoom,
  getAllOwnersRooms,
  getRoomsThatUserIsParticipant,
  updateRoomById,
} = require('../controllers/roomsController');

const { protectRoute } = require('../middlewares/authHandler');

router.use(protectRoute);

router.route('/').post(cleanCache, createRoom);
router.route('/myrooms').get(getAllOwnersRooms);
router.route('/participaterooms').get(getRoomsThatUserIsParticipant);
router.route('/:id').put(cleanCache, updateRoomById);

module.exports = router;
