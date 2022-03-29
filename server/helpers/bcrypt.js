const bcrypt = require("bcrypt");

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function comparePassword(password, hashPass) {
  return bcrypt.compareSync(password, hashPass);
}


module.exports = { hashPassword,comparePassword };
