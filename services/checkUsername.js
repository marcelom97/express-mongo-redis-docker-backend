const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

const checkUsernameIfExists = asyncHandler(async (req, res, next) => {
  const username = req.body.username.toString().toLowerCase();
  const users = await User.find({ username });

  res.status(200).json({
    success: true,
    count: users.length
  });
});

module.exports = { checkUsernameIfExists };
