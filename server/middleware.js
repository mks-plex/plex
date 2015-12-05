var utils = require('./utilities.js');

module.exports.evalForAllInputSizes = function(req, res, next) {
	var userInput = req.body.userInput;
	var dataType = req.params.dataType;
	var algorithmData = utils.evalAlg(userInput, dataType);
	var d3Coordinates = utils.getCoords(algorithmData);
	res.coords = d3Coordinates;
	next();
}
