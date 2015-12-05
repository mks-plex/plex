var utils = require('./utilities.js');

module.exports.evalForAllInputSizes = function(req, res, next) {
	var userInput = req.body.userInput;
	// var dataType = req.body.dataType
	// TODO: pass dataType to evalAlg
	var algorithmData = utils.evalAlg(userInput);
	var d3Coordinates = utils.getCoords(algorithmData);
	res.coords = d3Coordinates;
	next();
}
