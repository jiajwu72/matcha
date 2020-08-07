var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser=require("body-parser")

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var uploadRouter = require('./routes/upload');
var tagRouter = require('./routes/tags');
// var moviesRouter = require('./routes/movies');
// var commentsRouter = require('./routes/comments');
/*
var UserModel=require("./model/User");
var UserModel=require("./model/Movie");
var UserModel=require("./model/Comment");
*/

var app = express();
// console.log(process.env.HOST)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
        extended: false
}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', indexRouter);
app.use('/upload', uploadRouter);
app.use('/user', userRouter);
app.use('/tag', tagRouter);
// app.use('/users', usersRouter);
// // app.use('/movies', moviesRouter);
// app.use('/comments', commentsRouter);

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
