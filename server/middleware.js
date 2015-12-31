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
    res.body.eq = eval.runRegression(data, res.body.bigO);
    res.body.coords = eval.getJSONCoords(data);

    next();
  });
};

module.exports.timeAlgo = function(req, res, next) {
  var userInput = req.body.data;
  var sampleArray = [1,5,3,4,2,9,3,10,12,14,8];
  var testRun = utils.getRunTime(userInput, sampleArray);

  if (testRun[1] > 5.0) {
    res.send('Your function has timed out!');
  }

  next();
};

module.exports.testAlgo = function(req, res, next) {
  var userInput = req.body.data;
  var testArray = [10,9,8,7,6,5,4,3,2,1];
  var ordArray = [1,2,3,4,5,6,7,8,9,10];

  // Test if userInput can be built
  try {
    console.log('try - make function');

    var param = userInput.slice(userInput.indexOf('(') + 1, userInput.indexOf(')'));
    var algString = userInput.slice(userInput.indexOf('{') + 1, userInput.lastIndexOf('}'));
    var userAlg = new Function(param, algString);

    if (!algString || !param) {
      res.send("Error! No param or function body.");
    }
  } catch(e) {
    console.log('caught syntax error, couldn\'t make function');
    console.log(e);

    res.send('Error! Your code is not a function.');
    return;
  }

  // Test if built function can be run
  try {
    console.log('try - run function');

    var userAlg = utils.memoBuild(userInput);
    userAlg(testArray);
  } catch(e) {
    console.log('caught syntax error, function didn\'t run');
    console.log(e);

    res.send('Error! That is not an executable function.');

    return;
  }

  try {
    var result = userAlg(testArray);

    if (result.join() === ordArray.join()) {
      console.log('alg passed');

      next();
    }
  } catch(e) {
    res.send("Error! Your function doesn't sort.");
  }
};
