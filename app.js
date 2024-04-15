var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require("./config/passport-config");
var session = require("express-session");


require('dotenv').config();

var authRouter = require('./routes/auth');
var categoriesRouter = require('./routes/categories');
var itemsRouter = require('./routes/items');

const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB;

main().catch((err) => console.log(err));
async function main() { await mongoose.connect(mongoDB); }

app.use(session({ secret: process.env.session_secret, resave: false, saveUninitialized: true }));
app.use(passport.session());

// bodyParser is required for the sign-in to work
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);
app.use('/categories', categoriesRouter);
app.use('/items', itemsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // Determine whether to show error details based on the environment
  const showDetails = req.app.get('env') === 'development';

  // Set the response status code
  const statusCode = err.status || err.code || 500;

  // Send the error response
  res.status(statusCode).render('error', {
    message: err.message,
    status: statusCode,
    stack: showDetails ? err.stack : null
  });
});

module.exports = app;
