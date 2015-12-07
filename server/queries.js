 // module.exports = function (app) {
    
  var mongoose = require('mongoose');
  var integerController = require('./routes/integerController');

  //connect to the database 
  mongoose.connect('mongodb://localhost/local');

  //grab the connection object from mongoose
  var db = mongoose.connection;

  //watch for changes
  db.on('error', function(msg) {
    console.log("db connection failed");
  });

  db.once('open', function() {
    console.log("db connection succeeded");
  });

  exports.getData = function() {
    // if(datatype === "integers"){
      return integerController.getIntegers()
    // }
  }


  //~~~~~~~~

  // var parseRouter = express.Router();

  // parseRouter.post('/:datatype', mid.evalForAllInputSizes, function(req, res) {
  //  res.send(res.coords);
  // })

  // app.use('/parse', parseRouter);

  //~~~~~~~~


  //~~~~~~
  // var data = queries.getData(dataType);   // utilities.js
  //~~~~~~~

 // } //end of module.exports
