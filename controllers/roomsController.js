const asyncHandler = require('../utils/asyncHandler');
const Rooms = require('../models/Rooms');
const ErrorResponse = require('../utils/errorResponse');

/** @module  RoomController */

/**
 * @name        module:RoomController#createRoom
 * @function    createRoom
 * @description Creates New Room
 * @path        {POST} /api/v1/rooms
 * @auth
 */
const createRoom = asyncHandler(async (req, res, next) => {
  // Add User to bodys
  req.body.owner = req.user.id;
  req.body.users = [req.user.id];

  const room = await Rooms.create(req.body);

  res.status(201).json({
    data: room,
  });
});

/**
 * @name        module:RoomController#getAllOwnersRooms
 * @function    getAllOwnersRooms
 * @description Get all Rooms that the logged in user is owner
 * @path        {GET} /api/v1/rooms/myrooms
 * @auth
 */
const getAllOwnersRooms = asyncHandler(async (req, res, next) => {
  const rooms = await Rooms.find({ owner: req.user.id });

  res.status(200).json({
    length: rooms.length,
    data: rooms,
  });
});

/**
 * @name        module:RoomController#getRoomsThatUserIsParticipant
 * @function    getRoomsThatUserIsParticipant
 * @description Get all Rooms that the logged in user is participant
 * @path        {GET} /api/v1/rooms/participaterooms
 * @auth
 */
const getRoomsThatUserIsParticipant = asyncHandler(async (req, res, next) => {
  const rooms = await Rooms.find({ users: req.user.id });

  res.status(200).json({
    length: rooms.length,
    data: rooms,
  });
});

/**
 * @name        module:RoomController#updateRoomById
 * @function    updateRoomById
 * @description Update specific room details
 * @path        {PUTs} /api/v1/rooms/:id
 * @auth
 */
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
    runValidators: true,
  });

  res.status(200).json({
    data: room,
  });
});

module.exports = {
  createRoom,
  getAllOwnersRooms,
  getRoomsThatUserIsParticipant,
  updateRoomById,
};
