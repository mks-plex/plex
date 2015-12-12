var mongoose = require('mongoose');
var integerController = require('./routes/integerController');

// connect to the database 
mongoose.connect('mongodb://localhost/local');

// grab the connection object from mongoose
var db = mongoose.connection;

// watch for changes
db.on('error', function(msg) {
  console.log("db connection failed");
});

db.once('open', function() {
  console.log("db connection succeeded");
});

exports.getData = function(dataType) {
  if (dataType === 'integers') {
    return integerController.getIntegers();
  }
}
  