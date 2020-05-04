const User = require("../models/user");
const { encryptPassword }= require('../services/encryption');

loginUser = async ({ email, password }) => {
  try {
    const token = encryptPassword(password)
    let error, isLogged = false;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      error = "this user does not exist";
      return { error, isLogged };
    } else if (user.password !== token) {
      error = "this is a wrong password";
      return { error, isLogged };
    } else if (!user.status.active) {
      error = "this account is currently not available";
      return { error, isLogged };
    } else {
      isLogged = true;
      return { user, isLogged };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = loginUser;
