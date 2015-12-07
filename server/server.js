var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var config = require('../webpack.config.js');
var queries = require('./queries.js');
var integerController = require('./routes/integerController');
var Q = require('q');



var app = express();


var compiler = webpack(config);
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../client/'));
app.use(webpackMiddleware(compiler));
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});


// app.post('/test', integerController.postIntegers);
// app.get('/test', integerController.getIntegers);

// queries(app);

var data = queries.getData().then(function(data){
	console.log("in server.js ", data)
})

app.listen(port);
