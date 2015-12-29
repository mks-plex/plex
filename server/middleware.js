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

module.exports.testAlgo = function(req, res, next) {
  var userInput = req.body.data;
  var userAlg = utils.memoBuild(userInput);
  var testArray = [10,9,8,7,6,5,4,3,2,1];
  var ordArray = [1,2,3,4,5,6,7,8,9,10];
  var result = userAlg(testArray);

  if(result.join() === ordArray.join()) {
    next();
  } else {
    res.status(200).send("Error, You're function doesn't sort!");
  }
};
