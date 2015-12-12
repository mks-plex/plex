var Promise = require('bluebird');
var utils = require('./utilities.js');

module.exports.evalForAllInputSizes = function(req, res, next) {
  var userInput = req.body.data;

  console.log('M6-string received from ajax: ' + userInput);

  var dataType = req.params.dataType || null; 

  utils.evalAlg(userInput, dataType).then(function(algorithmData) {
    return utils.getCoords(algorithmData).then(function(d3Coordinates) {
      res.coords = d3Coordinates;
      next();
    });  
  });
}
