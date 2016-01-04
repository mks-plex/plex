var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var config = require('../webpack.config.js');
var mid = require('./middleware.js');
var integerController = require('./routes/integerController');
var utils = require('./utilities.js');

var app = express();
var compiler = webpack(config);
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/'));

// endpoint for users submitting an algortithm to test, including which data type to test with

app.post('/parse/:dataType', mid.testAlgo, mid.evalForAllInputSizes, function(req, res) {
  console.log('sending response, coordinates are: ' + res.body.coords);
  res.send(res.body);
});

app.use(webpackMiddleware(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

// app.get('/test', integerController.getIntegers);
// app.post('/test', integerController.postIntegers);

app.listen(port);
