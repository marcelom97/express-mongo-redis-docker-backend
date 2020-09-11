const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  resetPassword,
  forgotPassword,
  updatePassword
} = require('../controllers/authController');

const { protectRoute } = require('../middlewares/authHandler');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(protectRoute, logoutUser);
router.route('/currentuser').get(protectRoute, getCurrentUser);
router.put('/updatepassword', protectRoute, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
