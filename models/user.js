const mongoose = require('mongoose');

const schema = {
  name: {
    first: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    last: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  role: {
    type: String,
    enum: ["basic", "admin"],
    default: "basic",
  },
  email: {
    type: String,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    required: true,
    lowercase: true,
    trim: true,
    validate: async (value) => {
      const msg = "email allready in use";
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error(msg);
        }
        return true;
      } catch (error) {
        throw error;
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  wishlist: [String],
  status: {
    active: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
};

const collectionName = "users";
const userSchema = mongoose.Schema(schema);
const User = mongoose.model(collectionName, userSchema);

module.exports = User;
