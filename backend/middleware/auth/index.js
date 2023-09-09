const isAuthorized = async (req, res, next) => {
  next();
};

module.exports = { isAuthorized };
