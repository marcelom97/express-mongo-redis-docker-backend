const express = require('express');
const router = express.Router();

const {
  createNewUser,
  getUserById,
  getAllUsers
} = require('../controllers/userController');

router.route('/').post(createNewUser).get(getAllUsers);
router.route('/:id').get(getUserById);

module.exports = router;
