const express = require('express');

const {
  createNewUser,
  getUserById,
  getAllUsers,
  deleteUserById,
  updateUserById
} = require('../controllers/userController');

const User = require('../models/User');

const advancedResults = require('../middlewares/advancedResults');

const router = express.Router();

router.route('/').post(createNewUser).get(advancedResults(User), getAllUsers);

router.route('/:id').get(getUserById).delete(deleteUserById).put(updateUserById);

module.exports = router;
