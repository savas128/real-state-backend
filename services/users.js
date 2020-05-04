const User = require("../models/user");
const encryptPassword = require("../services/encryption");

const getUsers = async () => {
  try {
    const result = await User.find({})
    return result;
  } catch (error) {
    throw error;
  }
};

const addUser = async (user) => {
  try {
    const password = encryptPassword(user.password);
    const newUser = await new User({
      name: {
        first: user.firstName,
        last: user.lastName,
      },
      email: user.email,
      role: "admin",
      password,
      phone: user.phone,
    }).save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsers,
  addUser,
};
