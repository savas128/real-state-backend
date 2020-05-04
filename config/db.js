const mongoose = require('mongoose');
const config = require ('./index');

const initializeDbConnection = async () => {
  mongoose.connect(config.databaseURL, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("were connected")
  });
}


module.exports = initializeDbConnection;