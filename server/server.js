var express = require('express');
var parser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var db = require('./db');
var session = require('express-session');
var scheduler = require('./scheduler');
var resetter = require('./resetter');
require('dotenv').config();


var app = express();

app.use(parser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client')));

app.use(session({
  secret: 'kitty cat',
  resave: false,
  saveUninitialized: true
}));

require('./routes.js')(app, express);

var port = process.env.PORT || 8080;

app.listen(port, function() {console.log ('Check out the party on port ' + port)});

scheduler.start();
resetter.start();

module.exports = app;