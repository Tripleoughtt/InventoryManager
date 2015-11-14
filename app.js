'use strict';

var PORT = process.env.PORT || 3000;
require('dotenv').load();
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

var mongoose = require('mongoose');
mongoose.connect("mongodb://"+ process.env.DB_USER + ":" + process.env.DB_PASS + "@ds051980.mongolab.com:51980/messageboard")
//mongoose.connect("mongodb://richg:richieg3@ds051980.mongolab.com:51980/messageboard")


app.set('view engine', 'jade');

// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(express.static('public'));

// ROUTES
app.use('/', require('./routes/rooms'));
app.use('/items', require('./routes/items'));
app.use('/rooms', require('./routes/rooms'));

// 404 HANDLER
app.use(function(req, res){
  res.status(404).render('404')
})

app.listen(PORT, function(){
  console.log('Listening on port ', PORT);
});
