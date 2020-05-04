require('dotenv').config()
const initialzeDbConnection = require('./config/db');
initialzeDbConnection();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const { pageNotFoundHandler, errorHandler } = require("./middlewares/error-handlers");

const usersRouter = require('./routes/users');
const apartmentsRouter = require('./routes/apartments');
const loginRouter = require('./routes/login');
const countryCityRouter = require('./routes/country-city');
const authRouter = require('./routes/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({credentials: true, origin: 'http://localhost:3001'}));

app.use('/users', usersRouter);
app.use('/apartments', apartmentsRouter);
app.use('/login', loginRouter);
app.use('/countries', countryCityRouter);
app.use('/auth', authRouter);

app.use(pageNotFoundHandler);
app.use(errorHandler);



module.exports = app;
