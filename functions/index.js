const functions = require("firebase-functions");
var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
const appRouter = require("./routes/appRouter");

var cors = require("cors");

var app = express();
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", appRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

exports.app = functions.https.onRequest(app);
