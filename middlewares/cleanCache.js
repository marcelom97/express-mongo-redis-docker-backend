const { clearHash } = require('../services/cache');
// TODO figure out what key has to be in cache so i can clear it simple
module.exports = async (req, res, next) => {
  await next();
  clearHash(req.user.id);
};
