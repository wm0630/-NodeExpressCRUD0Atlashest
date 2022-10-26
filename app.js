const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//mongoose.connect('mongodb+srv://test:4L9FWr1buHIYaAst@cluster0.qwixr.mongodb.net/flea?retryWrites=true&w=majority')

mongoose.connect('mongodb://test:4L9FWr1buHIYaAst@cluster0-shard-00-00.qwixr.mongodb.net:27017,cluster0-shard-00-01.qwixr.mongodb.net:27017,cluster0-shard-00-02.qwixr.mongodb.net:27017/flea?ssl=true&replicaSet=atlas-wu5x60-shard-0&authSource=admin&retryWrites=true&w=majority')
  .then(() => console.log('connection succesful'))
  .catch((err) => {console.error(err); console.log("OOhh");});

const index = require('./routes/index');
const users = require('./routes/users');
const employees = require('./routes/employees');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/employees', employees);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
