var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
const expressSanitizer = require('express-sanitizer');
var https = require('https');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var productRouter =require('./routes/product');
var logoutRouter =require('./routes/logout');
var commentsRouter =require('./routes/comments');
var cartRouter =require('./routes/cart');
var termsRouter =require('./routes/termsandconditions');
var underconstructionRouter =require('./routes/underconstruction');
var welcomeRouter =require('./routes/welcome');
var orderRouter =require('./routes/orderConfirm');




var app = express();
app.use(expressSanitizer());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use(session({
    secret: "cookie_secret",
    resave: true,
    saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/userprofile', usersRouter);
app.use('/register', registerRouter);
app.use('/login',loginRouter);
app.use('/product', productRouter);
app.use('/logout',logoutRouter);
app.use('/comments', commentsRouter);
app.use('/cart', cartRouter);
app.use('/termsandconditions',termsRouter);
app.use('/underconstruction',underconstructionRouter);
app.use('/welcome',welcomeRouter);
app.use('/order',orderRouter);


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
