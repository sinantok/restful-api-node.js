const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cons = require('consolidate');

const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');
const authorRouter = require('./routes/author');

//db
const db = require('./helper/mongoDb')(); //() ile dosya icindeki export methodu çalıştırılır
const app = express();

//conf
const config = require('./config');
app.set('api_secret_key', config.api_secret_key);

//middlewares
const verifyToken = require('./middleware/verify-token')

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');
app.set('view engine', 'jade');


app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', verifyToken);
app.use('/api/book', bookRouter);
app.use('/api/author', authorRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error : { message: err.message, status: err.status}});
});

module.exports = app;
