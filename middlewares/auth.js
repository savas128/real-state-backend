const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const ac = require("../access-control/roles");
const config = require("../config/index");

const grantAccess = (action, resource) => {
  return async (req, res, next) => {
    try {
      const permission = await ac
        .can(res.locals.user.role)
        .execute(action)
        .on(resource);
      if (!permission.granted) {
        const error = createError(401, "Unauthorized");
        next(error);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

const authenticateUser = async (req, res, next) => {
  try {
    const user = req.cookies["mdbjwt"];
    if (!user) {
      return next(createError(403, "Forbidden"));
    }
    res.locals.user = jwt.verify(user, config.jwtSecret);
    next();
  } catch (error) {
    const err = createError(401, error);
    next(err);
  }
};

module.exports = {
  grantAccess,
  authenticateUser,
};
