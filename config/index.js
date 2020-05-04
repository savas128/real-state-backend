const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT,
    databaseURL: process.env.DB_URI,
    jwtSecret: process.env.JWT_SECRET,
    encryptionSalt: process.env.PASSWORD_SALT
}