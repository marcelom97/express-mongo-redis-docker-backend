const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

const checkUsernameIfExists = asyncHandler(async (req, res, next) => {
  const { username } = req.params;
  const users = await User.find({ username });

  res.status(200).json({
    count: users.length,
  });
});

module.exports = { checkUsernameIfExists };
