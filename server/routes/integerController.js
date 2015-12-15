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
  console.log('Getting Integers');
  return integerModel.find({}, function(err, foundData) {
    // return foundData[0].array;
  });
};

// ---- To Drop Collection in DB -----
// integerModel.remove({}, function(){
//  console.log("db dropped");
// });
