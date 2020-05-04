const mongoose = require('mongoose');

const schema = {
    _id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    countryId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}

const collectionName = "cities";
const userSchema = mongoose.Schema(schema);
const City = mongoose.model(collectionName, userSchema);

module.exports = City;