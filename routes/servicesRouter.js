const express = require('express');

const router = express.Router();

const { checkUsernameIfExists } = require('../services/checkUsername');
const { checkEmailIfExists } = require('../services/checkEmail');

router.route('/checkusername/:username').get(checkUsernameIfExists);
router.route('/checkemail/:email').get(checkEmailIfExists);

module.exports = router;
