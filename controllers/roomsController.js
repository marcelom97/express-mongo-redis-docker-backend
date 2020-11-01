const asyncHandler = require('../utils/asyncHandler');
const Rooms = require('../models/Rooms');
const ErrorResponse = require('../utils/errorResponse');

const createRoom = asyncHandler(async (req, res) => {
  // Add User to body
  req.body.owner = req.user.id;
  req.body.users = [req.user.id];

  const room = await Rooms.create(req.body);

  res.status(201).json({
    success: true,
    data: room
  });
});

const getAllOwnersRooms = asyncHandler(async (req, res) => {
  const rooms = await Rooms.find({ owner: req.user.id });

  res.status(200).json({
    success: true,
    length: rooms.length,
    data: rooms
  });
});

const getRoomsThatUserIsParticipant = asyncHandler(async (req, res) => {
  const rooms = await Rooms.find({ users: req.user.id });

  res.status(200).json({
    success: true,
    length: rooms.length,
    data: rooms
  });
});

const updateRoomById = asyncHandler(async (req, res, next) => {
  let room = await Rooms.findById(req.params.id);

  if (!room) {
    return next(new ErrorResponse(`Resource not found with the id of:${req.params.id}`, 404));
  }

  if (req.user.id !== room.owner) {
    return next(new ErrorResponse(`User with id: ${req.user.id} is not authorized to modify this room`, 401));
  }

  room = await Rooms.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: room
  });
});

module.exports = {
  createRoom,
  getAllOwnersRooms,
  getRoomsThatUserIsParticipant,
  updateRoomById
};
