const mongoose = require('mongoose');

const schema = {
    _id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}

const collectionName = "countries";
const userSchema = mongoose.Schema(schema);
const Country = mongoose.model(collectionName, userSchema);

module.exports = Country;