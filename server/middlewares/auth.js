const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const Authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    if (!access_token) throw new Error("INVALID_TOKEN");
    let payload = verifyToken(access_token);
    let user = await User.findByPk(payload.id);
    if (!user) {
      throw new Error("INVALID_USER");
    }
    req.userLogin = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = Authentication;
