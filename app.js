require("dotenv").config()
require("./configs/mongo");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const NodeGeocoder = require('node-geocoder');
const session = require("express-session");
const hbs = require("hbs");
const flash = require("connect-flash"); // designed to keep messages between 2 http request/response cycles
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var restaurantRouter = require('./routes/restaurant');
var reviewRouter = require('./routes/review');
var authRouter = require('./routes/auth');
var app = express();



// INITIALIZE SESSION
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
  })
);


app.use(flash());
app.use(require("./middlewares/exposeFlashMessage"));
//router.use(protectAdminRoute); //laissé en commentaire pour ne pas avoir a se co en tant qu'admin


// expose login status to the hbs templates
app.use(require("./middlewares/exposeLoginStatus"));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/restaurants', restaurantRouter);
app.use('/reviews', reviewRouter);
app.use('/auth', authRouter)

// catch 404 and forward to error handler
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
