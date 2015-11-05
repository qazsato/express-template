// require node_modules
var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var config       = require('config');
var compression  = require('compression');

// create app
var app = express();

// set app
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// mount app
app.use(favicon(path.join(__dirname, 'public/dist/images/common/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public'), {maxAge: 86400000 * 30}));

// define routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// error handlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
