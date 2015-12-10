var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var config = require('../webpack.config.js');
var mid = require('./middleware.js');
var bodyParser = require('body-parser');

var app = express();
var compiler = webpack(config);
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/'));

// endpoint for users submitting an algortithm to test, including which data type to test with
app.post('/parse/:dataType', mid.evalForAllInputSizes, function(req, res) {
  console.log('This is the algorithm', req.body.data);
  console.log('S18-sending response, coordinates are: ' + res.coords);
  res.send(res.coords);
});

app.use(webpackMiddleware(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.listen(port);
