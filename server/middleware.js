var Promise = require('bluebird');
var utils = require('./utilities.js');

module.exports.evalForAllInputSizes = function(req, res, next) {
  var userInput = req.body.data;
  var dataType = req.params.dataType || null; 

  console.log('M6-string received from ajax: ' + userInput);

  return new Promise(function(resolve, reject) {
  	var data = utils.evalAlg(userInput, dataType);
  	resolve(data)
  }).then(function(data)	{
    var coords = utils.getJSONCoords(data);
    res.coords = coords;
    next();
  });

  // return utils.evalAlg(userInput, dataType).then(function(algorithmData) {
  // 	console.log('M34-got ' + algorithmData);
  //   return utils.getCoords(algorithmData).then(function(d3Coordinates) {
  //     res.coords = d3Coordinates;
  //     next();
  //   });  
  // });

};
