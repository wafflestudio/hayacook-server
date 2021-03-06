var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var apiRouter = require('./routes/api');

var app = express();

mongoose.connect('mongodb://localhost:27017/hayacook');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRouter);
app.use('/libs', express.static(path.resolve('libs')));
app.use('/admin', express.static(path.resolve('admin')));
app.use('/doc', express.static(path.resolve('swagger-ui/dist')));
app.use('/doc-files', express.static(path.resolve('doc-files')));

app.use(function (req, res, next) {
	app.disable('x-powered-by');
	res.removeHeader('WWW-Authenticate');
	next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var port = process.env.PORT || 4000;
app.listen(port);
console.log('Server running on port ' + port);