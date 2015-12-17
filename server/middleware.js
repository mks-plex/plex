var Promise = require('bluebird');
var eval = require('./evaluation.js');
var utils = require('./utilities.js');

module.exports.evalForAllInputSizes = function(req, res, next) {
  var userInput = req.body.data;
  var dataType = req.params.dataType || null; 

  return new Promise(function(resolve, reject) {
    var data = eval.evalAlg(userInput, dataType);
    resolve(data)
  })
  .then(function(data) {
    res.body = {};

    // TODO: integrate jon's bigO module
    res.body.bigO = null;

    res.body.name = utils.getFuncName(userInput);
    res.body.eq = eval.runRegression(data, null);
    var coords = eval.getJSONCoords(data);
    res.body.coords = coords;
    next();
  });
};
