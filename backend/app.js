var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Requiring various modules

var indexRouter = require('./routes/index'); // Require index Router -> mainly used in this project
const mongoose = require('mongoose'); // Require data base framework 
var app = express(); // express.js

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// using various modules for express.js

app.use('/', indexRouter); // use '/' routes for index routing
// Using get and post methods for '/' routes

// catch 404 and forward to error handler but we did not create 404 page so it will lead to just error page
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
