var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.send('server up');
});

// serving up static html files for React.js testing

app.use(express.static(__dirname + '/../client/static/'));

app.listen(port);
