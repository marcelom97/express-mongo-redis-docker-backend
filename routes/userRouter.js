const express = require('express');
const router = express.Router();

const {
  createNewUser,
  getUserById,
  getAllUsers,
  deleteUserById,
  updateUserById
} = require('../controllers/userController');

router.route('/').post(createNewUser).get(getAllUsers);

router
  .route('/:id')
  .get(getUserById)
  .delete(deleteUserById)
  .put(updateUserById);

module.exports = router;
