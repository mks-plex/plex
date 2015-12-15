var Promise = require('bluebird');
var utils = require('./utilities.js');

module.exports.evalForAllInputSizes = function(req, res, next) {
  var userInput = req.body.data;
  var dataType = req.params.dataType || null; 

  console.log('M8-string received from ajax: ' + userInput);

  return new Promise(function(resolve, reject) {
  	var data = utils.evalAlg(userInput, dataType);
  	resolve(data)
  }).then(function(data)	{
    var coords = utils.getJSONCoords(data);
    res.coords = coords;
    next();
  });
};
