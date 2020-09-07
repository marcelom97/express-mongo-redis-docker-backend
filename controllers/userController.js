const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const createNewUser = asyncHandler(async (req, res, next) => {
  const { username, email, password, firstname, lastname } = req.body;

  const user = await User.create({
    username,
    email,
    password,
    firstname,
    lastname
  });

  if (!user) {
    return next(new ErrorResponse('User not created', 500));
  }

  res.status(201).json({
    success: true,
    data: user
  });
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    length: users.length,
    data: users
  });
});

const getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new ErrorResponse(`User not found with id of: ${id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

module.exports = { createNewUser, getUserById, getAllUsers };
