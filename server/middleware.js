var utils = require('./utilities.js');

module.exports.evalForAllInputSizes = function(req, res, next) {
	var userInput = req.body.userInput;
	// res.coords;
	var algorithmData = utils.evalAlg(userInput);
	var d3Coordinates = utils.getCoords(algorithmData);
	res.coords = d3Coordinates;
	next();
}
