const crypto = require("crypto");

const config = require("../config/index")

const encryptPassword = (password) => {
  return crypto
    .pbkdf2Sync(password, config.encryptionSalt, 10000, 64, "sha512")
    .toString("base64");
};

module.exports = {
  encryptPassword,
};
