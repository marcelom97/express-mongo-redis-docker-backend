const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

const checkEmailIfExists = asyncHandler(async (req, res, next) => {
  const { email } = req.params;
  const users = await User.find({ email });

  res.status(200).json({
    count: users.length,
  });
});

module.exports = { checkEmailIfExists };
