require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var roomsRouter = require('./routes/roomsRoute');
var actionsRouter = require('./routes/actionsRoute');
var loginRouter = require('./routes/loginRoute')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('MY DIRTY DIRTY SECRET'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api/rooms', roomsRouter);
app.use('/api/actions', actionsRouter);
app.use('/api/login', loginRouter);

module.exports = app;
