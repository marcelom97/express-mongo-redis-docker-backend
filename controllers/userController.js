const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

const createNewUser = asyncHandler(async (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;

  const user = await User.create({
    username,
    email,
    password,
    firstname,
    lastname
  });

  res.status(201).json({
    success: true,
    data: user
  });
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  if (!users) {
    return next(new ErrorResponse('List of Users not found', 404));
  }

  res.status(200).json(res.advancedResults);
});

const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`Resource not found with the id of:${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

const updateUserById = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`Resource not found with the id of:${req.params.id}`, 404));
  }

  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

const deleteUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorResponse(`Resource not found with the id of:${req.params.id}`, 404));
  }

  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    data: {}
  });
});

module.exports = {
  createNewUser,
  getUserById,
  getAllUsers,
  deleteUserById,
  updateUserById
};
