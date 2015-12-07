var express = require('express'); 
var mongoose = require('mongoose');
var Q = require('q');
var integer = require('./../datagenerator');

//define a Schema, a schema defines an object from a collection in mongodb
var integerSchema = mongoose.Schema({
	array: [ { type: Number } ]
});

//the schema on its own has no value, it just lets you know what type of values to store in the object
//lets define a model, a model is like a class name and you create instances based on that.
//integers is the collection name with the schema its based on
var integerModel = mongoose.model('integers', integerSchema);

// exports.postIntegers = function(req, res) {
// 	var newInteger = new integerModel();
// 	newInteger.array = integer;
// 	// console.log("INTERGER:" + integer);
// 	newInteger.save(function(err, data) {
// 	 	if(err) {
// 	 		console.log(err);
// 	 		res.status(500).send();
// 	 	} else {
// 	 		console.log("DATA: " + data);
// 	 		res.send(data);
// 	 	}
// 	});
// };

// exports.getIntegers = function(req, res) {
// 	integerModel.find({}, function(err, foundData) {
// 		if(err) {
// 			console.log(err);
// 			return res.status(500).send();
// 		} 
// 		console.log(foundData)
// 		res.send(foundData);
// 	});
// };

 exports.getIntegers = function(){
	return integerModel.find({}, function(err, foundData) {
		// return foundData;	
	})
	// .then(function(foundData){
	// 	console.log("founddata: ", foundData);
	// 	return foundData;	
	// });
}	


// ---- To Drop Collection in DB -----
// integerModel.remove({}, function(){
// 	console.log("db dropped");
// })



