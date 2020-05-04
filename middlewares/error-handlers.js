const createError = require("http-errors");

const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.json({status: err.status, message: err.message || "something broke"});
}

const pageNotFoundHandler = (req, res, next) => {
    next(createError(404, "Page not found"));
}

module.exports = {
    pageNotFoundHandler,
    errorHandler
};