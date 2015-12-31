var Promise = require('bluebird');
var eval = require('./evaluation.js');
var utils = require('./utilities.js');
var theta = require('./thetaComputation.js')

module.exports.evalForAllInputSizes = function(req, res, next) {
  var userInput = req.body.data;
  var dataType = req.params.dataType || null;

  return new Promise(function(resolve, reject) {
    var data = eval.evalAlg(userInput, dataType);
    resolve(data)
  })
  .then(function(data) {
    var userInput = req.body.data;
    var userAlg = utils.memoBuild(userInput);

    res.body = {};
    res.body.bigO = theta.computeTheta(userAlg, data);
    res.body.name = utils.getFuncName(userInput);
    res.body.eq = eval.runRegression(data, null);
    var coords = eval.getJSONCoords(data);
    res.body.coords = coords;
    next();
  });
};

module.exports.timeAlgo = function(req, res, next) {
  var userInput = req.body.data;
  var sampleArray = [1,5,3,4,2,9,3,10,12,14,8];
  var testRun = getRunTime(userInput, sampleArray);
  if (testRun[1] > 5.0) {
    res.send("time out");
  }
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
    res.status(200).send("Error! You're function doesn't sort.");
  }
};
