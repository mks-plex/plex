var express = require('express'); 
var mongoose = require('mongoose');
var integer = require('../datagenerator');

var integerSchema = mongoose.Schema({
  array: [ { type: Number } ]
});

var integerModel = mongoose.model('integers', integerSchema);

// ----------- To populate the DB ------------
exports.postIntegers = function(req, res) {
  var newInteger = new integerModel();
  newInteger.array = integer;
  console.log("INTEGER:" + integer.length);
  newInteger.save(function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      console.log("DATA: " + data);
      res.send(data);
    }
  });
};

//-------- To fetch data from the DB ------ 
exports.getIntegers = function() {
  return integerModel.find({}, function(err, foundData) {
    // console.log('FoundData: ', foundData[0].array.length) 
  });
}; 

// ---- To Drop Collection in DB -----
// integerModel.remove({}, function(){
//  console.log("db dropped");
// })
