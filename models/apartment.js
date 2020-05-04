const mongoose = require("mongoose");


const schema = {
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cityId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  numberOfRooms: {
    type: Number,
    required: true,
  },
  sqm: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
  propertyPurpose: {
    type: String,
    enum: ["sale", "rent", "rent&sale"],
    required: true,
  },
  propertyType: {
    type: String,
    enum: [
      "condo",
      "garden apartment",
      "duplex",
      "penthouse",
      "land",
      "farm",
      "cottage",
    ],
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  status: {
    label: {
      type: String,
      enum: ["pending", "approved", "denied", "removed"],
      default: "pending",
    },
    description: {
      type: String,
      default: null
    },
  },
  images: {
    type: [String]
  }
};

const collectionName = "apartments";
const apartmentSchema = mongoose.Schema(schema);
const Apartment = mongoose.model(collectionName, apartmentSchema);

module.exports = Apartment;
