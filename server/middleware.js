var utils = require('./utilities.js');

module.exports.evalForAllInputSizes = function(req, res, next) {
  var userInput = req.body.userInput;
  
  console.log('M6-string received from ajax: ' + userInput);

  var dataType = req.params.dataType || null;
  var algorithmData = utils.evalAlg(userInput, dataType);
  var jsonD3Coordinates = utils.getCoords(algorithmData);

  res.coords = jsonD3Coordinates;
  next();
}
