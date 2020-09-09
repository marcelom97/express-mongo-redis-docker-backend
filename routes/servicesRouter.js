const express = require('express');
const router = express.Router();

const { checkUsernameIfExists } = require('../services/checkUsername');

router.route('/checkusername').get(checkUsernameIfExists);

module.exports = router;
