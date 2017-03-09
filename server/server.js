var express = require('express');
var parser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var db = require('./db');
var router = require('./routes.js');

var app = express();

var port = process.env.PORT || 8080;

app.use(parser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client')));


app.listen(port, function() {console.log ('Check out the party on port ' + port)});

exports = module.exports = app;