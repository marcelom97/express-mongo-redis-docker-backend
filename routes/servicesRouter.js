const express = require('express');

const { checkUsernameIfExists } = require('../services/checkUsername');
const { checkEmailIfExists } = require('../services/checkEmail');

const router = express.Router();

router.route('/checkusername/:username').get(checkUsernameIfExists);
router.route('/checkemail/:email').get(checkEmailIfExists);

module.exports = router;
